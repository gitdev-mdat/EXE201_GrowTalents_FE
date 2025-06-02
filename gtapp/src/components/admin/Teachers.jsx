import * as React from "react";
import PropTypes from "prop-types";
import Box from "@mui/material/Box";
import Collapse from "@mui/material/Collapse";
import IconButton from "@mui/material/IconButton";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import Typography from "@mui/material/Typography";
import Paper from "@mui/material/Paper";
import KeyboardArrowDownIcon from "@mui/icons-material/KeyboardArrowDown";
import KeyboardArrowUpIcon from "@mui/icons-material/KeyboardArrowUp";
import Button from "@mui/material/Button";
import Pagination from "@mui/material/Pagination"; // Import Pagination
import styles from "../../styles/Teachers.module.css";

// Function to create data
function createData(id, name, subject, emailAddress, gender) {
  return {
    id,
    name,
    subject,
    emailAddress,
    gender,
    courseTeaching: [
      { startDate: "2020-01-05", classId: "11091700", className: "aloo" },
      { startDate: "2020-01-06", classId: "11091701", className: "aloo" },
    ],
  };
}

// Row Component
function Row(props) {
  const { row } = props;
  const [open, setOpen] = React.useState(false);

  return (
    <React.Fragment>
      <TableRow className={styles["table-body"]}>
        <TableCell>
          <IconButton
            aria-label="expand row"
            size="small"
            onClick={() => setOpen(!open)}
            className={styles["icon-button"]}
          >
            {open ? <KeyboardArrowUpIcon /> : <KeyboardArrowDownIcon />}
          </IconButton>
        </TableCell>
        <TableCell>{row.id}</TableCell>
        <TableCell scope="row">{row.name}</TableCell>
        <TableCell>{row.subject}</TableCell>
        <TableCell>{row.emailAddress}</TableCell>
        <TableCell>{row.gender}</TableCell>
      </TableRow>
      <TableRow>
        <TableCell style={{ paddingBottom: 0, paddingTop: 0 }} colSpan={6}>
          <Collapse in={open} timeout="auto" unmountOnExit>
            <Box sx={{ margin: 1 }} className={styles["collapse-content"]}>
              <Typography variant="h6" gutterBottom component="div">
                Lớp đang dạy
              </Typography>
              <Table
                size="small"
                aria-label="purchases"
                className={styles["collapse-table"]}
              >
                <TableHead>
                  <TableRow>
                    <TableCell>Start Date</TableCell>
                    <TableCell>Class Id</TableCell>
                    <TableCell>Class Name</TableCell>
                  </TableRow>
                </TableHead>
                <TableBody>
                  {row.courseTeaching.map((courseTeachingRow) => (
                    <TableRow key={courseTeachingRow.startDate}>
                      <TableCell scope="row">
                        {courseTeachingRow.startDate}
                      </TableCell>
                      <TableCell>{courseTeachingRow.classId}</TableCell>
                      <TableCell>{courseTeachingRow.className}</TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </Box>
          </Collapse>
        </TableCell>
      </TableRow>
    </React.Fragment>
  );
}

// PropTypes for Row component
Row.propTypes = {
  row: PropTypes.shape({
    id: PropTypes.number.isRequired,
    name: PropTypes.string.isRequired,
    subject: PropTypes.string.isRequired,
    emailAddress: PropTypes.string.isRequired,
    gender: PropTypes.string.isRequired,
    courseTeaching: PropTypes.arrayOf(
      PropTypes.shape({
        startDate: PropTypes.string.isRequired,
        classId: PropTypes.string.isRequired,
        className: PropTypes.string.isRequired,
      })
    ),
  }).isRequired,
};

// Sample rows of teachers
const rows = [
  createData(
    1,
    "PhamQuocNga",
    "Vật Lý",
    "phamquocngadaknong@gmail.com",
    "male"
  ),
  createData(
    2,
    "PhamQuocViet",
    "Toán",
    "phamquocvietdaknong@gmail.com",
    "male"
  ),
  createData(3, "PhamQuocHiep", "Hoá", "phamquochiepdaknong@gmail.com", "male"),
  createData(
    4,
    "PhamQuocHiep1",
    "Anh",
    "phamquochiep1daknong@gmail.com",
    "male"
  ),
  createData(5, "PhamQuocHiep", "Hoá", "phamquochiepdaknong@gmail.com", "male"),
  createData(
    6,
    "PhamQuocHiep1",
    "Anh",
    "phamquochiep1daknong@gmail.com",
    "male"
  ),
  createData(7, "PhamQuocHiep", "Hoá", "phamquochiepdaknong@gmail.com", "male"),
  createData(
    8,
    "PhamQuocHiep1",
    "Anh",
    "phamquochiep1daknong@gmail.com",
    "male"
  ),
];

export default function Teachers() {
  const [currentPage, setCurrentPage] = React.useState(1); // Current page
  const rowsPerPage = 7; // Number of rows per page

  // Calculate the rows to display based on current page
  const displayedRows = rows.slice(
    (currentPage - 1) * rowsPerPage,
    currentPage * rowsPerPage
  );

  // Handle pagination change
  const handleChangePage = (event, newPage) => {
    setCurrentPage(newPage);
  };

  return (
    <div>
      {/* Buttons */}
      <Box className={styles["buttons-container"]}>
        <Button
          variant="contained"
          color="primary"
          className={styles["action-button"]}
        >
          Export CSV
        </Button>
        <Button
          variant="contained"
          color="secondary"
          className={styles["action-button"]}
        >
          Add Teacher
        </Button>
      </Box>

      {/* Table */}
      <TableContainer component={Paper} className={styles["table-container"]}>
        <Table aria-label="collapsible table">
          <TableHead className={styles["table-head"]}>
            <TableRow>
              <TableCell />
              <TableCell>Id</TableCell>
              <TableCell>Name</TableCell>
              <TableCell>Subject</TableCell>
              <TableCell align="left">Email</TableCell>
              <TableCell align="left">Gender</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {displayedRows.map((row) => (
              <Row key={row.id} row={row} />
            ))}
          </TableBody>
        </Table>
      </TableContainer>

      {/* Pagination */}
      <Box className={styles["pagination-container"]}>
        <Pagination
          count={Math.ceil(rows.length / rowsPerPage)} // Tổng số trang
          page={currentPage} // Trang hiện tại
          onChange={handleChangePage} // Xử lý khi thay đổi trang
          color="primary" // Màu sắc chính
          siblingCount={1} // Số lượng trang kề hiện tại
          boundaryCount={1} // Số lượng trang đầu/cuối hiển thị
        />
      </Box>
    </div>
  );
}
