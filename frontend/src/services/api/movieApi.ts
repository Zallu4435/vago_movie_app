import axiosInstance, { makeRequest } from './axiosInstance';
import { SearchResult } from '@/types/movie.types';

export const movieApi = {
  searchMovies: async (query: string, page: number = 1): Promise<SearchResult> => {
    return makeRequest(async () => {
      const response = await axiosInstance.get('/movies/search', {
        params: { q: query, page },
      });
      return response.data.data;
    });
  },
};
