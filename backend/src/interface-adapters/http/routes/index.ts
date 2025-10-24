import { Router } from 'express';
import { MovieController } from '../controllers/MovieController';
import { FavoriteController } from '../controllers/FavoriteController';
import { createMovieRouter } from './movieRoutes';
import { createFavoriteRouter } from './favoriteRoutes';

export const createRoutes = (
  movieController: MovieController,
  favoriteController: FavoriteController
): Router => {
  const router = Router();

  router.use('/movies', createMovieRouter(movieController));
  router.use('/favorites', createFavoriteRouter(favoriteController));

  router.get('/health', (req, res) => {
    res.status(200).json({
      status: 'success',
      message: 'Server is healthy',
      timestamp: new Date().toISOString(),
    });
  });

  return router;
};
