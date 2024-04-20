/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> } 
 */
exports.seed = async function(knex) {
  await knex('Player').insert([
    { TeamId: 1, Name: 'John Doe', Position: 'Guard' },
    { TeamId: 2, Name: 'Jane Smith', Position: 'Forward' },
    { TeamId: 3, Name: 'Jim Brown', Position: 'Center' }
  ]);
};
