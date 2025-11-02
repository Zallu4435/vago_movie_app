import { EmptyStateProps } from '@/types/component.types';

export const EmptyState = ({ 
  icon = '🎬', 
  title, 
  message 
}: EmptyStateProps) => {
  return (
    <div className="flex flex-col items-center justify-center py-12 sm:py-16 md:py-20 px-4 sm:px-6">
      <div className="text-5xl sm:text-6xl md:text-7xl mb-3 sm:mb-4">{icon}</div>
      <h3 className="text-lg sm:text-xl md:text-2xl font-semibold text-gray-900 mb-2 text-center">{title}</h3>
      <p className="text-sm sm:text-base text-gray-600 text-center max-w-md">{message}</p>
    </div>
  );
};
