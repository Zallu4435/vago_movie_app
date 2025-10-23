import { Link } from 'react-router-dom';

export const NotFoundPage = () => {
  return (
    <div className="min-h-screen bg-gray-50 flex items-center justify-center px-4">
      <div className="text-center max-w-md">
        {/* Large Movie Icon */}
        <div className="text-9xl mb-8 animate-bounce-slow">🎬</div>
        
        {/* 404 Text */}
        <h1 className="text-8xl font-bold text-gray-900 mb-6">404</h1>
        
        {/* Title */}
        <h2 className="text-3xl font-bold text-gray-900 mb-4">
          Page Not Found
        </h2>
        
        {/* Description */}
        <p className="text-gray-600 mb-8 text-lg">
          The page you're looking for doesn't exist or has been moved.
        </p>

        {/* Button */}
        <Link to="/">
          <button className="px-8 py-3 bg-gray-900 text-white rounded-lg hover:bg-gray-800 transition-colors font-medium text-base shadow-md hover:shadow-lg">
            Go Back Home
          </button>
        </Link>

        {/* Additional Help */}
        <div className="mt-8 pt-8 border-t border-gray-200">
          <p className="text-sm text-gray-500 mb-4">
            Here are some helpful links instead:
          </p>
          <div className="flex gap-4 justify-center text-sm">
            <Link 
              to="/" 
              className="text-gray-600 hover:text-gray-900 transition-colors"
            >
              Search Movies
            </Link>
            <span className="text-gray-300">•</span>
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
