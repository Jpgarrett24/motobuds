const authController = require('../controllers/auth.controller');

module.exports = (app) => {
    app.post('/api/login', authController.login);
};