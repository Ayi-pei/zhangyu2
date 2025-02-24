import { createClient } from '@supabase/supabase-js';
import { logError } from '../utils/logger';

// 创建 Supabase 客户端实例
const supabaseUrl = 'https://your-project-id.supabase.co'; // 请替换为你的 Supabase 项目 URL
const supabaseKey = 'your-anon-key'; // 请替换为你的 Supabase 公钥
const supabase = createClient(supabaseUrl, supabaseKey);

export const login = async (username: string, password: string) => {
  try {
    // 使用 Supabase 进行登录
    const { data, error } = await supabase.auth.signInWithPassword({
      email: username,  // 假设用户名是邮箱
      password: password,
    });

    if (error) {
      throw new Error(error.message);
    }

    // 登录成功后返回用户数据
    return data;
  } catch (error) {
    logError(error); // 记录错误
    throw error; // 抛出错误供前端处理
  }
};

export const logout = async () => {
  try {
    // 使用 Supabase 进行登出
    const { error } = await supabase.auth.signOut();

    if (error) {
      throw new Error(error.message);
    }

    // 登出成功后可以处理一些后续操作
    return true;
  } catch (error) {
    logError(error);
    throw error; // 继续抛出错误
  }
};
