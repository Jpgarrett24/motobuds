function validatePassword(req, res, next) {
    const regex = new RegExp(/^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)[a-zA-Z\d]{8,}$/);
    if (!regex.test(req.body.password)) return res.status(400).send('Password must be at least 8 characters long, and contain: 1 uppercase letter, 1 lowercase letter, 1 number.');
    next();
};

module.exports = validatePassword;