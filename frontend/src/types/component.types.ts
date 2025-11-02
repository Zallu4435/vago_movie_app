import { ReactNode } from 'react';
import { Movie } from './movie.types';

// Common Component Props
export interface EmptyStateProps {
  icon?: string;
  title: string;
  message: string;
}

export interface ErrorMessageProps {
  message: string;
  onRetry?: () => void;
}

export interface LoadingSpinnerProps {
  size?: 'sm' | 'md' | 'lg';
}

export interface MoviePosterProps {
  poster: string;
  title: string;
  className?: string;
}

export interface PaginationProps {
  currentPage: number;
  totalResults: number;
  resultsPerPage?: number;
  onPageChange: (page: number) => void;
}

// Layout Component Props
export interface LayoutProps {
  children: ReactNode;
}

export interface ErrorBoundaryProps {
  children: ReactNode;
  fallback?: ReactNode;
}

// Movie Component Props
export interface MovieCardProps {
  movie: Movie;
}

export interface MovieListProps {
  movies: Movie[];
}

export interface SearchBarProps {
  onSearch: (query: string) => void;
  isLoading?: boolean;
  initialValue?: string;
}

export interface FavoriteButtonProps {
  movie: Movie;
}
