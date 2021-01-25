const knex = require('../database');

module.exports = {
  async create(req, res) {
    try {
      const restaurantId = req.params.id;
      const { name, review, rating } = req.body;
      const errors = [];

      if (!Number(restaurantId)) {
        return res.sendStatus(404);
      }

      const restaurant = await knex('restaurants')
        .where({ id: restaurantId })
        .first();

      if (!restaurant) {
        return res.status(404).json({ erro: 'Restaurante não encontrado' });
      }
      
      if (!name) {
        errors.push('Nome do avaliador não informado');
      }
      if (!review) {
        errors.push('Avaliação não informada');
      }
      if (!rating) {
        errors.push('Nota não informada');
      }
      if (!Number(rating) || rating < 1 || rating > 5) {
        errors.push('Valor da nota inválido. Informe um número ' + 
          'maior ou igual a 1 e menor ou igual a 5');
      }
      if (errors.length > 0) {
        return res.status(400).json({ erros: errors });
      }

      const [userReview] = await knex('reviews')
        .insert({ restaurant_id: restaurantId, name, review, rating })
        .returning([ 'id', 'restaurant_id', 'name', 'review', 'rating' ]);
      
      return res.status(201).json({
        status: 'success',
        data: {
          review: userReview
        }
      })

    } catch (error) {
      console.log(error)
      return res.sendStatus(500);
    }
  }
}