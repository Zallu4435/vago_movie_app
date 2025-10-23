export interface IRemoveAllFavoritesUseCase {
  execute(sessionId: string): Promise<void>;
}
