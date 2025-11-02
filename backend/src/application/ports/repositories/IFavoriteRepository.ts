import { Favorite } from '../../../domain/entities/Favorite.entity';

export interface IFavoriteRepository {
  findBySessionId(sessionId: string): Promise<Favorite[]>;
  findBySessionAndMovie(sessionId: string, imdbID: string): Promise<Favorite | null>;
  save(favorite: Favorite): Promise<void>;
  delete(sessionId: string, imdbID: string): Promise<boolean>;
  exists(sessionId: string, imdbID: string): Promise<boolean>;
  deleteAllBySessionId(sessionId: string): Promise<void>;
  cleanupExpired(): Promise<void>;
  getAllSessionIds(): string[];
}
