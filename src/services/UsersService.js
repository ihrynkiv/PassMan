import api from "../components/http/axios.instanse";

export const UsersService = {
    fetchUsers: async () => api.get('/users/'),
    fetchUserNames: async () => api.get('/users/userNames'),
    whoAmI: async () => api.get('/users/whoami'),
}
