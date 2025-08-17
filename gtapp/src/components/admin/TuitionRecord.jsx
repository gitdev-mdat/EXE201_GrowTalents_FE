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

// Mock data cho học phí học viên
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
  {
    id: 3,
    studentName: 'Lê Văn C',
    email: 'levanc@example.com',
    course: 'Hóa học 12',
    amount: '3,000,000',
    paymentDate: '2024-03-20',
    status: 'Chưa thanh toán',
    paymentMethod: 'Chưa xác định'
  },
  {
    id: 4,
    studentName: 'Phạm Thị D',
    email: 'phamthid@example.com',
    course: 'Tiếng Anh 10',
    amount: '1,800,000',
    paymentDate: '2024-03-18',
    status: 'Đã thanh toán',
    paymentMethod: 'Chuyển khoản'
  },
  {
    id: 5,
    studentName: 'Hoàng Văn E',
    email: 'hoangvane@example.com',
    course: 'Văn học 11',
    amount: '2,200,000',
    paymentDate: '2024-03-22',
    status: 'Chưa thanh toán',
    paymentMethod: 'Chưa xác định'
  },
  {
    id: 6,
    studentName: 'Vũ Thị F',
    email: 'vuthif@example.com',
    course: 'Sinh học 12',
    amount: '2,800,000',
    paymentDate: '2024-03-16',
    status: 'Đã thanh toán',
    paymentMethod: 'Tiền mặt'
  },
  {
    id: 7,
    studentName: 'Đặng Văn G',
    email: 'dangvang@example.com',
    course: 'Lịch sử 10',
    amount: '1,500,000',
    paymentDate: '2024-03-25',
    status: 'Chưa thanh toán',
    paymentMethod: 'Chưa xác định'
  },
  {
    id: 8,
    studentName: 'Bùi Thị H',
    email: 'buithih@example.com',
    course: 'Địa lý 11',
    amount: '1,900,000',
    paymentDate: '2024-03-17',
    status: 'Đã thanh toán',
    paymentMethod: 'Chuyển khoản'
  },
  {
    id: 9,
    studentName: 'Ngô Văn I',
    email: 'ngovani@example.com',
    course: 'Tin học 12',
    amount: '2,600,000',
    paymentDate: '2024-03-19',
    status: 'Đã thanh toán',
    paymentMethod: 'Tiền mặt'
  },
  {
    id: 10,
    studentName: 'Lý Thị J',
    email: 'lythij@example.com',
    course: 'GDCD 10',
    amount: '1,700,000',
    paymentDate: '2024-03-21',
    status: 'Chưa thanh toán',
    paymentMethod: 'Chưa xác định'
  },
  {
    id: 11,
    studentName: 'Trịnh Văn K',
    email: 'trinhvank@example.com',
    course: 'Công nghệ 11',
    amount: '2,400,000',
    paymentDate: '2024-03-23',
    status: 'Đã thanh toán',
    paymentMethod: 'Chuyển khoản'
  }
];


