const { restart } = require('nodemon');
const knex = require('../database');

module.exports = {
  async index(req, res) {
    try {
      const restaurants = await knex('restaurants')
        .select('id', 'name', 'location', 'price_range')
        .orderBy('name');
      
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
        return res.status(404).json({ erro: 'Restaurante não encontrado' });
      }

      const reviews = await knex('reviews')
        .select('id', 'name', 'review', 'rating')
        .where({ restaurant_id: restaurant.id });
      
      return res.json({
        status: 'success',
        data: {
          restaurant,
          reviews
        }
      });
    } catch (error) {
      return res.sendStatus(500);      
    }
  },

  async create(req, res) {
    try {
      const { name, location, price_range } = req.body;
      const errors = [];

      if (!name) {
        errors.push('Nome do restaurante não informado');
      }
      if (!location) {
        errors.push('Localização do restaurante não informada');
      }
      if (!price_range) {
        errors.push('Faixa de preço do restaurante não informada');
      }
      if (price_range < 1 || price_range > 5) {
        errors.push('A faixa de preço deve ser um valor maior ou ' + 
          'igual a 1 e menor ou igual a 5');
      }
      if (errors.length > 0) {
        res.status(400).json({ erros: errors });
      }

      const [restaurant] = await knex('restaurants')
        .insert({ name, location, price_range })
        .returning(['id', 'name', 'location', 'price_range']);
      
      return res.status(201).json({
        status: 'success',
        data: {
          restaurant
        }
      });
    } catch (error) {
      return res.sendStatus(500);
    }
  },

  async update(req, res) {
    try {
      const restaurantId = req.params.id;
      const { name, location, price_range } = req.body;
      const errors = [];
      
      if (!Number(restaurantId)) {
        return res.sendStatus(404);
      }

      if (!name) {
        errors.push('Nome do restaurante não informado');
      }
      if (!location) {
        errors.push('Localização do restaurante não informada');
      }
      if (!price_range) {
        errors.push('Faixa de preço do restaurante não informada');
      }
      if (price_range < 1 || price_range > 5) {
        errors.push('A faixa de preço deve ser um valor maior ou ' + 
          'igual a 1 e menor ou igual a 5');
      }
      if (errors.length > 0) {
        res.status(400).json({ erros: errors });
      }

      const [restaurant] = await knex('restaurants')
        .update({ name, location, price_range })
        .where({ id: restaurantId })
        .returning(['id', 'name', 'location', 'price_range']);
      
      if (!restaurant) {
        return res.status(404).json({ erro: 'Restaurante não encontrado' });
      }

      return res.json({
        status: 'success',
        data: {
          restaurant
        }
      });
      
    } catch (error) {
      return res.sendStatus(500);
    }
  },

  async delete(req, res) {
    try {
      const restaurantId = req.params.id;

      if (!Number(restaurantId)) {
        return res.sendStatus(404);
      }      

      const restaurant = await knex('restaurants')
        .del()
        .where({ id: restaurantId });

      if (!restaurant) {
        return res.status(404).json({ erro: 'Restaurante não encontrado' });
      }
      
      return res.sendStatus(204);
    } catch (error) {
      return res.sendStatus(500);
    }
  }
};