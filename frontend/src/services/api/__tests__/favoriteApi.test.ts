import { describe, it, expect, vi, beforeEach } from 'vitest';
import { favoriteApi } from '../favoriteApi';
import { makeRequest } from '../axiosInstance';
import { Favorite, Movie } from '@/types/movie.types';

vi.mock('../axiosInstance', () => ({
  makeRequest: vi.fn(),
}));

describe('favoriteApi', () => {
  beforeEach(() => {
    vi.clearAllMocks();
  });

  describe('getFavorites', () => {
    it('should get favorites successfully', async () => {
      const mockFavorites: Favorite[] = [
        {
          id: 'favorite-1',
          imdbID: 'tt0372784',
          title: 'Batman Begins',
          year: '2005',
          poster: 'https://example.com/poster.jpg',
          type: 'movie',
          addedAt: new Date('2023-01-01T00:00:00.000Z').toISOString(),
        },
      ];

      const mockResponse = {
        favorites: mockFavorites,
        count: mockFavorites.length,
      };

      (makeRequest as any).mockResolvedValue(mockResponse);

      const result = await favoriteApi.getFavorites();

      expect(result).toEqual(mockResponse);
      expect(makeRequest).toHaveBeenCalled();
    });

    it('should handle empty favorites', async () => {
      const mockResponse = {
        favorites: [],
        count: 0,
      };

      (makeRequest as any).mockResolvedValue(mockResponse);

      const result = await favoriteApi.getFavorites();

      expect(result.favorites).toEqual([]);
      expect(result.count).toBe(0);
    });

    it('should handle API errors', async () => {
      const error = new Error('Network error');
      (makeRequest as any).mockRejectedValue(error);

      await expect(favoriteApi.getFavorites()).rejects.toThrow('Network error');
    });
  });

  describe('toggleFavorite', () => {
    it('should toggle favorite successfully', async () => {
      const toggleDto: Movie = {
        imdbID: 'tt0372784',
        title: 'Batman Begins',
        year: '2005',
        poster: 'https://example.com/poster.jpg',
        type: 'movie',
      };

      const mockResponse = {
        isFavorited: true,
        message: 'Added to favorites',
      };

      (makeRequest as any).mockResolvedValue(mockResponse);

      const result = await favoriteApi.toggleFavorite(toggleDto);

      expect(result).toEqual(mockResponse);
      expect(makeRequest).toHaveBeenCalled();
    });

    it('should handle toggle favorite errors', async () => {
      const toggleDto: Movie = {
        imdbID: 'tt0372784',
        title: 'Batman Begins',
        year: '2005',
        poster: 'https://example.com/poster.jpg',
        type: 'movie',
      };

      const error = new Error('Toggle favorite failed');
      (makeRequest as any).mockRejectedValue(error);

      await expect(favoriteApi.toggleFavorite(toggleDto)).rejects.toThrow('Toggle favorite failed');
    });

    it('should handle remove favorite response', async () => {
      const toggleDto: Movie = {
        imdbID: 'tt0372784',
        title: 'Batman Begins',
        year: '2005',
        poster: 'https://example.com/poster.jpg',
        type: 'movie',
      };

      const mockResponse = {
        isFavorited: false,
        message: 'Removed from favorites',
      };

      (makeRequest as any).mockResolvedValue(mockResponse);

      const result = await favoriteApi.toggleFavorite(toggleDto);

      expect(result.isFavorited).toBe(false);
      expect(result.message).toBe('Removed from favorites');
    });
  });

  describe('removeAllFavorites', () => {
    it('should remove all favorites successfully', async () => {
      // Arrange
      (makeRequest as any).mockResolvedValue(undefined);

      await favoriteApi.removeAllFavorites();

      expect(makeRequest).toHaveBeenCalled();
    });

    it('should handle remove all favorites errors', async () => {
      const error = new Error('Remove all favorites failed');
      (makeRequest as any).mockRejectedValue(error);

      await expect(favoriteApi.removeAllFavorites()).rejects.toThrow('Remove all favorites failed');
    });

    it('should handle empty favorites removal', async () => {
      (makeRequest as any).mockResolvedValue(undefined);

      await favoriteApi.removeAllFavorites();

      expect(makeRequest).toHaveBeenCalled();
    });
  });
});