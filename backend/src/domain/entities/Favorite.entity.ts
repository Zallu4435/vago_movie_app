export class Favorite {
    constructor(
      public readonly id: string,
      public readonly userId: string,
      public readonly imdbID: string,
      public movieTitle: string,
      public movieYear: string,
      public moviePoster: string,
      public movieType: string,
      public readonly addedAt: Date = new Date()
    ) {}
  
    belongsToUser(userId: string): boolean {
      return this.userId === userId;
    }
  
    isForMovie(imdbID: string): boolean {
      return this.imdbID === imdbID;
    }
  }
  