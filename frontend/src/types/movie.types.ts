export interface Movie {
    imdbID: string;
    title: string;
    year: string;
    poster: string;
    type: string;
  }
  
  export interface SearchResult {
    movies: Movie[];
    totalResults: number;
    page: number;
  }
  
  export interface Favorite {
    id: string;
    imdbID: string;
    title: string;
    year: string;
    poster: string;
    type: string;
    addedAt: string;
  }
  