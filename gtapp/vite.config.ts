import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";

export default defineConfig({
  base: "./", // Sử dụng đường dẫn tương đối khi build
  plugins: [react()],
});
