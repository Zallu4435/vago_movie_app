import { renderHook, act, waitFor } from '@testing-library/react';
import { describe, it, expect, vi, beforeEach } from 'vitest';
import { useFavorites } from '../useFavorites';
import { favoriteApi } from '@/services/api/favoriteApi';
import { useToast } from '../useToast';
import { Movie } from '@/types/movie.types';

vi.mock('@/services/api/favoriteApi', () => ({
  favoriteApi: {
    getFavorites: vi.fn(),
    toggleFavorite: vi.fn(),
    removeAllFavorites: vi.fn(),
  },
}));

// Mock the useToast hook
vi.mock('../useToast', () => ({
  useToast: vi.fn(),
}));

describe('useFavorites', () => {
  const mockShowSuccess = vi.fn();
  const mockShowError = vi.fn();

  beforeEach(() => {
    vi.clearAllMocks();
    (useToast as any).mockReturnValue({
      showSuccess: mockShowSuccess,
      showError: mockShowError,
    });
  });

  it('should initialize with empty state', async () => {
    (favoriteApi.getFavorites as any).mockResolvedValue({ favorites: [], count: 0 });

    const { result } = renderHook(() => useFavorites());

    await waitFor(() => {
      expect(result.current.isLoading).toBe(false);
    });

    expect(result.current.favorites).toEqual([]);
    expect(result.current.favoriteIds).toEqual(new Set());
    expect(result.current.error).toBeNull();
  });

  it('should fetch favorites on mount', async () => {
    const mockFavorites: Movie[] = [
      {
        imdbID: 'tt0372784',
        title: 'Batman Begins',
        year: '2005',
        poster: 'https://example.com/poster.jpg',
        type: 'movie',
      },
    ];

    (favoriteApi.getFavorites as any).mockResolvedValue({
      favorites: mockFavorites,
      count: 1,
    });

    const { result } = renderHook(() => useFavorites());

    await waitFor(() => {
      expect(result.current.favorites).toEqual(mockFavorites);
      expect(result.current.favoriteIds).toEqual(new Set(['tt0372784']));
    });
  });

  it('should handle fetch favorites error', async () => {
    const error = new Error('Failed to fetch favorites');
    (favoriteApi.getFavorites as any).mockRejectedValue(error);

    const { result } = renderHook(() => useFavorites());

    await waitFor(() => {
      expect(result.current.error).toEqual(error);
    });
  });

  it('should toggle favorite successfully', async () => {
    const mockMovie: Movie = {
      imdbID: 'tt0372784',
      title: 'Batman Begins',
      year: '2005',
      poster: 'https://example.com/poster.jpg',
      type: 'movie',
    };

    (favoriteApi.getFavorites as any).mockResolvedValue({ favorites: [], count: 0 });
    (favoriteApi.toggleFavorite as any).mockResolvedValue({
      isFavorited: true,
      message: 'Added to favorites',
    });

    const { result } = renderHook(() => useFavorites());
    await act(async () => {
      await result.current.toggleFavorite(mockMovie);
    });

    expect(favoriteApi.toggleFavorite).toHaveBeenCalledWith(mockMovie);
  });

  it('should handle toggle favorite error', async () => {
    const mockMovie: Movie = {
      imdbID: 'tt0372784',
      title: 'Batman Begins',
      year: '2005',
      poster: 'https://example.com/poster.jpg',
      type: 'movie',
    };

    const error = new Error('Toggle favorite failed');
    (favoriteApi.getFavorites as any).mockResolvedValue({ favorites: [], count: 0 });
    (favoriteApi.toggleFavorite as any).mockRejectedValue(error);

    const { result } = renderHook(() => useFavorites());
    await waitFor(() => {
      expect(result.current.isLoading).toBe(false);
    });
    await act(async () => {
      await result.current.toggleFavorite(mockMovie);
    });
    await waitFor(() => {
      expect(result.current.error).toEqual(error);
    });
  });

  it('should check if movie is favorite', async () => {
    const mockFavorites: Movie[] = [
      {
        imdbID: 'tt0372784',
        title: 'Batman Begins',
        year: '2005',
        poster: 'https://example.com/poster.jpg',
        type: 'movie',
      },
    ];

    (favoriteApi.getFavorites as any).mockResolvedValue({
      favorites: mockFavorites,
      count: 1,
    });

    const { result } = renderHook(() => useFavorites());

    await waitFor(() => {
      expect(result.current.favorites).toEqual(mockFavorites);
    });

    expect(result.current.isFavorite('tt0372784')).toBe(true);
    expect(result.current.isFavorite('tt1234567')).toBe(false);
  });

  it('should remove all favorites successfully', async () => {
    (favoriteApi.getFavorites as any).mockResolvedValue({ favorites: [], count: 0 });
    (favoriteApi.removeAllFavorites as any).mockResolvedValue(undefined);

    const { result } = renderHook(() => useFavorites());
    await act(async () => {
      await result.current.removeAllFavorites();
    });

    expect(favoriteApi.removeAllFavorites).toHaveBeenCalled();
  });

  it('should handle remove all favorites error', async () => {
    const error = new Error('Remove all favorites failed');
    (favoriteApi.getFavorites as any).mockResolvedValue({ favorites: [], count: 0 });
    (favoriteApi.removeAllFavorites as any).mockRejectedValue(error);

    const { result } = renderHook(() => useFavorites());
    
    await waitFor(() => {
      expect(result.current.isLoading).toBe(false);
    });

    await act(async () => {
      await result.current.removeAllFavorites();
    });

    expect(result.current.error).toEqual(error);
  });
});