import { ToggleFavoriteUseCase } from '../ToggleFavorite.usecase';
import { IFavoriteRepository } from '../../../ports/repositories/IFavoriteRepository';
import { ToggleFavoriteDto } from '../../../dto/favorites/ToggleFavoriteDto';
import { Favorite } from '../../../../domain/entities/Favorite.entity';

describe('ToggleFavoriteUseCase', () => {
  let toggleFavoriteUseCase: ToggleFavoriteUseCase;
  let mockFavoriteRepository: jest.Mocked<IFavoriteRepository>;

  beforeEach(() => {
    mockFavoriteRepository = {
      findBySessionId: jest.fn(),
      findBySessionAndMovie: jest.fn(),
      save: jest.fn(),
      delete: jest.fn(),
      exists: jest.fn(),
      deleteAllBySessionId: jest.fn(),
    } as jest.Mocked<IFavoriteRepository>;

    toggleFavoriteUseCase = new ToggleFavoriteUseCase(mockFavoriteRepository);
  });

  afterEach(() => {
    jest.clearAllMocks();
  });

  describe('execute', () => {
    const mockToggleFavoriteDto = new ToggleFavoriteDto(
      'user-123',
      'tt0372784',
      'Batman Begins',
      '2005',
      'https://example.com/poster.jpg',
      'movie'
    );

    it('should add favorite when movie is not already favorited', async () => {
      // Arrange
      mockFavoriteRepository.findBySessionAndMovie.mockResolvedValue(null);
      mockFavoriteRepository.save.mockResolvedValue(undefined);

      // Act
      const result = await toggleFavoriteUseCase.execute(mockToggleFavoriteDto);

      // Assert
      expect(result.message).toBe('Added to favorites');
      expect(result.isFavorited).toBe(true);
      expect(mockFavoriteRepository.findBySessionAndMovie).toHaveBeenCalledWith(
        mockToggleFavoriteDto.userId,
        mockToggleFavoriteDto.imdbID
      );
      expect(mockFavoriteRepository.save).toHaveBeenCalledWith(
        expect.objectContaining({
          imdbID: mockToggleFavoriteDto.imdbID,
          movieTitle: mockToggleFavoriteDto.title,
          movieYear: mockToggleFavoriteDto.year,
          moviePoster: mockToggleFavoriteDto.poster,
          movieType: mockToggleFavoriteDto.type,
        })
      );
    });

    it('should remove favorite when movie is already favorited', async () => {
      const existingFavorite = new Favorite(
        'favorite-123',
        mockToggleFavoriteDto.userId,
        mockToggleFavoriteDto.imdbID,
        mockToggleFavoriteDto.title,
        mockToggleFavoriteDto.year,
        mockToggleFavoriteDto.poster,
        mockToggleFavoriteDto.type,
        new Date()
      );

      mockFavoriteRepository.findBySessionAndMovie.mockResolvedValue(existingFavorite);
      mockFavoriteRepository.delete.mockResolvedValue(true);

      const result = await toggleFavoriteUseCase.execute(mockToggleFavoriteDto);

      expect(result.message).toBe('Removed from favorites');
      expect(result.isFavorited).toBe(false);
      expect(mockFavoriteRepository.findBySessionAndMovie).toHaveBeenCalledWith(
        mockToggleFavoriteDto.userId,
        mockToggleFavoriteDto.imdbID
      );
      expect(mockFavoriteRepository.delete).toHaveBeenCalledWith(
        mockToggleFavoriteDto.userId,
        mockToggleFavoriteDto.imdbID
      );
    });

    it('should handle repository errors when adding favorite', async () => {
      mockFavoriteRepository.findBySessionAndMovie.mockResolvedValue(null);
      mockFavoriteRepository.save.mockRejectedValue(new Error('Database error'));

      await expect(toggleFavoriteUseCase.execute(mockToggleFavoriteDto)).rejects.toThrow('Database error');
    });

    it('should handle repository errors when removing favorite', async () => {
      const existingFavorite = new Favorite(
        'favorite-123',
        mockToggleFavoriteDto.userId,
        mockToggleFavoriteDto.imdbID,
        mockToggleFavoriteDto.title,
        mockToggleFavoriteDto.year,
        mockToggleFavoriteDto.poster,
        mockToggleFavoriteDto.type,
        new Date()
      );

      mockFavoriteRepository.findBySessionAndMovie.mockResolvedValue(existingFavorite);
      mockFavoriteRepository.delete.mockRejectedValue(new Error('Database error'));

      await expect(toggleFavoriteUseCase.execute(mockToggleFavoriteDto)).rejects.toThrow('Database error');
    });
  });
});
