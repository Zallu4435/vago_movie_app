import { IExternalMovieAPI, MovieSearchResult } from '../../../application/ports/services/IExternalMovieAPI';

export class MockMovieAPI implements IExternalMovieAPI {
  async searchMovies(query: string, page: number = 1): Promise<MovieSearchResult> {
    // Simulate API delay
    await new Promise(resolve => setTimeout(resolve, 100));

    // Mock data for testing
    const mockMovies = [
      {
        imdbID: 'tt0372784',
        Title: 'Batman Begins',
        Year: '2005',
        Poster: 'https://m.media-amazon.com/images/M/MV5BOTY4YjI2N2MtYmFlMC00ZjcyLTg3YjEtMDQyM2ZjYzQ5YWFkXkEyXkFqcGdeQXVyMTQxNzMzNDI@._V1_SX300.jpg',
        Type: 'movie'
      },
      {
        imdbID: 'tt0468569',
        Title: 'The Dark Knight',
        Year: '2008',
        Poster: 'https://m.media-amazon.com/images/M/MV5BMTMxNTMwODM0NF5BMl5BanBnXkFtZTcwODAyMTk2Mw@@._V1_SX300.jpg',
        Type: 'movie'
      },
      {
        imdbID: 'tt1345836',
        Title: 'The Dark Knight Rises',
        Year: '2012',
        Poster: 'https://m.media-amazon.com/images/M/MV5BMTk4ODQzNDY3Ml5BMl5BanBnXkFtZTcwODA4NTIzOA@@._V1_SX300.jpg',
        Type: 'movie'
      }
    ];

    // Filter based on query
    const filteredMovies = mockMovies.filter(movie => 
      movie.Title.toLowerCase().includes(query.toLowerCase())
    );

    return {
      Response: 'True',
      Search: filteredMovies,
      totalResults: filteredMovies.length.toString()
    };
  }

  async getMovieDetails(imdbId: string): Promise<any> {
    // Simulate API delay
    await new Promise(resolve => setTimeout(resolve, 100));

    // Mock movie details
    const mockDetails = {
      imdbID: imdbId,
      Title: 'Batman Begins',
      Year: '2005',
      Rated: 'PG-13',
      Released: '15 Jun 2005',
      Runtime: '140 min',
      Genre: 'Action, Crime, Drama',
      Director: 'Christopher Nolan',
      Writer: 'Bob Kane, David S. Goyer, Christopher Nolan',
      Actors: 'Christian Bale, Michael Caine, Liam Neeson',
      Plot: 'After training with his mentor, Batman begins his fight to free crime-ridden Gotham City from corruption.',
      Language: 'English, Mandarin',
      Country: 'United States, United Kingdom',
      Awards: 'Nominated for 1 Oscar. 13 wins & 79 nominations total',
      Poster: 'https://m.media-amazon.com/images/M/MV5BOTY4YjI2N2MtYmFlMC00ZjcyLTg3YjEtMDQyM2ZjYzQ5YWFkXkEyXkFqcGdeQXVyMTQxNzMzNDI@._V1_SX300.jpg',
      Ratings: [
        { Source: 'Internet Movie Database', Value: '8.2/10' },
        { Source: 'Rotten Tomatoes', Value: '84%' },
        { Source: 'Metacritic', Value: '70/100' }
      ],
      Metascore: '70',
      imdbRating: '8.2',
      imdbVotes: '1,488,847',
      Type: 'movie',
      DVD: '18 Oct 2005',
      BoxOffice: '$206,852,432',
      Production: 'N/A',
      Website: 'N/A',
      Response: 'True'
    };

    return mockDetails;
  }
}
