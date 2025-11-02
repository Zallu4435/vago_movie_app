import { Github } from 'lucide-react';

export const Footer = () => {
  const currentYear = new Date().getFullYear();

  return (
    <footer className="bg-white border-t border-gray-200 mt-auto">
      <div className="container-custom">
        <div className="py-6 sm:py-8">
          <div className="flex flex-col md:flex-row justify-between items-center gap-4 sm:gap-6">
            {/* Left side - Copyright */}
            <div className="flex items-center gap-2 text-gray-600 text-center md:text-left">
              <span className="text-xl sm:text-2xl">🎬</span>
              <span className="text-xs sm:text-sm">
                © {currentYear} Movie Search & Favorites
              </span>
            </div>

            {/* Center - Attribution */}
            <div className="text-xs sm:text-sm text-gray-600 text-center order-last md:order-none">
              Powered by{' '}
              <a
                href="https://www.omdbapi.com/"
                target="_blank"
                rel="noopener noreferrer"
                className="text-gray-900 hover:text-gray-700 font-medium underline transition-colors"
              >
                OMDb API
              </a>
            </div>

            {/* Right side - Social Links */}
            <div className="flex items-center gap-4 sm:gap-6">
              <a
                href="https://github.com"
                target="_blank"
                rel="noopener noreferrer"
                className="text-gray-600 hover:text-gray-900 transition-colors p-2 hover:bg-gray-50 rounded-lg"
                aria-label="GitHub"
              >
                <Github className="h-5 w-5 sm:h-6 sm:w-6" />
              </a>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
};