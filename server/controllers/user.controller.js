const User = require('../models/user.model');
const bcrypt = require('bcrypt');

module.exports = {
    async create(req, res) {
        let newUser = req.body;

        const salt = await bcrypt.genSalt(10);
        const newPassword = await bcrypt.hash(newUser.password, salt);
        newUser = { ...newUser, password: newPassword };

        const testUser = await User.findOne({ email: req.body.email });
        if (testUser) return res.status(400).send({ errors: { message: 'User email address already registered.' } });


        User.create(newUser)
            .then((user) => {
                const token = user.generateAuthToken();
                res.header('x-auth-token', token).status(200).send(token);
            })
            .catch((err) => {
                res.status(400).json(err);
            });
    },

    async getActive(req, res) {
        const user = await User.findById(req.user._id).select('-password');
        res.send(user);
    },

    getAll(req, res) {
        User.find()
            .then((users) => {
                res.json(users);
            })
            .catch((err) => {
                res.json(err);
            });
    },

    getOne(req, res) {
        User.findById(req.params._id)
            .then((user) => {
                res.json(user);
            })
            .catch((err) => {
                res.json(err);
            });
    },

    update(req, res) {
        User.findByIdAndUpdate(req.params._id, req.body, {
            runValidators: true,
            new: true,
        })
            .then((user) => {
                res.json(user);
            })
            .catch((err) => {
                res.status(400).json(err);
            });
    },

    delete(req, res) {
        User.findByIdAndDelete(req.params._id)
            .then((user) => {
                res.json(user);
            })
            .catch((err) => {
                res.json(err);
            });
    },
};