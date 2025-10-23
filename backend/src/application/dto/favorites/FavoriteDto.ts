export class FavoriteDto {
    constructor(
      public readonly id: string,
      public readonly imdbID: string,
      public readonly title: string,
      public readonly year: string,
      public readonly poster: string,
      public readonly type: string,
      public readonly addedAt: Date
    ) {}
  }
  