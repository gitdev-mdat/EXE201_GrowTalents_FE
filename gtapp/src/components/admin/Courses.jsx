import React, { useState } from "react";
import styles from "../../styles/Courses.module.css";
import math from "../../assets/Math1.svg";
import chemis from "../../assets/chemistry.svg";
import english from "../../assets/english1.svg";
import { FaEye, FaEdit, FaClock } from "react-icons/fa";
import CourseFormModal from "./CourseFormModal";

const allCourses = [
  {
    id: 1,
    img: math,
    title: "Toán cơ bản từ lý thuyết đến thực hành",
    creator: "Phạm Quốc Nga",
    lastEdit: "16/12/2024",
    status: "Đang diễn ra",
    fee: "2,000,000",
    mainTeacher: "Phạm Quốc Nga",
    startDate: "2024-01-01",
    schedule: {
      "Thứ 2": ["7:00 - 9:00", "13:00 - 15:00"],
      "Thứ 4": ["9:00 - 11:00", "15:00 - 17:00"],
      "Thứ 6": ["17:00 - 19:00"],
    },
  },
  {
    id: 2,
    img: chemis,
    title: "Hoá học cơ bản từ lý thuyết đến thực hành",
    creator: "Phạm Quốc Liên",
    lastEdit: "15/12/2024",
    status: "Chưa bắt đầu",
    fee: "1,800,000",
    mainTeacher: "Phạm Quốc Liên",
    startDate: "2024-02-01",
    schedule: {
      "Thứ 3": ["9:00 - 11:00", "15:00 - 17:00"],
      "Thứ 5": ["7:00 - 9:00", "13:00 - 15:00"],
      "Thứ 7": ["19:00 - 21:00"],
    },
  },
  {
    id: 3,
    img: english,
    title: "Tiếng Anh cơ bản từ lý thuyết đến thực hành",
    creator: "Phạm Quốc Nga",
    lastEdit: "16/12/2024",
    status: "Đã hoàn thành",
    fee: "2,200,000",
    mainTeacher: "Phạm Quốc Nga",
    startDate: "2023-12-01",
    schedule: {
      "Thứ 2": ["17:00 - 19:00"],
      "Thứ 4": ["19:00 - 21:00"],
      "Thứ 6": ["7:00 - 9:00", "13:00 - 15:00"],
    },
  },
  // Thêm các khóa học khác để kiểm tra phân trang
];

