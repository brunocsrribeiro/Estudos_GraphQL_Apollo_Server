// Update with your config settings.
require('dotenv/config')
/**
 * @type { Object.<string, import("knex").Knex.Config> }
 */
module.exports = {
  client: process.env.DB_CLIENT || 'mysql',
  connection: {
    database: process.env.DB_NAME,
    user:     process.env.DB_USER || 'root',
    password: process.env.DB_PASS
  },
  pool: {
    min: 2,
    max: 10
  },
  migrations: {
    tableName: 'knex_migrations'
  }
};
