// src/api/user.ts
import { supabase } from '@/api/supabase'

// 通过用户 ID 查询账户信息
export async function getUserById(userId: number) {
  const { data, error } = await supabase
    .from('users')
    .select('*')
    .eq('id', userId)
    .single();
  return error ? null : data;
}

// 更新用户账户信息
export async function updateUserAccount(userId: number, cardNumber: string, accountInfo: string) {
  const { data, error } = await supabase
    .from('users')
    .update({ card_number: cardNumber, account_info: accountInfo, updated_at: new Date() })
    .eq('id', userId);
  return error ? null : data;
}
