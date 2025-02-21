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
export const exportDataToBackend = {
  baseURL: API_BASE_URL,  // 使用 API_BASE_URL 作为基础 URL

  post: async <T, U>(endpoint: string, data: U): Promise<ApiResponse<T>> => {
    // 发送请求的代码
    const response = await fetch(`${exportDataToBackend.baseURL}${endpoint}`, {
      method: 'POST',
      body: JSON.stringify(data),
      headers: { 'Content-Type': 'application/json' }
    });

    // 处理请求返回结果
    const result: ApiResponse<T> = await response.json();

    return result;  // 返回符合 ApiResponse<T> 类型的结果
  }
};
