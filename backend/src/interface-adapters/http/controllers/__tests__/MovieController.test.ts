import { Request, Response } from 'express';
import { MovieController } from '../MovieController';
import { ISearchMoviesUseCase } from '@application/ports/use-cases/movies/ISearchMoviesUseCase';

describe('MovieController', () => {
  let movieController: MovieController;
  let mockSearchMoviesUseCase: jest.Mocked<ISearchMoviesUseCase>;
  let mockRequest: Partial<Request>;
  let mockResponse: Partial<Response>;

  beforeEach(() => {
    mockSearchMoviesUseCase = {
      execute: jest.fn(),
    } as jest.Mocked<ISearchMoviesUseCase>;

    movieController = new MovieController(mockSearchMoviesUseCase);

    mockRequest = {
      query: {},
    };

    mockResponse = {
      status: jest.fn().mockReturnThis(),
      json: jest.fn().mockReturnThis(),
    };
  });

  afterEach(() => {
    jest.clearAllMocks();
  });

  describe('searchMovies', () => {
    it('should search movies with query and page parameters', async () => {
      const query = 'batman';
      const page = 1;
      mockRequest.query = { q: query, page: page.toString() };

      const mockSearchResult = {
        movies: [
          {
            imdbID: 'tt0372784',
            title: 'Batman Begins',
            year: '2005',
            poster: 'https://example.com/poster.jpg',
            type: 'movie',
          },
        ],
        totalResults: 1,
        page: 1,
      };

      mockSearchMoviesUseCase.execute.mockResolvedValue(mockSearchResult);

      await movieController.searchMovies(mockRequest as Request, mockResponse as Response, jest.fn());

      expect(mockSearchMoviesUseCase.execute).toHaveBeenCalledWith(query, page);
      expect(mockResponse.status).toHaveBeenCalledWith(200);
      expect(mockResponse.json).toHaveBeenCalledWith({
        status: 'success',
        data: mockSearchResult,
      });
    });

    it('should use default page 1 when page is not provided', async () => {
      const query = 'superman';
      mockRequest.query = { q: query };

      const mockSearchResult = {
        movies: [],
        totalResults: 0,
        page: 1,
      };

      mockSearchMoviesUseCase.execute.mockResolvedValue(mockSearchResult);

      await movieController.searchMovies(mockRequest as Request, mockResponse as Response, jest.fn());

      expect(mockSearchMoviesUseCase.execute).toHaveBeenCalledWith(query, 1);
      expect(mockResponse.status).toHaveBeenCalledWith(200);
      expect(mockResponse.json).toHaveBeenCalledWith({
        status: 'success',
        data: mockSearchResult,
      });
    });

    it('should handle use case errors', async () => {
      const query = 'invalid';
      mockRequest.query = { q: query };
      const error = new Error('Use case error');
      mockSearchMoviesUseCase.execute.mockRejectedValue(error);

      try {
        await movieController.searchMovies(mockRequest as Request, mockResponse as Response, jest.fn());
      } catch (err) {
        expect(err).toEqual(error);
      }
    });

    it('should handle missing query parameter', async () => {
      mockRequest.query = {};
      const mockSearchResult = {
        movies: [],
        totalResults: 0,
        page: 1,
      };

      mockSearchMoviesUseCase.execute.mockResolvedValue(mockSearchResult);

      await movieController.searchMovies(mockRequest as Request, mockResponse as Response, jest.fn());

      expect(mockSearchMoviesUseCase.execute).toHaveBeenCalledWith(undefined, 1);
    });
  });
});
