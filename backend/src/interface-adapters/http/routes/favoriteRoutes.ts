import { Router } from 'express';
import { FavoriteController } from '../controllers/FavoriteController';
import { validateBody, validateParams } from '../middleware/validationMiddleware';
import { toggleFavoriteSchema, imdbIdParamSchema } from '@application/validators/favorite.validators';
import { FavoriteRoutes } from '../../../shared/constants/routes';

export const createFavoriteRouter = (
  favoriteController: FavoriteController
): Router => {
  const router = Router();

  router.get(FavoriteRoutes.ROOT, favoriteController.getFavorites);

  router.post(
    FavoriteRoutes.TOGGLE,
    validateBody(toggleFavoriteSchema),
    favoriteController.toggleFavorite
  );

  router.get(
    FavoriteRoutes.CHECK,
    validateParams(imdbIdParamSchema),
    favoriteController.checkIsFavorite
  );

  router.delete(FavoriteRoutes.ALL, favoriteController.removeAllFavorites);

  return router;
};
