import React, { useState } from "react";
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
  CardContent,
  Chip,
  IconButton,
  Select,
  MenuItem,
  FormControl,
  InputLabel,
} from "@mui/material";
import {
  BarChart,
  Bar,
  LineChart,
  Line,
  AreaChart,
  Area,
  PieChart,
  Pie,
  Cell,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
  ResponsiveContainer,
  RadarChart,
  PolarGrid,
  PolarAngleAxis,
  PolarRadiusAxis,
  Radar,
  ComposedChart,
} from "recharts";
import {
  TrendingUp,
  TrendingDown,
  PeopleAlt,
  School,
  AttachMoney,
  Assignment,
  BarChart as BarChartIcon,
  ShowChart,
  PieChart as PieChartIcon,
  Timeline,
} from "@mui/icons-material";
import styles from "../../styles/SummaryReport.module.css";

// Mock data for charts with improved structure
const tuitionData = [
  { month: "T1", amount: 50000000, target: 45000000, growth: 11 },
  { month: "T2", amount: 65000000, target: 60000000, growth: 30 },
  { month: "T3", amount: 75000000, target: 70000000, growth: 15.4 },
  { month: "T4", amount: 80000000, target: 75000000, growth: 6.7 },
  { month: "T5", amount: 85000000, target: 80000000, growth: 6.3 },
  { month: "T6", amount: 90000000, target: 85000000, growth: 5.9 },
];

const studentData = [
  { month: "T1", count: 50, new: 15, retention: 85 },
  { month: "T2", count: 65, new: 20, retention: 92 },
  { month: "T3", count: 75, new: 18, retention: 88 },
  { month: "T4", count: 80, new: 12, retention: 95 },
  { month: "T5", count: 85, new: 10, retention: 94 },
  { month: "T6", count: 90, new: 8, retention: 96 },
];

const attendanceData = [
  { month: "T1", rate: 95, target: 90 },
  { month: "T2", rate: 92, target: 90 },
  { month: "T3", rate: 94, target: 90 },
  { month: "T4", rate: 96, target: 90 },
  { month: "T5", rate: 93, target: 90 },
  { month: "T6", rate: 95, target: 90 },
];

const teacherSalaryData = [
  { month: "T1", amount: 30000000, bonus: 5000000 },
  { month: "T2", amount: 32000000, bonus: 6000000 },
  { month: "T3", amount: 35000000, bonus: 7000000 },
  { month: "T4", amount: 38000000, bonus: 8000000 },
  { month: "T5", amount: 40000000, bonus: 9000000 },
  { month: "T6", amount: 42000000, bonus: 10000000 },
];

// Subject distribution data
const subjectDistribution = [
  { name: "Toán", value: 35, color: "#0088FE" },
  { name: "Lý", value: 25, color: "#00C49F" },
  { name: "Hóa", value: 20, color: "#FFBB28" },
  { name: "Văn", value: 15, color: "#FF8042" },
  { name: "Anh", value: 5, color: "#8884D8" },
];

// Performance radar data
const performanceData = [
  { subject: "Toán", score: 85, fullMark: 100 },
  { subject: "Lý", score: 78, fullMark: 100 },
  { subject: "Hóa", score: 92, fullMark: 100 },
  { subject: "Văn", score: 88, fullMark: 100 },
  { subject: "Anh", score: 95, fullMark: 100 },
];

