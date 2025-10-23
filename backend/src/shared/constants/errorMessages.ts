export const ErrorMessages = {
    // Auth
    INVALID_CREDENTIALS: 'Invalid email or password',
    UNAUTHORIZED: 'You are not authorized to perform this action',
    TOKEN_EXPIRED: 'Your session has expired. Please login again',
    INVALID_TOKEN: 'Invalid token provided',
    
    // User
    USER_NOT_FOUND: 'User not found',
    USER_ALREADY_EXISTS: 'User with this email already exists',
    
    // Validation
    VALIDATION_ERROR: 'Validation failed',
    INVALID_EMAIL: 'Invalid email format',
    INVALID_PASSWORD: 'Password does not meet requirements',
    
    // Favorites
    FAVORITE_NOT_FOUND: 'Favorite not found',
    DUPLICATE_FAVORITE: 'Movie is already in favorites',
    
    // Movies
    MOVIE_NOT_FOUND: 'Movie not found',
    SEARCH_FAILED: 'Movie search failed',
    
    // General
    INTERNAL_SERVER_ERROR: 'An unexpected error occurred',
    NOT_FOUND: 'Resource not found',
    BAD_REQUEST: 'Bad request',
  } as const;
  