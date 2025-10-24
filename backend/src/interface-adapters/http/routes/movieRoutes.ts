import { Router } from 'express';
import { MovieController } from '../controllers/MovieController';
import { validateQuery } from '../middleware/validationMiddleware';
import { searchMoviesSchema } from '../../../../application/validators/movie.validators';

export const createMovieRouter = (
  movieController: MovieController
): Router => {
  const router = Router();

  router.get(
    '/search',
    validateQuery(searchMoviesSchema),
    movieController.searchMovies
  );

  return router;
};
