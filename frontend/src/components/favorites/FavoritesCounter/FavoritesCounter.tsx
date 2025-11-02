import { useFavoritesContext } from '@context/FavoritesContext';

export const FavoritesCounter = () => {
  const { favorites } = useFavoritesContext();
  const count = favorites.length;

  if (count === 0) return null;

  return (
    <span className="inline-flex items-center justify-center min-w-[18px] sm:min-w-[20px] h-4 sm:h-5 px-1 sm:px-1.5 bg-gray-900 text-white text-[10px] sm:text-xs font-bold rounded-full">
      {count > 99 ? '99+' : count}
    </span>
  );
};
