import React from "react";

const formatVND = (value) => {
  if (!value) return "";
  return value
    .toString()
    .replace(/\D/g, "") // chỉ lấy số
    .replace(/\B(?=(\d{3})+(?!\d))/g, ".");
};

export default function CurrencyInput({ value, onChange, ...rest }) {
  const handleChange = (e) => {
    const raw = e.target.value.replace(/\./g, "");
    onChange(raw);
  };

  return <input {...rest} value={formatVND(value)} onChange={handleChange} />;
}
