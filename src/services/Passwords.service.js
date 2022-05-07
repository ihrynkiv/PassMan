import api from "../components/http/axios.instanse";
import {getEncryptedPassword} from "../utils/passwords.utils";

export const passwordsService = {
  fetchPasswords: async () => await api.get('/passwords/'),
  createPassword: async (data) => {
    const encryptedPassword = getEncryptedPassword(data.password)
    return api.post('/passwords/', {...data, password: encryptedPassword})
  },
  updatePassword: async (id, data) => {
    const encryptedPassword = getEncryptedPassword(data.password)
    return api.put(`/passwords/${id}`, {...data, password: encryptedPassword})
  },
}
