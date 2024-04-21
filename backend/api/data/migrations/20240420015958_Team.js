/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
exports.up = async function(knex) {
    await knex.schema
    .createTable('team', (teams) => {
      teams.increments('team_id')
      teams.string('location', 200).notNullable()
      teams.string('nickname', 200).notNullable()
      teams.string('conference', 200).notNullable()
      teams.string('division', 200).notNullable()
      teams.timestamps(false, true)
    })
};
  

/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
exports.down = async function(knex) {
    await knex.schema.dropTableIfExists('team')
};
