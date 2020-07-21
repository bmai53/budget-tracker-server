require('dotenv').config()

module.exports = {

  development:{
    client: process.env.DB_CLIENT,
    connection: process.env.DB_CONNECTION,
    migrations: {
      directory: './db/migrations',
      tableName: 'knex_migrations'
    },
    seeds: {
      directory: './db/seeds',
    }
  }

};
