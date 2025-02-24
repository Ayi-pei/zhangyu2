import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";

export default defineConfig({
  plugins: [react()],
  server: {
    middlewareMode: false,
    port: 5173, // 可以修改端口
  },
    resolve: {
      extensions: ['.js', '.ts', '.jsx', '.tsx', '.css'],
  },
  build: {
    rollupOptions: {
      input: "./index.html", // 确保这是正确的路径
    },
  },
});

