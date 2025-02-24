import React, { createContext, useContext, useState, useEffect, useReducer, ReactNode, Dispatch } from 'react';
import { supabase } from '../api/supabase';

interface User {
  id: string;
  email: string;
  // 添加其他用户属性
}

interface AuthContextType {
  user: User | null;
  isAuthenticated: () => boolean;
  login: (email: string, password: string) => Promise<void>;
  logout: () => Promise<void>;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export const AuthProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [user, setUser] = useState<User | null>(null);

  useEffect(() => {
    const session = supabase.auth.session();
    setUser(session?.user ?? null);

    const { data: authListener } = supabase.auth.onAuthStateChange((_event: string, session: { user: User | null }) => {
      setUser(session?.user ?? null);
    });

    return () => {
      authListener?.unsubscribe();
    };
  }, []);

  const isAuthenticated = () => {
    return user !== null;
  };

  const login = async (email: string, password: string) => {
    const { user, error } = await supabase.auth.signIn({ email, password });
    if (error) throw error;
    setUser(user);
  };

  const logout = async () => {
    const { error } = await supabase.auth.signOut();
    if (error) throw error;
    setUser(null);
  };

  return (
    <AuthContext.Provider value={{ user, isAuthenticated, login, logout }}>
      {children}
    </AuthContext.Provider>
  );
};

// Removed useAuth hook to a separate file.

type CountState = {
  count: number;
};

type CountAction = 
  | { type: 'increment' }
  | { type: 'decrement' };

const initialState: CountState = {
  count: 0,
};

const reducer = (state: CountState, action: CountAction): CountState => {
  switch (action.type) {
    case 'increment':
      return { count: state.count + 1 };
    case 'decrement':
      return { count: state.count - 1 };
    default:
      return state;
  }
};

interface CountContextValue {
  state: CountState;
  dispatch: Dispatch<CountAction>;
}

// 创建上下文（初始值为 undefined）
const CountContext = createContext<CountContextValue | undefined>(undefined);

interface CountProviderProps {
  children: ReactNode;
}

// Provider 组件
const CountProvider = ({ children }: CountProviderProps) => {
  const [state, dispatch] = useReducer(reducer, initialState);
  return (
    <CountContext.Provider value={{ state, dispatch }}>
      {children}
    </CountContext.Provider>
  );
};

// 自定义 hook，方便使用 context
export const useCount = () => {
  const context = useContext(CountContext);
  if (context === undefined) {
    throw new Error('useCount must be used within a CountProvider');
  }
  return context;
};

// 示例组件
const Counter = () => {
  const { state, dispatch } = useCount();
  return (
    <div>
      <p>Count: {state.count}</p>
      <button onClick={() => dispatch({ type: 'increment' })}>
        Increment
      </button>
      <button onClick={() => dispatch({ type: 'decrement' })}>
        Decrement
      </button>
    </div>
  );
};

export { AuthProvider, CountProvider, useCount, Counter };
