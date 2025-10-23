import { ImdbId } from '../../../domain/value-objects/ImdbId.vo';
import { IFavoriteRepository } from '../../ports/repositories/IFavoriteRepository';
import { ICheckIsFavoriteUseCase } from '../../ports/use-cases/favorites/ICheckIsFavoriteUseCase';

export class CheckIsFavoriteUseCase implements ICheckIsFavoriteUseCase {
  constructor(private readonly favoriteRepository: IFavoriteRepository) {}

  async execute(sessionId: string, imdbID: string): Promise<boolean> {
    const imdbId = new ImdbId(imdbID);

    return await this.favoriteRepository.exists(sessionId, imdbId.getValue());
  }
}
