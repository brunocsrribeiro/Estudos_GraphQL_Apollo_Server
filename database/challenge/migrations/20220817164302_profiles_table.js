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
      { name: 'admin', label: 'Administrator' },
      { name: 'user', label: 'User' },
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
