require('dotenv/config');
const path = require('path');

module.exports = {
  client: 'pg',
  connection: {
    database: "yelp_clone",
    user: process.env.DATABASE_USER,
    password: process.env.DATABASE_PASSWORD
  },
  migrations: {
    directory: path.resolve(__dirname, 'src', 'database', 'migrations')
  },
};