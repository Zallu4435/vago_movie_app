import { Link } from 'react-router-dom';

export const NotFoundPage = () => {
  return (
    <div className="min-h-screen bg-gray-50 flex items-center justify-center px-4 sm:px-6">
      <div className="text-center max-w-md">
        {/* Large Movie Icon */}
        <div className="text-6xl sm:text-7xl md:text-8xl lg:text-9xl mb-6 sm:mb-8 animate-bounce-slow">🎬</div>
        
        {/* 404 Text */}
        <h1 className="text-6xl sm:text-7xl md:text-8xl font-bold text-gray-900 mb-4 sm:mb-6">404</h1>
        
        {/* Title */}
        <h2 className="text-2xl sm:text-3xl md:text-4xl font-bold text-gray-900 mb-3 sm:mb-4">
          Page Not Found
        </h2>
        
        {/* Description */}
        <p className="text-gray-600 mb-6 sm:mb-8 text-base sm:text-lg px-2">
          The page you're looking for doesn't exist or has been moved.
        </p>

        {/* Button */}
        <Link to="/">
          <button className="w-full sm:w-auto px-6 sm:px-8 py-2.5 sm:py-3 bg-gray-900 text-white rounded-lg hover:bg-gray-800 transition-colors font-medium text-sm sm:text-base shadow-md hover:shadow-lg">
            Go Back Home
          </button>
        </Link>

        {/* Additional Help */}
        <div className="mt-6 sm:mt-8 pt-6 sm:pt-8 border-t border-gray-200">
          <p className="text-xs sm:text-sm text-gray-500 mb-3 sm:mb-4">
            Here are some helpful links instead:
          </p>
          <div className="flex flex-col sm:flex-row gap-3 sm:gap-4 justify-center text-xs sm:text-sm">
            <Link 
              to="/" 
              className="text-gray-600 hover:text-gray-900 transition-colors"
            >
              Search Movies
            </Link>
            <span className="hidden sm:inline text-gray-300">•</span>
            <Link 
              to="/favorites" 
              className="text-gray-600 hover:text-gray-900 transition-colors"
            >
              My Favorites
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
};
