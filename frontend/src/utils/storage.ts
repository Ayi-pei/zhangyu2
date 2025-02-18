// 如果你已有 Jump 接口，可以直接引入（或者在此处定义）
export interface Jump {
  direction: string;
  steps: number;
  results: string[];
  timestamp: number;
  pointsEarned: number;
  status: 'pending' | 'completed';
}

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
 * 获取跳跃历史记录，返回 Jump 数组，如果没有则返回空数组
 */
export const getJumpHistory = (): Jump[] => {
  const history = localStorage.getItem('jumpHistory');
  return history ? JSON.parse(history) as Jump[] : [];
};

/**
 * 设置跳跃历史记录
 */
export const setJumpHistory = (history: Jump[]): void => {
  localStorage.setItem('jumpHistory', JSON.stringify(history));
};