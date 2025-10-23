export interface ICheckIsFavoriteUseCase {
  execute(sessionId: string, imdbID: string): Promise<boolean>;
}
