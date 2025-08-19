import React from "react";
import styles from "../../styles/TeacherDashboard.module.css";
import {
  Row,
  Col,
  Card,
  Typography,
  Avatar,
  List,
  Tag,
  Progress,
  Divider,
  Space,
} from "antd";
import {
  TeamOutlined,
  BookOutlined,
  ScheduleOutlined,
  DollarOutlined,
  MoneyCollectOutlined,
  ArrowUpOutlined,
  ArrowDownOutlined,
} from "@ant-design/icons";

const { Title, Text } = Typography;

const TeacherDashboard = () => {
  // Stats (đổi icon sang antd)
  const stats = [
    {
      title: "Tổng số học sinh",
      value: "45",
      icon: <TeamOutlined />,
      color: "#1976d2",
    },
    {
      title: "Khóa học đang dạy",
      value: "6",
      icon: <BookOutlined />,
      color: "#388e3c",
    },
    {
      title: "Buổi học hôm nay",
      value: "4",
      icon: <ScheduleOutlined />,
      color: "#f57c00",
    },
    {
      title: "Thu nhập tháng này",
      value: "15.2M",
      icon: <DollarOutlined />,
      color: "#2e7d32",
    },
  ];

  // Income data
  const incomeData = {
    currentMonth: 15200000,
    lastMonth: 14800000,
    target: 18000000,
    breakdown: [
      { source: "Lương cơ bản", amount: 8000000, percentage: 52.6 },
      { source: "Phụ cấp giờ dạy", amount: 4500000, percentage: 29.6 },
      { source: "Thưởng hiệu suất", amount: 2000000, percentage: 13.2 },
      { source: "Phụ cấp khác", amount: 700000, percentage: 4.6 },
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

  const formatCurrency = (amount) =>
    new Intl.NumberFormat("vi-VN", {
      style: "currency",
      currency: "VND",
      minimumFractionDigits: 0,
    }).format(amount);

  const progress = (incomeData.currentMonth / incomeData.target) * 100;
  const growthRate =
    ((incomeData.currentMonth - incomeData.lastMonth) / incomeData.lastMonth) *
    100;

  const statusColor = (status) =>
    status === "Đã thanh toán" ? "green" : "gold";

  return (
    <div className={styles.container}>
      {/* Header */}
      <div className={styles.header}>
        <Title level={3} className={styles.title}>
          Dashboard Giáo viên
        </Title>
        <Text type="secondary">Chào mừng trở lại, Cô Nguyễn Thị Mai</Text>
      </div>

      {/* Stats */}
      <Row gutter={[16, 16]} className={styles.statsRow}>
        {stats.map((s, idx) => (
          <Col xs={24} sm={12} md={6} key={idx}>
            <Card className={styles.statCard}>
              <div className={styles.statContent}>
                <div>
                  <div className={styles.statValue}>{s.value}</div>
                  <div className={styles.statTitle}>{s.title}</div>
                </div>
                <Avatar size={56} style={{ backgroundColor: s.color }}>
                  {s.icon}
                </Avatar>
              </div>
            </Card>
          </Col>
        ))}
      </Row>

      {/* Income Overview */}
      <Row gutter={[16, 16]} style={{ marginTop: 8 }}>
        <Col xs={24} md={16}>
          <Card className={styles.card}>
            <Title level={5} style={{ marginBottom: 12 }}>
              Thu nhập ước tính tháng này
            </Title>

            <Space align="center" size="middle" style={{ marginBottom: 16 }}>
              <Title level={3} style={{ margin: 0, color: "#1d3274" }}>
                {formatCurrency(incomeData.currentMonth)}
              </Title>
              <Tag
                color={growthRate >= 0 ? "green" : "red"}
                className={styles.growthTag}
              >
                {growthRate >= 0 ? <ArrowUpOutlined /> : <ArrowDownOutlined />}{" "}
                {Math.abs(growthRate).toFixed(1)}%
              </Tag>
            </Space>

            <div className={styles.progressRow}>
              <Text>Tiến độ đạt mục tiêu</Text>
              <Text strong>{progress.toFixed(1)}%</Text>
            </div>
            <Progress
              percent={Number(progress.toFixed(1))}
              showInfo={false}
              strokeColor="#1d3274"
            />
            <Text type="secondary">
              Mục tiêu: {formatCurrency(incomeData.target)}
            </Text>

            <Divider />

            <Title level={5} style={{ marginBottom: 12 }}>
              Phân tích thu nhập
            </Title>
            <Row gutter={[12, 12]}>
              {incomeData.breakdown.map((item, i) => (
                <Col xs={24} sm={12} key={i}>
                  <div className={styles.breakdownItem}>
                    <div>
                      <Text strong>{item.source}</Text>
                      <div className={styles.breakdownSub}>
                        {item.percentage}%
                      </div>
                    </div>
                    <Text strong>{formatCurrency(item.amount)}</Text>
                  </div>
                </Col>
              ))}
            </Row>
          </Card>
        </Col>

        {/* Recent Payments */}
        <Col xs={24} md={8}>
          <Card className={styles.card}>
            <Title level={5} style={{ marginBottom: 12 }}>
              Lịch sử thanh toán
            </Title>
            <List
              itemLayout="horizontal"
              dataSource={incomeData.recentPayments}
              renderItem={(p) => (
                <List.Item>
                  <List.Item.Meta
                    avatar={
                      <Avatar style={{ backgroundColor: "#22c55e" }}>
                        <MoneyCollectOutlined />
                      </Avatar>
                    }
                    title={<Text strong>{p.description}</Text>}
                    description={
                      <div>
                        <Text strong style={{ color: "#22c55e" }}>
                          {formatCurrency(p.amount)}
                        </Text>
                        <div>
                          <Text type="secondary">
                            {new Date(p.date).toLocaleDateString("vi-VN")}
                          </Text>
                        </div>
                      </div>
                    }
                  />
                  <Tag color={statusColor(p.status)}>{p.status}</Tag>
                </List.Item>
              )}
            />
          </Card>
        </Col>
      </Row>
    </div>
  );
};

export default TeacherDashboard;
