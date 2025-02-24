import { useState, useEffect } from 'react';
import { supabase } from '../../frontend/src/api/supabase';
import { Session, AuthChangeEvent } from '@supabase/supabase-js';

interface User {
  id: string;
  email: string;
  // 添加其他用户属性
}

export function useAuth() {
  const [user, setUser] = useState<User | null>(null);

  useEffect(() => {
    async function getSessionAndUpdateUser() {
      const { data } = await supabase.auth.getSession();
      setUser(data.session?.user as User ?? null);
    }
    getSessionAndUpdateUser();

    const { data: authListener } = supabase.auth.onAuthStateChange((event: AuthChangeEvent, session: Session | null) => {
      setUser(session?.user as User ?? null);
    });

    return () => {
      authListener?.subscription.unsubscribe();
    };
  }, []);

  const isAuthenticated = () => {
    return user !== null;
  };

  const login = async (email: string, password: string) => {
    const { data, error } = await supabase.auth.signInWithPassword({ email, password });
    if (error) throw error;
    setUser(data.user as User);
  };

  const logout = async () => {
    const { error } = await supabase.auth.signOut();
    if (error) throw error;
    setUser(null);
  };

  return { user, isAuthenticated, login, logout };
}
