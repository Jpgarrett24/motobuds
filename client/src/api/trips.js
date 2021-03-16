import axios from 'axios';

import usersApi from './users';
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

    joinRide: async function (trip_id, riders, user) {
        const updatedRiders = {
            "riders": []
        }
        riders.forEach((rider) => updatedRiders.riders.push(rider._id));
        updatedRiders.riders.push(user._id);
        axios.put(`${settings.dev.apiUrl}/trips/${trip_id}`, updatedRiders)
            .then((res) => res)
            .catch((err) => err.response)

        let updateUser = await usersApi.getUser(user._id);
        updateUser = updateUser.data;
        const userTrips = updateUser.trips;
        userTrips.push(trip_id);
        return (axios.put(`${settings.dev.apiUrl}/users/${user._id}`, { trips: userTrips })
            .then((res) => res)
            .catch((err) => err.response))
    },

    leaveRide: async function (trip_id, riders, user) {
        const updatedRiders = {
            "riders": riders.filter((rider) => rider._id !== user._id)
        };
        updatedRiders.riders = updatedRiders.riders.map((rider) => rider._id);
        axios.put(`${settings.dev.apiUrl}/trips/${trip_id}`, updatedRiders)
            .then((res) => res)
            .catch((err) => err.response);

        let updateUser = await usersApi.getUser(user._id);
        updateUser = updateUser.data;
        const userTrips = { trips: updateUser.trips.filter((trip) => trip !== trip_id) };
        return (
            axios.put(`${settings.dev.apiUrl}/users/${user._id}`, userTrips)
                .then((res) => res)
                .catch((err) => err.response)
        );
    },

    create: function (formData) {
        return (
            axios.post(`${settings.dev.apiUrl}/trips`, formData)
                .then((res) => res)
                .catch((err) => err.response)
        );
    },
};

export default tripsApi;