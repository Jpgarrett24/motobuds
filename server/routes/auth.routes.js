const validatePassword = require('../middleware/validatePassword');
const authController = require('../controllers/auth.controller');

module.exports = (app) => {
    app.post('/api/login', authController.login);
    app.post('/api/verify', authController.verify);
};