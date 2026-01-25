import { defineStore } from "pinia";
import api from "@/plugins/axios";
import { useAuthStore } from "./auth";
import { auth } from "@/middlewares/guard";


export const useMeStore = defineStore("me", {
  state: () => {
    return {}
  },
  actions: {
    async getMe() {
      const authStore = useAuthStore();
      await api.get('/auth/me')

        .then((r) => {

          authStore.setUser(r.data.data.user);
          authStore.setToken(r.data.data.token);
          authStore.setPreferences(r.data.data.preferences);

        })
        .catch((e) => {
          authStore.clearAuth();
        });
    }
  },

});
