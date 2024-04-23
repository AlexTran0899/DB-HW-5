/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
exports.up = async function(knex) {
    await knex.schema
    .createTable('player', (players) => {
      players.increments('player_id')
      players.integer('team_id', 200).references("team_id").inTable("team").onDelete("CASCADE")
      players.string('name', 200)
      players.string('position', 200).notNullable()
      players.timestamps(false, true)
    })
};


/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
exports.down = async function(knex) {
    await knex.schema.dropTableIfExists('player')
};