// Chart colors
const COLORS = ["#0088FE", "#00C49F", "#FFBB28", "#FF8042", "#8884D8"];
const gradientColors = {
  tuition: ["#667eea", "#764ba2"],
  students: ["#f093fb", "#f5576c"],
  attendance: ["#4facfe", "#00f2fe"],
  salary: ["#43e97b", "#38f9d7"],
};
const Dashboard = () => {
  const [selectedReport, setSelectedReport] = useState("tuition");
  const [chartType, setChartType] = useState("bar");

  // Calculate summary statistics
  const summaryStats = {
    totalRevenue: tuitionData.reduce((sum, item) => sum + item.amount, 0),
    totalStudents: studentData[studentData.length - 1]?.count || 0,
    avgAttendance: Math.round(
      attendanceData.reduce((sum, item) => sum + item.rate, 0) /
        attendanceData.length
    ),
    totalSalary: teacherSalaryData.reduce(
      (sum, item) => sum + item.amount + item.bonus,
      0
    ),
  };

  const formatCurrency = (value) => {
    return new Intl.NumberFormat("vi-VN", {
      style: "currency",
      currency: "VND",
    }).format(value);
  };

  const renderStatCards = () => (
    <Grid container spacing={3} className={styles.statsContainer}>
      <Grid item xs={12} sm={6} md={3}>
        <Card
          className={styles.statCard}
          style={{ borderLeft: "4px solid #667eea" }}
        >
          <CardContent className={styles.statContent}>
            <Box
              display="flex"
              alignItems="center"
              justifyContent="space-between"
            >
              <Box>
                <Typography variant="h6" className={styles.statTitle}>
                  Tổng Doanh Thu
                </Typography>
                <Typography variant="h4" className={styles.statValue}>
                  {formatCurrency(summaryStats.totalRevenue)}
                </Typography>
                <Chip
                  icon={<TrendingUp />}
                  label="+12.5%"
                  size="small"
                  className={styles.trendChip}
                  style={{ backgroundColor: "#e8f5e8", color: "#2e7d32" }}
                />
              </Box>
              <AttachMoney
                className={styles.statIcon}
                style={{ color: "#667eea" }}
              />
            </Box>
          </CardContent>
        </Card>
      </Grid>

      <Grid item xs={12} sm={6} md={3}>
        <Card
          className={styles.statCard}
          style={{ borderLeft: "4px solid #f093fb" }}
        >
          <CardContent className={styles.statContent}>
            <Box
              display="flex"
              alignItems="center"
              justifyContent="space-between"
            >
              <Box>
                <Typography variant="h6" className={styles.statTitle}>
                  Tổng Học Viên
                </Typography>
                <Typography variant="h4" className={styles.statValue}>
                  {summaryStats.totalStudents}
                </Typography>
                <Chip
                  icon={<TrendingUp />}
                  label="+8.2%"
                  size="small"
                  className={styles.trendChip}
                  style={{ backgroundColor: "#e8f5e8", color: "#2e7d32" }}
                />
              </Box>
              <PeopleAlt
                className={styles.statIcon}
                style={{ color: "#f093fb" }}
              />
            </Box>
          </CardContent>
        </Card>
      </Grid>

      <Grid item xs={12} sm={6} md={3}>
        <Card
          className={styles.statCard}
          style={{ borderLeft: "4px solid #4facfe" }}
        >
          <CardContent className={styles.statContent}>
            <Box
              display="flex"
              alignItems="center"
              justifyContent="space-between"
            >
              <Box>
                <Typography variant="h6" className={styles.statTitle}>
                  Điểm Danh TB
                </Typography>
                <Typography variant="h4" className={styles.statValue}>
                  {summaryStats.avgAttendance}%
                </Typography>
                <Chip
                  icon={<TrendingUp />}
                  label="+2.1%"
                  size="small"
                  className={styles.trendChip}
                  style={{ backgroundColor: "#e8f5e8", color: "#2e7d32" }}
                />
              </Box>
              <School
                className={styles.statIcon}
                style={{ color: "#4facfe" }}
              />
            </Box>
          </CardContent>
        </Card>
      </Grid>

      <Grid item xs={12} sm={6} md={3}>
        <Card
          className={styles.statCard}
          style={{ borderLeft: "4px solid #43e97b" }}
        >
          <CardContent className={styles.statContent}>
            <Box
              display="flex"
              alignItems="center"
              justifyContent="space-between"
            >
              <Box>
                <Typography variant="h6" className={styles.statTitle}>
                  Chi Phí Nhân Sự
                </Typography>
                <Typography variant="h4" className={styles.statValue}>
                  {formatCurrency(summaryStats.totalSalary)}
                </Typography>
                <Chip
                  icon={<TrendingUp />}
                  label="+15.3%"
                  size="small"
                  className={styles.trendChip}
                  style={{ backgroundColor: "#ffebee", color: "#d32f2f" }}
                />
              </Box>
              <Assignment
                className={styles.statIcon}
                style={{ color: "#43e97b" }}
              />
            </Box>
          </CardContent>
        </Card>
      </Grid>
    </Grid>
  );

  const renderChart = () => {
    const data = {
      tuition: tuitionData,
      students: studentData,
      attendance: attendanceData,
      salary: teacherSalaryData,
    }[selectedReport];

    const colors = gradientColors[selectedReport];

    switch (chartType) {
      case "bar":
        if (selectedReport === "tuition") {
          return (
            <ResponsiveContainer width="100%" height={400}>
              <ComposedChart data={data}>
                <defs>
                  <linearGradient
                    id="tuitionGradient"
                    x1="0"
                    y1="0"
                    x2="0"
                    y2="1"
                  >
                    <stop offset="5%" stopColor={colors[0]} stopOpacity={0.8} />
                    <stop
                      offset="95%"
                      stopColor={colors[1]}
                      stopOpacity={0.6}
                    />
                  </linearGradient>
                </defs>
                <CartesianGrid strokeDasharray="3 3" stroke="#f0f0f0" />
                <XAxis dataKey="month" stroke="#666" />
                <YAxis stroke="#666" />
                <Tooltip
                  contentStyle={{
                    backgroundColor: "#fff",
                    border: "1px solid #e0e0e0",
                    borderRadius: "8px",
                    boxShadow: "0 4px 12px rgba(0,0,0,0.1)",
                  }}
                />
                <Legend />
                <Bar
                  dataKey="amount"
                  name="Doanh thu thực tế"
                  fill="url(#tuitionGradient)"
                  radius={[4, 4, 0, 0]}
                />
                <Line
                  type="monotone"
                  dataKey="target"
                  name="Mục tiêu"
                  stroke="#ff6b6b"
                  strokeWidth={3}
                />
              </ComposedChart>
            </ResponsiveContainer>
          );
        }
        return (
          <ResponsiveContainer width="100%" height={400}>
            <BarChart data={data}>
              <defs>
                <linearGradient
                  id={`${selectedReport}Gradient`}
                  x1="0"
                  y1="0"
                  x2="0"
                  y2="1"
                >
                  <stop offset="5%" stopColor={colors[0]} stopOpacity={0.8} />
                  <stop offset="95%" stopColor={colors[1]} stopOpacity={0.6} />
                </linearGradient>
              </defs>
              <CartesianGrid strokeDasharray="3 3" stroke="#f0f0f0" />
              <XAxis dataKey="month" stroke="#666" />
              <YAxis stroke="#666" />
              <Tooltip
                contentStyle={{
                  backgroundColor: "#fff",
                  border: "1px solid #e0e0e0",
                  borderRadius: "8px",
                  boxShadow: "0 4px 12px rgba(0,0,0,0.1)",
                }}
              />
              <Legend />
              <Bar
                dataKey={
                  selectedReport === "students"
                    ? "count"
                    : selectedReport === "attendance"
                    ? "rate"
                    : "amount"
                }
                name={
                  selectedReport === "students"
                    ? "Số học viên"
                    : selectedReport === "attendance"
                    ? "Tỷ lệ điểm danh"
                    : "Lương cơ bản"
                }
                fill={`url(#${selectedReport}Gradient)`}
                radius={[4, 4, 0, 0]}
              />
              {selectedReport === "salary" && (
                <Bar
                  dataKey="bonus"
                  name="Thưởng"
                  fill="#ffd93d"
                  radius={[4, 4, 0, 0]}
                />
              )}
            </BarChart>
          </ResponsiveContainer>
        );

      case "line":
        return (
          <ResponsiveContainer width="100%" height={400}>
            <LineChart data={data}>
              <defs>
                <linearGradient
                  id={`${selectedReport}Area`}
                  x1="0"
                  y1="0"
                  x2="0"
                  y2="1"
                >
                  <stop offset="5%" stopColor={colors[0]} stopOpacity={0.8} />
                  <stop offset="95%" stopColor={colors[1]} stopOpacity={0.1} />
                </linearGradient>
              </defs>
              <CartesianGrid strokeDasharray="3 3" stroke="#f0f0f0" />
              <XAxis dataKey="month" stroke="#666" />
              <YAxis stroke="#666" />
              <Tooltip
                contentStyle={{
                  backgroundColor: "#fff",
                  border: "1px solid #e0e0e0",
                  borderRadius: "8px",
                  boxShadow: "0 4px 12px rgba(0,0,0,0.1)",
                }}
              />
              <Legend />
              <Line
                type="monotone"
                dataKey={
                  selectedReport === "students"
                    ? "count"
                    : selectedReport === "attendance"
                    ? "rate"
                    : "amount"
                }
                stroke={colors[0]}
                strokeWidth={3}
                dot={{ fill: colors[0], strokeWidth: 2, r: 6 }}
                activeDot={{ r: 8, stroke: colors[0], strokeWidth: 2 }}
              />
            </LineChart>
          </ResponsiveContainer>
        );

      case "area":
        return (
          <ResponsiveContainer width="100%" height={400}>
            <AreaChart data={data}>
              <defs>
                <linearGradient
                  id={`${selectedReport}AreaGrad`}
                  x1="0"
                  y1="0"
                  x2="0"
                  y2="1"
                >
                  <stop offset="5%" stopColor={colors[0]} stopOpacity={0.8} />
                  <stop offset="95%" stopColor={colors[1]} stopOpacity={0.1} />
                </linearGradient>
              </defs>
              <CartesianGrid strokeDasharray="3 3" stroke="#f0f0f0" />
              <XAxis dataKey="month" stroke="#666" />
              <YAxis stroke="#666" />
              <Tooltip
                contentStyle={{
                  backgroundColor: "#fff",
                  border: "1px solid #e0e0e0",
                  borderRadius: "8px",
                  boxShadow: "0 4px 12px rgba(0,0,0,0.1)",
                }}
              />
              <Legend />
              <Area
                type="monotone"
                dataKey={
                  selectedReport === "students"
                    ? "count"
                    : selectedReport === "attendance"
                    ? "rate"
                    : "amount"
                }
                stroke={colors[0]}
                fillOpacity={1}
                fill={`url(#${selectedReport}AreaGrad)`}
                strokeWidth={2}
              />
            </AreaChart>
          </ResponsiveContainer>
        );

      default:
        return null;
    }
  };

  const renderAdditionalCharts = () => (
    <Grid container spacing={3}>
      <Grid item xs={12} md={6}>
        <Paper className={styles.chartContainer}>
          <Typography variant="h6" className={styles.chartTitle}>
            Phân Bố Môn Học
          </Typography>
          <ResponsiveContainer width="100%" height={300}>
            <PieChart>
              <Pie
                data={subjectDistribution}
                cx="50%"
                cy="50%"
                outerRadius={80}
                fill="#8884d8"
                dataKey="value"
                label={({ name, percent }) =>
                  `${name} ${(percent * 100).toFixed(0)}%`
                }
              >
                {subjectDistribution.map((entry, index) => (
                  <Cell
                    key={`cell-${index}`}
                    fill={COLORS[index % COLORS.length]}
                  />
                ))}
              </Pie>
              <Tooltip />
            </PieChart>
          </ResponsiveContainer>
        </Paper>
      </Grid>

      <Grid item xs={12} md={6}>
        <Paper className={styles.chartContainer}>
          <Typography variant="h6" className={styles.chartTitle}>
            Hiệu Suất Theo Môn
          </Typography>
          <ResponsiveContainer width="100%" height={300}>
            <RadarChart data={performanceData}>
              <PolarGrid />
              <PolarAngleAxis dataKey="subject" />
              <PolarRadiusAxis angle={90} domain={[0, 100]} />
              <Radar
                name="Điểm số"
                dataKey="score"
                stroke="#8884d8"
                fill="#8884d8"
                fillOpacity={0.6}
                strokeWidth={2}
              />
              <Tooltip />
            </RadarChart>
          </ResponsiveContainer>
        </Paper>
      </Grid>
    </Grid>
  );

  return (
    <div className={styles.container}>
      <div className={styles.header}>
        <Typography variant="h4" className={styles.title}>
          📊 Báo Cáo Tổng Hợp
        </Typography>
        <div className={styles.exportButtons}>
          <Button
            variant="contained"
            className={styles.exportBtn}
            startIcon={<Timeline />}
          >
            Xuất PDF
          </Button>
          <Button
            variant="outlined"
            className={styles.exportBtn}
            startIcon={<BarChartIcon />}
          >
            Xuất Excel
          </Button>
        </div>
      </div>

      {renderStatCards()}

      <Grid container spacing={3}>
        <Grid item xs={12}>
          <Paper className={styles.controlsContainer}>
            <Box display="flex" alignItems="center" gap={2} flexWrap="wrap">
              <Typography variant="h6">Chọn báo cáo:</Typography>
              <Box className={styles.reportButtons}>
                <Button
                  variant={
                    selectedReport === "tuition" ? "contained" : "outlined"
                  }
                  onClick={() => setSelectedReport("tuition")}
                  className={
                    selectedReport === "tuition" ? styles.activeButton : ""
                  }
                  startIcon={<AttachMoney />}
                >
                  Doanh Thu
                </Button>
                <Button
                  variant={
                    selectedReport === "students" ? "contained" : "outlined"
                  }
                  onClick={() => setSelectedReport("students")}
                  className={
                    selectedReport === "students" ? styles.activeButton : ""
                  }
                  startIcon={<PeopleAlt />}
                >
                  Học Viên
                </Button>
                <Button
                  variant={
                    selectedReport === "attendance" ? "contained" : "outlined"
                  }
                  onClick={() => setSelectedReport("attendance")}
                  className={
                    selectedReport === "attendance" ? styles.activeButton : ""
                  }
                  startIcon={<School />}
                >
                  Điểm Danh
                </Button>
                <Button
                  variant={
                    selectedReport === "salary" ? "contained" : "outlined"
                  }
                  onClick={() => setSelectedReport("salary")}
                  className={
                    selectedReport === "salary" ? styles.activeButton : ""
                  }
                  startIcon={<Assignment />}
                >
                  Lương
                </Button>
              </Box>

              <FormControl
                variant="outlined"
                size="small"
                style={{ minWidth: 120 }}
              >
                <InputLabel>Loại biểu đồ</InputLabel>
                <Select
                  value={chartType}
                  onChange={(e) => setChartType(e.target.value)}
                  label="Loại biểu đồ"
                >
                  <MenuItem value="bar">
                    <Box display="flex" alignItems="center" gap={1}>
                      <BarChartIcon fontSize="small" />
                      Cột
                    </Box>
                  </MenuItem>
                  <MenuItem value="line">
                    <Box display="flex" alignItems="center" gap={1}>
                      <ShowChart fontSize="small" />
                      Đường
                    </Box>
                  </MenuItem>
                  <MenuItem value="area">
                    <Box display="flex" alignItems="center" gap={1}>
                      <Timeline fontSize="small" />
                      Vùng
                    </Box>
                  </MenuItem>
                </Select>
              </FormControl>
            </Box>
          </Paper>
        </Grid>

        <Grid item xs={12}>
          <Paper className={styles.chartContainer}>
            <Typography variant="h6" className={styles.chartTitle}>
              {selectedReport === "tuition" && "Báo Cáo Doanh Thu"}
              {selectedReport === "students" && "Thống Kê Học Viên"}
              {selectedReport === "attendance" && "Tỷ Lệ Điểm Danh"}
              {selectedReport === "salary" && "Chi Phí Nhân Sự"}
            </Typography>
            {renderChart()}
          </Paper>
        </Grid>

        <Grid item xs={12}>
          {renderAdditionalCharts()}
        </Grid>

        <Grid item xs={12}>
          <TableContainer component={Paper} className={styles.tableContainer}>
            <Typography variant="h6" className={styles.tableTitle}>
              Chi Tiết Dữ Liệu
            </Typography>
            <Table>
              <TableHead className={styles.tableHead}>
                <TableRow>
                  <TableCell className={styles.tableHeaderCell}>
                    Tháng
                  </TableCell>
                  <TableCell align="right" className={styles.tableHeaderCell}>
                    Giá trị
                  </TableCell>
                  <TableCell align="right" className={styles.tableHeaderCell}>
                    Thay đổi
                  </TableCell>
                  <TableCell align="right" className={styles.tableHeaderCell}>
                    Tỷ lệ tăng trưởng
                  </TableCell>
                </TableRow>
              </TableHead>
              <TableBody>
                {tuitionData.map((row, index) => (
                  <TableRow key={row.month} className={styles.tableRow}>
                    <TableCell className={styles.tableCell}>
                      {row.month}
                    </TableCell>
                    <TableCell align="right" className={styles.tableCell}>
                      {formatCurrency(row.amount)}
                    </TableCell>
                    <TableCell align="right" className={styles.tableCell}>
                      {index > 0 ? (
                        <Box
                          display="flex"
                          alignItems="center"
                          justifyContent="flex-end"
                          gap={1}
                        >
                          {row.amount > tuitionData[index - 1].amount ? (
                            <TrendingUp
                              fontSize="small"
                              style={{ color: "#2e7d32" }}
                            />
                          ) : (
                            <TrendingDown
                              fontSize="small"
                              style={{ color: "#d32f2f" }}
                            />
                          )}
                          {formatCurrency(
                            Math.abs(row.amount - tuitionData[index - 1].amount)
                          )}
                        </Box>
                      ) : (
                        "-"
                      )}
                    </TableCell>
                    <TableCell align="right" className={styles.tableCell}>
                      {index > 0 ? (
                        <Chip
                          label={`${(
                            ((row.amount - tuitionData[index - 1].amount) /
                              tuitionData[index - 1].amount) *
                            100
                          ).toFixed(2)}%`}
                          size="small"
                          style={{
                            backgroundColor:
                              row.amount > tuitionData[index - 1].amount
                                ? "#e8f5e8"
                                : "#ffebee",
                            color:
                              row.amount > tuitionData[index - 1].amount
                                ? "#2e7d32"
                                : "#d32f2f",
                          }}
                        />
                      ) : (
                        "-"
                      )}
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

export default Dashboard;
