// src/utils/storage.ts

/**
 * 获取玩家余额，如果没有，则返回默认值 3000
 */
export const getPlayerBalance = (): number => {
  const balance = localStorage.getItem('playerBalance');
  return balance ? Number(balance) : 3000;
};

/**
 * 设置玩家余额
 */
export const setPlayerBalance = (balance: number): void => {
  localStorage.setItem('playerBalance', balance.toString());
};

/**
 * 定义 Jump 类型（假设它是一个简单的对象类型，按实际需求调整）
 */
interface Jump {
  id: number;
  timestamp: string;
  result: string;  // 根据实际的跳跃历史记录调整字段类型
}

/**
 * 获取跳跃历史记录，返回数组，如果没有则返回空数组
 */
export const getJumpHistory = (): Jump[] => {
  const history = localStorage.getItem('jumpHistory');
  return history ? JSON.parse(history) : [];
};

/**
 * 设置跳跃历史记录
 */
export const setJumpHistory = (history: Jump[]): void => {
  localStorage.setItem('jumpHistory', JSON.stringify(history));
};
