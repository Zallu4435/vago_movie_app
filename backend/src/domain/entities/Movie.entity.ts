export class Movie {
    constructor(
      public readonly imdbID: string,
      public title: string,
      public year: string,
      public poster: string,
      public type: string,
      public plot?: string,
      public rating?: string
    ) {}
  
    hasValidPoster(): boolean {
      return this.poster !== 'N/A' && this.poster.startsWith('http');
    }
  
    getDisplayYear(): string {
      return this.year === 'N/A' ? 'Unknown' : this.year;
    }
  }
  