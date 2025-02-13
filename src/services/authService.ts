// src/services/authService.ts
export const login = (username: string, password: string) => {
    // 调用后端 API 进行用户登录
    return fetch('/api/login', {
      method: 'POST',
      body: JSON.stringify({ username, password }),
      headers: { 'Content-Type': 'application/json' }
    });
  };
