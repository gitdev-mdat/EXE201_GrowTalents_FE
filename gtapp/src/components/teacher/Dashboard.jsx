import React from "react";
import {
  Card,
  CardContent,
  Typography,
  Grid,
  Box,
  Avatar,
  List,
  ListItem,
  ListItemText,
  ListItemAvatar,
  Chip,
  LinearProgress,
  Divider,
} from "@mui/material";
import {
  People,
  Book,
  Schedule,
  Assignment,
  TrendingUp,
  Notifications,
  AttachMoney,
  MonetizationOn,
} from "@mui/icons-material";
import styles from "../../styles/TeacherDashboard.module.css";

const TeacherDashboard = () => {
  // Mock data for teacher dashboard
  const stats = [
    {
      title: "Tổng số học sinh",
      value: "45",
      icon: <People />,
      color: "#1976d2",
    },
    {
      title: "Khóa học đang dạy",
      value: "6",
      icon: <Book />,
      color: "#388e3c",
    },
    {
      title: "Buổi học hôm nay",
      value: "4",
      icon: <Schedule />,
      color: "#f57c00",
    },
    {
      title: "Thu nhập tháng này",
      value: "15.2M",
      icon: <AttachMoney />,
      color: "#2e7d32",
    },
  ];

  // Income data
  const incomeData = {
    currentMonth: 15200000,
    lastMonth: 14800000,
    target: 18000000,
    breakdown: [
      {
        source: "Lương cơ bản",
        amount: 8000000,
        percentage: 52.6,
      },
      {
        source: "Phụ cấp giờ dạy",
        amount: 4500000,
        percentage: 29.6,
      },
      {
        source: "Thưởng hiệu suất",
        amount: 2000000,
        percentage: 13.2,
      },
      {
        source: "Phụ cấp khác",
        amount: 700000,
        percentage: 4.6,
      },
    ],
    recentPayments: [
      {
        id: 1,
        date: "2024-01-15",
        amount: 15200000,
        status: "Đã thanh toán",
        description: "Lương tháng 1/2024",
      },
      {
        id: 2,
        date: "2023-12-15",
        amount: 14800000,
        status: "Đã thanh toán",
        description: "Lương tháng 12/2023",
      },
      {
        id: 3,
        date: "2023-11-15",
        amount: 14500000,
        status: "Đã thanh toán",
        description: "Lương tháng 11/2023",
      },
    ],
  };

  const recentActivities = [
    {
      id: 1,
      type: "Điểm danh",
      message: "Lớp Toán 10A - 35/40 học sinh có mặt",
      time: "2 giờ trước",
      status: "success",
    },
    {
      id: 2,
      type: "Chấm bài",
      message: "Đã chấm xong bài kiểm tra Toán 10A",
      time: "4 giờ trước",
      status: "success",
    },
    {
      id: 3,
      type: "Tài liệu",
      message: "Đã tải lên tài liệu bài tập Vật lý 11",
      time: "1 ngày trước",
      status: "info",
    },
    {
      id: 4,
      type: "Lịch học",
      message: "Lịch học ngày mai đã được cập nhật",
      time: "1 ngày trước",
      status: "warning",
    },
  ];

  const upcomingClasses = [
    {
      id: 1,
      subject: "Toán 10A",
      time: "08:00 - 09:30",
      room: "Phòng 101",
      students: 40,
    },
    {
      id: 2,
      subject: "Vật lý 11B",
      time: "10:00 - 11:30",
      room: "Phòng 102",
      students: 35,
    },
    {
      id: 3,
      subject: "Hóa học 12A",
      time: "14:00 - 15:30",
      room: "Phòng 103",
      students: 30,
    },
  ];

  const getStatusColor = (status) => {
    switch (status) {
      case "success":
        return "success";
      case "warning":
        return "warning";
      case "info":
        return "info";
      default:
        return "default";
    }
  };

  const formatCurrency = (amount) => {
    return new Intl.NumberFormat("vi-VN", {
      style: "currency",
      currency: "VND",
      minimumFractionDigits: 0,
    }).format(amount);
  };

  const calculateProgress = () => {
    return (incomeData.currentMonth / incomeData.target) * 100;
  };

  return (
    <div className={styles.container}>
      <div className={styles.header}>
        <Typography variant="h4" component="h1" gutterBottom>
          Dashboard Giáo viên
        </Typography>
        <Typography variant="subtitle1" color="textSecondary">
          Chào mừng trở lại, Cô Nguyễn Thị Mai
        </Typography>
      </div>

      {/* Statistics Cards */}
      <Grid container spacing={3} className={styles.statsGrid}>
        {stats.map((stat, index) => (
          <Grid item xs={12} sm={6} md={3} key={index}>
            <Card className={styles.statCard}>
              <CardContent>
                <Box
                  display="flex"
                  alignItems="center"
                  justifyContent="space-between"
                >
                  <Box>
                    <Typography variant="h4" component="div" color="primary">
                      {stat.value}
                    </Typography>
                    <Typography variant="body2" color="textSecondary">
                      {stat.title}
                    </Typography>
                  </Box>
                  <Avatar sx={{ bgcolor: stat.color, width: 56, height: 56 }}>
                    {stat.icon}
                  </Avatar>
                </Box>
              </CardContent>
            </Card>
          </Grid>
        ))}
      </Grid>

      {/* Income Overview */}
      <Grid container spacing={3} sx={{ mt: 2 }}>
        <Grid item xs={12} md={8}>
          <Card>
            <CardContent>
              <Typography variant="h6" gutterBottom>
                Thu nhập ước tính tháng này
              </Typography>
              <Box display="flex" alignItems="center" gap={2} mb={3}>
                <Typography variant="h4" color="primary.main" fontWeight="bold">
                  {formatCurrency(incomeData.currentMonth)}
                </Typography>
                <Chip
                  label={`+${(
                    ((incomeData.currentMonth - incomeData.lastMonth) /
                      incomeData.lastMonth) *
                    100
                  ).toFixed(1)}%`}
                  color="success"
                  size="small"
                />
              </Box>

              <Box mb={3}>
                <Box display="flex" justifyContent="space-between" mb={1}>
                  <Typography variant="body2">Tiến độ đạt mục tiêu</Typography>
                  <Typography variant="body2">
                    {calculateProgress().toFixed(1)}%
                  </Typography>
                </Box>
                <LinearProgress
                  variant="determinate"
                  value={calculateProgress()}
                  sx={{ height: 8, borderRadius: 4 }}
                />
                <Typography variant="caption" color="textSecondary">
                  Mục tiêu: {formatCurrency(incomeData.target)}
                </Typography>
              </Box>

              <Divider sx={{ my: 2 }} />

              <Typography variant="h6" gutterBottom>
                Phân tích thu nhập
              </Typography>
              <Grid container spacing={2}>
                {incomeData.breakdown.map((item, index) => (
                  <Grid item xs={12} sm={6} key={index}>
                    <Box
                      display="flex"
                      justifyContent="space-between"
                      alignItems="center"
                      p={1}
                    >
                      <Box>
                        <Typography variant="body2" fontWeight="medium">
                          {item.source}
                        </Typography>
                        <Typography variant="caption" color="textSecondary">
                          {item.percentage}%
                        </Typography>
                      </Box>
                      <Typography variant="body2" fontWeight="bold">
                        {formatCurrency(item.amount)}
                      </Typography>
                    </Box>
                  </Grid>
                ))}
              </Grid>
            </CardContent>
          </Card>
        </Grid>

        <Grid item xs={12} md={4}>
          <Card>
            <CardContent>
              <Typography variant="h6" gutterBottom>
                Lịch sử thanh toán
              </Typography>
              <List>
                {incomeData.recentPayments.map((payment) => (
                  <ListItem key={payment.id} sx={{ px: 0 }}>
                    <ListItemAvatar>
                      <Avatar sx={{ bgcolor: "success.main" }}>
                        <MonetizationOn />
                      </Avatar>
                    </ListItemAvatar>
                    <ListItemText
                      primary={payment.description}
                      secondary={
                        <Box>
                          <Typography
                            variant="body2"
                            fontWeight="bold"
                            color="success.main"
                          >
                            {formatCurrency(payment.amount)}
                          </Typography>
                          <Typography variant="caption" color="textSecondary">
                            {new Date(payment.date).toLocaleDateString("vi-VN")}
                          </Typography>
                        </Box>
                      }
                    />
                    <Chip label={payment.status} color="success" size="small" />
                  </ListItem>
                ))}
              </List>
            </CardContent>
          </Card>
        </Grid>
      </Grid>

      <Grid container spacing={3} className={styles.contentGrid}>
        {/* Recent Activities */}
        <Grid item xs={12} md={6}>
          <Card>
            <CardContent>
              <Typography variant="h6" gutterBottom>
                Hoạt động gần đây
              </Typography>
              <List>
                {recentActivities.map((activity) => (
                  <ListItem key={activity.id} className={styles.activityItem}>
                    <ListItemAvatar>
                      <Avatar sx={{ bgcolor: "primary.main" }}>
                        <Notifications />
                      </Avatar>
                    </ListItemAvatar>
                    <ListItemText
                      primary={
                        <Box display="flex" alignItems="center" gap={1}>
                          <Typography variant="body1">
                            {activity.message}
                          </Typography>
                          <Chip
                            label={activity.type}
                            color={getStatusColor(activity.status)}
                            size="small"
                          />
                        </Box>
                      }
                      secondary={activity.time}
                    />
                  </ListItem>
                ))}
              </List>
            </CardContent>
          </Card>
        </Grid>

        {/* Upcoming Classes */}
        <Grid item xs={12} md={6}>
          <Card>
            <CardContent>
              <Typography variant="h6" gutterBottom>
                Lịch học hôm nay
              </Typography>
              <List>
                {upcomingClasses.map((classItem) => (
                  <ListItem key={classItem.id} className={styles.classItem}>
                    <ListItemAvatar>
                      <Avatar sx={{ bgcolor: "secondary.main" }}>
                        <Schedule />
                      </Avatar>
                    </ListItemAvatar>
                    <ListItemText
                      primary={classItem.subject}
                      secondary={
                        <Box>
                          <Typography variant="body2">
                            {classItem.time} - {classItem.room}
                          </Typography>
                          <Typography variant="body2" color="textSecondary">
                            {classItem.students} học sinh
                          </Typography>
                        </Box>
                      }
                    />
                  </ListItem>
                ))}
              </List>
            </CardContent>
          </Card>
        </Grid>
      </Grid>
    </div>
  );
};

export default TeacherDashboard;
