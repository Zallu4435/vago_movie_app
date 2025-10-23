import { OMDBMovieAPI } from '../OMDBMovieAPI';
import axios from 'axios';

// Mock axios
jest.mock('axios');
const mockedAxios = axios as jest.Mocked<typeof axios>;

describe('OMDBMovieAPI', () => {
  let omdbMovieAPI: OMDBMovieAPI;
  let mockAxiosInstance: any;

  beforeEach(() => {
    mockAxiosInstance = {
      get: jest.fn(),
    };
    
    (axios.create as jest.Mock).mockReturnValue(mockAxiosInstance);
    
    omdbMovieAPI = new OMDBMovieAPI('test-api-key', 'https://www.omdbapi.com');
    jest.clearAllMocks();
  });

  describe('searchMovies', () => {
    it('should search movies successfully', async () => {
      // Arrange
      const query = 'batman';
      const page = 1;
      const mockResponse = {
        data: {
          Response: 'True',
          Search: [
            {
              Title: 'Batman Begins',
              Year: '2005',
              imdbID: 'tt0372784',
              Type: 'movie',
              Poster: 'https://example.com/poster.jpg',
            },
          ],
          totalResults: '1',
        },
      };

      mockAxiosInstance.get.mockResolvedValue(mockResponse);

      // Act
      const result = await omdbMovieAPI.searchMovies(query, page);

      // Assert
      expect(result).toEqual(mockResponse.data);
      expect(mockAxiosInstance.get).toHaveBeenCalledWith('', {
        params: {
          apikey: 'test-api-key',
          s: query,
          page: page,
        },
      });
    });

    it('should handle API errors', async () => {
      // Arrange
      const query = 'invalid';
      const page = 1;
      const error = new Error('Network error');
      mockAxiosInstance.get.mockRejectedValue(error);

      // Act & Assert
      await expect(omdbMovieAPI.searchMovies(query, page)).rejects.toThrow('Network error');
    });

    it('should handle different page numbers', async () => {
      // Arrange
      const query = 'superman';
      const page = 2;
      const mockResponse = {
        data: {
          Response: 'True',
          Search: [],
          totalResults: '0',
        },
      };

      mockAxiosInstance.get.mockResolvedValue(mockResponse);

      // Act
      const result = await omdbMovieAPI.searchMovies(query, page);

      // Assert
      expect(result).toEqual(mockResponse.data);
      expect(mockAxiosInstance.get).toHaveBeenCalledWith('', {
        params: {
          apikey: 'test-api-key',
          s: query,
          page: page,
        },
      });
    });

    it('should handle empty search results', async () => {
      // Arrange
      const query = 'nonexistent';
      const page = 1;
      const mockResponse = {
        data: {
          Response: 'False',
          Error: 'Movie not found!',
          Search: [],
          totalResults: '0',
        },
      };

      mockAxiosInstance.get.mockResolvedValue(mockResponse);

      // Act
      const result = await omdbMovieAPI.searchMovies(query, page);

      // Assert
      expect(result).toEqual(mockResponse.data);
      expect(result.Response).toBe('False');
      expect(result.Search).toEqual([]);
    });
  });
});
