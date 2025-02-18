import { createContext } from 'react';

// 定义认证上下文的类型
export interface AuthContextType {
  isAuthenticated: boolean;
  isAdmin: boolean;
  login: (admin?: boolean) => void;
  logout: () => void;
}

// 创建并导出 AuthContext
export const AuthContext = createContext<AuthContextType | undefined>(undefined);
