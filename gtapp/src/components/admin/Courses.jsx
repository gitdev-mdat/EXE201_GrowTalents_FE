import React, { useState } from "react";
import styles from "../../styles/Courses.module.css";
import math from "../../assets/Math1.svg";
import chemis from "../../assets/chemistry.svg";
import english from "../../assets/english1.svg";
import { FaEye } from "react-icons/fa";

const allCourses = [
  {
    img: math,
    title: "Toán cơ bản từ lý thuyết đến thực hành",
    creator: "Phạm Quốc Nga",
    lastEdit: "16/12/2024",
    status: "Đang diễn ra",
  },
  {
    img: chemis,
    title: "Hoá học cơ bản từ lý thuyết đến thực hành",
    creator: "Phạm Quốc Liên",
    lastEdit: "15/12/2024",
    status: "Chưa bắt đầu",
  },
  {
    img: english,
    title: "Tiếng Anh cơ bản từ lý thuyết đến thực hành",
    creator: "Phạm Quốc Nga",
    lastEdit: "16/12/2024",
    status: "Đã hoàn thành",
  },
  // Thêm các khóa học khác để kiểm tra phân trang
];

const Courses = () => {
  const [currentPage, setCurrentPage] = useState(1);
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedStatus, setSelectedStatus] = useState("Tất cả");

  const coursesPerPage = 6;

  const indexOfLastCourse = currentPage * coursesPerPage;
  const indexOfFirstCourse = indexOfLastCourse - coursesPerPage;

  const filteredCourses = allCourses.filter((course) => {
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
        <button>Add Courses</button>
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

                {/* Chỉ hiển thị View Class nếu trạng thái là "Đang diễn ra" hoặc "Đã hoàn thành" */}
                {(course.status === "Đang diễn ra" ||
                  course.status === "Đã hoàn thành") && (
                  <button className={styles["view-class-button"]}>
                    <FaEye /> View Class
                  </button>
                )}
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
    </div>
  );
};

export default Courses;
