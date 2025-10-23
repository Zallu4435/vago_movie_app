export const ErrorCodes = {
    // Auth
    INVALID_CREDENTIALS: 'AUTH001',
    UNAUTHORIZED: 'AUTH002',
    TOKEN_EXPIRED: 'AUTH003',
    INVALID_TOKEN: 'AUTH004',
    
    // User
    USER_NOT_FOUND: 'USER001',
    DUPLICATE_USER: 'USER002',
    
    // Validation
    VALIDATION_ERROR: 'VAL001',
    INVALID_EMAIL: 'VAL002',
    INVALID_PASSWORD: 'VAL003',
    
    // Favorites
    FAVORITE_NOT_FOUND: 'FAV001',
    DUPLICATE_FAVORITE: 'FAV002',
    
    // Movies
    MOVIE_NOT_FOUND: 'MOV001',
    SEARCH_FAILED: 'MOV002',
    
    // General
    INTERNAL_SERVER_ERROR: 'GEN001',
    NOT_FOUND: 'GEN002',
    BAD_REQUEST: 'GEN003',
  } as const;
  