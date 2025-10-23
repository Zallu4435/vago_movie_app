import { Link, useLocation } from 'react-router-dom';
import { FavoritesCounter } from '@components/favorites/FavoritesCounter/FavoritesCounter';
import { Film } from 'lucide-react';

export const Header = () => {
  const location = useLocation();
  
  const isActive = (path: string) => location.pathname === path;

  return (
    <header className="bg-white shadow-sm sticky top-0 z-50">
      <div className="container-custom">
        <div className="flex items-center justify-between h-16">
          {/* Logo */}
          <Link to="/" className="flex items-center gap-2 hover:opacity-80 transition-opacity">
            <Film className="h-8 w-8 text-gray-900" />
            <span className="text-xl font-bold text-gray-900">
              Movie Search
            </span>
          </Link>

          {/* Navigation */}
          <nav className="flex items-center gap-6">
            <Link
              to="/"
              className={`text-base font-medium transition-colors ${
                isActive('/')
                  ? 'text-gray-900 border-b-2 border-gray-900 pb-1'
                  : 'text-gray-600 hover:text-gray-900'
              }`}
            >
              Search
            </Link>

            <Link
              to="/favorites"
              className={`flex items-center gap-2 text-base font-medium transition-colors ${
                isActive('/favorites')
                  ? 'text-gray-900 border-b-2 border-gray-900 pb-1'
                  : 'text-gray-600 hover:text-gray-900'
              }`}
            >
              <span>Favorites</span>
              <FavoritesCounter />
            </Link>
          </nav>
        </div>
      </div>
    </header>
  );
};
