import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";

export default defineConfig({
  plugins: [react()],
  server: {
    port: 5173, // Vite 前端运行端口
    proxy: {
      "/api": {
        target: "http://localhost:3000", // 代理后端服务器
        changeOrigin: true,
        rewrite: (path) => path.replace(/^\/api/, ""), // 去掉 `/api`
      },
    },
  },
  resolve: {
    extensions: [".js", ".ts", ".jsx", ".tsx", ".css"],
  },
  build: {
    rollupOptions: {
      input: "./index.html", // 确保路径正确
    },
  },
});

