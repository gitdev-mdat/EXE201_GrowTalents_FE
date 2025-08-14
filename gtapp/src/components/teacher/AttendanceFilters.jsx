import React, { useState } from 'react';
import {
  Card,
  CardContent,
  Grid,
  TextField,
  Button,
  Box,
  Typography,
  Chip,
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  FormControl,
  InputLabel,
  Select,
  MenuItem
} from '@mui/material';
import {
  FilterList,
  DateRange,
  Download,
  Refresh,
  Today
} from '@mui/icons-material';

const AttendanceFilters = ({
  startDate,
  endDate,
  onStartDateChange,
  onEndDateChange,
  onApplyFilter,
  onClearFilter,
  onExportData,
  loading = false
}) => {
  const [showAdvanced, setShowAdvanced] = useState(false);
  const [filterPreset, setFilterPreset] = useState('');

  const filterPresets = [
    { value: 'today', label: 'Hôm nay', days: 0 },
    { value: 'week', label: 'Tuần này', days: 7 },
    { value: 'month', label: 'Tháng này', days: 30 },
    { value: 'quarter', label: 'Quý này', days: 90 }
  ];

  const handlePresetChange = (preset) => {
    setFilterPreset(preset.value);
    const today = new Date();
    const startDate = new Date(today);
    
    if (preset.value === 'today') {
      onStartDateChange(today.toISOString().split('T')[0]);
      onEndDateChange(today.toISOString().split('T')[0]);
    } else {
      startDate.setDate(today.getDate() - preset.days);
      onStartDateChange(startDate.toISOString().split('T')[0]);
      onEndDateChange(today.toISOString().split('T')[0]);
    }
  };

  const handleClear = () => {
    setFilterPreset('');
    onClearFilter();
  };

  const getTodayDate = () => {
    return new Date().toISOString().split('T')[0];
  };

  const isValidDateRange = () => {
    if (!startDate || !endDate) return false;
    return new Date(startDate) <= new Date(endDate) && new Date(endDate) <= new Date();
  };

  return (
    <>
      <Card sx={{ mb: 2 }}>
        <CardContent>
          <Box display="flex" justifyContent="space-between" alignItems="center" mb={2}>
            <Typography variant="h6" display="flex" alignItems="center">
              <FilterList sx={{ mr: 1 }} />
              Bộ lọc thời gian
            </Typography>
            <Box>
              <Button
                variant="outlined"
                size="small"
                startIcon={<Today />}
                onClick={() => handlePresetChange(filterPresets[0])}
                sx={{ mr: 1 }}
              >
                Hôm nay
              </Button>
              <Button
                variant="outlined"
                size="small"
                startIcon={<DateRange />}
                onClick={() => setShowAdvanced(true)}
              >
                Nâng cao
              </Button>
            </Box>
          </Box>

          <Grid container spacing={2} alignItems="center">
            {/* Quick Filter Presets */}
            <Grid item xs={12} md={6}>
              <Box display="flex" gap={1} flexWrap="wrap">
                {filterPresets.map((preset) => (
                  <Chip
                    key={preset.value}
                    label={preset.label}
                    onClick={() => handlePresetChange(preset)}
                    color={filterPreset === preset.value ? 'primary' : 'default'}
                    variant={filterPreset === preset.value ? 'filled' : 'outlined'}
                    size="small"
                  />
                ))}
              </Box>
            </Grid>

            {/* Date Range Display */}
            <Grid item xs={12} md={6}>
              <Box display="flex" gap={2} alignItems="center">
                <TextField
                  size="small"
                  type="date"
                  label="Từ ngày"
                  value={startDate || ''}
                  onChange={(e) => onStartDateChange(e.target.value)}
                  InputLabelProps={{ shrink: true }}
                  inputProps={{ max: getTodayDate() }}
                />
                <TextField
                  size="small"
                  type="date"
                  label="Đến ngày"
                  value={endDate || ''}
                  onChange={(e) => onEndDateChange(e.target.value)}
                  InputLabelProps={{ shrink: true }}
                  inputProps={{ max: getTodayDate() }}
                />
                <Button
                  variant="contained"
                  size="small"
                  onClick={onApplyFilter}
                  disabled={!isValidDateRange() || loading}
                  startIcon={<Refresh />}
                >
                  Áp dụng
                </Button>
                <Button
                  variant="outlined"
                  size="small"
                  onClick={handleClear}
                  disabled={loading}
                >
                  Xóa
                </Button>
              </Box>
            </Grid>
          </Grid>

          {/* Current Filter Display */}
          {(startDate || endDate) && (
            <Box mt={2}>
              <Typography variant="body2" color="textSecondary">
                Đang lọc: 
                {startDate && endDate && startDate === endDate 
                  ? ` Ngày ${startDate}`
                  : ` Từ ${startDate || 'N/A'} đến ${endDate || 'N/A'}`
                }
              </Typography>
            </Box>
          )}
        </CardContent>
      </Card>

      {/* Advanced Filter Dialog */}
      <Dialog open={showAdvanced} onClose={() => setShowAdvanced(false)} maxWidth="sm" fullWidth>
        <DialogTitle>Bộ lọc nâng cao</DialogTitle>
        <DialogContent>
          <Grid container spacing={2} sx={{ mt: 1 }}>
            <Grid item xs={12} md={6}>
              <TextField
                fullWidth
                type="date"
                label="Từ ngày"
                value={startDate || ''}
                onChange={(e) => onStartDateChange(e.target.value)}
                InputLabelProps={{ shrink: true }}
                inputProps={{ max: getTodayDate() }}
              />
            </Grid>
            <Grid item xs={12} md={6}>
              <TextField
                fullWidth
                type="date"
                label="Đến ngày"
                value={endDate || ''}
                onChange={(e) => onEndDateChange(e.target.value)}
                InputLabelProps={{ shrink: true }}
                inputProps={{ max: getTodayDate() }}
              />
            </Grid>
            <Grid item xs={12}>
              <FormControl fullWidth>
                <InputLabel>Bộ lọc nhanh</InputLabel>
                <Select
                  value={filterPreset}
                  label="Bộ lọc nhanh"
                  onChange={(e) => {
                    const preset = filterPresets.find(p => p.value === e.target.value);
                    if (preset) handlePresetChange(preset);
                  }}
                >
                  <MenuItem value="">Tùy chỉnh</MenuItem>
                  {filterPresets.map((preset) => (
                    <MenuItem key={preset.value} value={preset.value}>
                      {preset.label}
                    </MenuItem>
                  ))}
                </Select>
              </FormControl>
            </Grid>
          </Grid>

          {!isValidDateRange() && (startDate || endDate) && (
            <Box mt={2}>
              <Typography variant="body2" color="error">
                * Vui lòng chọn khoảng thời gian hợp lệ (không được vượt quá ngày hiện tại)
              </Typography>
            </Box>
          )}
        </DialogContent>
        <DialogActions>
          <Button onClick={() => setShowAdvanced(false)}>Hủy</Button>
          <Button onClick={handleClear} variant="outlined">Xóa bộ lọc</Button>
          <Button 
            onClick={() => {
              onApplyFilter();
              setShowAdvanced(false);
            }} 
            variant="contained"
            disabled={!isValidDateRange()}
          >
            Áp dụng
          </Button>
        </DialogActions>
      </Dialog>
    </>
  );
};

export default AttendanceFilters;
