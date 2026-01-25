import api from '@/plugins/axios';
export const TenantService = {
  async getAllTenants() {
    const response = await api.get('/tenants');
    return response.data;
  },
  async get(tenant_id) {
    const response = await api.get(`/tenants/${tenant_id}`);
    return response.data;
  },
  async create(tenant) {
    const response = await api.post('/tenants', tenant);
    return response.data;
  },
  async update(tenant_id, payload) {
    const response = await api.put(`/tenants/${tenant_id}`, payload);
    return response.data;
  },
  async delete(tenant) {
    const response = await api.delete(`/tenants/${tenant.id}`);
    return response.data;
  },
};
