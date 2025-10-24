import { Router } from 'express';
import { FavoriteController } from '../controllers/FavoriteController';
import { validateBody, validateParams } from '../middleware/validationMiddleware';
import { toggleFavoriteSchema, imdbIdParamSchema } from '../../../../application/validators/favorite.validators';

export const createFavoriteRouter = (
  favoriteController: FavoriteController
): Router => {
  const router = Router();

  router.get('/', favoriteController.getFavorites);

  router.post(
    '/toggle',
    validateBody(toggleFavoriteSchema),
    favoriteController.toggleFavorite
  );

  router.get(
    '/check/:imdbID',
    validateParams(imdbIdParamSchema),
    favoriteController.checkIsFavorite
  );

  router.delete('/all', favoriteController.removeAllFavorites);

  return router;
};
