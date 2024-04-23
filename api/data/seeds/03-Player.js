/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> } 
 */
exports.seed = async function(knex) {
  await knex('player').insert([   
    { team_id: 1, name: 'Alice Johnson', position: 'Quarterback' },
    { team_id: 1, name: 'Bob Williams', position: 'Running Back' },
    { team_id: 1, name: 'Charlie Davis', position: 'Wide Receiver' },
    { team_id: 1, name: 'David Garcia', position: 'Tight End' },
    { team_id: 2, name: 'Emily Martinez', position: 'Offensive Tackle' },
    { team_id: 2, name: 'Frank Wilson', position: 'Offensive Guard' },
    { team_id: 2, name: 'Grace Anderson', position: 'Defensive End' },
    { team_id: 2, name: 'Henry Thompson', position: 'Defensive Tackle' },
    { team_id: 3, name: 'Isabel Hernandez', position: 'Linebacker' },
    { team_id: 3, name: 'Jack Young', position: 'Cornerback' },
    { team_id: 3, name: 'Katherine Lee', position: 'Nickelback' },
    { team_id: 3, name: 'Liam Moore', position: 'Dimeback' },
    { team_id: 3, name: 'Mia Clark', position: 'Punter' }
  ]);
};
