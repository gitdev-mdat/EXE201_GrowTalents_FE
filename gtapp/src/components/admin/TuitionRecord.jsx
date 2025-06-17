import React, { useState } from 'react';
import {
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Paper,
  Button,
  Box,
  Pagination,
  Chip
} from '@mui/material';
import styles from '../../styles/TuitionRecord.module.css';

// Mock data for tuition records
const tuitionRecords = [
  {
    id: 1,
    studentName: 'Nguyễn Văn A',
    email: 'nguyenvana@example.com',
    course: 'Toán 10',
    amount: '2,000,000',
    paymentDate: '2024-03-15',
    status: 'Đã thanh toán',
    paymentMethod: 'Chuyển khoản'
  },
  {
    id: 2,
    studentName: 'Trần Thị B',
    email: 'tranthib@example.com',
    course: 'Vật lý 11',
    amount: '2,500,000',
    paymentDate: '2024-03-14',
    status: 'Đã thanh toán',
    paymentMethod: 'Tiền mặt'
  },
  // Add more mock data as needed
];

const TuitionRecord = () => {
  const [page, setPage] = useState(1);
  const rowsPerPage = 5;

  const handlePageChange = (event, value) => {
    setPage(value);
  };

  const getStatusColor = (status) => {
    switch (status) {
      case 'Đã thanh toán':
        return 'success';
      case 'Chưa thanh toán':
        return 'error';
      case 'Đang xử lý':
        return 'warning';
      default:
        return 'default';
    }
  };

  return (
    <div className={styles.container}>
      <div className={styles.header}>
        <h1>Bảng ghi nhận học phí</h1>
        <Button variant="contained" color="primary">
          Thêm bản ghi
        </Button>
      </div>

      <TableContainer component={Paper} className={styles.tableContainer}>
        <Table>
          <TableHead>
            <TableRow>
              <TableCell>Tên học viên</TableCell>
              <TableCell>Email</TableCell>
              <TableCell>Khóa học</TableCell>
              <TableCell>Số tiền</TableCell>
              <TableCell>Ngày thanh toán</TableCell>
              <TableCell>Trạng thái</TableCell>
              <TableCell>Phương thức</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {tuitionRecords
              .slice((page - 1) * rowsPerPage, page * rowsPerPage)
              .map((record) => (
                <TableRow key={record.id}>
                  <TableCell>{record.studentName}</TableCell>
                  <TableCell>{record.email}</TableCell>
                  <TableCell>{record.course}</TableCell>
                  <TableCell>{record.amount} VNĐ</TableCell>
                  <TableCell>{record.paymentDate}</TableCell>
                  <TableCell>
                    <Chip
                      label={record.status}
                      color={getStatusColor(record.status)}
                      size="small"
                    />
                  </TableCell>
                  <TableCell>{record.paymentMethod}</TableCell>
                </TableRow>
              ))}
          </TableBody>
        </Table>
      </TableContainer>

      <Box className={styles.pagination}>
        <Pagination
          count={Math.ceil(tuitionRecords.length / rowsPerPage)}
          page={page}
          onChange={handlePageChange}
          color="primary"
        />
      </Box>
    </div>
  );
};

export default TuitionRecord; 