const User = require('../models/user.model');
const bcrypt = require('bcrypt');

module.exports = {
    async create(req, res) {
        const regex = new RegExp(/^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)[a-zA-Z\d]{8,}$/);
        if (!regex.test(req.body.password)) return res.status(400).send({ message: 'Password must be at least 8 characters long, and contain: 1 uppercase letter, 1 lowercase letter, 1 number.' })

        let newUser = req.body;

        const salt = await bcrypt.genSalt(10);
        const newPassword = await bcrypt.hash(newUser.password, salt);
        newUser = { ...newUser, password: newPassword };

        const testUser = await User.findOne({ email: req.body.email });
        if (testUser) return res.status(400).send({ message: 'User email already exsits.' });


        User.create(newUser)
            .then((user) => {
                const token = user.generateAuthToken();
                res.header('x-auth-token', token).status(200).send(user);
            })
            .catch((err) => {
                res.status(400).json(err);
            });
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