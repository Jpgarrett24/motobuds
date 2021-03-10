import axios from 'axios';
import settings from '../config/settings';

const tripsApi = {
    getAll: function () {
        return (axios.get(`${settings.dev.apiUrl}/trips`)
            .then((res) => res)
            .catch((err) => err.response)
        );
    },
};

export default tripsApi;