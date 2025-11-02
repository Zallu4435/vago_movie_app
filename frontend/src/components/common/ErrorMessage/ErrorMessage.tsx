import { ErrorMessageProps } from '@/types/component.types';

export const ErrorMessage = ({ message, onRetry }: ErrorMessageProps) => {
  return (
    <div className="flex flex-col items-center justify-center py-10 sm:py-12 md:py-16 px-4 sm:px-6">
      <div className="text-red-500 text-4xl sm:text-5xl md:text-6xl mb-3 sm:mb-4">⚠️</div>
      <h3 className="text-lg sm:text-xl md:text-2xl font-semibold text-gray-900 mb-2 text-center">Oops! Something went wrong</h3>
      <p className="text-sm sm:text-base text-gray-600 text-center mb-4 sm:mb-6 max-w-md">{message}</p>
      {onRetry && (
        <button
          onClick={onRetry}
          className="px-5 sm:px-6 py-2 sm:py-2.5 text-sm sm:text-base bg-gray-900 text-white rounded-lg hover:bg-gray-800 transition-colors font-medium"
        >
          Try Again
        </button>
      )}
    </div>
  );
};