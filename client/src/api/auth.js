import axios from 'axios';
import settings from '../config/settings';

const authApi = {
    login: function async(formData) {
        return axios.post(`${settings.dev.apiUrl}/login`, formData)
            .then((res) => res)
            .catch((err) => err.response)
    },

    verify: function async(token) {
        return axios.post(`${settings.dev.apiUrl}/verify`, { token })
            .then((res) => res)
            .catch((err) => err.response);
    },
}

export default authApi;