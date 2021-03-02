const Trip = require('../models/trip.model');

module.exports = {
    create(req, res) {
        Trip.create(req.body)
            .then((trip) => {
                res.json(trip);
            })
            .catch((err) => {
                res.status(400).json(err);
            });
    },

    getAll(req, res) {
        Trip.find()
            .then((trips) => {
                res.json(trips);
            })
            .catch((err) => {
                res.json(err);
            });
    },

    getOne(req, res) {
        Trip.findById(req.params._id)
            .then((trip) => {
                res.json(trip);
            })
            .catch((err) => {
                res.json(err);
            });
    },

    update(req, res) {
        Trip.findByIdAndUpdate(req.params._id, req.body, {
            runValidators: true,
            new: true,
        })
            .then((trip) => {
                res.json(trip);
            })
            .catch((err) => {
                res.status(400).json(err);
            });
    },

    delete(req, res) {
        Trip.findByIdAndDelete(req.params._id)
            .then((trip) => {
                res.json(trip);
            })
            .catch((err) => {
                res.json(err);
            });
    },
};