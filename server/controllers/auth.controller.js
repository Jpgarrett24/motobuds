const User = require('../models/user.model');
const bcrypt = require('bcrypt');

module.exports = {
    async login(req, res) {
        let user = await User.findOne({ email: req.body.email });
        if (!user) return res.status(400).send({ message: 'Invalid email or password.' });

        const validPassword = await bcrypt.compare(req.body.password, user.password);
        if (!validPassword) return res.status(400).send({ message: 'Invalid email or password' });

        const token = user.generateAuthToken();

        res.header('x-auth-token', token).send(user);

    },

}