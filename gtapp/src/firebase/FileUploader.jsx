// src/components/FileUploader.jsx
import React, { useState, useRef } from "react";
import { ref, uploadBytesResumable, getDownloadURL } from "firebase/storage";
import { storage } from "../firebase/firebaseConfig";

const formatBytes = (bytes) => {
  if (bytes === 0) return "0 B";
  const k = 1024;
  const sizes = ["B", "KB", "MB", "GB", "TB"];
  const i = Math.floor(Math.log(bytes) / Math.log(k));
  return parseFloat((bytes / Math.pow(k, i)).toFixed(2)) + " " + sizes[i];
};

/**
 * FileUploader
 * Props:
 * - folder?: string (default 'uploads')
 * - accept?: string (ví dụ: 'image/*,.pdf')
 * - maxSizeMB?: number (default 20)
 * - onUploaded?: (info: { url, path, name, size }) => void
 */
export default function FileUploader({
  folder = "uploads",
  accept = "*/*",
  maxSizeMB = 20,
  onUploaded,
}) {
  const [file, setFile] = useState(null);
  const [progress, setProgress] = useState(0);
  const [uploading, setUploading] = useState(false);
  const [downloadURL, setDownloadURL] = useState("");
  const [err, setErr] = useState("");
  const inputRef = useRef(null);

  const handlePick = () => inputRef.current?.click();

  const handleSelect = (e) => {
    const f = e.target.files?.[0];
    if (!f) return;
    setErr("");
    if (f.size > maxSizeMB * 1024 * 1024) {
      setErr(`File quá lớn. Tối đa ${maxSizeMB}MB`);
      return;
    }
    setFile(f);
    setProgress(0);
    setDownloadURL("");
  };

  const handleUpload = async () => {
    if (!file) {
      setErr("Chưa chọn file kìa bro 😅");
      return;
    }
    setErr("");
    setUploading(true);
    setProgress(0);

    // path: folder/yyyy-mm-dd/filename.timestamp.ext (tránh trùng)
    const ts = Date.now();
    const safeName = file.name.replace(/\s+/g, "_");
    const path = `${folder}/${new Date()
      .toISOString()
      .slice(0, 10)}/${ts}_${safeName}`;
    const storageRef = ref(storage, path);

    const task = uploadBytesResumable(storageRef, file, {
      contentType: file.type || "application/octet-stream",
    });

    task.on(
      "state_changed",
      (snap) => {
        const pct = Math.round((snap.bytesTransferred / snap.totalBytes) * 100);
        setProgress(pct);
      },
      (error) => {
        setUploading(false);
        setErr(error?.message || "Upload lỗi!");
      },
      async () => {
        try {
          const url = await getDownloadURL(task.snapshot.ref);
          setDownloadURL(url);
          setUploading(false);
          onUploaded?.({
            url,
            path,
            name: file.name,
            size: file.size,
          });
        } catch (e) {
          setUploading(false);
          setErr(e?.message || "Không lấy được download URL");
        }
      }
    );
  };

  const reset = () => {
    setFile(null);
    setProgress(0);
    setErr("");
    setDownloadURL("");
    if (inputRef.current) inputRef.current.value = "";
  };

  return (
    <div
      style={{
        border: "1px solid #e5e7eb",
        borderRadius: 12,
        padding: 16,
        display: "grid",
        gap: 12,
        maxWidth: 520,
      }}
    >
      <div style={{ display: "flex", gap: 8, alignItems: "center" }}>
        <button
          type="button"
          onClick={handlePick}
          style={{
            padding: "8px 12px",
            borderRadius: 8,
            border: "1px solid #d1d5db",
            cursor: "pointer",
            background: "white",
          }}
        >
          Chọn file
        </button>
        <input
          ref={inputRef}
          type="file"
          accept={accept}
          onChange={handleSelect}
          style={{ display: "none" }}
        />
        {file ? (
          <span title={file.name}>
            {file.name} • {formatBytes(file.size)}
          </span>
        ) : (
          <span style={{ color: "#6b7280" }}>
            Chưa chọn file — tối đa {maxSizeMB}MB
          </span>
        )}
      </div>

      <div style={{ display: "flex", gap: 8 }}>
        <button
          type="button"
          onClick={handleUpload}
          disabled={!file || uploading}
          style={{
            padding: "8px 12px",
            borderRadius: 8,
            border: "none",
            background: uploading ? "#d1d5db" : "#111827",
            color: "white",
            cursor: !file || uploading ? "not-allowed" : "pointer",
          }}
        >
          {uploading ? "Đang upload..." : "Upload"}
        </button>
        <button
          type="button"
          onClick={reset}
          disabled={uploading && !downloadURL}
          style={{
            padding: "8px 12px",
            borderRadius: 8,
            border: "1px solid #d1d5db",
            background: "white",
            cursor: uploading && !downloadURL ? "not-allowed" : "pointer",
          }}
        >
          Reset
        </button>
      </div>

      {/* Progress bar */}
      {uploading || progress > 0 ? (
        <div>
          <div
            style={{
              height: 8,
              background: "#e5e7eb",
              borderRadius: 999,
              overflow: "hidden",
            }}
          >
            <div
              style={{
                width: `${progress}%`,
                height: "100%",
                background: "#111827",
                transition: "width .2s",
              }}
            />
          </div>
          <div style={{ fontSize: 12, color: "#6b7280", marginTop: 4 }}>
            {progress}% {file ? `(${formatBytes(file.size)})` : ""}
          </div>
        </div>
      ) : null}

      {/* Result */}
      {downloadURL && (
        <div
          style={{
            background: "#F3FAF7",
            border: "1px solid #BBF7D0",
            padding: 12,
            borderRadius: 8,
            wordBreak: "break-all",
          }}
        >
          ✅ Upload xong:{" "}
          <a href={downloadURL} target="_blank" rel="noreferrer">
            {downloadURL}
          </a>
        </div>
      )}

      {/* Error */}
      {err && (
        <div
          style={{
            background: "#FEF2F2",
            border: "1px solid #FCA5A5",
            padding: 12,
            borderRadius: 8,
          }}
        >
          ❌ {err}
        </div>
      )}
    </div>
  );
}
