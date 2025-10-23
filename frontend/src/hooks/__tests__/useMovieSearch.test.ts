import { renderHook, act } from '@testing-library/react';
import { describe, it, expect, vi, beforeEach } from 'vitest';
import { useMovieSearch } from '../useMovieSearch';
import { movieApi } from '@/services/api/movieApi';

vi.mock('@/services/api/movieApi', () => ({
  movieApi: {
    searchMovies: vi.fn(),
  },
}));

describe('useMovieSearch', () => {
  beforeEach(() => {
    vi.clearAllMocks();
  });

  it('should initialize with empty state', () => {
    const { result } = renderHook(() => useMovieSearch());

    expect(result.current.movies).toEqual([]);
    expect(result.current.totalResults).toBe(0);
    expect(result.current.currentPage).toBe(1);
    expect(result.current.isLoading).toBe(false);
    expect(result.current.error).toBeNull();
  });

  it('should search movies successfully', async () => {
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

    (movieApi.searchMovies as any).mockResolvedValue(mockSearchResult);

    const { result } = renderHook(() => useMovieSearch());

    await act(async () => {
      await result.current.searchMovies('batman');
    });

    expect(result.current.movies).toEqual(mockSearchResult.movies);
    expect(result.current.totalResults).toBe(1);
    expect(result.current.currentPage).toBe(1);
    expect(result.current.isLoading).toBe(false);
    expect(result.current.error).toBeNull();
    expect(movieApi.searchMovies).toHaveBeenCalledWith('batman', 1);
  });

  it('should handle search with different page', async () => {
    const mockSearchResult = {
      movies: [],
      totalResults: 0,
      page: 2,
    };

    (movieApi.searchMovies as any).mockResolvedValue(mockSearchResult);

    const { result } = renderHook(() => useMovieSearch());

    await act(async () => {
      await result.current.searchMovies('superman', 2);
    });

    expect(result.current.currentPage).toBe(2);
    expect(movieApi.searchMovies).toHaveBeenCalledWith('superman', 2);
  });

  it('should handle search error', async () => {
    const error = new Error('Search failed');
    (movieApi.searchMovies as any).mockRejectedValue(error);

    const { result } = renderHook(() => useMovieSearch());

    await act(async () => {
      await result.current.searchMovies('invalid');
    });

    expect(result.current.error).toBe('Search failed');
    expect(result.current.isLoading).toBe(false);
  });

  it('should set loading state during search', async () => {
    let resolvePromise: (value: any) => void;
    const promise = new Promise((resolve) => {
      resolvePromise = resolve;
    });
    (movieApi.searchMovies as any).mockReturnValue(promise);

    const { result } = renderHook(() => useMovieSearch());

    act(() => {
      result.current.searchMovies('batman');
    });

    expect(result.current.isLoading).toBe(true);

    await act(async () => {
      resolvePromise!({
        movies: [],
        totalResults: 0,
        page: 1,
      });
    });

    expect(result.current.isLoading).toBe(false);
  });

  it('should clear previous results on new search', async () => {
    const firstSearchResult = {
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

    const secondSearchResult = {
      movies: [
        {
          imdbID: 'tt0468569',
          title: 'The Dark Knight',
          year: '2008',
          poster: 'https://example.com/poster2.jpg',
          type: 'movie',
        },
      ],
      totalResults: 1,
      page: 1,
    };

    (movieApi.searchMovies as any)
      .mockResolvedValueOnce(firstSearchResult)
      .mockResolvedValueOnce(secondSearchResult);

    const { result } = renderHook(() => useMovieSearch());

    await act(async () => {
      await result.current.searchMovies('batman');
    });

    expect(result.current.movies).toEqual(firstSearchResult.movies);

    await act(async () => {
      await result.current.searchMovies('superman');
    });

    expect(result.current.movies).toEqual(secondSearchResult.movies);
    expect(result.current.totalResults).toBe(1);
  });

  it('should handle empty search results', async () => {
    const emptyResult = {
      movies: [],
      totalResults: 0,
      page: 1,
    };

    (movieApi.searchMovies as any).mockResolvedValue(emptyResult);

    const { result } = renderHook(() => useMovieSearch());

    await act(async () => {
      await result.current.searchMovies('nonexistent');
    });

    expect(result.current.movies).toEqual([]);
    expect(result.current.totalResults).toBe(0);
    expect(result.current.error).toBeNull();
  });
});
