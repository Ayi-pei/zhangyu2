import { defineConfig } from 'vite';
import vue from '@vitejs/plugin-vue';
import react from '@vitejs/plugin-react';
import path from 'path';
import { viteMockServe } from 'vite-plugin-mock';
import AutoImport from 'unplugin-auto-import/vite';
import Components from 'unplugin-vue-components/vite';
import { ElementPlusResolver } from 'unplugin-vue-components/resolvers';
import { createSvgIconsPlugin } from 'vite-plugin-svg-icons';

export default defineConfig({
  plugins: [vue(), react()],
  server: {
    proxy: {
      '/api': 'http://localhost:5000', // Set the backend API URL
    },
    host: true,
    port: 3000,
    strictPort: true,
  },
  resolve: {
    alias: {
      '@': path.resolve(__dirname, './src'),
    },
  },
  css: {
    preprocessorOptions: {
      less: {
        math: true,
        javascriptEnabled: true,
        additionalData: `@import "./src/assets/style/preload/index.less";`,
      },
    },
  },
  build: {
    outDir: 'dist',
  },
  plugins: [
    vue(),
    react(),
    viteMockServe({ watchFiles: false, mockPath: './src/mock' }),
    AutoImport({
      resolvers: [ElementPlusResolver()],
    }),
    Components({
      resolvers: [ElementPlusResolver()],
    }),
    createSvgIconsPlugin({
      iconDirs: [path.resolve(__dirname, './src/assets/svg')], // svg地址
      symbolId: 'icon-[dir]-[name]', // 命名格式
    }),
  ],
});
