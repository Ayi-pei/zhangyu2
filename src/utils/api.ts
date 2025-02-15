// src/utils/api.ts
// https换成后台接口的URL
/**
 * 将数据导出到后台
 * @param data 需要传输的数据
 */
export const exportDataToBackend = async (data: any): Promise<any> => {
    try {
      const response = await fetch('https://your-backend-system.com/api/export', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify(data)
      });
      if (!response.ok) {
        throw new Error('网络错误');
      }
      return await response.json();
    } catch (error) {
      console.error('数据发送失败:', error);
      throw error;
    }
  };
