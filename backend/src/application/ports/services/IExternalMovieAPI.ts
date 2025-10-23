export interface MovieSearchResult {
    Search: Array<{
      imdbID: string;
      Title: string;
      Year: string;
      Type: string;
      Poster: string;
    }>;
    totalResults: string;
    Response: string;
    Error?: string;
  }
  
  export interface IExternalMovieAPI {
    searchMovies(query: string, page?: number): Promise<MovieSearchResult>;
    getMovieDetails(imdbId: string): Promise<any>;
  }
  