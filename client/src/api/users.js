import axios from 'axios';
import settings from '../config/settings';

const usersApi = {
    register: function (formData) {
        return (
            axios.post(`${settings.dev.apiUrl}/users`, formData)
                .then((res) => res)
                .catch((err) => err.response))
    },

    getUser: function (user_id) {
        return (
            axios.get(`${settings.dev.apiUrl}/users/${user_id}`)
                .then((res) => res)
                .catch((err) => err.response)
        );
    },

    getMyRides: function (user_id) {
        return (
            axios.get(`${settings.dev.apiUrl}/myRides/${user_id}`,)
                .then((res) => res)
                .catch((err) => err.response)
        );
    },
}

export default usersApi;