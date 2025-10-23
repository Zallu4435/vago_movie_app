import { IFavoriteRepository } from '../../ports/repositories/IFavoriteRepository';
import { FavoriteDto } from '../../dto/favorites/FavoriteDto';
import { FavoriteMapper } from '../../mappers/FavoriteMapper';
import { IGetUserFavoritesUseCase } from '../../ports/use-cases/favorites/IGetUserFavoritesUseCase';

export class GetUserFavoritesUseCase implements IGetUserFavoritesUseCase {
  constructor(private readonly favoriteRepository: IFavoriteRepository) {}

  async execute(sessionId: string): Promise<FavoriteDto[]> {
    const favorites = await this.favoriteRepository.findBySessionId(sessionId);

    return FavoriteMapper.toDtoArray(favorites);
  }
}
