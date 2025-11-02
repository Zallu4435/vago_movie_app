import { InMemoryFavoriteRepository } from '../adapters/repositories/InMemoryFavoriteRepository';
import { IFavoriteRepository } from '../../application/ports/repositories/IFavoriteRepository';

import { OMDBMovieAPI } from '../adapters/external-apis/OMDBMovieAPI';
import { IExternalMovieAPI } from '../../application/ports/services/IExternalMovieAPI';

import { SessionCleanupService } from '../adapters/services/SessionCleanupService';
import { ISessionCleanupService } from '../../application/ports/services/ISessionCleanupService';
import { SessionConfig } from '../../shared/constants/sessionConfig';

import { SearchMoviesUseCase } from '../../application/use-cases/movies/SearchMovies.usecase';
import { ISearchMoviesUseCase } from '../../application/ports/use-cases/movies/ISearchMoviesUseCase';

import { ToggleFavoriteUseCase } from '../../application/use-cases/favorites/ToggleFavorite.usecase';
import { IToggleFavoriteUseCase } from '../../application/ports/use-cases/favorites/IToggleFavoriteUseCase';
import { GetUserFavoritesUseCase } from '../../application/use-cases/favorites/GetUserFavorites.usecase';
import { IGetUserFavoritesUseCase } from '../../application/ports/use-cases/favorites/IGetUserFavoritesUseCase';
import { CheckIsFavoriteUseCase } from '../../application/use-cases/favorites/CheckIsFavorite.usecase';
import { ICheckIsFavoriteUseCase } from '../../application/ports/use-cases/favorites/ICheckIsFavoriteUseCase';
import { RemoveAllFavoritesUseCase } from '../../application/use-cases/favorites/RemoveAllFavorites.usecase';
import { IRemoveAllFavoritesUseCase } from '../../application/ports/use-cases/favorites/IRemoveAllFavoritesUseCase';

import { MovieController } from '../../interface-adapters/http/controllers/MovieController';
import { FavoriteController } from '../../interface-adapters/http/controllers/FavoriteController';

import { omdbConfig } from '../config/omdb.config';

export class Container {
  private static favoriteRepository: IFavoriteRepository = new InMemoryFavoriteRepository();

  private static movieAPI: IExternalMovieAPI = new OMDBMovieAPI(omdbConfig.apiKey, omdbConfig.baseURL);

  public static sessionCleanupService: ISessionCleanupService = new SessionCleanupService(
    Container.favoriteRepository,
    SessionConfig.CLEANUP_INTERVAL_MINUTES
  );

  private static searchMoviesUseCase: ISearchMoviesUseCase = new SearchMoviesUseCase(
    Container.movieAPI
  );

  private static toggleFavoriteUseCase: IToggleFavoriteUseCase = new ToggleFavoriteUseCase(
    Container.favoriteRepository
  );

  private static getUserFavoritesUseCase: IGetUserFavoritesUseCase = new GetUserFavoritesUseCase(
    Container.favoriteRepository
  );

  private static checkIsFavoriteUseCase: ICheckIsFavoriteUseCase = new CheckIsFavoriteUseCase(
    Container.favoriteRepository
  );

  private static removeAllFavoritesUseCase: IRemoveAllFavoritesUseCase = new RemoveAllFavoritesUseCase(
    Container.favoriteRepository
  );

  public static movieController = new MovieController(
    Container.searchMoviesUseCase
  );

  public static favoriteController = new FavoriteController(
    Container.toggleFavoriteUseCase,
    Container.getUserFavoritesUseCase,
    Container.checkIsFavoriteUseCase,
    Container.removeAllFavoritesUseCase
  );
}
