import { useFavoritesContext } from '@context/FavoritesContext';
import { Heart } from 'lucide-react';
import { FavoriteButtonProps } from '@/types/component.types';

export const FavoriteButton = ({ movie }: FavoriteButtonProps) => {
  const { isFavorite, toggleFavorite } = useFavoritesContext();
  const isFavorited = isFavorite(movie.imdbID);
  
  const handleClick = (e: React.MouseEvent) => {
    e.preventDefault();
    e.stopPropagation();
    if (toggleFavorite) {
      toggleFavorite(movie);
    }
  };

  return (
    <button
      type="button"
      onClick={handleClick}
      className="p-1.5 sm:p-2 rounded-full bg-white/90 hover:bg-white shadow-md hover:shadow-lg transition-all duration-200"
      aria-label={isFavorited ? 'Remove from favorites' : 'Add to favorites'}
    >
      <Heart
        className={`h-4 w-4 sm:h-5 sm:w-5 transition-colors ${
          isFavorited ? 'text-red-500 fill-red-500' : 'text-gray-400 hover:text-red-400'
        }`}
      />
    </button>
  );
};