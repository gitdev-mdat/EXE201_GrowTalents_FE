import React from 'react';
import {
  Card,
  CardContent,
  Typography,
  Box,
  Chip,
  LinearProgress
} from '@mui/material';
import {
  CheckCircle,
  Cancel,
  People,
  TrendingUp
} from '@mui/icons-material';

const AttendanceStatsCard = ({ 
  title, 
  value, 
  icon, 
  color = 'primary', 
  percentage, 
  subtitle,
  trend
}) => {
  const getIcon = () => {
    switch (icon) {
      case 'present':
        return <CheckCircle sx={{ color: 'success.main', fontSize: 40, mr: 2 }} />;
      case 'absent':
        return <Cancel sx={{ color: 'error.main', fontSize: 40, mr: 2 }} />;
      case 'total':
        return <People sx={{ color: 'primary.main', fontSize: 40, mr: 2 }} />;
      case 'percentage':
        return <TrendingUp sx={{ color: getPercentageColor(percentage), fontSize: 40, mr: 2 }} />;
      default:
        return null;
    }
  };

  const getPercentageColor = (percent) => {
    if (percent >= 90) return 'success.main';
    if (percent >= 75) return 'warning.main';
    return 'error.main';
  };

  const getColorByIcon = () => {
    switch (icon) {
      case 'present':
        return 'success.main';
      case 'absent':
        return 'error.main';
      case 'percentage':
        return getPercentageColor(percentage);
      default:
        return `${color}.main`;
    }
  };

  return (
    <Card sx={{ 
      height: '100%',
      transition: 'transform 0.2s ease, box-shadow 0.2s ease',
      '&:hover': {
        transform: 'translateY(-2px)',
        boxShadow: '0 4px 12px rgba(0, 0, 0, 0.15)'
      }
    }}>
      <CardContent>
        <Box display="flex" alignItems="center" justifyContent="space-between">
          <Box display="flex" alignItems="center" flex={1}>
            {getIcon()}
            <Box>
              <Typography variant="h4" color={getColorByIcon()} fontWeight="bold">
                {value}
                {icon === 'percentage' && '%'}
              </Typography>
              <Typography variant="body2" color="textSecondary" gutterBottom>
                {title}
              </Typography>
              {subtitle && (
                <Typography variant="caption" color="textSecondary">
                  {subtitle}
                </Typography>
              )}
            </Box>
          </Box>
          
          {/* Progress bar for percentage */}
          {icon === 'percentage' && (
            <Box sx={{ width: '100%', maxWidth: 100, ml: 2 }}>
              <LinearProgress
                variant="determinate"
                value={percentage}
                color={percentage >= 90 ? 'success' : percentage >= 75 ? 'warning' : 'error'}
                sx={{ height: 6, borderRadius: 3 }}
              />
            </Box>
          )}

          {/* Trend indicator */}
          {trend && (
            <Box sx={{ ml: 1 }}>
              <Chip
                label={`${trend > 0 ? '+' : ''}${trend}%`}
                color={trend > 0 ? 'success' : trend < 0 ? 'error' : 'default'}
                size="small"
              />
            </Box>
          )}
        </Box>
      </CardContent>
    </Card>
  );
};

export default AttendanceStatsCard;
