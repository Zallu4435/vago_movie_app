import { ImdbId } from '../ImdbId.vo';
import { InvalidImdbIdError } from '../../errors/InvalidImdbIdError';

describe('ImdbId Value Object', () => {
  describe('constructor', () => {
    it('should create ImdbId with valid format', () => {
      const validImdbId = 'tt0372784';

      const imdbId = new ImdbId(validImdbId);

      expect(imdbId.getValue()).toBe(validImdbId);
    });

    it('should create ImdbId with different valid formats', () => {
      const imdbId1 = new ImdbId('tt1234567');
      const imdbId2 = new ImdbId('tt9999999');
      const imdbId3 = new ImdbId('tt0000001');

      expect(imdbId1.getValue()).toBe('tt1234567');
      expect(imdbId2.getValue()).toBe('tt9999999');
      expect(imdbId3.getValue()).toBe('tt0000001');
    });

    it('should throw error for invalid format - missing tt prefix', () => {
      const invalidImdbId = '0372784';

      expect(() => new ImdbId(invalidImdbId)).toThrow(InvalidImdbIdError);
    });

    it('should throw error for invalid format - wrong length', () => {
      const invalidImdbId = 'tt037278';

      expect(() => new ImdbId(invalidImdbId)).toThrow(InvalidImdbIdError);
    });

    it('should throw error for invalid format - non-numeric characters', () => {
      const invalidImdbId = 'tt037278a';

      expect(() => new ImdbId(invalidImdbId)).toThrow(InvalidImdbIdError);
    });

    it('should throw error for empty string', () => {
      const invalidImdbId = '';

      expect(() => new ImdbId(invalidImdbId)).toThrow(InvalidImdbIdError);
    });

    it('should throw error for null or undefined', () => {
      expect(() => new ImdbId(null as any)).toThrow();
      expect(() => new ImdbId(undefined as any)).toThrow();
    });
  });

  describe('equality', () => {
    it('should be equal when values are the same', () => {
      const imdbId1 = new ImdbId('tt0372784');
      const imdbId2 = new ImdbId('tt0372784');

      expect(imdbId1.equals(imdbId2)).toBe(true);
    });

    it('should not be equal when values are different', () => {
      const imdbId1 = new ImdbId('tt0372784');
      const imdbId2 = new ImdbId('tt0468569');

      expect(imdbId1.equals(imdbId2)).toBe(false);
    });

    it('should not be equal to null or undefined', () => {
      const imdbId = new ImdbId('tt0372784');

      expect(() => imdbId.equals(null as any)).toThrow();
      expect(() => imdbId.equals(undefined as any)).toThrow();
    });
  });

  describe('toString', () => {
    it('should return the string value', () => {
      const imdbId = new ImdbId('tt0372784');

      const result = imdbId.toString();

      expect(result).toBe('tt0372784');
    });
  });
});
