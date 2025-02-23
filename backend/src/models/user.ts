import { supabase } from '../api/supabase';

export interface User {
  id: string;
  username: string;
  email: string;
  card_number?: string;
  account_info?: string;
  // add additional properties if needed
}

// 获取所有用户
export async function getUsers(): Promise<User[] | null> {
  const { data, error } = await supabase.from('users').select('*');
  return error ? null : data;
}

// 获取单个用户
export async function getUserById(userId: number): Promise<User | null> {
  const { data, error } = await supabase
    .from('users')
    .select('*')
    .eq('id', userId)
    .single();
  return error ? null : data;
}

// 创建用户
export async function createUser(userData: any): Promise<User | null> {
  const { data, error } = await supabase.from('users').insert([userData]);
  return error ? null : data;
}

// 更新用户
export async function updateUser(userId: number, userData: any): Promise<User | null> {
  const { data, error } = await supabase
    .from('users')
    .update(userData)
    .eq('id', userId);
  return error ? null : data;
}

// 删除用户
export async function deleteUser(userId: number): Promise<boolean> {
  const { error } = await supabase.from('users').delete().eq('id', userId);
  return error ? false : true;
}