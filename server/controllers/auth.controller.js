const config = require('config');
const jwt = require('jsonwebtoken');
const User = require('../models/user.model');
const bcrypt = require('bcrypt');

module.exports = {
    async login(req, res) {
        const regex = new RegExp(/^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)[a-zA-Z\d]{8,}$/);
        if (!regex.test(req.body.password)) return res.status(400).send({ message: 'Password must be at least 8 characters long, and contain: 1 uppercase letter, 1 lowercase letter, 1 number.' });

        let user = await User.findOne({ email: req.body.email });
        if (!user) return res.status(400).send({ message: 'Invalid email or password.' });

        const validPassword = await bcrypt.compare(req.body.password, user.password);
        if (!validPassword) return res.status(400).send({ message: 'Invalid email or password' });

        // if (!user.active) return res.status(400).send({ message: "Please confirm your email address to login." })

        const token = jwt.sign({ _id: user._id, firstName: user.firstName, lastName: user.lastName }, config.get('jwtPrivateKey'));

        res.send({ message: 'Thats that shit I DO like.', token })

    },

}