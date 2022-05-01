import api from "../components/http/axios.instanse";

export const AuthService = {
    login: async (data) => api.post('/auth/login', data),
    registration: async (data) => api.post('/auth/registration', data)
}