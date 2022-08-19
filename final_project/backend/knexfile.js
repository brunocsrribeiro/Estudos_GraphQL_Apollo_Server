// Update with your config settings.
require('dotenv/config')
/**
 * @type { Object.<string, import("knex").Knex.Config> }
 */
module.exports = {
  client: process.env.APP_DB_CLIENT || 'mysql',
  connection: {
    host: process.env.APP_DB_HOST || 'localhost',
    port: process.env.APP_DB_PORT || 4000,
    database: process.env.APP_DB_NAME,
    user: process.env.APP_DB_USER || 'root',
    password: process.env.APP_DB_PASS
  },
  pool: {
    min: 2,
    max: 10
  },
  migrations: {
    tableName: 'knex_migrations'
  }
};
