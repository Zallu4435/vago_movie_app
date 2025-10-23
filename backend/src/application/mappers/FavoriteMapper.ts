import { Favorite } from '../../domain/entities/Favorite.entity';
import { FavoriteDto } from '../dto/favorites/FavoriteDto';

export class FavoriteMapper {
  static toDto(favorite: Favorite): FavoriteDto {
    return new FavoriteDto(
      favorite.id,
      favorite.imdbID,
      favorite.movieTitle,
      favorite.movieYear,
      favorite.moviePoster,
      favorite.movieType,
      favorite.addedAt
    );
  }

  static toDtoArray(favorites: Favorite[]): FavoriteDto[] {
    return favorites.map((favorite) => this.toDto(favorite));
  }
}
