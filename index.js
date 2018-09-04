const express = require('express');
const helmet = require('helmet');
const knex = require('knex');

const dbConfig = require('./knexfile');

const db = knex(dbConfig.development);

const server = express();

server.use(express.json());
server.use(helmet());

server.get('/', (req, res) => {
  res.send('API running')
})

server.get('/api/zoos/', (req, res) => {
  db('zoos').then(zoos => {
    res.status(200).json(zoos)
  }).catch(err => res.status(500).json(err))
})

server.post('/api/zoos', (req, res) => {
  if (req.body.name) {
    db.insert(req.body).into('zoos').then(zooId => {
      res.status(201).json(zooId)
    }).catch(err => res.status(500).json(err))
  } else {
    res.status(400).json({error: "Please include a name in your request and try again."})
  }
})

const port = 3300;
server.listen(port, function() {
  console.log(`\n=== Web API Listening on http://localhost:${port} ===\n`);
});
