import { Favorite } from '../../../domain/entities/Favorite.entity';
import { IFavoriteRepository } from '../../../application/ports/repositories/IFavoriteRepository';

export class InMemoryFavoriteRepository implements IFavoriteRepository {
  private favorites: Map<string, Favorite> = new Map();
  private sessionIndex: Map<string, Set<string>> = new Map(); // sessionId -> Set of favoriteIds

  async findBySessionId(sessionId: string): Promise<Favorite[]> {
    const favoriteIds = this.sessionIndex.get(sessionId);
    if (!favoriteIds) return [];

    const favorites: Favorite[] = [];
    for (const id of favoriteIds) {
      const favorite = this.favorites.get(id);
      if (favorite) {
        favorites.push(favorite);
      }
    }

    // Sort by addedAt descending (most recent first)
    return favorites.sort((a, b) => b.addedAt.getTime() - a.addedAt.getTime());
  }

  async findBySessionAndMovie(sessionId: string, imdbID: string): Promise<Favorite | null> {
    const favoriteIds = this.sessionIndex.get(sessionId);
    if (!favoriteIds) return null;

    for (const id of favoriteIds) {
      const favorite = this.favorites.get(id);
      if (favorite && favorite.imdbID === imdbID) {
        return favorite;
      }
    }

    return null;
  }

  async save(favorite: Favorite): Promise<void> {
    this.favorites.set(favorite.id, favorite);

    // Update session index
    if (!this.sessionIndex.has(favorite.userId)) {
      this.sessionIndex.set(favorite.userId, new Set());
    }
    this.sessionIndex.get(favorite.userId)!.add(favorite.id);
  }

  async delete(sessionId: string, imdbID: string): Promise<boolean> {
    const favorite = await this.findBySessionAndMovie(sessionId, imdbID);
    if (!favorite) return false;

    this.favorites.delete(favorite.id);

    // Update session index
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
}
