const express = require("express");
const helmet = require("helmet");
const knexConfig = require("./knexfile.js");
const knex = require("knex");
const db = knex(knexConfig.development);

const server = express();

server.use(express.json());
server.use(helmet());

// endpoints
server.get("/api/zoos", (req, res) => {
  db("zoos")
    .then(zoos => {
      res.status(200).json(zoos);
    })
    .catch(err => res.status(500).json(err));
});

server.get("/api/zoos/:id", async (req, res) => {
  try {
    const { id } = req.params;
    const zoo = await db("zoos").where({ id });
    if (zoo) {
      res.status(200).json(zoo);
    } else {
      res.status(404).json({ message: "Not Found" });
    }
  } catch (error) {
    res.status(500).json(error);
  }
});

server.post("/api/zoos", (req, res) => {
  const zoo = req.body;
  db.insert(zoo)
    .into("zoos")
    .then(ids => {
      res.status(201).json(ids);
    })
    .catch(err => {
      res.status(500).json(err);
    });
});

server.put("/api/zoos/:id", (req, res) => {
  const { id } = req.params;
  const changes = req.body;
  db("zoos")
    .where({ id: id })
    .update(changes)
    .then(count => {
      if (!count || count < 1) {
        res.status(404).json({ message: "Not Found" });
      } else {
        res.status(200).json(count);
      }
    })
    .catch(err => res.status(500).json(err));
});

server.delete("/api/zoos/:id", (req, res) => {
  const { id } = req.params;
  db("zoos")
    .where({ id })
    .delete(id)
    .then(count => {
      if (!count || count < 1) {
        res.status(404).json({ message: "Not Found" });
      } else {
        res.status(200).json(count);
      }
    })
    .catch(err => res.status(500).json(err));
});

const port = 3300;
server.listen(port, function() {
  console.log(`\n=== Web API Listening on http://localhost:${port} ===\n`);
});
