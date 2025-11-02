import { useState } from 'react';
import { Link, useLocation, useSearchParams } from 'react-router-dom';
import { FavoritesCounter } from '@components/favorites/FavoritesCounter/FavoritesCounter';
import { Film, Menu, X } from 'lucide-react';

export const Header = () => {
  const location = useLocation();
  const [searchParams] = useSearchParams();
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  
  const isActive = (path: string) => location.pathname === path;

  const closeMobileMenu = () => setIsMobileMenuOpen(false);

  const homeLink = searchParams.toString() ? `/?${searchParams.toString()}` : '/';

  return (
    <header className="bg-white shadow-sm sticky top-0 z-50">
      <div className="container-custom">
        <div className="flex items-center justify-between h-14 sm:h-16">
          {/* Logo */}
          <Link 
            to="/" 
            className="flex items-center gap-2 hover:opacity-80 transition-opacity"
            onClick={closeMobileMenu}
          >
            <Film className="h-6 w-6 sm:h-8 sm:w-8 text-gray-900" />
            <span className="text-lg sm:text-xl font-bold text-gray-900">
              Movie Search
            </span>
          </Link>

          {/* Desktop Navigation */}
          <nav className="hidden md:flex items-center gap-4 lg:gap-6">
            <Link
              to={homeLink}
              className={`text-sm lg:text-base font-medium transition-colors ${
                isActive('/')
                  ? 'text-gray-900 border-b-2 border-gray-900 pb-1'
                  : 'text-gray-600 hover:text-gray-900'
              }`}
            >
              Search
            </Link>

            <Link
              to="/favorites"
              className={`flex items-center gap-2 text-sm lg:text-base font-medium transition-colors ${
                isActive('/favorites')
                  ? 'text-gray-900 border-b-2 border-gray-900 pb-1'
                  : 'text-gray-600 hover:text-gray-900'
              }`}
            >
              <span>Favorites</span>
              <FavoritesCounter />
            </Link>
          </nav>

          {/* Mobile Menu Button */}
          <button
            onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
            className="md:hidden p-2 text-gray-600 hover:text-gray-900 transition-colors"
            aria-label="Toggle menu"
          >
            {isMobileMenuOpen ? (
              <X className="h-6 w-6" />
            ) : (
              <Menu className="h-6 w-6" />
            )}
          </button>
        </div>

        {/* Mobile Navigation */}
        {isMobileMenuOpen && (
          <nav className="md:hidden py-4 border-t border-gray-100">
            <div className="flex flex-col space-y-3">
              <Link
                to={homeLink}
                onClick={closeMobileMenu}
                className={`px-4 py-2 text-base font-medium transition-colors rounded-lg ${
                  isActive('/')
                    ? 'bg-gray-100 text-gray-900'
                    : 'text-gray-600 hover:bg-gray-50 hover:text-gray-900'
                }`}
              >
                Search
              </Link>

              <Link
                to="/favorites"
                onClick={closeMobileMenu}
                className={`px-4 py-2 flex items-center justify-between text-base font-medium transition-colors rounded-lg ${
                  isActive('/favorites')
                    ? 'bg-gray-100 text-gray-900'
                    : 'text-gray-600 hover:bg-gray-50 hover:text-gray-900'
                }`}
              >
                <span>Favorites</span>
                <FavoritesCounter />
              </Link>
            </div>
          </nav>
        )}
      </div>
    </header>
  );
};
