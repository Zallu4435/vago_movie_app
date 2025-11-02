export const ApiRoutes = {
  BASE: '/api',
  HEALTH: '/health',
  MOVIES: '/movies',
  FAVORITES: '/favorites',
} as const;

export const MovieRoutes = {
  SEARCH: '/search',
} as const;

export const FavoriteRoutes = {
  ROOT: '/',
  TOGGLE: '/toggle',
  CHECK: '/check/:imdbID',
  ALL: '/all',
} as const;
