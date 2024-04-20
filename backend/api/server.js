const express = require('express')
const helmet = require('helmet')
const cors = require('cors')
const db = require('./data/db-config')

function getAllGames() { return db('Game') }
function getAllPlayers() { return db('Player') }

async function insertPlayer(player) {
  // WITH POSTGRES WE CAN PASS A "RETURNING ARRAY" AS 2ND ARGUMENT TO knex.insert/update
  // AND OBTAIN WHATEVER COLUMNS WE NEED FROM THE NEWLY CREATED/UPDATED RECORD
  return await db('Player').insert(player, "*")
}

const server = express()
server.use(express.json())
server.use(helmet())
server.use(cors())

server.get('/api/games', async (req, res) => {
  const games = await(getAllGames())
  console.log(games)
  res.json(games)
})

server.get('/api/players', async (req, res) => {
  res.json(await getAllPlayers())
})

server.post('/api/players', async (req, res) => {
  const data = req.body
  res.json(await insertPlayer(req.body))
})


server.post('/api/users', async (req, res) => {
  res.status(201).json(await insertUser(req.body))
})

module.exports = server
