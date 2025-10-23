import { BrowserRouter, Routes, Route } from 'react-router-dom';
import { Toaster } from 'react-hot-toast';
import { FavoritesProvider } from './context/FavoritesContext';
import { ErrorBoundary } from '@components/common/ErrorBoundary/ErrorBoundary';
import { Layout } from '@components/layout/Layout/Layout';
import { HomePage } from './pages/HomePage';
import { FavoritesPage } from './pages/FavoritesPage';
import { NotFoundPage } from './pages/NotFoundPage';
import { toastConfig } from './config/toast.config';

function App() {
  return (
    <ErrorBoundary>
      <BrowserRouter>
        <FavoritesProvider>
          <Layout>
            <Routes>
              <Route path="/" element={<HomePage />} />
              <Route path="/favorites" element={<FavoritesPage />} />
              <Route path="*" element={<NotFoundPage />} />
            </Routes>
          </Layout>

          {/* Toast Notifications */}
          <Toaster {...toastConfig} />
        </FavoritesProvider>
      </BrowserRouter>
    </ErrorBoundary>
  );
}

export default App;
