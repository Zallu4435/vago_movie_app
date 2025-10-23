import { InvalidImdbIdError } from '../errors/InvalidImdbIdError';

export class ImdbId {
  private readonly value: string;

  constructor(imdbId: string) {
    this.value = this.validate(imdbId);
  }

  private validate(imdbId: string): string {
    const trimmed = imdbId.trim();
    
    const imdbRegex = /^tt\d{7,10}$/;

    if (!imdbRegex.test(trimmed)) {
      throw new InvalidImdbIdError(`Invalid IMDB ID format: ${imdbId}`);
    }

    return trimmed;
  }

  getValue(): string {
    return this.value;
  }

  equals(other: ImdbId): boolean {
    return this.value === other.value;
  }

  toString(): string {
    return this.value;
  }
}
