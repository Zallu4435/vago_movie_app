import dotenv from 'dotenv';

dotenv.config();

export const omdbConfig = {
  apiKey: process.env.OMDB_API_KEY || '',
  baseURL: process.env.OMDB_BASE_URL || 'http://www.omdbapi.com/',
};

if (!process.env.OMDB_API_KEY) {
  throw new Error('OMDB_API_KEY is required in environment variables');
}
