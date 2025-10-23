export const getPosterUrl = (poster: string): string => {
    if (!poster || poster === 'N/A' || poster === '') {
      return '/placeholder-movie.png';
    }
    
    // Check if the URL is valid
    if (poster.startsWith('http')) {
      // Additional validation for Amazon URLs
      if (poster.includes('amazon.com') && poster.includes('_V1_SX300')) {
        return poster;
      }
      // Allow other valid image URLs
      if (poster.match(/\.(jpg|jpeg|png|gif|webp)$/i)) {
        return poster;
      }
    }
    
    // If it's not a valid image URL, use placeholder
    return '/placeholder-movie.png';
  };
  
  export const formatYear = (year: string): string => {
    if (!year || year === 'N/A') {
      return 'Unknown';
    }
    return year;
  };
  