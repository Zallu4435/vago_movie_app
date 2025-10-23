import { DomainError } from './DomainError';

export class DuplicateFavoriteError extends DomainError {
  constructor(imdbID: string) {
    super(`Movie with ID ${imdbID} is already in favorites`);
    this.name = 'DuplicateFavoriteError';
  }
}
