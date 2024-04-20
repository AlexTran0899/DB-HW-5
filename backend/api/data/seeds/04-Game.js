/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> } 
 */
exports.seed = async function(knex) {
  console.log("here in the game seed")
  await knex('Game').insert([
    { TeamId1: 1, TeamId2: 2, Score1: 102, Score2: 97, Date: '2024-04-15' },
    { TeamId1: 2, TeamId2: 3, Score1: 110, Score2: 104, Date: '2024-04-17' },
    { TeamId1: 3, TeamId2: 1, Score1: 95, Score2: 100, Date: '2024-04-19' }
  ]);
};
