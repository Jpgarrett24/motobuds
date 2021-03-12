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

    joinRide: function (trip_id, riders, user_id) {
        const updatedRiders = {
            "riders": []
        }
        riders.forEach((rider) => updatedRiders.riders.push(rider._id));
        updatedRiders.riders.push(user_id);
        console.log(updatedRiders, user_id);
        return (
            axios.put(`${settings.dev.apiUrl}/trips/${trip_id}`, updatedRiders)
                .then((res) => res)
                .catch((err) => err.response)
        );
    },

    leaveRide: function (trip_id, riders, user_id) {
        const updatedRiders = {
            "riders": riders.filter((rider) => rider._id !== user_id)
        };
        updatedRiders.riders = updatedRiders.riders.map((rider) => rider._id);
        return (
            axios.put(`${settings.dev.apiUrl}/trips/${trip_id}`, updatedRiders)
                .then((res) => res)
                .catch((err) => err.response)
        );
    }
};

export default tripsApi;