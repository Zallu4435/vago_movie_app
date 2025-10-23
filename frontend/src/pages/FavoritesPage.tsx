import { FavoritesList } from '@components/favorites/FavoritesList/FavoritesList';

export const FavoritesPage = () => {
  return (
    <div className="space-y-8">
      {/* Hero Section */}
      <div className="text-center space-y-4 py-8">
        <h1 className="text-4xl md:text-5xl font-bold text-gray-900">
          My Favorite Movies
        </h1>
        <p className="text-lg text-gray-600 max-w-2xl mx-auto">
          All your saved movies in one place
        </p>
      </div>

      {/* Favorites List */}
      <FavoritesList />
    </div>
  );
};
