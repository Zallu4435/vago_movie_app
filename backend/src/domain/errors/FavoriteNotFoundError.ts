import { DomainError } from './DomainError';

export class FavoriteNotFoundError extends DomainError {
  constructor(imdbId: string) {
    super(`Favorite not found for movie: ${imdbId}`);
  }
}
