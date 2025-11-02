import { Header } from '../Header/Header';
import { Footer } from '../Footer/Footer';
import { LayoutProps } from '@/types/component.types';

export const Layout = ({ children }: LayoutProps) => {
  return (
    <div className="min-h-screen flex flex-col bg-gray-50">
      <Header />
      
      <main className="flex-1">
        <div className="container-custom py-4 sm:py-6 md:py-8">
          {children}
        </div>
      </main>

      <Footer />
    </div>
  );
};