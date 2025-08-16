import React, { useRef, useState, useCallback } from "react";
import { ref, uploadBytesResumable, getDownloadURL } from "firebase/storage";
import { storage } from "./firebaseConfig";
import { Button, message, Modal, Tooltip, Progress, Typography } from "antd";
import {
  UploadOutlined,
  CloudUploadOutlined,
  EyeOutlined,
  DeleteOutlined,
  LinkOutlined,
  InboxOutlined,
} from "@ant-design/icons";

const { Text } = Typography;

const removeVietnameseTones = (str = "") =>
  str
    .normalize("NFD")
    .replace(/[\u0300-\u036f]/g, "")
    .replace(/đ/g, "d")
    .replace(/Đ/g, "D")
    .replace(/\s+/g, "_")
    .trim();

/**
 * ImageUploader
 * Props:
 * - folder?: string                // thư mục trên storage (default: uploads/images)
 * - objectId?: string              // id đối tượng để ghép tên file
 * - objectName?: string            // tên đối tượng để ghép tên file (được sanitize)
 * - accept?: string                // mime types (default: 'image/*')
 * - maxSizeMB?: number             // giới hạn MB (default: 3)
 * - onUploadSuccess?: (url) => {}  // callback sau khi upload xong
 */
export default function ImageUploader({
  folder = "uploads/images",
  objectId = "UNKNOWN",
  objectName = "NO_NAME",
  accept = "image/*",
  maxSizeMB = 3,
  onUploadSuccess,
}) {
  const fileInputRef = useRef(null);
  const [file, setFile] = useState(null);
  const [localPreview, setLocalPreview] = useState("");
  const [showPreview, setShowPreview] = useState(false);
  const [uploading, setUploading] = useState(false);
  const [progress, setProgress] = useState(0);
  const [downloadUrl, setDownloadUrl] = useState("");

  const pickFile = () => {
    if (fileInputRef.current) {
      fileInputRef.current.value = null;
      fileInputRef.current.click();
    }
  };

  const verifyImage = (f) => {
    if (!f) return false;
    if (!f.type.startsWith("image/")) {
      message.error("Chỉ nhận file ảnh nha bro.");
      return false;
    }
    if (f.size > maxSizeMB * 1024 * 1024) {
      message.error(`Ảnh quá lớn! Vui lòng chọn ảnh dưới ${maxSizeMB}MB.`);
      return false;
    }
    return true;
  };

  const onFileSelected = (f) => {
    if (!verifyImage(f)) return;
    setFile(f);
    setDownloadUrl("");
    const url = URL.createObjectURL(f);
    setLocalPreview(url);
  };

  const onChangeInput = (e) => {
    const f = e.target.files?.[0];
    if (f) onFileSelected(f);
  };

  // Drag & drop
  const onDrop = useCallback((e) => {
    e.preventDefault();
    e.stopPropagation();
    const f = e.dataTransfer?.files?.[0];
    if (f) onFileSelected(f);
  }, []);

  const onDragOver = (e) => {
    e.preventDefault();
    e.stopPropagation();
  };

  const reset = () => {
    setFile(null);
    setLocalPreview("");
    setProgress(0);
    setUploading(false);
    setDownloadUrl("");
    if (fileInputRef.current) fileInputRef.current.value = null;
  };

  const upload = async () => {
    if (!file) {
      message.warning("Chọn ảnh trước đã.");
      return;
    }
    setUploading(true);
    setProgress(0);
    try {
      const timestamp = Date.now();
      const ext = (file.name.split(".").pop() || "jpg").toLowerCase();
      const safeName = removeVietnameseTones(objectName);
      const safeFolder = removeVietnameseTones(folder);
      const rawName = `${objectId}_${safeName}_${timestamp}.${ext}`;
      const path = `${safeFolder}/${encodeURIComponent(rawName)}`;

      const storageRef = ref(storage, path);
      const task = uploadBytesResumable(storageRef, file, {
        contentType: file.type || "image/jpeg",
      });

      task.on(
        "state_changed",
        (snap) => {
          const pct = Math.round(
            (snap.bytesTransferred / snap.totalBytes) * 100
          );
          setProgress(pct);
        },
        (err) => {
          console.error("Upload error:", err);
          message.error("Upload fail. Kiểm tra kết nối/quyền truy cập.");
          setUploading(false);
        },
        async () => {
          const url = await getDownloadURL(task.snapshot.ref);
          setDownloadUrl(url);
          setUploading(false);
          setProgress(100);
          message.success("Upload thành công!");
          onUploadSuccess?.(url);
          // giữ preview & file để user nhìn; muốn reset auto thì gọi reset();
        }
      );
    } catch (e) {
      console.error(e);
      message.error("Có lỗi xảy ra khi upload.");
      setUploading(false);
    }
  };

  return (
    <div
      style={{
        display: "flex",
        flexDirection: "column",
        gap: "16px",
        width: "100%",
      }}
    >
      <input
        ref={fileInputRef}
        type="file"
        accept={accept}
        onChange={onChangeInput}
        style={{ display: "none" }}
      />

      {/* Dropzone */}
      <div
        onDrop={onDrop}
        onDragOver={onDragOver}
        onClick={pickFile}
        style={{
          border: "2px dashed #cfd4e4",
          padding: "20px",
          borderRadius: "12px",
          background: "#f5f7ff",
          textAlign: "center",
          cursor: "pointer",
          transition: "border-color .2s",
        }}
        onMouseEnter={(e) => (e.currentTarget.style.borderColor = "#152259")}
        onMouseLeave={(e) => (e.currentTarget.style.borderColor = "#cfd4e4")}
      >
        <InboxOutlined style={{ fontSize: "28px", color: "#152259" }} />
        <p style={{ margin: "8px 0", color: "#333" }}>
          Kéo & thả ảnh vào đây <br /> hoặc{" "}
          <span
            style={{
              color: "#152259",
              textDecoration: "underline",
              fontWeight: 600,
            }}
          >
            bấm để chọn
          </span>
        </p>
        <small style={{ color: "#666" }}>
          Chấp nhận: {accept} • Tối đa {maxSizeMB}MB
        </small>
      </div>

      {/* Preview */}
      {localPreview && (
        <div
          style={{
            border: "1px solid #e0e0e0",
            borderRadius: "12px",
            padding: "12px",
          }}
        >
          <img
            src={localPreview}
            alt="Preview"
            style={{
              width: "100%",
              height: "200px",
              objectFit: "cover",
              borderRadius: "8px",
              cursor: "zoom-in",
              marginBottom: "10px",
            }}
            onClick={() => setShowPreview(true)}
          />

          <div
            style={{ display: "flex", justifyContent: "flex-end", gap: "14px" }}
          >
            <Button icon={<EyeOutlined />} onClick={() => setShowPreview(true)}>
              Xem
            </Button>
            <Button
              danger
              icon={<DeleteOutlined />}
              onClick={reset}
              disabled={uploading}
            >
              Xóa
            </Button>
            <Button
              type="primary"
              icon={<CloudUploadOutlined />}
              onClick={upload}
              loading={uploading}
            >
              Upload
            </Button>
          </div>

          {uploading && (
            <Progress percent={progress} style={{ marginTop: "10px" }} />
          )}
        </div>
      )}

      {/* Uploaded Link */}
      {downloadUrl && (
        <div
          style={{
            background: "#f0fff4",
            border: "1px solid #c6f6d5",
            padding: "12px",
            borderRadius: "8px",
            color: "#22543d",
          }}
        >
          <LinkOutlined style={{ marginRight: "6px" }} />
          <a
            href={downloadUrl}
            target="_blank"
            rel="noreferrer"
            style={{ color: "#22543d", textDecoration: "underline" }}
          >
            Đã upload – click xem ảnh
          </a>
        </div>
      )}

      <Modal
        open={showPreview}
        footer={null}
        onCancel={() => setShowPreview(false)}
        centered
        bodyStyle={{ padding: 0, borderRadius: 16, overflow: "hidden" }}
      >
        <img
          src={localPreview}
          alt="Preview Large"
          style={{ width: "100%", objectFit: "contain" }}
        />
      </Modal>
    </div>
  );
}
