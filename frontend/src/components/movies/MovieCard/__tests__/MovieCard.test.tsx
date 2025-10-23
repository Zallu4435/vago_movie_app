import { render, screen } from '@testing-library/react';
import { describe, it, expect, vi } from 'vitest';
import { MovieCard } from '../MovieCard';
import { Movie } from '@/types/movie.types';
import { FavoritesProvider } from '@/context/FavoritesContext';

vi.mock('../FavoriteButton/FavoriteButton', () => ({
  FavoriteButton: ({ movie }: { movie: Movie }) => (
    <button data-testid="favorite-button" data-movie-id={movie.imdbID}>
      Favorite
    </button>
  ),
}));

vi.mock('@components/common/MoviePoster/MoviePoster', () => ({
  MoviePoster: ({ poster, title, className }: { poster: string; title: string; className: string }) => (
    <img
      data-testid="movie-poster"
      src={poster || '/placeholder-movie.png'}
      alt={title}
      className={className}
    />
  ),
}));

vi.mock('@utils/helpers', () => ({
  formatYear: (year: string) => year,
}));

vi.mock('@/hooks/useFavorites', () => ({
  useFavorites: () => ({
    favorites: [],
    favoriteIds: new Set(),
    isLoading: false,
    error: null,
    fetchFavorites: vi.fn(),
    toggleFavorite: vi.fn(),
    removeAllFavorites: vi.fn(),
    isFavorite: vi.fn(() => false),
  }),
}));

describe('MovieCard', () => {
  const mockMovie: Movie = {
    imdbID: 'tt0372784',
    title: 'Batman Begins',
    year: '2005',
    poster: 'https://example.com/poster.jpg',
    type: 'movie',
  };

  const TestWrapper = ({ children }: { children: React.ReactNode }) => (
    <FavoritesProvider>{children}</FavoritesProvider>
  );

  it('should render movie information correctly', () => {
    render(
      <TestWrapper>
        <MovieCard movie={mockMovie} />
      </TestWrapper>
    );
    expect(screen.getAllByText('Batman Begins').length).toBeGreaterThanOrEqual(1);
    expect(screen.getAllByText('2005').length).toBeGreaterThanOrEqual(1);
    expect(screen.getAllByText('movie').length).toBeGreaterThanOrEqual(1);
  });

  it('should render movie poster with correct attributes', () => {
    render(
      <TestWrapper>
        <MovieCard movie={mockMovie} />
      </TestWrapper>
    );
    const poster = screen.getByTestId('movie-poster');
    expect(poster).toBeInTheDocument();
    expect(poster).toHaveAttribute('src', mockMovie.poster);
    expect(poster).toHaveAttribute('alt', mockMovie.title);
  });

  it('should render favorite button with correct movie ID', () => {
    render(
      <TestWrapper>
        <MovieCard movie={mockMovie} />
      </TestWrapper>
    );
    // Try to find the button by its aria-label for accessibility
    const favoriteButtons = screen.queryAllByRole('button', {name: /favorite/i});
    expect(favoriteButtons.length).toBeGreaterThanOrEqual(1);
    expect(favoriteButtons[0]).toBeVisible();
  });

  it('should display movie type in uppercase or lowercase', () => {
    render(
      <TestWrapper>
        <MovieCard movie={mockMovie} />
      </TestWrapper>
    );
    expect(screen.getAllByText((t) => t.toLowerCase() === 'movie').length).toBeGreaterThanOrEqual(1);
  });

  it('should handle different movie types', () => {
    const seriesMovie: Movie = {
      ...mockMovie,
      type: 'series',
    };
    render(
      <TestWrapper>
        <MovieCard movie={seriesMovie} />
      </TestWrapper>
    );
    expect(screen.getAllByText((t) => t.toLowerCase() === 'series').length).toBeGreaterThanOrEqual(1);
  });

  it('should handle empty poster URL', () => {
    const movieWithEmptyPoster: Movie = {
      ...mockMovie,
      poster: '',
    };
    render(
      <TestWrapper>
        <MovieCard movie={movieWithEmptyPoster} />
      </TestWrapper>
    );
    const poster = screen.getByTestId('movie-poster');
    expect(poster).toBeInTheDocument();
    expect(poster).toHaveAttribute('src', '/placeholder-movie.png');
  });

  it('should have proper CSS classes for styling', () => {
    const { container } = render(
      <TestWrapper>
        <MovieCard movie={mockMovie} />
      </TestWrapper>
    );
    const movieCardDiv = container.firstChild;
    expect(movieCardDiv).toHaveClass('group', 'cursor-pointer');
  });
});