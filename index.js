const express = require('express');
const helmet = require('helmet');
const knex = require('knex');
// const db = require('./data/db');

const dbConfig = require('./knexfile');
const db = knex(dbConfig.development);

const server = express();

server.use(express.json());
server.use(helmet());

// endpoints here
server.post('/api/zoos', async (req, res) => {
  const { name } = req.body;
  console.log(name);
  db.insert({name}).into('zoos')
  .then(ids => {
    res.status(201).json(ids)
  })
  .catch(err => res.status(500).json(err))
})

server.get('/api/zoos', async (req, res) => {
  db('zoos')
  .then(zoos => {
    res.status(200).json(zoos);
  })
  .catch(err => res.status(500).json(err))
})

const port = 3300;
server.listen(port, function() {
  console.log(`\n=== Web API Listening on http://localhost:${port} ===\n`);
});
