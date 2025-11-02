import { MovieCard } from '../MovieCard/MovieCard';
import { MovieListProps } from '@/types/component.types';

export const MovieList = ({ movies }: MovieListProps) => {
  return (
    <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-3 sm:gap-4 md:gap-6">
      {movies.map((movie) => (
        <MovieCard key={movie.imdbID} movie={movie} />
      ))}
    </div>
  );
};
