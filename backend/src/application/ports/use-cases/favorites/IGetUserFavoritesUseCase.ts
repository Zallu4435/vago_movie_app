import { FavoriteDto } from '../../../dto/favorites/FavoriteDto';

export interface IGetUserFavoritesUseCase {
  execute(sessionId: string): Promise<FavoriteDto[]>;
}
