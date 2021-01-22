const express = require('express');

const RestaurantsController = require('./controllers/RestaurantsController');

const routes = express.Router();

routes.get('/api/v1/restaurants', RestaurantsController.index);
routes.get('/api/v1/restaurants/:id', RestaurantsController.show);
routes.post('/api/v1/restaurants', RestaurantsController.create);
routes.put('/api/v1/restaurants/:id', RestaurantsController.update);
routes.delete('/api/v1/restaurants/:id', RestaurantsController.delete);

module.exports = routes;