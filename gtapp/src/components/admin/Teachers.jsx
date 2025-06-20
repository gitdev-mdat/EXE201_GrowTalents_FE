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
import Pagination from "@mui/material/Pagination";
import Card from "@mui/material/Card";
import CardContent from "@mui/material/CardContent";
import Grid from "@mui/material/Grid";
import FormControl from "@mui/material/FormControl";
import InputLabel from "@mui/material/InputLabel";
import Select from "@mui/material/Select";
import MenuItem from "@mui/material/MenuItem";
import TextField from "@mui/material/TextField";
import Dialog from "@mui/material/Dialog";
import DialogTitle from "@mui/material/DialogTitle";
import DialogContent from "@mui/material/DialogContent";
import DialogActions from "@mui/material/DialogActions";
import Chip from "@mui/material/Chip";
import Tooltip from "@mui/material/Tooltip";
import {
  Schedule,
  Add,
  Edit,
  Delete,
  Today,
  AccessTime,
  Room,
  Group,
  School
} from "@mui/icons-material";
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
    teachingSchedule: [
      {
        id: 1,
        day: "Thứ 2",
        time: "08:00 - 09:30",
        subject: `${subject} 10A`,
        room: "Phòng 101",
        type: "Lý thuyết",
        students: 35
      },
      {
        id: 2,
        day: "Thứ 3",
        time: "10:00 - 11:30",
        subject: `${subject} 11B`,
        room: "Phòng 102",
        type: "Thực hành",
        students: 30
      }
    ]
  };
}

