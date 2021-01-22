module.exports = {
  index(req, res) {
    res.json({
      status: 'succes',
      data: {
        restaurants: ['mcdonalds', 'wendys'],
      },
    });
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