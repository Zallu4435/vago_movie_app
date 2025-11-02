import { useState } from 'react';
import { getPosterUrl } from '@utils/helpers';
import { Film } from 'lucide-react';
import { MoviePosterProps } from '@/types/component.types';

export const MoviePoster = ({ poster, title, className = '' }: MoviePosterProps) => {
  const [hasError, setHasError] = useState(false);
  const [isLoading, setIsLoading] = useState(true);

  const handleError = () => {
    setHasError(true);
    setIsLoading(false);
  };

  const handleLoad = () => {
    setIsLoading(false);
  };

  const posterUrl = getPosterUrl(poster);
  const shouldShowPlaceholder = hasError || posterUrl === '/placeholder-movie.png';

  return (
    <div className={`relative overflow-hidden ${className}`}>
      {isLoading && (
        <div className="absolute inset-0 bg-gray-200 animate-pulse flex items-center justify-center">
          <div className="w-6 h-6 sm:w-8 sm:h-8 border-2 border-gray-300 border-t-gray-900 rounded-full animate-spin"></div>
        </div>
      )}
      
      {shouldShowPlaceholder ? (
        <div className="w-full h-full bg-gradient-to-br from-gray-100 to-gray-200 flex items-center justify-center">
          <div className="text-center text-gray-400">
            <Film className="w-10 h-10 sm:w-12 sm:h-12 mx-auto mb-1 sm:mb-2" />
            <p className="text-xs sm:text-sm font-medium px-2">No Image</p>
          </div>
        </div>
      ) : (
        <img
          src={posterUrl}
          alt={title}
          className="w-full h-full object-cover transition-transform duration-300 group-hover:scale-105 sm:group-hover:scale-110"
          loading="lazy"
          onError={handleError}
          onLoad={handleLoad}
        />
      )}
    </div>
  );
};