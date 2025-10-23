import { ToasterProps } from 'react-hot-toast';

export const toastConfig: ToasterProps = {
  position: 'bottom-right',
  reverseOrder: false,
  gutter: 8,
  containerClassName: '',
  containerStyle: {},
  toastOptions: {
    // Default options for all toasts
    className: '',
    duration: 3000,
    style: {
      background: '#111827', // gray-900
      color: '#fff',
      padding: '16px',
      borderRadius: '8px',
      fontSize: '14px',
      fontWeight: '500',
      boxShadow:
        '0 10px 15px -3px rgba(0, 0, 0, 0.1), 0 4px 6px -2px rgba(0, 0, 0, 0.05)',
      maxWidth: '400px',
    },

    // Success Toast
    success: {
      duration: 3000,
      style: {
        background: '#111827',
        color: '#fff',
      },
      iconTheme: {
        primary: '#10b981', // green-500
        secondary: '#fff',
      },
    },

    // Error Toast
    error: {
      duration: 4000,
      style: {
        background: '#111827',
        color: '#fff',
      },
      iconTheme: {
        primary: '#ef4444', // red-500
        secondary: '#fff',
      },
    },

    // Loading Toast
    loading: {
      style: {
        background: '#111827',
        color: '#fff',
      },
      iconTheme: {
        primary: '#fff',
        secondary: '#111827',
      },
    },

    // Custom/Blank Toast
    blank: {
      duration: 3000,
      style: {
        background: '#111827',
        color: '#fff',
      },
    },
  },
};
