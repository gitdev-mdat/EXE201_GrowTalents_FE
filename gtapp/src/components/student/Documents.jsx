import React, { useState } from "react";
import styles from "../../styles/StudentDocuments.module.css";
import toan from "../../assets/Math1.svg";
import english from "../../assets/english.svg";
import physic from "../../assets/physic.svg";

const Documents = () => {
  const [selectedCategory, setSelectedCategory] = useState("all");
  const [selectedCourse, setSelectedCourse] = useState("all");
  const [showSubmitModal, setShowSubmitModal] = useState(false);
  const [selectedDocument, setSelectedDocument] = useState(null);
  const [uploadedFile, setUploadedFile] = useState(null);
  const [isSubmitting, setIsSubmitting] = useState(false);

  const documents = [
    {
      id: 1,
      title: "Bài tập chương 1: Số tự nhiên",
      course: "Khoá học toán cơ bản 6",
      category: "Bài tập",
      teacher: "Cô Nguyễn Thị Anh",
      uploadDate: "2024-01-10",
      dueDate: "2024-01-15",
      status: "Chưa nộp",
      fileType: "pdf",
      fileSize: "2.5 MB",
      courseImage: toan
    },
    {
      id: 2,
      title: "Tài liệu lý thuyết chương 2",
      course: "Khoá học toán cơ bản 6",
      category: "Tài liệu",
      teacher: "Cô Nguyễn Thị Anh",
      uploadDate: "2024-01-08",
      dueDate: null,
      status: "Đã xem",
      fileType: "pdf",
      fileSize: "1.8 MB",
      courseImage: toan
    },
    {
      id: 3,
      title: "Bài tập về nhà tuần 2",
      course: "Khoá học toán cơ bản 7",
      category: "Bài tập",
      teacher: "Thầy Trần Văn Bình",
      uploadDate: "2024-01-12",
      dueDate: "2024-01-18",
      status: "Đã nộp",
      fileType: "docx",
      fileSize: "1.2 MB",
      courseImage: toan
    },
    {
      id: 4,
      title: "Vocabulary List - Unit 1",
      course: "Khoá học tiếng Anh cơ bản",
      category: "Tài liệu",
      teacher: "Cô Sarah Johnson",
      uploadDate: "2024-01-09",
      dueDate: null,
      status: "Đã xem",
      fileType: "pdf",
      fileSize: "0.8 MB",
      courseImage: english
    },
    {
      id: 5,
      title: "Grammar Exercise - Present Simple",
      course: "Khoá học tiếng Anh cơ bản",
      category: "Bài tập",
      teacher: "Cô Sarah Johnson",
      uploadDate: "2024-01-11",
      dueDate: "2024-01-16",
      status: "Chưa nộp",
      fileType: "docx",
      fileSize: "1.5 MB",
      courseImage: english
    },
    {
      id: 6,
      title: "Bài tập Vật lý - Chuyển động cơ học",
      course: "Khoá học Vật lý cơ bản",
      category: "Bài tập",
      teacher: "Thầy Lê Văn Cường",
      uploadDate: "2024-01-13",
      dueDate: "2024-01-20",
      status: "Chưa nộp",
      fileType: "pdf",
      fileSize: "3.2 MB",
      courseImage: physic
    }
  ];

  const getStatusColor = (status) => {
    switch (status) {
      case "Đã nộp":
        return "#52c41a";
      case "Chưa nộp":
        return "#ff4d4f";
      case "Đã xem":
        return "#1890ff";
      default:
        return "#d9d9d9";
    }
  };

  const getFileTypeIcon = (fileType) => {
    switch (fileType) {
      case "pdf":
        return "📄";
      case "docx":
        return "📝";
      case "pptx":
        return "📊";
      default:
        return "📁";
    }
  };

  const filteredDocuments = documents.filter(doc => {
    const categoryMatch = selectedCategory === "all" || doc.category === selectedCategory;
    const courseMatch = selectedCourse === "all" || doc.course === selectedCourse;
    return categoryMatch && courseMatch;
  });

  const handleSubmitAssignment = (doc) => {
    setSelectedDocument(doc);
    setShowSubmitModal(true);
    setUploadedFile(null);
  };

  const handleFileUpload = (event) => {
    const file = event.target.files[0];
    if (file) {
      // Kiểm tra file type
      if (file.type !== 'application/pdf') {
        alert('Vui lòng chỉ upload file PDF!');
        return;
      }
      // Kiểm tra kích thước file (max 10MB)
      if (file.size > 10 * 1024 * 1024) {
        alert('File quá lớn! Vui lòng chọn file nhỏ hơn 10MB.');
        return;
      }
      setUploadedFile(file);
    }
  };

  const handleSubmit = async () => {
    if (!uploadedFile) {
      alert('Vui lòng chọn file để nộp bài!');
      return;
    }

    setIsSubmitting(true);
    
    // Simulate API call
    setTimeout(() => {
      // Cập nhật trạng thái trong danh sách
      const updatedDocuments = documents.map(doc => 
        doc.id === selectedDocument.id 
          ? { ...doc, status: "Đã nộp" }
          : doc
      );
      
      // Trong thực tế, bạn sẽ gọi API để cập nhật
      console.log('Nộp bài thành công:', {
        documentId: selectedDocument.id,
        fileName: uploadedFile.name,
        fileSize: uploadedFile.size
      });
      
      setIsSubmitting(false);
      setShowSubmitModal(false);
      setSelectedDocument(null);
      setUploadedFile(null);
      
      // Refresh page hoặc cập nhật state
      window.location.reload();
    }, 2000);
  };

  const closeModal = () => {
    setShowSubmitModal(false);
    setSelectedDocument(null);
    setUploadedFile(null);
  };

  return (
    <div className={styles.documentsContainer}>
      <div className={styles.header}>
        <h1>Tài liệu và Bài tập</h1>
        <div className={styles.filters}>
          <select 
            className={styles.filterSelect}
            value={selectedCourse}
            onChange={(e) => setSelectedCourse(e.target.value)}
          >
            <option value="all">Tất cả khóa học</option>
            <option value="Khoá học toán cơ bản 6">Toán cơ bản 6</option>
            <option value="Khoá học toán cơ bản 7">Toán cơ bản 7</option>
            <option value="Khoá học tiếng Anh cơ bản">Tiếng Anh cơ bản</option>
            <option value="Khoá học Vật lý cơ bản">Vật lý cơ bản</option>
          </select>
          <select 
            className={styles.filterSelect}
            value={selectedCategory}
            onChange={(e) => setSelectedCategory(e.target.value)}
          >
            <option value="all">Tất cả loại</option>
            <option value="Tài liệu">Tài liệu</option>
            <option value="Bài tập">Bài tập</option>
          </select>
        </div>
      </div>

      <div className={styles.documentsGrid}>
        {filteredDocuments.map((doc) => (
          <div key={doc.id} className={styles.documentCard}>
            <div className={styles.documentHeader}>
              <div className={styles.courseInfo}>
                <img src={doc.courseImage} alt={doc.course} className={styles.courseImage} />
                <span className={styles.courseName}>{doc.course}</span>
              </div>
              <span 
                className={styles.statusBadge}
                style={{backgroundColor: getStatusColor(doc.status)}}
              >
                {doc.status}
              </span>
            </div>
            
            <div className={styles.documentContent}>
              <h3>{doc.title}</h3>
              <p className={styles.category}>{doc.category}</p>
              <p className={styles.teacher}>Giáo viên: {doc.teacher}</p>
              
              <div className={styles.fileInfo}>
                <span className={styles.fileIcon}>{getFileTypeIcon(doc.fileType)}</span>
                <span className={styles.fileType}>{doc.fileType.toUpperCase()}</span>
                <span className={styles.fileSize}>{doc.fileSize}</span>
              </div>
              
              <div className={styles.dateInfo}>
                <p>Ngày đăng: {doc.uploadDate}</p>
                {doc.dueDate && (
                  <p className={styles.dueDate}>Hạn nộp: {doc.dueDate}</p>
                )}
              </div>
            </div>
            
            <div className={styles.documentActions}>
              <button className={styles.downloadBtn}>Tải xuống</button>
              <button className={styles.viewBtn}>Xem trước</button>
              {doc.category === "Bài tập" && doc.status === "Chưa nộp" && (
                <button 
                  className={styles.submitBtn}
                  onClick={() => handleSubmitAssignment(doc)}
                >
                  Nộp bài
                </button>
              )}
            </div>
          </div>
        ))}
      </div>

      {filteredDocuments.length === 0 && (
        <div className={styles.emptyState}>
          <p>Không có tài liệu nào phù hợp với bộ lọc đã chọn.</p>
        </div>
      )}

      {/* Modal Nộp bài */}
      {showSubmitModal && (
        <div className={styles.modalOverlay}>
          <div className={styles.modal}>
            <div className={styles.modalHeader}>
              <h2>Nộp bài tập</h2>
              <button className={styles.closeBtn} onClick={closeModal}>×</button>
            </div>
            
            <div className={styles.modalContent}>
              <div className={styles.assignmentInfo}>
                <h3>{selectedDocument?.title}</h3>
                <p><strong>Khóa học:</strong> {selectedDocument?.course}</p>
                <p><strong>Giáo viên:</strong> {selectedDocument?.teacher}</p>
                {selectedDocument?.dueDate && (
                  <p><strong>Hạn nộp:</strong> {selectedDocument?.dueDate}</p>
                )}
              </div>

              <div className={styles.uploadSection}>
                <h4>Upload bài làm</h4>
                <div className={styles.uploadArea}>
                  <input
                    type="file"
                    id="fileUpload"
                    accept=".pdf"
                    onChange={handleFileUpload}
                    className={styles.fileInput}
                  />
                  <label htmlFor="fileUpload" className={styles.uploadLabel}>
                    <div className={styles.uploadIcon}>📄</div>
                    <p>Chọn file PDF để nộp bài</p>
                    <span className={styles.uploadHint}>
                      Chỉ chấp nhận file PDF, tối đa 10MB
                    </span>
                  </label>
                </div>
                
                {uploadedFile && (
                  <div className={styles.filePreview}>
                    <div className={styles.fileInfo}>
                      <span className={styles.fileIcon}>📄</span>
                      <div>
                        <p className={styles.fileName}>{uploadedFile.name}</p>
                        <p className={styles.fileSize}>
                          {(uploadedFile.size / 1024 / 1024).toFixed(2)} MB
                        </p>
                      </div>
                    </div>
                    <button 
                      className={styles.removeFileBtn}
                      onClick={() => setUploadedFile(null)}
                    >
                      ✕
                    </button>
                  </div>
                )}
              </div>

              <div className={styles.requirements}>
                <h4>Yêu cầu nộp bài:</h4>
                <ul>
                  <li>Chỉ chấp nhận file định dạng PDF</li>
                  <li>Kích thước file tối đa 10MB</li>
                  <li>Đảm bảo bài làm rõ ràng, dễ đọc</li>
                  <li>Ghi rõ họ tên và lớp ở đầu bài làm</li>
                </ul>
              </div>
            </div>

            <div className={styles.modalActions}>
              <button 
                className={styles.cancelBtn}
                onClick={closeModal}
                disabled={isSubmitting}
              >
                Hủy
              </button>
              <button 
                className={styles.confirmBtn}
                onClick={handleSubmit}
                disabled={!uploadedFile || isSubmitting}
              >
                {isSubmitting ? 'Đang nộp...' : 'Nộp bài'}
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default Documents; 