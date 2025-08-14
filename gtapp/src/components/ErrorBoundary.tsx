import React, { Component, ErrorInfo, ReactNode } from 'react';
import { Box, Typography, Button, Alert } from '@mui/material';
import { Refresh, BugReport } from '@mui/icons-material';

interface Props {
  children?: ReactNode;
}

interface State {
  hasError: boolean;
  error?: Error;
}

class ErrorBoundary extends Component<Props, State> {
  constructor(props: Props) {
    super(props);
    this.state = { hasError: false };
  }

  public static getDerivedStateFromError(error: Error): State {
    // Update state so the next render will show the fallback UI
    return { hasError: true, error };
  }

  public componentDidCatch(error: Error, errorInfo: ErrorInfo) {
    console.error('Uncaught error:', error, errorInfo);
  }

  private handleReload = () => {
    window.location.reload();
  };

  public render() {
    if (this.state.hasError) {
      return (
        <Box
          display="flex"
          flexDirection="column"
          justifyContent="center"
          alignItems="center"
          minHeight="100vh"
          padding={3}
          textAlign="center"
        >
          <BugReport sx={{ fontSize: 80, color: 'error.main', mb: 2 }} />
          
          <Typography variant="h4" color="error" gutterBottom>
            🚨 Oops! Có lỗi xảy ra
          </Typography>
          
          <Typography variant="h6" color="textSecondary" gutterBottom>
            Ứng dụng gặp sự cố không mong muốn
          </Typography>
          
          <Alert severity="error" sx={{ mt: 2, mb: 3, maxWidth: 600 }}>
            <Typography variant="body2">
              <strong>Chi tiết lỗi:</strong> {this.state.error?.message || 'Unknown error'}
            </Typography>
          </Alert>

          <Box display="flex" gap={2}>
            <Button
              variant="contained"
              startIcon={<Refresh />}
              onClick={this.handleReload}
              size="large"
            >
              🔄 Tải lại trang
            </Button>
            
            <Button
              variant="outlined"
              onClick={() => window.history.back()}
              size="large"
            >
              ← Quay lại
            </Button>
          </Box>

          <Typography variant="caption" color="textSecondary" sx={{ mt: 3 }}>
            Nếu lỗi tiếp tục xảy ra, vui lòng liên hệ quản trị viên
          </Typography>
        </Box>
      );
    }

    return this.props.children;
  }
}

export default ErrorBoundary;
