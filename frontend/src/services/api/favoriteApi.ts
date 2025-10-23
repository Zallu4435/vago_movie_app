import axiosInstance, { makeRequest } from './axiosInstance';
import { Favorite } from '@/types/movie.types';

interface ToggleFavoriteDto {
  imdbID: string;
  title: string;
  year: string;
  poster: string;
  type: string;
}

export const favoriteApi = {
  getFavorites: async (): Promise<{ favorites: Favorite[]; count: number }> => {
    return makeRequest(async () => {
      const response = await axiosInstance.get('/favorites');
      return response.data.data;
    });
  },

  toggleFavorite: async (movie: ToggleFavoriteDto): Promise<{ isFavorited: boolean; message: string }> => {
    return makeRequest(async () => {
      const response = await axiosInstance.post('/favorites/toggle', movie);

      return {
        isFavorited: response.data.data.isFavorited,
        message: response.data.message
      };
    });
  },

  checkIsFavorite: async (imdbID: string): Promise<boolean> => {
    return makeRequest(async () => {
      const response = await axiosInstance.get(`/favorites/check/${imdbID}`);
      return response.data.data.isFavorited;
    });
  },

  removeAllFavorites: async (): Promise<void> => {
    return makeRequest(async () => {
      await axiosInstance.delete('/favorites/all');
    });
  },
};
