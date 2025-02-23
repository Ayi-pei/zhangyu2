import axios from 'axios';
import { LoginParams, LoginResult, CaptchaParams, CaptchaResult, UserInfo } from './type/login';

/**
 * @description 获取图片验证码
 * @param {CaptchaParams} params 可选参数
 * @return {CaptchaResult} 返回验证码结果
 */
export const getImageCaptcha = async (params?: CaptchaParams): Promise<CaptchaResult> => {
  try {
    const response = await axios.get<CaptchaResult>('https://api.example.com/captcha', { params });
    return response.data;
  } catch (error) {
    console.error('Error fetching captcha:', error);
    throw error;
  }
};

/**
 * @description 登录
 * @param {LoginParams} data 登录参数
 * @return {LoginResult} 返回登录结果
 */
export const login = async (data: LoginParams): Promise<LoginResult> => {
  try {
    const response = await axios.post<LoginResult>('https://api.example.com/login', data);
    return response.data;
  } catch (error) {
    console.error('Error logging in:', error);
    throw error;
  }
};

/**
 * @description 获取用户信息
 * @param {string} userId 用户ID
 * @return {UserInfo} 返回用户信息
 */
export const getUserInfo = async (userId: string): Promise<UserInfo> => {
  try {
    const response = await axios.get<UserInfo>(`https://api.example.com/users/${userId}`);
    return response.data;
  } catch (error) {
    console.error('Error fetching user info:', error);
    throw error;
  }
};
