import api from "../components/http/axios.instanse";

export const AuthService = {
    login: async (username, password) => {
        return api.post('/auth/login', {username, password})
    },

    registration: async (username, password) => {
        return api.post('/auth/registration', {username, password})
    }
}