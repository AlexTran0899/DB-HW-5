/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> } 
 */
exports.seed = async function(knex) {
  await knex('game').insert([
    { team_id1: 1, team_id2: 2, score1: 102, score2: 97, date: '2024-04-15' },
    { team_id1: 2, team_id2: 3, score1: 110, score2: 104, date: '2024-04-17' },
    { team_id1: 3, team_id2: 1, score1: 95, score2: 100, date: '2024-04-19' },
    { team_id1: 1, team_id2: 3, score1: 98, score2: 96, date: '2024-04-20' },
    { team_id1: 2, team_id2: 1, score1: 105, score2: 101, date: '2024-04-22' },
    { team_id1: 3, team_id2: 2, score1: 93, score2: 88, date: '2024-04-24' }
  ]);
};
