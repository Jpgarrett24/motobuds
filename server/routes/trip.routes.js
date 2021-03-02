const tripController = require('../controllers/trip.controller');

module.exports = (app) => {
    app.post('/api/trips', tripController.create);
    app.get('/api/trips', tripController.getAll);
    app.get('/api/trips/:_id', tripController.getOne);
    app.put('/api/trips/:_id', tripController.update);
    app.delete('/api/trips/:_id', tripController.delete);
}