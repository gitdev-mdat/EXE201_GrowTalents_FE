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
    <div className="grid gap-3 w-full max-w-md">
      {/* Hidden input */}
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
        className="rounded-2xl border border-dashed border-gray-300 p-5 bg-white hover:border-gray-400 transition-all"
        style={{ cursor: "pointer" }}
        onClick={pickFile}
      >
        <div className="flex flex-col items-center gap-2 text-center">
          <div className="w-12 h-12 rounded-full flex items-center justify-center bg-gray-100">
            <InboxOutlined />
          </div>
          <div className="text-sm text-gray-600">
            Kéo & thả ảnh vào đây, hoặc{" "}
            <Text underline strong>
              bấm để chọn
            </Text>
          </div>
          <div className="text-xs text-gray-400">
            Chấp nhận: {accept} • Tối đa {maxSizeMB}MB
          </div>
        </div>
      </div>

      {/* Preview + Actions */}
      {localPreview && (
        <div className="grid gap-2">
          <div
            className="rounded-2xl overflow-hidden border border-gray-200 shadow-sm"
            style={{
              aspectRatio: "1.6/1", // card đẹp
              backgroundColor: "#fafafa",
            }}
          >
            <img
              src={localPreview}
              alt="Preview"
              className="w-full h-full object-cover"
              onClick={() => setShowPreview(true)}
              style={{ cursor: "zoom-in" }}
            />
          </div>

          <div className="flex items-center gap-8">
            <div className="flex items-center gap-8">
              <Tooltip title="Xem lớn">
                <Button
                  icon={<EyeOutlined />}
                  onClick={() => setShowPreview(true)}
                >
                  Preview
                </Button>
              </Tooltip>
              <Tooltip title="Xoá lựa chọn">
                <Button
                  danger
                  icon={<DeleteOutlined />}
                  onClick={reset}
                  disabled={uploading}
                >
                  Remove
                </Button>
              </Tooltip>
            </div>

            <div className="flex-1" />

            <Button
              type="primary"
              icon={<CloudUploadOutlined />}
              onClick={upload}
              loading={uploading}
            >
              Tải ảnh lên
            </Button>
          </div>

          {uploading || progress > 0 ? (
            <div className="mt-1">
              <Progress
                percent={progress}
                status={uploading ? "active" : "normal"}
              />
            </div>
          ) : null}
        </div>
      )}

      {/* Download URL */}
      {downloadUrl && (
        <div className="p-3 rounded-xl border border-green-200 bg-green-50 break-all">
          <div className="flex items-center gap-2 text-green-700">
            <LinkOutlined />
            <a
              href={downloadUrl}
              target="_blank"
              rel="noreferrer"
              className="underline"
            >
              Link ảnh đã upload
            </a>
          </div>
          <div className="text-xs text-gray-500 mt-1">
            Tip: lưu URL này vào DB của cậu nhé.
          </div>
        </div>
      )}

      {/* Preview Modal */}
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
          style={{ width: "100%", maxHeight: "80vh", objectFit: "contain" }}
        />
      </Modal>
    </div>
  );
}
