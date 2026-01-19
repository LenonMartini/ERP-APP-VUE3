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
    preferences: null
  }),
  actions: {
    async login(payload) {
      try {
        const notification = useNotificationStore();
        const response = await AuthService.login(payload.email, payload.password);

        if (response.data.token) {

          this.user = response.data.user
          this.token = response.data.token;
          this.preferences = response.data.preferences;
          Cookie.setToken(response.data.token);

          return true;
        }

      } catch (e) {
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
    async setPreferences(preferences) {
      this.preferences = await preferences;
    },
    async setThemePreference(key, value) {
      const pref = this.preferences.find(p => p.key === key)

      if (pref) {
        pref.value = value
      } else {
        this.preferences.push({ key, value })
      }

      try {

        const response = await AuthService.setTheme(pref.id, value);
        //console.log(response)

      } catch (e) {
        const notification = useNotificationStore();
        notification.notify(e.response.data.message, 'error');
      }
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
