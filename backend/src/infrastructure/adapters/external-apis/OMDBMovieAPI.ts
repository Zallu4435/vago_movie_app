import axios, { AxiosInstance } from 'axios';
import {
  IExternalMovieAPI,
  MovieSearchResult,
} from '../../../application/ports/services/IExternalMovieAPI';

export class OMDBMovieAPI implements IExternalMovieAPI {
  private client: AxiosInstance;
  private apiKey: string;
  private baseURL: string;

  constructor(apiKey: string, baseURL: string = 'http://www.omdbapi.com/') {
    this.apiKey = apiKey;
    this.baseURL = baseURL;
    this.client = axios.create({
      baseURL: this.baseURL,
      timeout: 10000,
    });
  }

  async searchMovies(query: string, page: number = 1): Promise<MovieSearchResult> {
    try {
      const response = await this.client.get('', {
        params: {
          apikey: this.apiKey,
          s: query,
          page: page,
        },
      });

      return response.data;
    } catch (error) {
      if (axios.isAxiosError(error)) {
        throw new Error(`OMDB API Error: ${error.message}`);
      }
      throw error;
    }
  }

  async getMovieDetails(imdbId: string): Promise<any> {
    try {
      const response = await this.client.get('', {
        params: {
          apikey: this.apiKey,
          i: imdbId,
          plot: 'full',
        },
      });

      if (response.data.Response === 'False') {
        throw new Error(response.data.Error || 'Movie not found');
      }

      return response.data;
    } catch (error) {
      if (axios.isAxiosError(error)) {
        throw new Error(`OMDB API Error: ${error.message}`);
      }
      throw error;
    }
  }
}
