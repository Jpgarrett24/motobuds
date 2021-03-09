import axios from 'axios';
import settings from '../config/settings';

const usersApi = {
    register: function (formData) {
        return (axios.post(`${settings.dev.apiUrl}/users`, formData)
            .then((res) => res)
            .catch((err) => err.response))
    }
}

export default usersApi;