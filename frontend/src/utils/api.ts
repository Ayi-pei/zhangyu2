// src/utils/api.ts

const API_BASE_URL = 'http://localhost:3000/';

interface ExportData {
  // 根据实际数据结构定义属性
  [key: string]: unknown;
}

/**
 * 将数据导出到后台
 * @param data 需要传输的数据
 */
export const exportDataToBackend = async (data: ExportData): Promise<{ success: boolean; message: string; data: ExportData }> => {
  try {
    // For development, we'll just log the data and return a success response
    console.log('Game data:', data);
    return {
      success: true,
      message: 'Data processed successfully',
      data
    };
  } catch (error) {
    console.error('Error processing data:', error);
    throw error;
  }
};

// Export a default API client for other services
export default {
  baseURL: API_BASE_URL,
  post: async (endpoint: string, data: ExportData) => {
    try {
      const response = await fetch(`${API_BASE_URL}${endpoint}`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify(data)
      });
      return await response.json();
    } catch (error) {
      console.error('API Error:', error);
      throw error;
    }
  }
};