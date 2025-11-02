import { FavoritesList } from '@components/favorites/FavoritesList/FavoritesList';

export const FavoritesPage = () => {
  return (
    <div className="space-y-6 sm:space-y-8">
      {/* Hero Section */}
      <div className="text-center space-y-3 sm:space-y-4 py-4 sm:py-6 md:py-8 px-4">
        <h1 className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-bold text-gray-900">
          My Favorite Movies
        </h1>
        <p className="text-base sm:text-lg md:text-xl text-gray-600 max-w-2xl mx-auto">
          All your saved movies in one place
        </p>
      </div>

      {/* Favorites List */}
      <FavoritesList />
    </div>
  );
};
