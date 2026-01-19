import api from '@/plugins/axios';
export const AuthService = {

  async me() {
    const response = await api.get('/auth/me');
    return response.data;
  },
  async login(email, password) {
    const response = await api.post('/auth/login', { email, password });
    return response.data;
  },
  async logout() {
    const response = await api.post('/auth/logout');
    return response.data;
  },
  async setTheme(id, theme) {

    const response = await api.put(`/auth/preferences/${id}`, { theme });
    return response.data;
  }

}
