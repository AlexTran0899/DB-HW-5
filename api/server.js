const express = require('express')
const helmet = require('helmet')
const cors = require('cors')
const db = require('./data/db-config')
const path = require('path')

async function getAllGames() {
  const game = db('game')
  const team = db('team')
  const data = await Promise.all([game, team])
  
  const res = data[0].map(game => {
    game.team1 = data[1][game.team_id1 - 1]
    game.team2 = data[1][game.team_id2 - 1]
    return game
  })

  return res
}
function getAllPlayers() { return db('player') }
function getAllTeams() { return db('team') }

async function getTeamsByConferenceAndWins() {
  const {rows} =  await db.raw("SELECT t10.team_id, t10.conference, t10.nickname, t10.division, winner_team_id, conference_winner_team_id FROM team as t10 left join (SELECT t1.conference,CASE WHEN(score1 > score2 AND team_id1 = t1.team_id) THEN t1.team_id WHEN(score1 < score2 AND team_id1 != t1.team_id) THEN t1.team_id ELSE t2.team_id END AS winner_team_id, CASE WHEN(score1 > score2 AND team_id1 = t1.team_id AND t1.conference = t2.conference) THEN t1.team_id WHEN(score1 < score2 AND team_id1 != t1.team_id AND t1.conference = t2.conference) THEN t1.team_id WHEN(score1 < score2 AND team_id2 = t2.team_id AND t1.conference = t2.conference) THEN t2.team_id WHEN(score1 > score2 AND team_id2 != t2.team_id AND t1.conference = t2.conference) THEN t2.team_id ELSE null END AS conference_winner_team_id FROM game as g join team as t1 on t1.team_id = g.team_id1 join team as t2 on t2.team_id = g.team_id2) as s3 ON s3.winner_team_id = t10.team_id ORDER BY t10.conference")
  
  console.log(rows)
  const teamObject = {}
  const conference = {}

  rows.forEach(row => {
    if(conference[row.conference] === undefined) { conference[row.conference] = [] } 
    
    if(teamObject[row.team_id] === undefined) {
      teamObject[row.team_id] = row
      teamObject[row.team_id]['win'] = 0
      teamObject[row.team_id]['conferenceWin'] = 0
    }
       
    if(row.winner_team_id !== null) {
      teamObject[row.team_id]['win'] += 1
    }

    if(row.conference_winner_team_id !== null) {
      teamObject[row.team_id]['conferenceWin'] += 1
    }
  })

  for(let team_id in teamObject) {
    const currTeam = teamObject[team_id]
    conference[currTeam.conference].push(currTeam)
  }

  return conference
}


async function getGamesByteam_id(team_id) {
  const team = db('team') 
  const game = db('game')
  const data = await Promise.all([game, team])
  
  let res = data[0].map(game => {
    if(game.team_id1 == team_id || game.team_id2 == team_id) {
      game.team1 = data[1][game.team_id1 - 1]
      game.team2 = data[1][game.team_id2 - 1]
      return game
    }
  })

  res = res.filter(each => each !== undefined)
  return res
}

async function getPlayersByteam_id(team_id) {
  const players = await db('player').where({team_id})
  return players
}


async function getPlayersByPlayerPosition(playerPosition) {
  console.log(playerPosition)
  const players = await db('player').where({position: playerPosition})
  console.log(players)
  return players
}

async function getGamesBydate(date) {
  const team = db('team') 
  const game = db('game').where({date: date})
  const data = await Promise.all([game, team])
  
  let res = data[0].map(game => {
      game.team1 = data[1][game.team_id1 - 1]
      game.team2 = data[1][game.team_id2 - 1]
      return game
  })

  res = res.filter(each => each !== undefined)
  return res
}


async function insertPlayer(player) {
  // WITH POSTGRES WE CAN PASS A "RETURNING ARRAY" AS 2ND ARGUMENT TO knex.insert/update
  // AND OBTAIN WHATEVER COLUMNS WE NEED FROM THE NEWLY CREATED/UPdateD RECORD
  console.log(player)
  return await db('player').insert(player, "*")
}


async function insertGame(game) {
  // WITH POSTGRES WE CAN PASS A "RETURNING ARRAY" AS 2ND ARGUMENT TO knex.insert/update
  // AND OBTAIN WHATEVER COLUMNS WE NEED FROM THE NEWLY CREATED/UPdateD RECORD
  return await db('game').insert(game, "*")
}

const server = express()
server.use(express.json())
server.use(helmet())
server.use(cors())

server.use(express.static(path.join(__dirname, './build')))

server.get('/api/games', async (req, res, next) => {
  getAllGames()
  .then(data => res.json(data))
  .catch(next)
})

server.get('/api/games/team_id/:team_id', async (req, res, next) => {
  const team_id = req.params.team_id
  getGamesByteam_id(team_id)
  .then(games => res.json(games))
  .catch(next)
})

server.get('/api/players/team_id/:team_id', async (req, res, next) => {
  const team_id = req.params.team_id
  getPlayersByteam_id(team_id)
  .then(players => res.json(players))
  .catch(next)
})

server.get('/api/players/position/:position', async (req, res, next) => {
  const position = req.params.position
  getPlayersByPlayerPosition(position)
  .then(players => res.json(players))
  .catch(next)
})


server.get('/api/teams/getTeamsByConferenceAndWins', async (req, res, next) => {
  getTeamsByConferenceAndWins()
  .then(data => res.json(data))
  .catch(next)
})



server.get('/api/games/date/:date', async (req, res, next) => {
  const date = req.params.date
  getGamesBydate(date)
  .then(data => res.json(data))
  .catch(next)
})

server.get('/api/players', async (req, res, next) => {
  getAllPlayers()
  .then(data => res.json(data))
  .catch(next)
})


server.get('/api/teams', async (req, res, next) => {
  getAllTeams()
  .then(data => res.json(data))
  .catch(next)
})


server.post('/api/players', async (req, res, next) => {
  insertPlayer(req.body)
  .then(data => res.json(data))
  .catch(next)
})

server.post('/api/games', async (req, res, next) => {
  insertGame(req.body)
    .then(data => res.json(data))
    .catch(next)   
})

server.post('/api/users', async (req, res, next) => {
  insertPlayer(req.body)
  .then(data => res.status(201).json(data))
  .catch(next)
})


server.use('*', (req, res, next) => {
  res.sendFile(path.join(__dirname, './build', 'index.html'))
})


server.use((err, req, res, next) => {
  console.log("here in the catch all block")
  res?.status(500).json({
      message: err?.message,
      stack: err?.stack
  })
})



module.exports = server
