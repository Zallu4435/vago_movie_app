import { SearchResultDto } from '../../../dto/movies/SearchResultDto';

export interface ISearchMoviesUseCase {
  execute(query: string, page?: number): Promise<SearchResultDto>;
}
