const express = require('express');

const RestaurantsController = require('./controllers/RestaurantsController');
const ReviewController = require('./controllers/ReviewController');

const routes = express.Router();

routes.get('/api/v1/restaurants', RestaurantsController.index);
routes.get('/api/v1/restaurants/:id', RestaurantsController.show);
routes.post('/api/v1/restaurants', RestaurantsController.create);
routes.put('/api/v1/restaurants/:id', RestaurantsController.update);
routes.delete('/api/v1/restaurants/:id', RestaurantsController.delete);

routes.post('/api/v1/restaurants/:id/addReview', ReviewController.create);

module.exports = routes;