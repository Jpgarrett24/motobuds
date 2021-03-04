const auth = require('../middleware/auth');
const userController = require('../controllers/user.controller');

module.exports = (app) => {
    app.post('/api/users', userController.create);
    app.get('/api/users/me', auth, userController.getActive);
    app.get('/api/users', userController.getAll);
    app.get('/api/users/:_id', userController.getOne);
    app.put('/api/users/:_id', userController.update);
    app.delete('/api/users/:_id', userController.delete);
}