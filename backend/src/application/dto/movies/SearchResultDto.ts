import { MovieDto } from './MovieDto';

export class SearchResultDto {
  constructor(
    public readonly movies: MovieDto[],
    public readonly totalResults: number,
    public readonly page: number
  ) {}
}
