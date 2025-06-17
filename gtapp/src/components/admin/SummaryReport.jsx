import React, { useState } from 'react';
import {
  Grid,
  Paper,
  Typography,
  Box,
  Button,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Card,
  CardContent
} from '@mui/material';
import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
  ResponsiveContainer
} from 'recharts';
import styles from '../../styles/SummaryReport.module.css';

// Mock data for charts
const tuitionData = [
  { month: 'T1', amount: 50000000 },
  { month: 'T2', amount: 65000000 },
  { month: 'T3', amount: 75000000 },
  { month: 'T4', amount: 80000000 },
  { month: 'T5', amount: 85000000 },
  { month: 'T6', amount: 90000000 },
];

const studentData = [
  { month: 'T1', count: 50 },
  { month: 'T2', count: 65 },
  { month: 'T3', count: 75 },
  { month: 'T4', count: 80 },
  { month: 'T5', count: 85 },
  { month: 'T6', count: 90 },
];

const attendanceData = [
  { month: 'T1', rate: 95 },
  { month: 'T2', rate: 92 },
  { month: 'T3', rate: 94 },
  { month: 'T4', rate: 96 },
  { month: 'T5', rate: 93 },
  { month: 'T6', rate: 95 },
];

const teacherSalaryData = [
  { month: 'T1', amount: 30000000 },
  { month: 'T2', amount: 32000000 },
  { month: 'T3', amount: 35000000 },
  { month: 'T4', amount: 38000000 },
  { month: 'T5', amount: 40000000 },
  { month: 'T6', amount: 42000000 },
];

const SummaryReport = () => {
  const [selectedReport, setSelectedReport] = useState('tuition');

  const renderChart = () => {
    switch (selectedReport) {
      case 'tuition':
        return (
          <ResponsiveContainer width="100%" height={400}>
            <BarChart data={tuitionData}>
              <CartesianGrid strokeDasharray="3 3" />
              <XAxis dataKey="month" />
              <YAxis />
              <Tooltip />
              <Legend />
              <Bar dataKey="amount" name="Học phí" fill="#8884d8" />
            </BarChart>
          </ResponsiveContainer>
        );
      case 'students':
        return (
          <ResponsiveContainer width="100%" height={400}>
            <BarChart data={studentData}>
              <CartesianGrid strokeDasharray="3 3" />
              <XAxis dataKey="month" />
              <YAxis />
              <Tooltip />
              <Legend />
              <Bar dataKey="count" name="Số học viên" fill="#82ca9d" />
            </BarChart>
          </ResponsiveContainer>
        );
      case 'attendance':
        return (
          <ResponsiveContainer width="100%" height={400}>
            <BarChart data={attendanceData}>
              <CartesianGrid strokeDasharray="3 3" />
              <XAxis dataKey="month" />
              <YAxis />
              <Tooltip />
              <Legend />
              <Bar dataKey="rate" name="Tỷ lệ điểm danh" fill="#ffc658" />
            </BarChart>
          </ResponsiveContainer>
        );
      case 'salary':
        return (
          <ResponsiveContainer width="100%" height={400}>
            <BarChart data={teacherSalaryData}>
              <CartesianGrid strokeDasharray="3 3" />
              <XAxis dataKey="month" />
              <YAxis />
              <Tooltip />
              <Legend />
              <Bar dataKey="amount" name="Lương giáo viên" fill="#ff8042" />
            </BarChart>
          </ResponsiveContainer>
        );
      default:
        return null;
    }
  };

  return (
    <div className={styles.container}>
      <div className={styles.header}>
        <h1>Báo cáo tổng hợp</h1>
        <div className={styles.exportButtons}>
          <Button variant="contained" color="primary">
            Xuất báo cáo PDF
          </Button>
          <Button variant="contained" color="secondary">
            Xuất báo cáo Excel
          </Button>
        </div>
      </div>

      <Grid container spacing={3}>
        <Grid item xs={12}>
          <Box className={styles.reportButtons}>
            <Button
              variant={selectedReport === 'tuition' ? 'contained' : 'outlined'}
              onClick={() => setSelectedReport('tuition')}
            >
              Báo cáo học phí
            </Button>
            <Button
              variant={selectedReport === 'students' ? 'contained' : 'outlined'}
              onClick={() => setSelectedReport('students')}
            >
              Số lượng học viên
            </Button>
            <Button
              variant={selectedReport === 'attendance' ? 'contained' : 'outlined'}
              onClick={() => setSelectedReport('attendance')}
            >
              Điểm danh
            </Button>
            <Button
              variant={selectedReport === 'salary' ? 'contained' : 'outlined'}
              onClick={() => setSelectedReport('salary')}
            >
              Lương giáo viên
            </Button>
          </Box>
        </Grid>

        <Grid item xs={12}>
          <Paper className={styles.chartContainer}>
            {renderChart()}
          </Paper>
        </Grid>

        <Grid item xs={12}>
          <TableContainer component={Paper}>
            <Table>
              <TableHead>
                <TableRow>
                  <TableCell>Tháng</TableCell>
                  <TableCell align="right">Giá trị</TableCell>
                  <TableCell align="right">Thay đổi</TableCell>
                  <TableCell align="right">Tỷ lệ tăng trưởng</TableCell>
                </TableRow>
              </TableHead>
              <TableBody>
                {tuitionData.map((row, index) => (
                  <TableRow key={row.month}>
                    <TableCell>{row.month}</TableCell>
                    <TableCell align="right">
                      {row.amount.toLocaleString()} VNĐ
                    </TableCell>
                    <TableCell align="right">
                      {index > 0
                        ? (row.amount - tuitionData[index - 1].amount).toLocaleString()
                        : '-'}
                    </TableCell>
                    <TableCell align="right">
                      {index > 0
                        ? `${(
                            ((row.amount - tuitionData[index - 1].amount) /
                              tuitionData[index - 1].amount) *
                            100
                          ).toFixed(2)}%`
                        : '-'}
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </TableContainer>
        </Grid>
      </Grid>
    </div>
  );
};

export default SummaryReport; 