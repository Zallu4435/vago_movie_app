import { describe, it, expect } from 'vitest';
import { formatYear, getPosterUrl } from '../helpers';

describe('helpers', () => {
  describe('formatYear', () => {
    it('should format year correctly', () => {
      expect(formatYear('2005')).toBe('2005');
      expect(formatYear('2023')).toBe('2023');
    });

    it('should handle invalid year strings', () => {
      expect(formatYear('invalid')).toBe('invalid');
      expect(formatYear('')).toBe('Unknown');
    });

    it('should handle null and undefined', () => {
      expect(formatYear(null as any)).toBe('Unknown');
      expect(formatYear(undefined as any)).toBe('Unknown');
    });

    it('should handle N/A values', () => {
      expect(formatYear('N/A')).toBe('Unknown');
    });
  });

  describe('getPosterUrl', () => {
    it('should return placeholder for empty poster', () => {
      expect(getPosterUrl('')).toBe('/placeholder-movie.png');
      expect(getPosterUrl('N/A')).toBe('/placeholder-movie.png');
    });

    it('should return placeholder for null/undefined', () => {
      expect(getPosterUrl(null as any)).toBe('/placeholder-movie.png');
      expect(getPosterUrl(undefined as any)).toBe('/placeholder-movie.png');
    });

    it('should return valid Amazon URLs', () => {
      const amazonUrl = 'https://m.media-amazon.com/images/M/MV5BMTk4ODQzNDYzMl5BMl5BanBnXkFtZTcwODA0NTM4Nw@@._V1_SX300.jpg';
      expect(getPosterUrl(amazonUrl)).toBe(amazonUrl);
    });

    it('should return valid image URLs', () => {
      const imageUrl = 'https://example.com/poster.jpg';
      expect(getPosterUrl(imageUrl)).toBe(imageUrl);
    });

    it('should return placeholder for invalid URLs', () => {
      const invalidUrl = 'https://example.com/invalid.txt';
      expect(getPosterUrl(invalidUrl)).toBe('/placeholder-movie.png');
    });
  });
});
