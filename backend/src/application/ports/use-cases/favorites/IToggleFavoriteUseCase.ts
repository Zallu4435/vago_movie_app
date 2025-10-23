import { ToggleFavoriteDto } from '../../../dto/favorites/ToggleFavoriteDto';

export interface IToggleFavoriteUseCase {
  execute(dto: ToggleFavoriteDto): Promise<{ isFavorited: boolean; message: string }>;
}
