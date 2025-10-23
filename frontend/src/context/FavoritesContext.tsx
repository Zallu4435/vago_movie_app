import { createContext, useContext, ReactNode } from 'react';
import { useFavorites } from '@hooks/useFavorites';
import { FavoritesContextType } from '@/types/favorites.context.types';

const FavoritesContext = createContext<FavoritesContextType | undefined>(undefined);

export const FavoritesProvider = ({ children }: { children: ReactNode }) => {
  const favoritesData = useFavorites();

  return (
    <FavoritesContext.Provider value={favoritesData as unknown as FavoritesContextType}>
      {children}
    </FavoritesContext.Provider>
  );
};

export const useFavoritesContext = () => {
  const context = useContext(FavoritesContext);
  if (!context) {
    throw new Error('useFavoritesContext must be used within FavoritesProvider');
  }
  return context;
};
