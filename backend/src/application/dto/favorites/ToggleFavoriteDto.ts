export class ToggleFavoriteDto {
    constructor(
      public readonly userId: string,
      public readonly imdbID: string,
      public readonly title: string,
      public readonly year: string,
      public readonly poster: string,
      public readonly type: string
    ) {}
  }
  