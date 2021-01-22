const { onUpdateTrigger } = require('../triggers');

exports.up = async knex => knex.schema.createTable('restaurants', table => {
  table.increments('id').primary();
  table.string('name', 50).unique().notNullable();
  table.string('location', 50).unique().notNullable();
  table.integer('price_range').notNullable();

  table.timestamp('created_at').defaultTo(knex.fn.now());
  table.timestamp('updated_at').defaultTo(knex.fn.now());
  table.timestamp('deleted_at');
}).then(() => knex.raw(onUpdateTrigger('restaurants')));

exports.down = async knex => knex.schema.dropTable('restaurants');