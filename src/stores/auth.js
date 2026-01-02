import { defineStore } from "pinia";
import Cookie from "@/utils/cookie";
import api from "@/plugins/axios";
import { AuthService } from "@/services/AuthService";
import { useMeStore } from "./me";
import { useNotificationStore } from "./notification";



export const useAuthStore = defineStore("auth", {
  state: () => ({
    user: null,
    token: null,
  }),
  actions: {
    async login(payload) {
      try{
        const notification = useNotificationStore();
        const response = await AuthService.login(payload.email, payload.password);

        if(response.token){
          this.user = response.user;
          this.token = response.token;
          Cookie.setToken(response.token);

          return true;
        }

      }catch(e){
        const notification = useNotificationStore();
        notification.notify(e.response.data.message, 'error');

        this.clearAuth();

      }
    },
    async setUser(user) {
      this.user = await user;
    },
    async setToken(token) {
      this.token = await token;
    },
    async isLogged() {
      const token = Cookie.getToken()
      if (!token) return false
       const meStore = useMeStore()
      try {
        await meStore.getMe()
        return true
      } catch (error) {
        this.clearAuth()
        return false
      }
    },

    async logout() {
       try {
        // se existir endpoint de logout
        const response = await AuthService.logout()
        return response;
      } catch (e) {
        // mesmo se falhar, continua
      } finally {
        // 🔥 SEMPRE limpar auth
        this.clearAuth()
      }

      return true
    },


    clearAuth() {
      this.user = [];
      this.token = [];
      Cookie.removeToken();
    },

  },
});
