/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
exports.up = async function(knex) {
    await knex.schema
    .createTable('Player', (players) => {
      players.increments('PlayerId')
      players.integer('TeamId', 200).references("TeamId").inTable("Team").onDelete("CASCADE")
      players.string('Name', 200)
      players.string('Position', 200).notNullable()
      players.timestamps(false, true)
    })
};


/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
exports.down = async function(knex) {
    await knex.schema.dropTableIfExists('Player')
};
