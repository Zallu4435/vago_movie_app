import { Request, Response } from 'express';
import { FavoriteController } from '../FavoriteController';
import { IToggleFavoriteUseCase } from '../../../../../application/ports/use-cases/favorites/IToggleFavoriteUseCase';
import { IGetUserFavoritesUseCase } from '../../../../../application/ports/use-cases/favorites/IGetUserFavoritesUseCase';
import { ICheckIsFavoriteUseCase } from '../../../../../application/ports/use-cases/favorites/ICheckIsFavoriteUseCase';
import { IRemoveAllFavoritesUseCase } from '../../../../../application/ports/use-cases/favorites/IRemoveAllFavoritesUseCase';

describe('FavoriteController', () => {
  let favoriteController: FavoriteController;
  let mockToggleFavoriteUseCase: jest.Mocked<IToggleFavoriteUseCase>;
  let mockGetUserFavoritesUseCase: jest.Mocked<IGetUserFavoritesUseCase>;
  let mockCheckIsFavoriteUseCase: jest.Mocked<ICheckIsFavoriteUseCase>;
  let mockRemoveAllFavoritesUseCase: jest.Mocked<IRemoveAllFavoritesUseCase>;
  let mockRequest: Partial<Request>;
  let mockResponse: Partial<Response>;

  beforeEach(() => {
    mockToggleFavoriteUseCase = {
      execute: jest.fn(),
    } as jest.Mocked<IToggleFavoriteUseCase>;

    mockGetUserFavoritesUseCase = {
      execute: jest.fn(),
    } as jest.Mocked<IGetUserFavoritesUseCase>;

    mockCheckIsFavoriteUseCase = {
      execute: jest.fn(),
    } as jest.Mocked<ICheckIsFavoriteUseCase>;

    mockRemoveAllFavoritesUseCase = {
      execute: jest.fn(),
    } as jest.Mocked<IRemoveAllFavoritesUseCase>;

    favoriteController = new FavoriteController(
      mockToggleFavoriteUseCase,
      mockGetUserFavoritesUseCase,
      mockCheckIsFavoriteUseCase,
      mockRemoveAllFavoritesUseCase
    );

    mockRequest = {
      body: {},
      session: { 
        id: 'session-123',
        cookie: {},
        regenerate: jest.fn(),
        destroy: jest.fn(),
        reload: jest.fn(),
        save: jest.fn(),
        touch: jest.fn(),
      } as any,
    };

    mockResponse = {
      status: jest.fn().mockReturnThis(),
      json: jest.fn().mockReturnThis(),
    };
  });

  afterEach(() => {
    jest.clearAllMocks();
  });

  describe('toggleFavorite', () => {
    it('should toggle favorite successfully', async () => {
      const toggleFavoriteDto = {
        imdbID: 'tt0372784',
        title: 'Batman Begins',
        year: '2005',
        poster: 'https://example.com/poster.jpg',
        type: 'movie',
      };

      mockRequest.body = toggleFavoriteDto;

      const mockResult = {
        message: 'Added to favorites',
        isFavorited: true,
      };

      mockToggleFavoriteUseCase.execute.mockResolvedValue(mockResult);

      await favoriteController.toggleFavorite(mockRequest as Request, mockResponse as Response, jest.fn());

      expect(mockToggleFavoriteUseCase.execute).toHaveBeenCalledWith(
        expect.objectContaining({
          userId: 'session-123',
          imdbID: toggleFavoriteDto.imdbID,
          title: toggleFavoriteDto.title,
          year: toggleFavoriteDto.year,
          poster: toggleFavoriteDto.poster,
          type: toggleFavoriteDto.type,
        })
      );
      expect(mockResponse.status).toHaveBeenCalledWith(200);
      expect(mockResponse.json).toHaveBeenCalledWith({
        status: 'success',
        message: mockResult.message,
        data: {
          isFavorited: mockResult.isFavorited,
        },
      });
    });

    it('should handle toggle favorite errors', async () => {
      const toggleFavoriteDto = {
        imdbID: 'tt0372784',
        title: 'Batman Begins',
        year: '2005',
        poster: 'https://example.com/poster.jpg',
        type: 'movie',
      };

      mockRequest.body = toggleFavoriteDto;
      const error = new Error('Toggle favorite error');
      mockToggleFavoriteUseCase.execute.mockRejectedValue(error);

      try {
        await favoriteController.toggleFavorite(mockRequest as Request, mockResponse as Response, jest.fn());
      } catch (err) {
        expect(err).toEqual(error);
      }
    });
  });

  describe('getFavorites', () => {
    it('should get user favorites successfully', async () => {
      const mockFavorites = [
        {
          id: 'favorite-1',
          imdbID: 'tt0372784',
          title: 'Batman Begins',
          year: '2005',
          poster: 'https://example.com/poster.jpg',
          type: 'movie',
          addedAt: new Date('2023-01-01T00:00:00.000Z'),
        },
      ];

      mockGetUserFavoritesUseCase.execute.mockResolvedValue(mockFavorites);

      await favoriteController.getFavorites(mockRequest as Request, mockResponse as Response, jest.fn());

      expect(mockGetUserFavoritesUseCase.execute).toHaveBeenCalledWith('session-123');
      expect(mockResponse.status).toHaveBeenCalledWith(200);
      expect(mockResponse.json).toHaveBeenCalledWith({
        status: 'success',
        data: {
          favorites: mockFavorites,
          count: mockFavorites.length,
        },
      });
    });

    it('should handle get favorites errors', async () => {
      const error = new Error('Get favorites error');
      mockGetUserFavoritesUseCase.execute.mockRejectedValue(error);

      try {
        await favoriteController.getFavorites(mockRequest as Request, mockResponse as Response, jest.fn());
      } catch (err) {
        expect(err).toEqual(error);
      }
    });
  });

  describe('removeAllFavorites', () => {
    it('should remove all favorites successfully', async () => {
      mockRemoveAllFavoritesUseCase.execute.mockResolvedValue(undefined);

      await favoriteController.removeAllFavorites(mockRequest as Request, mockResponse as Response, jest.fn());

      expect(mockRemoveAllFavoritesUseCase.execute).toHaveBeenCalledWith('session-123');
      expect(mockResponse.status).toHaveBeenCalledWith(200);
      expect(mockResponse.json).toHaveBeenCalledWith({
        status: 'success',
        message: 'All favorites removed successfully',
      });
    });

    it('should handle remove all favorites errors', async () => {
      const error = new Error('Remove all favorites error');
      mockRemoveAllFavoritesUseCase.execute.mockRejectedValue(error);

      try {
        await favoriteController.removeAllFavorites(mockRequest as Request, mockResponse as Response, jest.fn());
      } catch (err) {
        expect(err).toEqual(error);
      }
    });
  });
});
