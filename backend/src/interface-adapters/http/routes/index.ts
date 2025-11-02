import { Router } from 'express';
import { MovieController } from '../controllers/MovieController';
import { FavoriteController } from '../controllers/FavoriteController';
import { createMovieRouter } from './movieRoutes';
import { createFavoriteRouter } from './favoriteRoutes';
import { HttpStatus } from '../../../shared/constants/httpStatus';
import { ResponseStatus } from '../../../shared/constants/responseStatus';
import { ApiRoutes } from '../../../shared/constants/routes';

export const createRoutes = (
  movieController: MovieController,
  favoriteController: FavoriteController
): Router => {
  const router = Router();

  router.use(ApiRoutes.MOVIES, createMovieRouter(movieController));
  router.use(ApiRoutes.FAVORITES, createFavoriteRouter(favoriteController));

  router.get(ApiRoutes.HEALTH, (req, res) => {
    res.status(HttpStatus.OK).json({
      status: ResponseStatus.SUCCESS,
      message: 'Server is healthy',
      timestamp: new Date().toISOString(),
    });
  });

  return router;
};
