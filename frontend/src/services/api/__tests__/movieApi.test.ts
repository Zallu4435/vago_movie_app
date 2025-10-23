import { describe, it, expect, vi, beforeEach } from 'vitest';
import { movieApi } from '../movieApi';
import { makeRequest } from '../axiosInstance';

vi.mock('../axiosInstance', () => ({
  axiosInstance: {
    get: vi.fn(),
  },
  makeRequest: vi.fn(),
}));

describe('movieApi', () => {
  beforeEach(() => {
    vi.clearAllMocks();
  });

  describe('searchMovies', () => {
    it('should search movies successfully', async () => {
      const mockResponse = {
        data: {
          status: 'success',
          data: {
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
          },
        },
      };

      (makeRequest as any).mockResolvedValue(mockResponse.data.data);

      const result = await movieApi.searchMovies('batman', 1);

      expect(result).toEqual(mockResponse.data.data);
      expect(makeRequest).toHaveBeenCalled();
    });

    it('should handle search with default page', async () => {
      const mockResponse = {
        movies: [],
        totalResults: 0,
        page: 1,
      };

      (makeRequest as any).mockResolvedValue(mockResponse);

      const result = await movieApi.searchMovies('superman');

      expect(result).toEqual(mockResponse);
      expect(makeRequest).toHaveBeenCalled();
    });

    it('should handle API errors', async () => {
      const error = new Error('Network error');
      (makeRequest as any).mockRejectedValue(error);

      await expect(movieApi.searchMovies('batman', 1)).rejects.toThrow('Network error');
    });

    it('should handle empty search results', async () => {
      const mockResponse = {
        movies: [],
        totalResults: 0,
        page: 1,
      };

      (makeRequest as any).mockResolvedValue(mockResponse);

      const result = await movieApi.searchMovies('nonexistent');

      expect(result.movies).toEqual([]);
      expect(result.totalResults).toBe(0);
    });

    it('should handle different page numbers', async () => {
      const mockResponse = {
        movies: [],
        totalResults: 0,
        page: 3,
      };

      (makeRequest as any).mockResolvedValue(mockResponse);

      const result = await movieApi.searchMovies('wonder woman', 3);

      expect(result.page).toBe(3);
      expect(makeRequest).toHaveBeenCalled();
    });
  });
});
