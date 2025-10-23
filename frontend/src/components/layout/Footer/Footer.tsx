import { Github } from 'lucide-react';

export const Footer = () => {
  const currentYear = new Date().getFullYear();

  return (
    <footer className="bg-white border-t border-gray-200 mt-auto">
      <div className="container-custom">
        <div className="py-8">
          <div className="flex flex-col md:flex-row justify-between items-center gap-4">
            {/* Left side */}
            <div className="flex items-center gap-2 text-gray-600">
              <span className="text-2xl">🎬</span>
              <span className="text-sm">
                © {currentYear} Movie Search & Favorites
              </span>
            </div>

            {/* Center */}
            <div className="text-sm text-gray-600">
              Powered by{' '}
              <a
                href="https://www.omdbapi.com/"
                target="_blank"
                rel="noopener noreferrer"
                className="text-gray-900 hover:text-gray-700 font-medium underline"
              >
                OMDb API
              </a>
            </div>

            {/* Right side */}
            <div className="flex items-center gap-6">
              <a
                href="https://github.com"
                target="_blank"
                rel="noopener noreferrer"
                className="text-gray-600 hover:text-gray-900 transition-colors"
                aria-label="GitHub"
              >
                <Github className="h-6 w-6" />
              </a>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
};