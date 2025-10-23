import { Movie } from '../Movie.entity';

describe('Movie Entity', () => {
  describe('constructor', () => {
    it('should create a movie with valid data', () => {
      const imdbID = 'tt0372784';
      const title = 'Batman Begins';
      const year = '2005';
      const poster = 'https://example.com/poster.jpg';
      const type = 'movie';

      const movie = new Movie(imdbID, title, year, poster, type);

      expect(movie.imdbID).toBe(imdbID);
      expect(movie.title).toBe(title);
      expect(movie.year).toBe(year);
      expect(movie.poster).toBe(poster);
      expect(movie.type).toBe(type);
    });

    it('should handle empty poster URL', () => {
      const imdbID = 'tt0372784';
      const title = 'Batman Begins';
      const year = '2005';
      const poster = '';
      const type = 'movie';

      const movie = new Movie(imdbID, title, year, poster, type);

      expect(movie.poster).toBe('');
    });

    it('should handle different movie types', () => {
      const imdbID = 'tt0372784';
      const title = 'Batman Begins';
      const year = '2005';
      const poster = 'https://example.com/poster.jpg';
      const type = 'series';

      const movie = new Movie(imdbID, title, year, poster, type);

      expect(movie.type).toBe('series');
    });
  });

  describe('methods', () => {
    it('should check if poster is valid', () => {
      const movieWithValidPoster = new Movie('tt0372784', 'Batman Begins', '2005', 'https://example.com/poster.jpg', 'movie');
      const movieWithInvalidPoster = new Movie('tt0372784', 'Batman Begins', '2005', 'N/A', 'movie');

      expect(movieWithValidPoster.hasValidPoster()).toBe(true);
      expect(movieWithInvalidPoster.hasValidPoster()).toBe(false);
    });

    it('should get display year', () => {
      const movieWithYear = new Movie('tt0372784', 'Batman Begins', '2005', 'https://example.com/poster.jpg', 'movie');
      const movieWithoutYear = new Movie('tt0372784', 'Batman Begins', 'N/A', 'https://example.com/poster.jpg', 'movie');

      expect(movieWithYear.getDisplayYear()).toBe('2005');
      expect(movieWithoutYear.getDisplayYear()).toBe('Unknown');
    });
  });
});
