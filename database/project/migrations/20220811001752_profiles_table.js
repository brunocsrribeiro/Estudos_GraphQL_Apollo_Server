/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
exports.up = function(knex, Promise) {
  return knex.schema.createTable('profiles', table => {
    table.increments('id').primary()
    table.string('name').notNullable().unique()
    table.string('label').notNullable()
  }).then(() => {
    return knex('profiles').insert([
      { name: 'user', label: 'User' },
      { name: 'admin', label: 'Administrator' },
      { name: 'master', label: 'Master' },
    ])
  })
};

/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
exports.down = function(knex, Promise) {
  return knex.schema.dropTable('profiles')
};
