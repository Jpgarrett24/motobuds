const User = require('../models/user.model');
const bcrypt = require('bcrypt');
const config = require('config');
const jwt = require('jsonwebtoken');

module.exports = {
    async login(req, res) {
        let user = await User.findOne({ email: req.body.email });
        if (!user) return res.status(400).send('Invalid email or password.');

        const validPassword = await bcrypt.compare(req.body.password, user.password);
        if (!validPassword) return res.status(400).json('Invalid email or password');

        const token = user.generateAuthToken();

        user = await User.findById(user._id).select('-password')

        res.header('x-auth-token', token).send({ token, user });
    },

    async verify(req, res) {
        let token = req.body.token;
        if (!token) return res.status(401).send('Access denied. No token provided.');
        try {
            const decoded = jwt.verify(token, config.get('jwtPrivateKey'));
            res.status(200).send(decoded);
        } catch (error) {
            res.status(400).send('Invalid token.');
        }
    }

}