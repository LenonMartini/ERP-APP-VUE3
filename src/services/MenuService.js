import api from '@/plugins/axios';

export const MenuService = {
  async findAll() {
    const response = await api.get('/menus');
    return response.data;
  },
}
