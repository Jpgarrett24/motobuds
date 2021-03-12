import axios from 'axios';
import settings from '../config/settings';

const tripsApi = {
    getAll: function () {
        return (
            axios.get(`${settings.dev.apiUrl}/trips`)
                .then((res) => res)
                .catch((err) => err.response)
        );
    },

    getOne: function (_id) {
        return (
            axios.get(`${settings.dev.apiUrl}/trips/${_id}`)
                .then((res) => res)
                .catch((err) => err.response)
        );
    },

    joinRide: function (trip_id, users) {
        return (
            axios.put(`${settings.dev.apiUrl}/trips/${trip_id}`, users)
                .then((res) => res)
                .catch((err) => err.response)
        );
    },
};

export default tripsApi;