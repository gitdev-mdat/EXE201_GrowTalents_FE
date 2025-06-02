import React, { useState } from "react";
import Grid from "@mui/material/Grid";
import styles from "../../styles/Students.module.css";
import studentImage from "../../assets/test.jpg";
import { Phone, LocationOn, Cake, School } from "@mui/icons-material";

const Students = () => {
  // Danh sách dữ liệu học sinh
  const students = [
    {
      id: 1,
      name: "Nguyễn Văn A",
      email: "nguyenvanadaknong@gmail.com",
      class: "Giao tiếp tiếng Anh",
      grade: "Khối 6",
      gender: "Nam",
      phone: "0982123124",
      address: "187/11 đường số 28, phường 6, Gò Vấp",
      dob: "02/09/2003",
    },
    {
      id: 2,
      name: "Trần Thị B",
      email: "tranthibdaknong@gmail.com",
      class: "Toán nâng cao",
      grade: "Khối 7",
      gender: "Nữ",
      phone: "0912345678",
      address: "123 Lê Lợi, Phường 1, Quận 3",
      dob: "15/05/2004",
    },
    {
      id: 3,
      name: "Lê Văn C",
      email: "levancdaknong@gmail.com",
      class: "Lý nâng cao",
      grade: "Khối 8",
      gender: "Nam",
      phone: "0908765432",
      address: "456 Hoàng Hoa Thám, Phường 6, Quận 10",
      dob: "12/12/2005",
    },
    {
      id: 4,
      name: "Lê Văn D",
      email: "levanDdaknong@gmail.com",
      class: "Lý nâng cao",
      grade: "Khối 8",
      gender: "Nam",
      phone: "0908765432",
      address: "456 Hoàng Hoa Thám, Phường 6, Quận 10",
      dob: "12/12/2005",
    },
    {
      id: 5,
      name: "Lê Văn E",
      email: "levanedaknong@gmail.com",
      class: "Lý nâng cao",
      grade: "Khối 8",
      gender: "Nam",
      phone: "0908765432",
      address: "456 Hoàng Hoa Thám, Phường 6, Quận 10",
      dob: "12/12/2005",
    },
    {
      id: 6,
      name: "Lê Văn G",
      email: "levangdaknong@gmail.com",
      class: "Lý nâng cao",
      grade: "Khối 8",
      gender: "Nam",
      phone: "0908765432",
      address: "456 Hoàng Hoa Thám, Phường 6, Quận 10",
      dob: "12/12/2005",
    },
  ];

  // State lưu trữ thông tin học sinh được chọn
  const [selectedStudent, setSelectedStudent] = useState(students[0]);
  const [currentPage, setCurrentPage] = useState(1);
  const studentsPerPage = 3;

  // Hàm xử lý khi bấm vào học sinh
  const handleStudentClick = (student) => {
    setSelectedStudent(student);
  };

  // Hàm tính toán trang hiện tại
  const indexOfLastStudent = currentPage * studentsPerPage;
  const indexOfFirstStudent = indexOfLastStudent - studentsPerPage;
  const currentStudents = students.slice(
    indexOfFirstStudent,
    indexOfLastStudent
  );

  // Hàm chuyển đến trang
  const goToPage = (pageNumber) => {
    setCurrentPage(pageNumber);
  };

  // Hàm chuyển trang trước
  const prevPage = () => {
    if (currentPage > 1) {
      setCurrentPage(currentPage - 1);
    }
  };

  // Hàm chuyển trang sau
  const nextPage = () => {
    if (currentPage < Math.ceil(students.length / studentsPerPage)) {
      setCurrentPage(currentPage + 1);
    }
  };

  return (
    <div className={styles.container}>
      <Grid container spacing={4}>
        {/* Cột bên trái */}
        <Grid item xs={12} md={8}>
          {/* Thanh tìm kiếm và bộ lọc */}
          <div className={styles.filterContainer}>
            <input
              className={styles.search}
              placeholder="Search for a student by name or email"
            />
            <select className={styles.filter}>
              <option value="">Khối 6</option>
              <option value="">Khối 7</option>
              <option value="">Khối 8</option>
              <option value="">Khối 9</option>
            </select>
          </div>

          {/* Bảng thông tin học sinh */}
          <div className={styles.infoContainer}>
            <table className={styles.studentTable}>
              <thead>
                <tr>
                  <th>Name</th>
                  <th>Email Address</th>
                  <th>Class</th>
                  <th>Grade</th>
                  <th>Gender</th>
                </tr>
              </thead>
              <tbody>
                {currentStudents.map((student) => (
                  <tr
                    key={student.id}
                    onClick={() => handleStudentClick(student)}
                    className={styles.studentRow}
                  >
                    <td>
                      <img
                        src={studentImage}
                        alt="Student"
                        className={styles.studentImage}
                      />
                      {student.name}
                    </td>
                    <td>{student.email}</td>
                    <td>{student.class}</td>
                    <td>{student.grade}</td>
                    <td>{student.gender}</td>
                  </tr>
                ))}
              </tbody>
            </table>
            {/* Phân trang */}
            <div className={styles.paginationContainer}>
              <button className={styles.paginationButton} onClick={prevPage}>
                Trang trước
              </button>
              <span className={styles.pageNumbers}>
                {[...Array(Math.ceil(students.length / studentsPerPage))].map(
                  (_, index) => (
                    <button
                      key={index + 1}
                      className={styles.paginationButton}
                      onClick={() => goToPage(index + 1)}
                    >
                      {index + 1}
                    </button>
                  )
                )}
              </span>
              <button className={styles.paginationButton} onClick={nextPage}>
                Trang sau
              </button>
            </div>
          </div>
        </Grid>

        {/* Cột bên phải */}
        <Grid item xs={12} md={4}>
          <div className={styles.detailContainer}>
            <img
              src={studentImage}
              alt="Student Detail"
              className={styles.detailImage}
            />
            <h2 className={styles.detailName}>{selectedStudent.name}</h2>

            {/* Thông tin chi tiết */}
            <div className={styles.detailInfo}>
              <div className={styles.detailInfoCard}>
                <Phone className={styles.icon} />
                <span className="value">{selectedStudent.phone}</span>
              </div>
              <div className={styles.detailInfoCard}>
                <LocationOn className={styles.icon} />
                <span className="value">{selectedStudent.address}</span>
              </div>
              <div className={styles.detailInfoCard}>
                <Cake className={styles.icon} />
                <span className="value">{selectedStudent.dob}</span>
              </div>
            </div>

            <div className={styles.schoolIcon}>
              <School className={styles.icon} />
              Tình trạng học
            </div>
          </div>
        </Grid>
      </Grid>
    </div>
  );
};

export default Students;
