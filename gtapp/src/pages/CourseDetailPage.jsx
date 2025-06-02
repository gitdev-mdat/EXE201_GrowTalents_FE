import React, { useState } from "react";
import { Collapse, Tabs } from "antd";
import { PlusOutlined } from "@ant-design/icons";
import { CaretRightOutlined } from "@ant-design/icons";
import AutoStoriesIcon from "@mui/icons-material/AutoStories";
import styles from "../styles/CourseDetailPage.module.css"; // Import CSS Module
import anh1 from "../assets/detail1.svg";
const { TabPane } = Tabs;
const { Panel } = Collapse;

const text = `Lorem ipsum dolor sit amet, consectetur adipiscing elit. Integer nec odio. Praesent libero. Sed cursus ante dapibus diam.`;

// Dữ liệu bài học
const mathItems = [
  { key: "1", title: "Giới thiệu về Toán 6", content: text },
  { key: "2", title: "Tập hợp. Phần tử của tập hợp", content: text },
  { key: "3", title: "Ghi số tự nhiên", content: text },
  { key: "4", title: "Thứ tự trong tập hợp", content: text },
  { key: "5", title: "Tập hợp", content: text },
];

const geometryItems = [
  { key: "1", title: "Hình học cơ bản", content: text },
  { key: "2", title: "Các hình học không gian", content: text },
  { key: "3", title: "Tam giác đều", content: text },
  { key: "4", title: "Tam giác vuông cân", content: text },
  { key: "5", title: "Hình chữ nhật", content: text },
];

const CourseDetailPage = () => {
  return (
    <div className={styles.courseDetailContainer}>
      <div className={styles.courseLeft}>
        <div className={styles.courseName}>
          Toán 6 - Cơ bản từ lý thuyết đến thực hành
        </div>

        <div className={styles.courseWhatYouWillLearn}>Bạn sẽ học được gì?</div>

        <div className={styles.courseContent}>
          <div className={styles.courseContentTitle}>Nội dung khóa học</div>
          <div className={styles.courseContentStats}>
            <span className={styles.chapterCount}>6 chương</span>
            <span className={styles.lessonCount}>40 bài học</span>
          </div>

          {/* Sử dụng Tabs để phân chia các nhóm Toán số và Toán hình */}
          <Tabs defaultActiveKey="1" centered>
            {/* Tab "Toán số" */}
            <TabPane
              tab={<span className={styles.tabTitle}>Toán Số</span>}
              key="1"
            >
              <Collapse
                bordered={false}
                defaultActiveKey={["1"]}
                expandIcon={({ isActive }) => (
                  <CaretRightOutlined rotate={isActive ? 90 : 0} />
                )}
                style={{ background: "#fff" }}
              >
                {mathItems.map((item) => (
                  <Panel
                    key={item.key}
                    header={
                      <div className={styles.collapseHeader}>{item.title}</div>
                    }
                  >
                    <div className={styles.collapseContent}>
                      <p>{item.content}</p>
                      <AutoStoriesIcon style={{ marginRight: 10 }} />
                      Bài tập liên quan
                    </div>
                  </Panel>
                ))}
              </Collapse>
            </TabPane>

            {/* Tab "Toán hình" */}
            <TabPane
              tab={<span className={styles.tabTitle}>Toán Hình</span>}
              key="2"
            >
              <Collapse
                bordered={false}
                defaultActiveKey={["1"]}
                expandIcon={({ isActive }) => (
                  <CaretRightOutlined rotate={isActive ? 90 : 0} />
                )}
                style={{ background: "#fff" }}
              >
                {geometryItems.map((item) => (
                  <Panel
                    key={item.key}
                    header={
                      <div className={styles.collapseHeader}>{item.title}</div>
                    }
                  >
                    <div className={styles.collapseContent}>
                      <p>{item.content}</p>
                      <AutoStoriesIcon style={{ marginRight: 10 }} />
                      Bài tập liên quan
                    </div>
                  </Panel>
                ))}
              </Collapse>
            </TabPane>
          </Tabs>
        </div>
      </div>

      <div className={styles.courseRight}>
        <div className={styles.otherContent}>
          <div className={styles.imageContainer}>
            <img src={anh1} className={styles.courseImage} alt="Course Image" />
          </div>
          <div className={styles.courseDetails}>
            <div className={styles.detailItem}>
              <strong>Thời gian học:</strong> 3 tháng
            </div>
            <div className={styles.detailItem}>
              <strong>Số buổi học:</strong> 72 buổi
            </div>
            {/* <div className={styles.detailItem}>
              <strong>Số điểm tối thiểu đạt được:</strong> 9 điểm
            </div> */}
          </div>

          {/* Nút Đăng ký và Thêm vào giỏ hàng */}
          <div className={styles.buttonsContainer}>
            <button className={styles.registerButton}>Đăng ký</button>
            <button className={styles.addToCartButton}>Vào giỏ</button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default CourseDetailPage;
