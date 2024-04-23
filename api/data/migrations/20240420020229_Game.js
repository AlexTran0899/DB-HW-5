/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
exports.up = async function(knex) {
    await knex.schema
    .createTable('game', (games) => {
      games.increments('game_id')
      games.integer('team_id1', 200).references("team_id").inTable("team").onDelete("CASCADE")
      games.integer('team_id2', 200).references("team_id").inTable("team").onDelete("CASCADE")
      games.integer('score1', 200).notNullable()
      games.integer('score2', 200).notNullable()
      games.date('date', 200).notNullable()
      games.timestamps(false, true)
    })
};

/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
exports.down = async function(knex) {
    await knex.schema.dropTableIfExists('game')
};
