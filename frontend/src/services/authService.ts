// src/services/authService.ts
import api from "../utils/api";  // 默认导入

// 登录请求数据类型
interface LoginRequest {
  username: string;
  password: string;
}

// 登录响应数据类型
interface LoginResponse {
  token: string;
  username: string;
}

// 登录请求方法
export const login = async (username: string, password: string) => {
  const loginData: LoginRequest = { username, password };

  // 传入请求类型 LoginRequest 和响应类型 LoginResponse
  const response = await api.post<LoginResponse, LoginRequest>('/login', loginData);

  // 返回响应的 data
  return response.data;
};
