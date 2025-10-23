import { IFavoriteRepository } from '../../ports/repositories/IFavoriteRepository';
import { IRemoveAllFavoritesUseCase } from '../../ports/use-cases/favorites/IRemoveAllFavoritesUseCase';

export class RemoveAllFavoritesUseCase implements IRemoveAllFavoritesUseCase {
  constructor(private readonly favoriteRepository: IFavoriteRepository) {}

  async execute(sessionId: string): Promise<void> {
    await this.favoriteRepository.deleteAllBySessionId(sessionId);
  }
}
