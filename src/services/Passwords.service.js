import api from "../components/http/axios.instanse";

export const passwordsService = {
  fetchPasswords: async () => api.get('/passwords/'),
  createPassword: async (data) => api.post('/passwords/', data)
}
