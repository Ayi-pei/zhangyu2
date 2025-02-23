import { defineStore } from 'pinia';
import { useRouter } from 'vue-router';
import { getUserInfo, login, getImageCaptcha } from '@/api/login/userApi';
import cache from '@/utils/cache';
import { ACCESS_TOKEN_KEY } from '@/constants';
import { resetRoutes, setRoutes } from '@/router';

interface UserInfo {
  userName: string;
  roles: string[];
  [anykey: string | number]: any;
}

export const useUserStore = defineStore('user', {
  state: () => ({
    userInfo: null as UserInfo | null,
    roles: [] as string[],
    routes: [] as any[],
    captchaId: '' as string,
    userName: '' as string,
  }),
  actions: {
    async fetchUserInfo(userId: string) {
      try {
        const data = await getUserInfo(userId);
        this.userInfo = data;
      } catch (error) {
        console.error('Failed to fetch user info:', error);
      }
    },
    async setToken(token: string) {
      await cache.setCookie(ACCESS_TOKEN_KEY, token, 7 * 24 * 60 * 60);
    },
    setRoles(roles: string[]) {
      this.roles = roles;
    },
    logout() {
      this.$reset();
      cache.removeCookie(ACCESS_TOKEN_KEY);
      cache.clear();
      resetRoutes();
      const router = useRouter();
      router.push({ name: 'login' });
    },
    configureRoutes() {
      this.routes = setRoutes();
    },
    async getCaptcha(width: number, height: number) {
      const res = await getImageCaptcha({ width, height });
      this.captchaId = res.id;
      return res.img;
    },
    async login(username: string, password: string, verifyCode: string) {
      const captchaId = this.captchaId;
      const data = await login({ username, password, captchaId, verifyCode });
      if (data?.token) {
        await this.setToken(data.token);
        await this.fetchUserInfo(data.userId); // 确保传递 userId 参数
        return true;
      }
      return false;
    },
    async getUserInfo(userId: string) {
      const data = await getUserInfo(userId);
      const { userName, roles } = data;
      this.userName = userName;
      this.roles = roles;
    },
  },
});
