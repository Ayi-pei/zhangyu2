// src/services/authService.ts
import api from './api.ts';

export const login = async (username: string, password: string) => {
  const response = await api.post('/login', { username, password });
  return response.data; // 后端返回的数据
};
