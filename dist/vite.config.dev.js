"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = void 0;

var _vite = require("vite");

var _pluginVue = _interopRequireDefault(require("@vitejs/plugin-vue"));

var _path = _interopRequireDefault(require("path"));

var _vitePluginMock = require("vite-plugin-mock");

var _vite2 = _interopRequireDefault(require("unplugin-auto-import/vite"));

var _vite3 = _interopRequireDefault(require("unplugin-vue-components/vite"));

var _resolvers = require("unplugin-vue-components/resolvers");

var _vitePluginSvgIcons = require("vite-plugin-svg-icons");

var _defineConfig;

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }

function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }

var _default = (0, _vite.defineConfig)((_defineConfig = {
  plugins: [(0, _pluginVue["default"])()],
  server: {
    proxy: {
      '/api': 'http://localhost:5000' // Set the backend API URL

    }
  },
  resolve: {
    alias: {
      '@': _path["default"].resolve(__dirname, './src')
    }
  }
}, _defineProperty(_defineConfig, "server", {
  host: true,
  port: 5173,
  strictPort: false
}), _defineProperty(_defineConfig, "css", {
  preprocessorOptions: {
    less: {
      math: true,
      javascriptEnabled: true,
      additionalData: "@import \"./src/assets/style/preload/index.less\";"
    }
  }
}), _defineProperty(_defineConfig, "plugins", [(0, _pluginVue["default"])(), (0, _vitePluginMock.viteMockServe)({
  watchFiles: false,
  mockPath: './src/mock'
}), (0, _vite2["default"])({
  resolvers: [(0, _resolvers.ElementPlusResolver)()]
}), (0, _vite3["default"])({
  resolvers: [(0, _resolvers.ElementPlusResolver)()]
}), (0, _vitePluginSvgIcons.createSvgIconsPlugin)({
  iconDirs: [_path["default"].resolve(__dirname, './src/assets/svg')],
  // svg地址
  symbolId: 'icon-[dir]-[name]' // 命名格式

})]), _defineConfig));

exports["default"] = _default;