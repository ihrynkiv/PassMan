import api from "../components/http/axios.instanse";

export const passwordsService = {
  fetchPasswords: async () => api.get('/passwords/'),
  createPassword: async (data) => api.post('/passwords/', data),
  updatePassword: async (id, data) => api.put(`/passwords/${id}`, data),
}
