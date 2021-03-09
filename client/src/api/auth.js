import axios from 'axios';
import settings from '../config/settings';

const auth = {
    login: function async(formData) {
        return axios.post(`${settings.dev.apiUrl}/login`, formData)
            .then((res) => res)
            .catch((err) => err)
    }
}

export default auth;