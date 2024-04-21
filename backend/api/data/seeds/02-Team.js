/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> } 
 */
exports.seed = async function(knex) {
  await knex('team').insert([
    { location: "Boston", nickname: "Cobras", conference: "Eastern", division: "Atlantic" },
    { location: "San Francisco", nickname: "Dragons", conference: "Western", division: "Pacific" },
    { location: "Miami", nickname: "Sharks", conference: "Eastern", division: "Southeast" },
    { location: "Seattle", nickname: "Thunder", conference: "Western", division: "Northwest" },
    { location: "Philadelphia", nickname: "Eagles", conference: "Eastern", division: "Atlantic" },
    { location: "Denver", nickname: "Mountaineers", conference: "Western", division: "Southwest" },
    { location: "Atlanta", nickname: "Phoenix", conference: "Eastern", division: "Southeast" },
    { location: "Portland", nickname: "Timberwolves", conference: "Western", division: "Northwest" },
    { location: "Toronto", nickname: "Tigers", conference: "Eastern", division: "Atlantic" },
    { location: "Houston", nickname: "Hurricanes", conference: "Western", division: "Southwest" }
  ]);
};
