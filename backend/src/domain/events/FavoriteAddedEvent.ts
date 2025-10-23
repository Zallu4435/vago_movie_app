export class FavoriteAddedEvent {
    constructor(
      public readonly userId: string,
      public readonly imdbID: string,
      public readonly movieTitle: string,
      public readonly occurredAt: Date = new Date()
    ) {}
  }
  