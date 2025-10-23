import { Movie } from '../../domain/entities/Movie.entity';
import { MovieDto } from '../dto/movies/MovieDto';

export class MovieMapper {
  static fromApiResponse(apiMovie: any): Movie {
    return new Movie(
      apiMovie.imdbID,
      apiMovie.Title,
      apiMovie.Year,
      apiMovie.Poster,
      apiMovie.Type
    );
  }

  static fromApiResponseArray(apiMovies: any[]): Movie[] {
    if (!apiMovies || !Array.isArray(apiMovies)) {
      return [];
    }
    return apiMovies.map(movie => this.fromApiResponse(movie));
  }

  static toDto(movie: Movie): MovieDto {
    return new MovieDto(
      movie.imdbID,
      movie.title,
      movie.year,
      movie.poster,
      movie.type
    );
  }

  static toDtoArray(movies: Movie[]): MovieDto[] {
    return movies.map(movie => this.toDto(movie));
  }
}