// Mock data cho lương giáo viên
const teacherSalaries = [
  {
    id: 1,
    name: 'Thầy Nguyễn Văn X',
    email: 'nguyenvx@example.com',
    phone: '0912345678',
    salary: '10,000,000',
    allowance: '2,000,000',
    paymentDate: '2024-03-28',
    status: 'Đã thanh toán'
  },
  {
    id: 2,
    name: 'Cô Trần Thị Y',
    email: 'tranthy@example.com',
    phone: '0987654321',
    salary: '9,000,000',
    allowance: '1,500,000',
    paymentDate: '2024-03-29',
    status: 'Chưa thanh toán'
  },
  {
    id: 3,
    name: 'Thầy Lê Văn Z',
    email: 'levanz@example.com',
    phone: '0905123456',
    salary: '11,000,000',
    allowance: '2,200,000',
    paymentDate: '2024-03-27',
    status: 'Đã thanh toán'
  },
  {
    id: 4,
    name: 'Cô Phạm Thị H',
    email: 'phamthih@example.com',
    phone: '0934567890',
    salary: '8,500,000',
    allowance: '1,800,000',
    paymentDate: '2024-03-30',
    status: 'Chưa thanh toán'
  },
  {
    id: 5,
    name: 'Thầy Bùi Minh K',
    email: 'buimk@example.com',
    phone: '0978123456',
    salary: '12,000,000',
    allowance: '2,500,000',
    paymentDate: '2024-04-01',
    status: 'Đã thanh toán'
  },
  {
    id: 6,
    name: 'Cô Đỗ Lan M',
    email: 'dolanm@example.com',
    phone: '0965234789',
    salary: '9,200,000',
    allowance: '1,700,000',
    paymentDate: '2024-04-02',
    status: 'Chưa thanh toán'
  },
  {
    id: 7,
    name: 'Thầy Vũ Quang N',
    email: 'vuqn@example.com',
    phone: '0946123456',
    salary: '10,500,000',
    allowance: '2,100,000',
    paymentDate: '2024-04-03',
    status: 'Đã thanh toán'
  },
  {
    id: 8,
    name: 'Cô Nguyễn Thu O',
    email: 'nguyentho@example.com',
    phone: '0923456789',
    salary: '8,800,000',
    allowance: '1,600,000',
    paymentDate: '2024-04-04',
    status: 'Chưa thanh toán'
  },
  {
    id: 9,
    name: 'Thầy Hoàng Văn P',
    email: 'hoangvp@example.com',
    phone: '0912987654',
    salary: '11,500,000',
    allowance: '2,300,000',
    paymentDate: '2024-04-05',
    status: 'Đã thanh toán'
  },
  {
    id: 10,
    name: 'Cô Lý Thị Q',
    email: 'lythiq@example.com',
    phone: '0939876543',
    salary: '9,700,000',
    allowance: '1,900,000',
    paymentDate: '2024-04-06',
    status: 'Chưa thanh toán'
  },
  {
    id: 11,
    name: 'Thầy Đặng Minh R',
    email: 'dangmr@example.com',
    phone: '0976543210',
    salary: '12,500,000',
    allowance: '2,700,000',
    paymentDate: '2024-04-07',
    status: 'Đã thanh toán'
  }

];

const TuitionRecord = () => {
  const [page, setPage] = useState(1);
  const [view, setView] = useState('student'); // "student" hoặc "teacher"
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
      default:
        return 'default';
    }
  };

  return (
    <div className={styles.container}>
     <div className={styles.header}>
  <Box sx={{ display: 'flex', gap: 2 }}>
    <Button
      variant={view === 'student' ? 'contained' : 'outlined'}
      color="primary"
      onClick={() => setView('student')}
    >
      Học phí học viên
    </Button>
    <Button
      variant={view === 'teacher' ? 'contained' : 'outlined'}
      color="secondary"
      onClick={() => setView('teacher')}
    >
      Lương giáo viên
    </Button>
  </Box>
</div>

      {/* Bảng học phí học viên */}
      {view === 'student' && (
        <>
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
        </>
      )}

      {/* Bảng lương giáo viên */}
      {view === 'teacher' && (
        <>
          <TableContainer component={Paper} className={styles.tableContainer}>
            <Table>
              <TableHead>
                <TableRow>
                  <TableCell>Tên giáo viên</TableCell>
                  <TableCell>Email</TableCell>
                  <TableCell>Số điện thoại</TableCell>
                  <TableCell>Lương</TableCell>
                  <TableCell>Phụ cấp giờ dạy</TableCell>
                  <TableCell>Ngày thanh toán</TableCell>
                  <TableCell>Trạng thái</TableCell>
                </TableRow>
              </TableHead>
              <TableBody>
                {teacherSalaries.map((teacher) => (
                  <TableRow key={teacher.id}>
                    <TableCell>{teacher.name}</TableCell>
                    <TableCell>{teacher.email}</TableCell>
                    <TableCell>{teacher.phone}</TableCell>
                    <TableCell>{teacher.salary} VNĐ</TableCell>
                    <TableCell>{teacher.allowance} VNĐ</TableCell>
                    <TableCell>{teacher.paymentDate}</TableCell>
                    <TableCell>
                      <Chip
                        label={teacher.status}
                        color={getStatusColor(teacher.status)}
                        size="small"
                      />
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </TableContainer>
        </>
      )}
    </div>
  );
};

export default TuitionRecord;
