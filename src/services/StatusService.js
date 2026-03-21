import api from "@/plugins/axios";
export const StatusService = {
  async getAll() {
    const response = await api.get("/status");
    return response.data;
  },
  async get(id) {
    const response = await api.get(`/status/${id}`);
    return response.data;
  },
  async create(data) {
    const response = await api.post("/status", data);
    return response.data;
  },
  async update(id, data) {
    const response = await api.put(`/status/${id}`, data);
    return response.data;
  },
  async delete(id) {
    const response = await api.delete(`/status/${id}`);
    return response.data;
  },
};
