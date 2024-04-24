const express = require('express')
const helmet = require('helmet')
const cors = require('cors')
const db = require('./data/db-config')
const path = require('path')
const {validateGameInput, validatePlayerInput} = require("./middleware/inputValidator")

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
  const {rows} =  await db.raw("SELECT t.team_id, t.nickname, t.conference, t.division, CAST(COUNT(winner_id) AS int) as win, CAST(COALESCE(SUM(conference_win), 0) AS INT) as conference_win FROM (SELECT CASE WHEN(t1.team_id = g.team_id1 AND g.score1 > g.score2) THEN g.team_id1 WHEN(t1.team_id = g.team_id2 AND g.score1 < g.score2) THEN g.team_id1 ELSE g.team_id2 END AS winner_id, CASE WHEN(t1.conference = t2.conference) THEN 1 ELSE 0 END AS conference_win FROM team as t1 LEFT JOIN game as g ON t1.team_id = g.team_id1 LEFT JOIN team as t2 ON t2.team_id = g.team_id2) as sub1 RIGHT JOIN team as t ON t.team_id = winner_id GROUP BY t.team_id ORDER BY conference")
  const conference = []
  if(rows.length > 0) {
    conference.push([rows[0].conference, [rows[0]]])
  }
  

  for(let i = 1; i < rows.length; i++) {
    if(rows[i].conference !== conference[conference.length - 1][0]) {
      conference.push([rows[i].conference, [rows[i]]])
    }
    conference[conference.length - 1][1].push(rows[i])
  }
  console.log(conference)

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
  const players = await db('player').where({position: playerPosition})
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


server.post('/api/players', validatePlayerInput, async (req, res, next) => {
  insertPlayer(req.body)
  .then(data => res.status(201).json(data))
  .catch(next)
})

server.post('/api/games', validateGameInput ,async (req, res, next) => {
  insertGame(req.body)
    .then(data => res.status(201).json(data))
    .catch(next)   
})


server.use('*', (req, res, next) => {
  res.sendFile(path.join(__dirname, './build', 'index.html'))
})


server.use((err, req, res, next) => {
  res?.status(500).json({
      message: "something went wrong :( ",
  })
})



module.exports = server
