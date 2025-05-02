// routes/cronograma.js
const express = require("express");
const router = express.Router();
const db = require("../db"); // conexão com o banco

router.get("/api/cronograma-campeonatos", (req, res) => {
  const query = `SELECT * from campeonato`;

  db.query(query, (err, results) => {
    if (err) return res.status(500).json({ error: err });
    res.json(results);
  });
});

router.get("/api/cronograma-jogos", (req, res) => {
  const query = `
    SELECT p.qtd_partida, t.nome_time, c.nome_campeonato, p.hora_campeonato, p.data_campeonato, p.placar_adversario_campeonato, p.placar_furia_campeonato, p.status_partida, p.link_partida, c.img_jogo_campeonato FROM partidas p JOIN times t ON p.id_time = t.id_time JOIN campeonato c ON p.id_campeonato = c.id_campeonato ORDER BY p.data_campeonato ASC, p.hora_campeonato ASC;
    `;

  db.query(query, (err, results) => {
    if (err) return res.status(500).json({ error: err });
    res.json(results);
  });
});

module.exports = router;
