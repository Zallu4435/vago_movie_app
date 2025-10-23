import { SearchMoviesUseCase } from '../SearchMovies.usecase';
import { IExternalMovieAPI } from '../../../ports/services/IExternalMovieAPI';

describe('SearchMoviesUseCase', () => {
  let searchMoviesUseCase: SearchMoviesUseCase;
  let mockMovieAPI: jest.Mocked<IExternalMovieAPI>;

  beforeEach(() => {
    mockMovieAPI = {
      searchMovies: jest.fn(),
      getMovieDetails: jest.fn(),
    } as jest.Mocked<IExternalMovieAPI>;

    searchMoviesUseCase = new SearchMoviesUseCase(mockMovieAPI);
  });

  afterEach(() => {
    jest.clearAllMocks();
  });

  describe('execute', () => {
    it('should return empty results when API returns false response', async () => {
      // Arrange
      const query = 'test movie';
      const page = 1;
      mockMovieAPI.searchMovies.mockResolvedValue({
        Response: 'False',
        Error: 'Movie not found!',
        Search: [],
        totalResults: '0',
      });

      // Act
      const result = await searchMoviesUseCase.execute(query, page);

      // Assert
      expect(result.movies).toEqual([]);
      expect(result.totalResults).toBe(0);
      expect(result.page).toBe(page);
      expect(mockMovieAPI.searchMovies).toHaveBeenCalledWith(query, page);
    });

    it('should return mapped movies when API returns successful response', async () => {
      // Arrange
      const query = 'batman';
      const page = 1;
      const mockApiResponse = {
        Response: 'True',
        Search: [
          {
            Title: 'Batman Begins',
            Year: '2005',
            imdbID: 'tt0372784',
            Type: 'movie',
            Poster: 'https://example.com/poster1.jpg',
          },
          {
            Title: 'The Dark Knight',
            Year: '2008',
            imdbID: 'tt0468569',
            Type: 'movie',
            Poster: 'https://example.com/poster2.jpg',
          },
        ],
        totalResults: '2',
      };

      mockMovieAPI.searchMovies.mockResolvedValue(mockApiResponse);

      // Act
      const result = await searchMoviesUseCase.execute(query, page);

      // Assert
      expect(result.movies).toHaveLength(2);
      expect(result.movies[0].title).toBe('Batman Begins');
      expect(result.movies[0].year).toBe('2005');
      expect(result.movies[0].imdbID).toBe('tt0372784');
      expect(result.movies[1].title).toBe('The Dark Knight');
      expect(result.movies[1].year).toBe('2008');
      expect(result.movies[1].imdbID).toBe('tt0468569');
      expect(result.totalResults).toBe(2);
      expect(result.page).toBe(page);
      expect(mockMovieAPI.searchMovies).toHaveBeenCalledWith(query, page);
    });

    it('should handle different page numbers', async () => {
      // Arrange
      const query = 'superman';
      const page = 2;
      mockMovieAPI.searchMovies.mockResolvedValue({
        Response: 'True',
        Search: [],
        totalResults: '0',
      });

      // Act
      const result = await searchMoviesUseCase.execute(query, page);

      // Assert
      expect(result.page).toBe(page);
      expect(mockMovieAPI.searchMovies).toHaveBeenCalledWith(query, page);
    });

    it('should use default page 1 when not provided', async () => {
      // Arrange
      const query = 'wonder woman';
      mockMovieAPI.searchMovies.mockResolvedValue({
        Response: 'True',
        Search: [],
        totalResults: '0',
      });

      // Act
      const result = await searchMoviesUseCase.execute(query);

      // Assert
      expect(result.page).toBe(1);
      expect(mockMovieAPI.searchMovies).toHaveBeenCalledWith(query, 1);
    });

    it('should handle API errors gracefully', async () => {
      // Arrange
      const query = 'invalid query';
      const page = 1;
      const error = new Error('API Error');
      mockMovieAPI.searchMovies.mockRejectedValue(error);

      // Act & Assert
      await expect(searchMoviesUseCase.execute(query, page)).rejects.toThrow('API Error');
      expect(mockMovieAPI.searchMovies).toHaveBeenCalledWith(query, page);
    });
  });
});
