export const TYPES = {
    // Repositories
    UserRepository: Symbol.for('UserRepository'),
    FavoriteRepository: Symbol.for('FavoriteRepository'),
    
    // Services
    PasswordHasher: Symbol.for('PasswordHasher'),
    TokenGenerator: Symbol.for('TokenGenerator'),
    ExternalMovieAPI: Symbol.for('ExternalMovieAPI'),
    
    // Use Cases
    RegisterUserUseCase: Symbol.for('RegisterUserUseCase'),
    LoginUserUseCase: Symbol.for('LoginUserUseCase'),
    LogoutUserUseCase: Symbol.for('LogoutUserUseCase'),
    RefreshTokenUseCase: Symbol.for('RefreshTokenUseCase'),
    SearchMoviesUseCase: Symbol.for('SearchMoviesUseCase'),
    ToggleFavoriteUseCase: Symbol.for('ToggleFavoriteUseCase'),
    GetUserFavoritesUseCase: Symbol.for('GetUserFavoritesUseCase'),
    
    // Controllers
    AuthController: Symbol.for('AuthController'),
    MovieController: Symbol.for('MovieController'),
    FavoriteController: Symbol.for('FavoriteController'),
    UserController: Symbol.for('UserController'),
    
    // Middleware
    AuthMiddleware: Symbol.for('AuthMiddleware'),
  };
  