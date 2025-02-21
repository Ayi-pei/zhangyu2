// src/utils/api.ts

const API_BASE_URL = 'http://localhost:3000/api'; // 可以用于配置

/**
 * API 响应泛型接口
 */
interface ApiResponse<T> {
  data: T;
  status: string;
  message: string;
}

/**
 * 默认的 API 客户端
 */
const api = {
  baseURL: API_BASE_URL,
  post: async <T, U>(endpoint: string, data: U): Promise<ApiResponse<T>> => {
    const response = await fetch(`${API_BASE_URL}${endpoint}`, {
      method: 'POST',
      body: JSON.stringify(data),
      headers: { 'Content-Type': 'application/json' }
    });
    const result = await response.json();
    return result;
  }
};

export default api;  // 确保使用默认导出