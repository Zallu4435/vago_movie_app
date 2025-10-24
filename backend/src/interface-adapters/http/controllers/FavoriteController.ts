import { Request, Response } from 'express';
import { IToggleFavoriteUseCase } from '@application/ports/use-cases/favorites/IToggleFavoriteUseCase';
import { IGetUserFavoritesUseCase } from '@application/ports/use-cases/favorites/IGetUserFavoritesUseCase';
import { ICheckIsFavoriteUseCase } from '@application/ports/use-cases/favorites/ICheckIsFavoriteUseCase';
import { IRemoveAllFavoritesUseCase } from '@application/ports/use-cases/favorites/IRemoveAllFavoritesUseCase';
import { ToggleFavoriteDto } from '@application/dto/favorites/ToggleFavoriteDto';
import { asyncHandler } from '../middleware/asyncHandler';

export class FavoriteController {
  constructor(
    private readonly toggleFavoriteUseCase: IToggleFavoriteUseCase,
    private readonly getUserFavoritesUseCase: IGetUserFavoritesUseCase,
    private readonly checkIsFavoriteUseCase: ICheckIsFavoriteUseCase,
    private readonly removeAllFavoritesUseCase: IRemoveAllFavoritesUseCase
  ) {}

  getFavorites = asyncHandler(async (req: Request, res: Response) => {
    const sessionId = req.session.id;

    const favorites = await this.getUserFavoritesUseCase.execute(sessionId);

    res.status(200).json({
      status: 'success',
      data: {
        favorites,
        count: favorites.length,
      },
    });
  });

  toggleFavorite = asyncHandler(async (req: Request, res: Response) => {
    const sessionId = req.session.id;

    const dto = new ToggleFavoriteDto(
      sessionId,
      req.body.imdbID,
      req.body.title,
      req.body.year,
      req.body.poster,
      req.body.type
    );

    const result = await this.toggleFavoriteUseCase.execute(dto);

    res.status(200).json({
      status: 'success',
      message: result.message,
      data: {
        isFavorited: result.isFavorited,
      },
    });
  });

  checkIsFavorite = asyncHandler(async (req: Request, res: Response) => {
    const sessionId = req.session.id;
    const { imdbID } = req.params;

    const isFavorited = await this.checkIsFavoriteUseCase.execute(sessionId, imdbID);

    res.status(200).json({
      status: 'success',
      data: {
        isFavorited,
      },
    });
  });

  removeAllFavorites = asyncHandler(async (req: Request, res: Response) => {
    const sessionId = req.session.id;

    await this.removeAllFavoritesUseCase.execute(sessionId);

    res.status(200).json({
      status: 'success',
      message: 'All favorites removed successfully',
    });
  });
}
