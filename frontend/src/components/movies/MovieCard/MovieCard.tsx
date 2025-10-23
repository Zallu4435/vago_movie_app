import { Movie } from '@/types/movie.types';
import { formatYear } from '@utils/helpers';
import { FavoriteButton } from '../FavoriteButton/FavoriteButton';
import { MoviePoster } from '@components/common/MoviePoster/MoviePoster';

interface MovieCardProps {
  movie: Movie;
}

export const MovieCard = ({ movie }: MovieCardProps) => {
  return (
    <div className="group cursor-pointer">
      <div className="relative overflow-hidden rounded-lg shadow-md transition-all duration-300 group-hover:shadow-xl">
        {/* Movie Poster */}
        <div className="relative aspect-[2/3] bg-gray-200">
          <MoviePoster
            poster={movie.poster}
            title={movie.title}
            className="w-full h-full object-cover"
          />
          
          {/* Favorite Button */}
          <div className="absolute top-2 right-2 z-10">
            <FavoriteButton movie={movie} />
          </div>

          {/* Hover Overlay */}
          <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/40 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300">
            <div className="absolute bottom-0 left-0 right-0 p-4">
              <h3 className="font-semibold text-white text-sm mb-2 line-clamp-2">
                {movie.title}
              </h3>
              
              <div className="flex items-center gap-2 text-xs">
                <span className="px-2 py-1 bg-white/20 backdrop-blur-sm rounded text-white font-medium">
                  {formatYear(movie.year)}
                </span>
                <span className="px-2 py-1 bg-white/20 backdrop-blur-sm rounded text-white font-medium uppercase">
                  {movie.type}
                </span>
              </div>
            </div>
          </div>
        </div>

        {/* Bottom Info */}
        <div className="bg-white p-3">
          <h3 className="font-semibold text-gray-900 line-clamp-1 text-sm mb-1">
            {movie.title}
          </h3>
          <div className="flex items-center justify-between text-xs text-gray-600">
            <span>{formatYear(movie.year)}</span>
            <span className="px-2 py-1 bg-gray-100 rounded font-medium uppercase">
              {movie.type}
            </span>
          </div>
        </div>
      </div>
    </div>
  );
};
