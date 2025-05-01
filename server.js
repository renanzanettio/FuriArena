const express = require("express");
const path = require("path");
const session = require("express-session");
const { Socket } = require("socket.io");
const authRoutes = require("./routes/auth")

const app = express();
const server = require('http').createServer(app);
const io = require('socket.io')(server);

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.use(session({
    secret: 'furia_secret',
    resave: false,
    saveUninitialized: true
}));

require('./db');

// Definir a pasta 'public' para arquivos estáticos (CSS, JS, imagens)
app.use(express.static(path.join(__dirname, 'public')));

app.use('/auth', authRoutes);

// Aqui, a renderização do index.html pode ser feita diretamente
app.get('/', (req, res) => {
    res.sendFile(path.join(__dirname, 'public', 'index.html'));
});

let messages = [];

io.on('connection', socket => {
    console.log(`Usuário conectado: ${socket.id}`);

    socket.emit('previousMessages', messages)

    socket.on('sendMessage', data => {
        messages.push(data);
        socket.broadcast.emit('receivedMessage', data)
    })
})

server.listen(3000, () => {
  console.log('Servidor rodando em http://localhost:3000');
});
