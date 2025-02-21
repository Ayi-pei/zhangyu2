// src/utils/api.ts

const API_BASE_URL = 'http://localhost:3000/api';

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
export default {
  baseURL: API_BASE_URL,

  // 使用泛型传递具体类型
  post: async <T, U>(endpoint: string, data: U): Promise<ApiResponse<T>> => {  // U 用来定义传递的 data 类型
    try {
      const response = await fetch(`${API_BASE_URL}${endpoint}`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(data),
      });

      const result = await response.json();
      return result;
    } catch (error) {
      console.error('API Error:', error);
      throw error;
    }
  },
};
