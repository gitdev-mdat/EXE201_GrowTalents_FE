import React, { useState, useEffect } from "react";
import styles from "../../styles/CourseFormModal.module.css";
import ImageUploader from "../../firebase/ImageUploader";
import CurrencyInput from "../reusable/CurrencyInput";

import courseService from "../../services/courseService";
import { message, Tooltip } from "antd";
import { CourseType } from "../../constants/course";
import { InfoCircleOutlined, CloseOutlined } from "@ant-design/icons";

const CourseFormModal = ({
  isOpen,
  onClose,
  onSubmitDone,
  initialData = null,
}) => {
  const [formData, setFormData] = useState({
    title: "",
    fee: "",
    imageUrl: "",
    duration: "",
    description: "",
    type: "MATH",
  });

  const isEditMode = !!initialData?.courseId;
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    if (initialData) {
      setFormData({
        title: initialData.nameCourse || "",
        fee: initialData.tuitionFee || "",
        imageUrl: initialData.imageUrl || "",
        duration: initialData.duration || "",
        description: initialData.description || "",
        type: initialData.type || "MATH",
      });
    } else {
      // reset khi thêm mới
      setFormData({
        title: "",
        fee: "",
        imageUrl: "",
        duration: "",
        description: "",
        type: "MATH",
      });
    }
  }, [initialData]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (loading) return;
    setLoading(true);

    try {
      const payload = {
        nameCourse: formData.title,
        tuitionFee: Number(formData.fee),
        duration: Number(formData.duration),
        description: formData.description,
        courseType: formData.type,
        imageUrl: formData.imageUrl || "",
        createdByAdminId: "ADMIN_001",
      };

      if (isEditMode) {
        // update
        console.log("id: ", initialData.courseId, "payload: ", payload);
        await courseService.updateCourse(initialData.courseId, payload);
        message.success("Cập nhật khoá học thành công");
      } else {
        // create
        await courseService.createCourse(payload);
        message.success("Tạo khoá học thành công");
      }

      onSubmitDone?.(); // reload list
      onClose();
    } catch (err) {
      message.error(err.message || "Thao tác thất bại");
    } finally {
      setLoading(false);
    }
  };

  if (!isOpen) return null;

  return (
    <div className={styles.modalOverlay}>
      <div className={styles.modal}>
        <CloseOutlined className={styles.closeIcon} onClick={onClose} />
        <h2>{isEditMode ? "Chỉnh sửa khóa học" : "Thêm khóa học mới"}</h2>

        <form onSubmit={handleSubmit}>
          <div className={styles.formGroup}>
            <label>Hình ảnh khóa học:</label>
            <ImageUploader
              defaultUrl={formData.imageUrl}
              onUploadSuccess={(url) =>
                setFormData((prev) => ({ ...prev, imageUrl: url }))
              }
              folder="courses"
              objectName={formData.title || "NO_NAME"}
            />
          </div>

          <div className={styles.formGroup}>
            <label>
              Tên khóa học:
              <Tooltip title="Nên đặt tên kèm lớp/bậc học. VD: Toán nâng cao – Lớp 8">
                <InfoCircleOutlined
                  style={{ marginLeft: 4, color: "#888", cursor: "pointer" }}
                />
              </Tooltip>
            </label>
            <input
              type="text"
              name="title"
              value={formData.title}
              onChange={handleChange}
            />
          </div>

          <div className={styles.formGroup}>
            <label>Loại khóa:</label>
            <select name="type" value={formData.type} onChange={handleChange}>
              {Object.entries(CourseType).map(([value, label]) => (
                <option key={value} value={value}>
                  {label}
                </option>
              ))}
            </select>
          </div>

          <div className={styles.formGroup}>
            <label>Học phí 1 tháng:</label>
            <div style={{ position: "relative" }}>
              <CurrencyInput
                name="fee"
                value={formData.fee}
                onChange={(val) =>
                  setFormData((prev) => ({ ...prev, fee: val }))
                }
                style={{ paddingRight: "36px" }}
              />
              <span
                style={{
                  position: "absolute",
                  right: "10px",
                  top: "50%",
                  transform: "translateY(-50%)",
                  color: "#555",
                }}
              >
                ₫
              </span>
            </div>
          </div>

          <div className={styles.formGroup}>
            <label>
              Thời lượng mỗi buổi (phút):
              <Tooltip title="Ví dụ 90 phút cho 1 buổi học">
                <InfoCircleOutlined style={{ marginLeft: 4, color: "#888" }} />
              </Tooltip>
            </label>
            <input
              type="number"
              name="duration"
              value={formData.duration}
              onChange={handleChange}
            />
          </div>

          <div className={styles.formGroup}>
            <label>Mô tả khóa học:</label>
            <textarea
              rows="3"
              name="description"
              value={formData.description}
              onChange={handleChange}
            />
          </div>

          <div className={styles.buttonGroup}>
            <button
              type="submit"
              className={styles.submitButton}
              disabled={loading}
            >
              {loading
                ? "Đang xử lý..."
                : isEditMode
                ? "Cập nhật"
                : "Thêm khóa học"}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default CourseFormModal;
