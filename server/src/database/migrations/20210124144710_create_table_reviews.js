const { onUpdateTrigger } = require('../triggers');

exports.up = async knex => knex.schema.createTable('reviews', table => {
  table.increments('id').primary();
  table.integer('restaurant_id')
    .references('restaurants.id')
    .notNullable()
    .onUpdate('CASCADE')
    .onDelete('CASCADE');
  table.string('name', 50).notNullable();
  table.text('review').notNullable();
  table.integer('rating').notNullable();

  table.timestamp('created_at').defaultTo(knex.fn.now());
  table.timestamp('updated_at').defaultTo(knex.fn.now());
  table.timestamp('deleted_at');
}).then(() => knex.raw(onUpdateTrigger('reviews')));

exports.down = async knex => knex.schema.dropTable('reviews');