const Courses = () => {
  const [currentPage, setCurrentPage] = useState(1);
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedStatus, setSelectedStatus] = useState("Tất cả");
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [editingCourse, setEditingCourse] = useState(null);
  const [courses, setCourses] = useState(allCourses);

  const coursesPerPage = 6;

  const indexOfLastCourse = currentPage * coursesPerPage;
  const indexOfFirstCourse = indexOfLastCourse - coursesPerPage;

  const filteredCourses = courses.filter((course) => {
    const isStatusMatch =
      selectedStatus === "Tất cả" || course.status === selectedStatus;
    const isSearchMatch = course.title
      .toLowerCase()
      .includes(searchTerm.toLowerCase());

    return isStatusMatch && isSearchMatch;
  });

  const currentCourses = filteredCourses.slice(
    indexOfFirstCourse,
    indexOfLastCourse
  );

  const paginate = (pageNumber) => {
    setCurrentPage(pageNumber);
  };

  const totalPages = Math.ceil(filteredCourses.length / coursesPerPage);

  const handleAddCourse = () => {
    setEditingCourse(null);
    setIsModalOpen(true);
  };

  const handleEditCourse = (course) => {
    setEditingCourse(course);
    setIsModalOpen(true);
  };

  const handleSubmitCourse = (formData) => {
    if (editingCourse) {
      // Update existing course
      setCourses((prevCourses) =>
        prevCourses.map((course) =>
          course.id === editingCourse.id
            ? {
                ...course,
                ...formData,
                lastEdit: new Date().toLocaleDateString("vi-VN"),
              }
            : course
        )
      );
    } else {
      // Add new course
      const newCourse = {
        id: courses.length + 1,
        ...formData,
        status: "Chưa bắt đầu",
        creator: "Phạm Quốc Nga", // Default creator
        lastEdit: new Date().toLocaleDateString("vi-VN"),
      };
      setCourses((prevCourses) => [...prevCourses, newCourse]);
    }
  };

  const formatSchedule = (schedule) => {
    return Object.entries(schedule)
      .map(([day, times]) => `${day}: ${times.join(", ")}`)
      .join(" | ");
  };

  return (
    <div className={styles.container}>
      <div className={styles["search-section"]}>
        <input
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
          placeholder="Search by name"
        />
        <select
          value={selectedStatus}
          onChange={(e) => setSelectedStatus(e.target.value)}
        >
          <option value="Tất cả">Tất cả trạng thái</option>
          <option value="Đang diễn ra">Đang diễn ra</option>
          <option value="Chưa bắt đầu">Chưa bắt đầu</option>
          <option value="Đã hoàn thành">Đã hoàn thành</option>
        </select>
        <button onClick={handleAddCourse}>Thêm khóa học</button>
      </div>

      <div className={styles["course-list"]}>
        {currentCourses.map((course, index) => (
          <div className={styles["course-card"]} key={index}>
            <img src={course.img} className={styles.image} alt={course.title} />
            <div className={styles.content}>
              <div className={styles.title}>{course.title}</div>
              <div className={styles.info}>Người tạo: {course.creator}</div>
              <div className={styles.info}>
                Chỉnh sửa lần cuối: {course.lastEdit}
              </div>
              <div className={styles.info}>Học phí: {course.fee} VNĐ</div>
              <div className={styles.info}>
                Giáo viên: {course.mainTeacher}
              </div>
              <div className={styles.info}>
                Ngày bắt đầu: {course.startDate}
              </div>
              <div className={styles.schedule}>
                <FaClock className={styles.scheduleIcon} />
                <div className={styles.scheduleText}>
                  {formatSchedule(course.schedule)}
                </div>
              </div>
              <div className={styles["status-container"]}>
                <label
                  className={
                    styles[
                      `status-${
                        course.status === "Đang diễn ra"
                          ? "ongoing"
                          : course.status === "Chưa bắt đầu"
                          ? "pending"
                          : "completed"
                      }`
                    ]
                  }
                >
                  {course.status}
                </label>

                <div className={styles["button-group"]}>
                  <button
                    className={styles["edit-button"]}
                    onClick={() => handleEditCourse(course)}
                  >
                    <FaEdit /> Edit
                  </button>
                  {(course.status === "Đang diễn ra" ||
                    course.status === "Đã hoàn thành") && (
                    <button className={styles["view-class-button"]}>
                      <FaEye /> View Class
                    </button>
                  )}
                </div>
              </div>
            </div>
          </div>
        ))}
      </div>

      {/* Pagination */}
      <div className={styles.pagination}>
        <button
          onClick={() => paginate(currentPage - 1)}
          disabled={currentPage === 1}
          className={currentPage === 1 ? styles.disabled : ""}
        >
          Previous
        </button>
        {Array.from({ length: totalPages }, (_, index) => (
          <button
            key={index}
            onClick={() => paginate(index + 1)}
            className={currentPage === index + 1 ? styles.active : ""}
          >
            {index + 1}
          </button>
        ))}
        <button
          onClick={() => paginate(currentPage + 1)}
          disabled={currentPage === totalPages}
          className={currentPage === totalPages ? styles.disabled : ""}
        >
          Next
        </button>
      </div>

      <CourseFormModal
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
        onSubmit={handleSubmitCourse}
        initialData={editingCourse}
      />
    </div>
  );
};

export default Courses;
