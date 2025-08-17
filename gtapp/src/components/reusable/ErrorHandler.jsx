import React, { createContext, useContext, useState, useCallback } from 'react';
import { Snackbar, Alert } from '@mui/material';

// Context for global error handling
const ErrorContext = createContext();

export const useError = () => {
  const context = useContext(ErrorContext);
  if (!context) {
    throw new Error('useError must be used within an ErrorProvider');
  }
  return context;
};

// Global Error Provider
export const ErrorProvider = ({ children }) => {
  const [error, setError] = useState(null);
  const [open, setOpen] = useState(false);

  const showError = useCallback((message, severity = 'error') => {
    setError({ message, severity });
    setOpen(true);
  }, []);

  const hideError = useCallback(() => {
    setOpen(false);
  }, []);

  const handleClose = (event, reason) => {
    if (reason === 'clickaway') {
      return;
    }
    hideError();
  };

  // Parse API error to user-friendly message
  const parseApiError = useCallback((error) => {
    if (error?.response?.data?.message) {
      return error.response.data.message;
    }
    
    if (error?.response?.status) {
      switch (error.response.status) {
        case 400:
          return 'Dữ liệu không hợp lệ';
        case 401:
          return 'Phiên đăng nhập đã hết hạn';
        case 403:
          return 'Bạn không có quyền truy cập';
        case 404:
          return 'Không tìm thấy dữ liệu';
        case 409:
          return 'Dữ liệu đã tồn tại';
        case 500:
          return 'Lỗi server, vui lòng thử lại sau';
        case 503:
          return 'Dịch vụ tạm thời không khả dụng';
        default:
          return `Lỗi hệ thống (${error.response.status})`;
      }
    }
    
    if (error?.message?.includes('Network Error')) {
      return 'Không thể kết nối đến server';
    }
    
    return error?.message || 'Có lỗi xảy ra';
  }, []);

  const showApiError = useCallback((apiError) => {
    const message = parseApiError(apiError);
    showError(message, 'error');
  }, [parseApiError, showError]);

  const value = {
    showError,
    showApiError,
    hideError,
    error,
    isOpen: open
  };

  return (
    <ErrorContext.Provider value={value}>
      {children}
      <Snackbar
        open={open}
        autoHideDuration={6000}
        onClose={handleClose}
        anchorOrigin={{ vertical: 'top', horizontal: 'center' }}
      >
        <Alert
          onClose={handleClose}
          severity={error?.severity || 'error'}
          variant="filled"
          sx={{ width: '100%' }}
        >
          {error?.message}
        </Alert>
      </Snackbar>
    </ErrorContext.Provider>
  );
};

// HOC to wrap components with error handling
export const withErrorHandling = (WrappedComponent) => {
  return (props) => {
    const { showApiError } = useError();
    
    return (
      <WrappedComponent 
        {...props} 
        onApiError={showApiError}
      />
    );
  };
};

export default ErrorContext;
