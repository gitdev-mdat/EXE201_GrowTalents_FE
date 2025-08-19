import styles from "../../styles/Semester.module.css";
import { useState, useEffect } from "react";
import {
  Modal,
  Button,
  Input,
  DatePicker,
  Form,
  Select,
  Tag,
  message,
} from "antd";
import semesterService from "../../services/semesterService";
import yearService from "../../services/yearService";
import DateDDMMYYYY from "../reusable/DateDDMMYYYY";
const Semester = () => {
  const [years, setYears] = useState([]); // [{ id, year }]
  const [selectedYear, setSelectedYear] = useState(null); // { id, year }
  const [semesters, setSemesters] = useState([]);
  const [newYear, setNewYear] = useState("");
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [form] = Form.useForm();
  const [showAddYearInput, setShowAddYearInput] = useState(false);

  // ---- API calls ----
  const fetchYears = async () => {
    try {
      const data = await yearService.getAll();
      // BE trả [{ academicYearId, academicYear }]
      const normalized = data.map((y) => ({
        id: y.academicYearId,
        year: y.academicYear,
      }));
      setYears(normalized);
    } catch (err) {
      message.error("Không thể tải danh sách năm học");
    }
  };

  const fetchSemesters = async (yearNumber) => {
    try {
      const data = await semesterService.getByYear(yearNumber); // BE expects 'year' (number)
      setSemesters(data);
    } catch (err) {
      message.error("Không thể tải danh sách học kỳ");
    }
  };

  useEffect(() => {
    fetchYears();
  }, []);

  useEffect(() => {
    if (selectedYear?.year) {
      fetchSemesters(selectedYear.year);
    }
  }, [selectedYear]);

  // ---- Handlers ----
  const handleAddYear = async () => {
    if (!newYear) return message.warning("Nhập năm học trước");
    try {
      // DTO BE: AcademicYearCreateRequestDTO { academicYear: Integer }
      console.log("year: ", newYear);
      await yearService.create({ academicYear: Number(newYear) });
      message.success("Thêm năm học thành công");
      setNewYear("");
      fetchYears();
    } catch {
      message.error("Không thể thêm năm học");
    }
  };

  const handleAddSemester = async (values) => {
    if (!selectedYear) return message.warning("Chọn năm học trước");
    try {
      const payload = {
        yearId: selectedYear.id, // BE createSemester cần yearId (id của AcademicYear)
        name: values.name,
        startDate: values.startDate.format("DD/MM/YYYY"),
        endDate: values.endDate.format("DD/MM/YYYY"),
      };
      console.log("payload: ", payload);
      await semesterService.create(payload);
      message.success("Thêm học kỳ thành công");
      await fetchSemesters(selectedYear.year); // reload theo NĂM
      setIsModalOpen(false);
      form.resetFields();
    } catch {
      message.error("Không thể thêm học kỳ");
    }
  };

  return (
    <div className={styles.container}>
      {/* Academic Years */}
      <div className={styles.card}>
        <h2>Academic Years</h2>
        <div className={styles.yearRow}>
          <div className={styles.yearBlock}>
            <label>Chọn năm học</label>
            <Select
              value={selectedYear?.year} // hiển thị theo year
              placeholder="Select year"
              style={{ width: 160 }}
              onChange={(val, option) => {
                // option: { value: id, label: year }
                setSelectedYear({ id: option.value, year: option.label });
              }}
              options={years.map((y) => ({
                value: y.id, // academicYearId
                label: y.year, // academicYear
              }))}
            />
          </div>

          <div className={styles.yearBlock}>
            {!showAddYearInput ? (
              <Button
                type="primary"
                style={{ backgroundColor: "#1d3274", borderColor: "#1d3274" }}
                onClick={() => setShowAddYearInput(true)}
              >
                Add Year
              </Button>
            ) : (
              <div className={styles.addYearRow}>
                <Input
                  type="number"
                  value={newYear}
                  onChange={(e) => setNewYear(e.target.value)}
                  placeholder="Enter year"
                />
                <Button
                  type="primary"
                  style={{
                    backgroundColor: "#1d3274",
                    borderColor: "#1d3274",
                    marginLeft: 8,
                  }}
                  onClick={async () => {
                    await handleAddYear();
                    setShowAddYearInput(false);
                  }}
                >
                  Save
                </Button>
                <Button
                  style={{ marginLeft: 8 }}
                  onClick={() => {
                    setShowAddYearInput(false);
                    setNewYear("");
                  }}
                >
                  Cancel
                </Button>
              </div>
            )}
          </div>
        </div>
      </div>

      {/* Semesters */}
      <div className={styles.card}>
        <h2>Semesters</h2>
        {selectedYear ? (
          <>
            <table className={styles.table}>
              <thead>
                <tr>
                  <th>ID</th>
                  <th>Name</th>
                  <th>Start Date</th>
                  <th>End Date</th>
                  <th>Status</th>
                </tr>
              </thead>
              <tbody>
                {semesters.map((sem) => (
                  <tr key={sem.semesterId}>
                    <td>{sem.semesterId}</td>
                    <td>{sem.name}</td>
                    <td>{sem.startDate}</td>
                    <td>{sem.endDate}</td>
                    <td>
                      <Tag
                        color={
                          sem.status === "ONGOING"
                            ? "green"
                            : sem.status === "UPCOMING"
                            ? "gold"
                            : "gray"
                        }
                      >
                        {sem.status}
                      </Tag>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>

            <Button
              type="primary"
              style={{ marginTop: "1rem", backgroundColor: "#1d3274" }}
              onClick={() => setIsModalOpen(true)}
            >
              Thêm kì học
            </Button>
          </>
        ) : (
          <p style={{ color: "#666" }}>Chọn 1 năm học để thấy những kì học.</p>
        )}
      </div>

      {/* Modal Add Semester */}
      <Modal
        title="Add New Semester"
        open={isModalOpen}
        onCancel={() => setIsModalOpen(false)}
        footer={null}
      >
        <Form form={form} layout="vertical" onFinish={handleAddSemester}>
          <Form.Item
            name="name"
            label="Semester Name"
            rules={[{ required: true, message: "Please enter semester name" }]}
          >
            <Input placeholder="e.g. Spring" />
          </Form.Item>

          <Form.Item
            name="startDate"
            label="Start Date"
            rules={[{ required: true, message: "Please select start date" }]}
          >
            <DatePicker style={{ width: "100%" }} format="DD/MM/YYYY" />
          </Form.Item>

          <Form.Item
            name="endDate"
            label="End Date"
            rules={[{ required: true, message: "Please select end date" }]}
          >
            <DatePicker style={{ width: "100%" }} format="DD/MM/YYYY" />
          </Form.Item>

          <Button
            type="primary"
            style={{ marginTop: "1rem", backgroundColor: "#1d3274" }}
            htmlType="submit"
            block
          >
            Save Semester
          </Button>
        </Form>
      </Modal>
    </div>
  );
};

export default Semester;
