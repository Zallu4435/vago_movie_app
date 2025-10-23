export const API_BASE_URL = import.meta.env.VITE_API_BASE_URL || 'http://localhost:5000/api';

export const SEARCH_DEBOUNCE_DELAY = Number(import.meta.env.VITE_SEARCH_DEBOUNCE_DELAY) || 1000;

export const MESSAGES = {
  SEARCH_EMPTY: 'Search for your favorite movies',
  SEARCH_NO_RESULTS: 'No movies found. Try a different search term.',
  FAVORITES_EMPTY: 'No favorites yet. Start adding movies!',
  ADDED_TO_FAVORITES: 'Added to favorites',
  REMOVED_FROM_FAVORITES: 'Removed from favorites',
  LOADING: 'Loading...',
  ERROR_OCCURRED: 'An error occurred. Please try again.',
};
