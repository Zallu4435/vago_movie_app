import { v4 as uuidv4 } from 'uuid';
import { Favorite } from '../../../domain/entities/Favorite.entity';
import { ImdbId } from '../../../domain/value-objects/ImdbId.vo';
import { IFavoriteRepository } from '../../ports/repositories/IFavoriteRepository';
import { ToggleFavoriteDto } from '../../dto/favorites/ToggleFavoriteDto';
import { IToggleFavoriteUseCase } from '../../ports/use-cases/favorites/IToggleFavoriteUseCase';

export class ToggleFavoriteUseCase implements IToggleFavoriteUseCase {
  constructor(private readonly favoriteRepository: IFavoriteRepository) {}

  async execute(dto: ToggleFavoriteDto): Promise<{ isFavorited: boolean; message: string }> {
    const imdbId = new ImdbId(dto.imdbID);

    const existing = await this.favoriteRepository.findBySessionAndMovie(
      dto.userId, 
      imdbId.getValue()
    );

    if (existing) {
      // Remove from favorites
      await this.favoriteRepository.delete(dto.userId, imdbId.getValue());
      return {
        isFavorited: false,
        message: 'Removed from favorites',
      };
    } else {
      const favorite = new Favorite(
        uuidv4(),
        dto.userId, 
        imdbId.getValue(),
        dto.title,
        dto.year,
        dto.poster,
        dto.type
      );

      await this.favoriteRepository.save(favorite);
      return {
        isFavorited: true,
        message: 'Added to favorites',
      };
    }
  }
}
