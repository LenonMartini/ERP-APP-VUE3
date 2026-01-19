import api from '@/plugins/axios';
export const TenantService = {
    async getAllTenants() {
        const response = await api.get('/tenants');
        return response.data;
    },
};