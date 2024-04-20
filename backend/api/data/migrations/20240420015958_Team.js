/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
exports.up = async function(knex) {
    await knex.schema
    .createTable('Team', (teams) => {
      teams.increments('TeamId')
      teams.string('Location', 200).notNullable()
      teams.string('Nickname', 200).notNullable()
      teams.string('Conference', 200).notNullable()
      teams.string('Division', 200).notNullable()
      teams.timestamps(false, true)
    })
};
  

/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
exports.down = async function(knex) {
    await knex.schema.dropTableIfExists('Team')
};
