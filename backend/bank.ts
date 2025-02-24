// src/api/bank.ts
import { supabase } from './supabase'

// 绑定银行卡
export async function bindCard(userId: number, cardNumber: string, bank: string, cardHolder: string) {
  const { data, error } = await supabase
    .from('bank_cards')
    .insert([
      { user_id: userId, card_number: cardNumber, bank: bank, card_holder: cardHolder, created_at: new Date() }
    ]);

  return error ? { success: false, message: '绑定失败' } : { success: true, message: '绑定成功', data };
}

// 获取绑定的银行卡信息
export async function getCardInfo(userId: number) {
  const { data, error } = await supabase
    .from('bank_cards')
    .select('*')
    .eq('user_id', userId)
    .single();

  return error ? null : data;
}
