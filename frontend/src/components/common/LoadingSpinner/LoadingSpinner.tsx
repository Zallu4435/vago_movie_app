export const LoadingSpinner = () => {
  return (
    <div className="flex justify-center items-center py-10 sm:py-12 md:py-16">
      <div className="relative">
        <div className="h-12 w-12 sm:h-16 sm:w-16 rounded-full border-3 sm:border-4 border-gray-200"></div>
        <div data-testid="spinner-anim" className="h-12 w-12 sm:h-16 sm:w-16 rounded-full border-3 sm:border-4 border-gray-900 border-t-transparent animate-spin absolute top-0 left-0"></div>
      </div>
    </div>
  );
};
