import api from "../components/http/axios.instanse";

export const AuthService = {
    fetch: async () => api.get('/users/')
}
