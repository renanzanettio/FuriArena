const express = require('express');
const router = express.Router();
const bcrypt = require('bcryptjs');
const db = require('../db');


// Cadastro
router.post('/register', (req, res) => {
    const { nome_usuario, email_usuario, senha_usuario } = req.body;
    
    const senhaCriptografada = bcrypt.hashSync(senha_usuario, 10);
  
    const sql = 'INSERT INTO usuarios (nome_usuario, email_usuario, senha_usuario) VALUES (?, ?, ?)';
    db.query(sql, [nome_usuario, email_usuario, senhaCriptografada], (err, result) => {
      if (err) return res.status(500).send('Erro ao registrar usuário');
      res.status(201).send('Usuário registrado!');
    });
  });
  
  // Login
  router.post('/login', (req, res) => {
    const { email_usuario, senha_usuario } = req.body;
  
    const sql = 'SELECT * FROM usuarios WHERE email_usuario = ?';
    db.query(sql, [email_usuario], (err, results) => {
      if (err || results.length === 0) return res.status(401).send('Usuário não encontrado');
  
      const usuario = results[0];
      
      const senhaCorreta = bcrypt.compareSync(senha_usuario, usuario.senha_usuario);
  
      if (!senhaCorreta) return res.status(401).send('Senha incorreta');
  
      req.session.user = usuario;
      res.send('Login bem-sucedido!');
    });
  });
  
  // Logout
router.get('/logout', (req, res) => {
  req.session.destroy(err => {
    if (err) {
      return res.status(500).send('Erro ao fazer logout');
    }
    res.redirect('/index.html');
  });
});

// Retorna dados do usuário logado
router.get('/user', (req, res) => {
  if (!req.session.user) {
    return res.status(401).json({ erro: 'Usuário não logado' });
  }
  res.json({ nome: req.session.user.nome_usuario });
});




  module.exports = router;