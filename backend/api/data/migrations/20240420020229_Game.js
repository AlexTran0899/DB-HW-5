/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
exports.up = async function(knex) {
    await knex.schema
    .createTable('Game', (games) => {
      games.increments('GameId')
      games.integer('TeamId1', 200).references("TeamId").inTable("Team").onDelete("CASCADE")
      games.integer('TeamId2', 200).references("TeamId").inTable("Team").onDelete("CASCADE")
      games.integer('Score1', 200).notNullable()
      games.integer('Score2', 200).notNullable()
      games.date('Date', 200).notNullable()
      games.timestamps(false, true)
    })
};

/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
exports.down = async function(knex) {
    await knex.schema.dropTableIfExists('Game')
};
