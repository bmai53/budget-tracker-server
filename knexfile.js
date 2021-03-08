require("dotenv").config();

module.exports = {
  development: {
    client: process.env.DATABASE_CLIENT,
    connection: process.env.DATABASE_URL + "?ssl=false",
    migrations: {
      directory: "./db/migrations",
      tableName: "knex_migrations",
    },
    seeds: {
      directory: "./db/seeds",
    },
  },
};
