import { Favorite } from '../../../domain/entities/Favorite.entity';
import { IFavoriteRepository } from '../../../application/ports/repositories/IFavoriteRepository';
import { SessionConfig } from '../../../shared/constants/sessionConfig';

interface FavoriteEntry {
  data: Favorite;
  expiresAt: number;
}

export class InMemoryFavoriteRepository implements IFavoriteRepository {
  private favorites: Map<string, FavoriteEntry> = new Map();
  private sessionIndex: Map<string, Set<string>> = new Map(); 
  private readonly TTL = SessionConfig.TTL_MS; 

  async findBySessionId(sessionId: string): Promise<Favorite[]> {
    await this.cleanupExpired(); 
    
    const favoriteIds = this.sessionIndex.get(sessionId);
    if (!favoriteIds) return [];

    const favorites: Favorite[] = [];
    const now = Date.now();
    
    for (const id of favoriteIds) {
      const entry = this.favorites.get(id);
      if (entry && entry.expiresAt > now) {
        favorites.push(entry.data);
      }
    }

    return favorites.sort((a, b) => b.addedAt.getTime() - a.addedAt.getTime());
  }

  async findBySessionAndMovie(sessionId: string, imdbID: string): Promise<Favorite | null> {
    const favoriteIds = this.sessionIndex.get(sessionId);
    if (!favoriteIds) return null;

    const now = Date.now();
    
    for (const id of favoriteIds) {
      const entry = this.favorites.get(id);
      if (entry && entry.data.imdbID === imdbID && entry.expiresAt > now) {
        return entry.data;
      }
    }

    return null;
  }

  async save(favorite: Favorite): Promise<void> {
    const expiresAt = Date.now() + this.TTL;
    const entry: FavoriteEntry = {
      data: favorite,
      expiresAt,
    };
    
    this.favorites.set(favorite.id, entry);

    if (!this.sessionIndex.has(favorite.userId)) {
      this.sessionIndex.set(favorite.userId, new Set());
    }
    this.sessionIndex.get(favorite.userId)!.add(favorite.id);
  }

  async delete(sessionId: string, imdbID: string): Promise<boolean> {
    const favorite = await this.findBySessionAndMovie(sessionId, imdbID);
    if (!favorite) return false;

    this.favorites.delete(favorite.id);

    const sessionFavorites = this.sessionIndex.get(sessionId);
    if (sessionFavorites) {
      sessionFavorites.delete(favorite.id);
      if (sessionFavorites.size === 0) {
        this.sessionIndex.delete(sessionId);
      }
    }

    return true;
  }

  async exists(sessionId: string, imdbID: string): Promise<boolean> {
    const favorite = await this.findBySessionAndMovie(sessionId, imdbID);
    return favorite !== null;
  }

  async deleteAllBySessionId(sessionId: string): Promise<void> {
    const favoriteIds = this.sessionIndex.get(sessionId);
    if (!favoriteIds) return;

    for (const id of favoriteIds) {
      this.favorites.delete(id);
    }

    this.sessionIndex.delete(sessionId);
  }

  async cleanupExpired(): Promise<void> {
    const now = Date.now();
    const expiredIds: string[] = [];
    const expiredSessions = new Set<string>();

    for (const [id, entry] of this.favorites.entries()) {
      if (entry.expiresAt <= now) {
        expiredIds.push(id);
        expiredSessions.add(entry.data.userId);
      }
    }

    for (const id of expiredIds) {
      this.favorites.delete(id);
    }

    for (const sessionId of expiredSessions) {
      const sessionFavorites = this.sessionIndex.get(sessionId);
      if (sessionFavorites) {
        for (const id of expiredIds) {
          sessionFavorites.delete(id);
        }
        if (sessionFavorites.size === 0) {
          this.sessionIndex.delete(sessionId);
        }
      }
    }
  }

  getAllSessionIds(): string[] {
    return Array.from(this.sessionIndex.keys());
  }
}