// Row Component
function Row(props) {
  const { row, onAddSchedule, onEditSchedule, onDeleteSchedule } = props;
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
        <TableCell>
          <Button
            variant="contained"
            size="small"
            startIcon={<Schedule />}
            onClick={() => onAddSchedule(row)}
            color="primary"
            sx={{ 
              bgcolor: '#1976d2',
              '&:hover': { bgcolor: '#1565c0' }
            }}
          >
            Tạo lịch
          </Button>
        </TableCell>
      </TableRow>
      <TableRow>
        <TableCell style={{ paddingBottom: 0, paddingTop: 0 }} colSpan={7}>
          <Collapse in={open} timeout="auto" unmountOnExit>
            <Box sx={{ margin: 1 }} className={styles["collapse-content"]}>
              <Grid container spacing={3}>
                {/* Teaching Classes */}
                <Grid item xs={12} md={6}>
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
                </Grid>

                {/* Teaching Schedule */}
                <Grid item xs={12} md={6}>
                  <Box display="flex" justifyContent="space-between" alignItems="center" mb={2}>
                    <Typography variant="h6" component="div">
                      Lịch giảng dạy
                    </Typography>
                    <Button
                      variant="contained"
                      size="small"
                      startIcon={<Add />}
                      onClick={() => onAddSchedule(row)}
                    >
                      Thêm lịch
                    </Button>
                  </Box>
                  <Table
                    size="small"
                    aria-label="schedule"
                    className={styles["collapse-table"]}
                  >
                    <TableHead>
                      <TableRow>
                        <TableCell>Thứ</TableCell>
                        <TableCell>Thời gian</TableCell>
                        <TableCell>Môn học</TableCell>
                        <TableCell>Phòng</TableCell>
                        <TableCell>Loại</TableCell>
                        <TableCell>Thao tác</TableCell>
                      </TableRow>
                    </TableHead>
                    <TableBody>
                      {row.teachingSchedule && row.teachingSchedule.length > 0 ? (
                        row.teachingSchedule.map((schedule) => (
                          <TableRow key={schedule.id}>
                            <TableCell>{schedule.day}</TableCell>
                            <TableCell>{schedule.time}</TableCell>
                            <TableCell>{schedule.subject}</TableCell>
                            <TableCell>{schedule.room}</TableCell>
                            <TableCell>
                              <Chip
                                label={schedule.type}
                                size="small"
                                color={
                                  schedule.type === "Lý thuyết" ? "primary" :
                                  schedule.type === "Thực hành" ? "secondary" : "success"
                                }
                              />
                            </TableCell>
                            <TableCell>
                              <Box display="flex" gap={0.5}>
                                <Tooltip title="Sửa lịch">
                                  <IconButton
                                    size="small"
                                    color="primary"
                                    onClick={() => onEditSchedule(row, schedule)}
                                  >
                                    <Edit fontSize="small" />
                                  </IconButton>
                                </Tooltip>
                                <Tooltip title="Xóa lịch">
                                  <IconButton
                                    size="small"
                                    color="error"
                                    onClick={() => onDeleteSchedule(row.id, schedule.id)}
                                  >
                                    <Delete fontSize="small" />
                                  </IconButton>
                                </Tooltip>
                              </Box>
                            </TableCell>
                          </TableRow>
                        ))
                      ) : (
                        <TableRow>
                          <TableCell colSpan={6} align="center">
                            <Typography variant="body2" color="textSecondary">
                              Chưa có lịch giảng dạy. Nhấn "Thêm lịch" để tạo lịch mới.
                            </Typography>
                          </TableCell>
                        </TableRow>
                      )}
                    </TableBody>
                  </Table>
                </Grid>
              </Grid>
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
    teachingSchedule: PropTypes.arrayOf(
      PropTypes.shape({
        id: PropTypes.number.isRequired,
        day: PropTypes.string.isRequired,
        time: PropTypes.string.isRequired,
        subject: PropTypes.string.isRequired,
        room: PropTypes.string.isRequired,
        type: PropTypes.string.isRequired,
        students: PropTypes.number.isRequired,
      })
    ),
  }).isRequired,
  onAddSchedule: PropTypes.func.isRequired,
  onEditSchedule: PropTypes.func.isRequired,
  onDeleteSchedule: PropTypes.func.isRequired,
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
  const [currentPage, setCurrentPage] = React.useState(1);
  const [openScheduleDialog, setOpenScheduleDialog] = React.useState(false);
  const [editingSchedule, setEditingSchedule] = React.useState(null);
  const [selectedTeacher, setSelectedTeacher] = React.useState(null);
  const [scheduleForm, setScheduleForm] = React.useState({
    day: "",
    time: "",
    subject: "",
    room: "",
    type: "",
    students: ""
  });

  const rowsPerPage = 7;

  // Mock data for form options
  const days = ["Thứ 2", "Thứ 3", "Thứ 4", "Thứ 5", "Thứ 6", "Thứ 7"];
  const timeSlots = [
    "08:00 - 09:30",
    "10:00 - 11:30", 
    "14:00 - 15:30",
    "16:00 - 17:30"
  ];
  const rooms = [
    "Phòng 101",
    "Phòng 102",
    "Phòng 103", 
    "Phòng 104",
    "Phòng 105",
    "Phòng Lab 1",
    "Phòng Lab 2"
  ];
  const types = ["Lý thuyết", "Thực hành", "Bài tập"];

  // Calculate the rows to display based on current page
  const displayedRows = rows.slice(
    (currentPage - 1) * rowsPerPage,
    currentPage * rowsPerPage
  );

  // Handle pagination change
  const handleChangePage = (event, newPage) => {
    setCurrentPage(newPage);
  };

  // Handle schedule dialog
  const handleAddSchedule = (teacher) => {
    console.log('Opening schedule dialog for teacher:', teacher.name);
    setSelectedTeacher(teacher);
    setEditingSchedule(null);
    setScheduleForm({
      day: "",
      time: "",
      subject: "",
      room: "",
      type: "",
      students: ""
    });
    setOpenScheduleDialog(true);
  };

  const handleEditSchedule = (teacher, schedule) => {
    console.log('Editing schedule for teacher:', teacher.name, schedule);
    setSelectedTeacher(teacher);
    setEditingSchedule(schedule);
    setScheduleForm({
      day: schedule.day,
      time: schedule.time,
      subject: schedule.subject,
      room: schedule.room,
      type: schedule.type,
      students: schedule.students.toString()
    });
    setOpenScheduleDialog(true);
  };

  const handleDeleteSchedule = (teacherId, scheduleId) => {
    console.log('Deleting schedule:', scheduleId, 'from teacher:', teacherId);
    // Here you would typically delete from backend
    alert('Đã xóa lịch giảng dạy!');
  };

  const handleSaveSchedule = () => {
    console.log('Saving schedule for teacher:', selectedTeacher.name, scheduleForm);
    
    // Validate form
    if (!scheduleForm.day || !scheduleForm.time || !scheduleForm.subject || !scheduleForm.room || !scheduleForm.type || !scheduleForm.students) {
      alert('Vui lòng điền đầy đủ thông tin!');
      return;
    }
    
    setOpenScheduleDialog(false);
    setEditingSchedule(null);
    setSelectedTeacher(null);
    
    // Show success message
    alert(editingSchedule ? 'Đã cập nhật lịch giảng dạy thành công!' : 'Đã tạo lịch giảng dạy thành công!');
    
    // Here you would typically save to backend
  };

  const handleCloseScheduleDialog = () => {
    setOpenScheduleDialog(false);
    setEditingSchedule(null);
    setSelectedTeacher(null);
  };

  return (
    <div>
      {/* Header with instructions */}
      <Box sx={{ mb: 3, p: 2, bgcolor: 'primary.main', color: 'white', borderRadius: 2 }}>
        <Typography variant="h5" gutterBottom>
          Quản lý Giáo viên & Lịch giảng dạy
        </Typography>
        <Typography variant="body1">
          💡 <strong>Hướng dẫn:</strong> Click vào nút "Tạo lịch" ở cuối mỗi hàng giáo viên hoặc mở rộng hàng để quản lý lịch giảng dạy
        </Typography>
      </Box>

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
              <TableCell>Tạo lịch</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {displayedRows.map((row) => (
              <Row 
                key={row.id} 
                row={row} 
                onAddSchedule={handleAddSchedule}
                onEditSchedule={handleEditSchedule}
                onDeleteSchedule={handleDeleteSchedule}
              />
            ))}
          </TableBody>
        </Table>
      </TableContainer>

      {/* Pagination */}
      <Box className={styles["pagination-container"]}>
        <Pagination
          count={Math.ceil(rows.length / rowsPerPage)}
          page={currentPage}
          onChange={handleChangePage}
          color="primary"
          siblingCount={1}
          boundaryCount={1}
        />
      </Box>

      {/* Schedule Dialog */}
      <Dialog open={openScheduleDialog} onClose={handleCloseScheduleDialog} maxWidth="md" fullWidth>
        <DialogTitle>
          {editingSchedule ? 'Sửa lịch giảng dạy' : 'Thêm lịch giảng dạy'}
          {selectedTeacher && (
            <Typography variant="subtitle2" color="textSecondary">
              Giáo viên: {selectedTeacher.name} - {selectedTeacher.subject}
            </Typography>
          )}
        </DialogTitle>
        <DialogContent>
          <Grid container spacing={3} sx={{ mt: 1 }}>
            <Grid item xs={12} md={6}>
              <FormControl fullWidth>
                <InputLabel>Thứ</InputLabel>
                <Select
                  label="Thứ"
                  value={scheduleForm.day}
                  onChange={(e) => setScheduleForm({...scheduleForm, day: e.target.value})}
                >
                  {days.map((day) => (
                    <MenuItem key={day} value={day}>
                      {day}
                    </MenuItem>
                  ))}
                </Select>
              </FormControl>
            </Grid>
            <Grid item xs={12} md={6}>
              <FormControl fullWidth>
                <InputLabel>Thời gian</InputLabel>
                <Select
                  label="Thời gian"
                  value={scheduleForm.time}
                  onChange={(e) => setScheduleForm({...scheduleForm, time: e.target.value})}
                >
                  {timeSlots.map((time) => (
                    <MenuItem key={time} value={time}>
                      {time}
                    </MenuItem>
                  ))}
                </Select>
              </FormControl>
            </Grid>
            <Grid item xs={12} md={6}>
              <TextField
                fullWidth
                label="Môn học"
                value={scheduleForm.subject}
                onChange={(e) => setScheduleForm({...scheduleForm, subject: e.target.value})}
                placeholder="VD: Toán 10A, Vật lý 11B..."
              />
            </Grid>
            <Grid item xs={12} md={6}>
              <FormControl fullWidth>
                <InputLabel>Phòng học</InputLabel>
                <Select
                  label="Phòng học"
                  value={scheduleForm.room}
                  onChange={(e) => setScheduleForm({...scheduleForm, room: e.target.value})}
                >
                  {rooms.map((room) => (
                    <MenuItem key={room} value={room}>
                      {room}
                    </MenuItem>
                  ))}
                </Select>
              </FormControl>
            </Grid>
            <Grid item xs={12} md={6}>
              <FormControl fullWidth>
                <InputLabel>Loại</InputLabel>
                <Select
                  label="Loại"
                  value={scheduleForm.type}
                  onChange={(e) => setScheduleForm({...scheduleForm, type: e.target.value})}
                >
                  {types.map((type) => (
                    <MenuItem key={type} value={type}>
                      {type}
                    </MenuItem>
                  ))}
                </Select>
              </FormControl>
            </Grid>
            <Grid item xs={12} md={6}>
              <TextField
                fullWidth
                type="number"
                label="Số học sinh"
                value={scheduleForm.students}
                onChange={(e) => setScheduleForm({...scheduleForm, students: e.target.value})}
                inputProps={{ min: 1, max: 50 }}
              />
            </Grid>
            <Grid item xs={12}>
              <TextField
                fullWidth
                multiline
                rows={3}
                label="Ghi chú"
                placeholder="Ghi chú về buổi học..."
              />
            </Grid>
          </Grid>
        </DialogContent>
        <DialogActions>
          <Button onClick={handleCloseScheduleDialog}>Hủy</Button>
          <Button onClick={handleSaveSchedule} variant="contained">
            {editingSchedule ? 'Cập nhật' : 'Thêm'}
          </Button>
        </DialogActions>
      </Dialog>
    </div>
  );
}
