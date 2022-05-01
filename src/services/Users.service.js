import api from "../component/http/axios.instanse";

export const AuthService = {
    fetch: async () => api.get('/users/')
}
