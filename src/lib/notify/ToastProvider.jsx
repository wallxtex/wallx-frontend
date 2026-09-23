import { Toaster } from 'react-hot-toast';
export const ToastProvider = () => {
  return (
    <Toaster
      position="top-right"
      reverseOrder={false}
      gutter={8}
      containerClassName=""
      containerStyle={{}}
      toastOptions={{
        // Default options for all toasts
        duration: 4000,
        
        // Styling
        style: {
          background: '#fff',
          color: '#363636',
          padding: '16px',
          borderRadius: '8px',
          boxShadow: '0 4px 12px rgba(0, 0, 0, 0.15)',
          maxWidth: '500px',
          fontSize: '14px',
          lineHeight: '1.5',
        },
        
        // Success styling
        success: {
          duration: 4000,
          iconTheme: {
            primary: '#10B981',
            secondary: '#fff',
          },
          style: {
            background: '#fff',
            color: '#065F46',
            border: '1px solid #D1FAE5',
          },
          // Accessibility
          ariaProps: {
            role: 'status',
            'aria-live': 'polite',
          },
        },
        
        // Error styling
        error: {
          duration: 6000, // Errors stay longer
          iconTheme: {
            primary: '#EF4444',
            secondary: '#fff',
          },
          style: {
            background: '#fff',
            color: '#991B1B',
            border: '1px solid #FEE2E2',
          },
          // Accessibility
          ariaProps: {
            role: 'alert',
            'aria-live': 'assertive',
          },
        },
        
        // Loading styling
        loading: {
          duration: Infinity,
          style: {
            background: '#fff',
            color: '#1F2937',
            border: '1px solid #E5E7EB',
          },
        },
      }}
    />
  );
};

export default ToastProvider;
