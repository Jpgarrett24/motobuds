import axios from 'axios';
import settings from '../config/settings';

const usersApi = {
    register: function (formData) {
        axios.post(`${settings.dev.apiUrl}/users`, formData)
            .then((res) => console.log(res))
            .catch((err) => console.log(err))
    }
}

export default usersApi;