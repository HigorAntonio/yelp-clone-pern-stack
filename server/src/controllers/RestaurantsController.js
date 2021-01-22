const knex = require('../database');

module.exports = {
  async index(req, res) {
    try {
      const restaurants = await knex('restaurants');
      return res.json({
        status: "success",
        results: restaurants.length,
        data: {
          restaurants
        }
      });
    } catch (error) {
      return res.sendStatus(500);
    }
  },

  show(req, res) {
    res.json({
      status: 'success',
      data: {
        restaurant: 'mcdonalds'
      }
    });
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