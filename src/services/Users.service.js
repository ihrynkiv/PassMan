import api from "../components/http/axios.instanse";

export const usersService = {
    fetchUsers: async () => api.get('/users/'),
    fetchUserNames: async () => api.get('/users/userNames')
}
