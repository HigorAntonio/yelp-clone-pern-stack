const { restart } = require('nodemon');
const knex = require('../database');

module.exports = {
  async index(req, res) {
    try {
      const restaurants = await knex('restaurants')
        .select('id', 'name', 'location', 'price_range');
      
        return res.json({
        status: 'success',
        results: restaurants.length,
        data: {
          restaurants
        }
      });
    } catch (error) {
      return res.sendStatus(500);
    }
  },

  async show(req, res) {
    try {
      const restaurantId = req.params.id;
      
      if (!Number(restaurantId)) {
        return res.sendStatus(404);
      }

      const restaurant = await knex('restaurants')
        .select('id', 'name', 'location', 'price_range')
        .where({ id: restaurantId })
        .first();

      if (!restaurant) {
        return res.status(404).json({ erro: 'Usuário não encontrado' });
      }
      
      return res.json({
        status: 'success',
        data: {
          restaurant
        }
      })
    } catch (error) {
      return res.sendStatus(500);      
    }
  },

  create(req, res) {
    res.sendStatus(201);
  },

  update(req, res) {
    res.json({
      status: 'success',
      data: {
        restaurant: 'mcdonalds'
      }
    });
  },

  delete(req, res) {
    res.sendStatus(204);
  }
};