export interface ApiResponse<T> {
  success: boolean;
  message: string;
  data: T;
}

const API_BASE_URL = 'http://localhost:5173/api';

/**
 * 发送 POST 请求到 API
 */
export const post = async <T>(endpoint: string, data: T): Promise<ApiResponse<T>> => {
  try {
    const response = await fetch(`${API_BASE_URL}${endpoint}`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(data)
    });

    // 检查 HTTP 状态码
    if (!response.ok) {
      throw new Error(`HTTP error! Status: ${response.status}`);
    }

    return (await response.json()) as ApiResponse<T>;
  } catch (error) {
    console.error('API Error:', error);
    throw error;
  }
};

/**
 * 直接导出一个 API 方法，供外部调用
 */
export const exportDataToBackend = async <T>(data: T): Promise<ApiResponse<T>> => {
  console.log('Game data:', data);
  return {
    success: true,
    message: 'Data processed successfully',
    data
  };
};

export default {
  baseURL: API_BASE_URL,
  post
};
