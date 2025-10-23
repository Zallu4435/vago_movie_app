interface EmptyStateProps {
  icon?: string;
  title: string;
  message: string;
}

export const EmptyState = ({ 
  icon = '🎬', 
  title, 
  message 
}: EmptyStateProps) => {
  return (
    <div className="flex flex-col items-center justify-center py-16 px-4">
      <div className="text-6xl mb-4">{icon}</div>
      <h3 className="text-xl font-semibold text-gray-900 mb-2">{title}</h3>
      <p className="text-gray-600 text-center max-w-md">{message}</p>
    </div>
  );
};
