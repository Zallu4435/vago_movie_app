import { Request, Response } from 'express';
import { ISearchMoviesUseCase } from '@application/ports/use-cases/movies/ISearchMoviesUseCase';
import { asyncHandler } from '../middleware/asyncHandler';
import { HttpStatus } from '../../../shared/constants/httpStatus';
import { ResponseStatus } from '../../../shared/constants/responseStatus';

export class MovieController {
  constructor(private readonly searchMoviesUseCase: ISearchMoviesUseCase) {}

  searchMovies = asyncHandler(async (req: Request, res: Response) => {
    const { q, page } = req.query;
    
    const query = q as string;
    const pageNumber = page ? parseInt(page as string, 10) : 1;

    const result = await this.searchMoviesUseCase.execute(query, pageNumber);

    res.status(HttpStatus.OK).json({
      status: ResponseStatus.SUCCESS,
      data: result,
    });
  });
}
