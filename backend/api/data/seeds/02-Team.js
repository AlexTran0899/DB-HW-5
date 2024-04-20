/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> } 
 */
exports.seed = async function(knex) {
  await knex('Team').insert([
    { Location: 'New York', Nickname: 'Raptors', Conference: 'Eastern', Division: 'Atlantic' },
    { Location: 'Los Angeles', Nickname: 'Skyhawks', Conference: 'Western', Division: 'Pacific' },
    { Location: 'Chicago', Nickname: 'Bulls', Conference: 'Eastern', Division: 'Central' }
  ]);
};
