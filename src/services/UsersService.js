import api from "../components/http/axios.instanse";

export const UsersService = {
    fetchUserNames: async () => api.get('/users/userNames'),
    whoAmI: async () => api.get('/users/whoami'),
}
