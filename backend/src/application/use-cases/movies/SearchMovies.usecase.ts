import { IExternalMovieAPI } from '../../ports/services/IExternalMovieAPI';
import { SearchResultDto } from '../../dto/movies/SearchResultDto';
import { MovieMapper } from '../../mappers/MovieMapper';
import { ISearchMoviesUseCase } from '../../ports/use-cases/movies/ISearchMoviesUseCase';

export class SearchMoviesUseCase implements ISearchMoviesUseCase {
  constructor(private readonly movieAPI: IExternalMovieAPI) {}

  async execute(query: string, page: number = 1): Promise<SearchResultDto> {
    const result = await this.movieAPI.searchMovies(query, page);

    if (result.Response === 'False') {
      return new SearchResultDto([], 0, page);
    }

    const movies = MovieMapper.fromApiResponseArray(result.Search);

    const movieDtos = MovieMapper.toDtoArray(movies);

    return new SearchResultDto(
      movieDtos,
      parseInt(result.totalResults, 10),
      page
    );
  }
}
