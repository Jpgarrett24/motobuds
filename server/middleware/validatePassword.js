function validatePassword(req, res, next) {
    const regex = new RegExp(/^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)[a-zA-Z\d]{8,}$/);
    if (!regex.test(req.body.password)) return res.status(400).send({ errors: { message: 'Password does not meet all requirements.' } });
    next();
};

module.exports = validatePassword;