# 🕹️ FuriArena

FuriArena é uma aplicação web que visa centralizar as informações das equipes competitivas de diferentes jogos da organização FURIA Esports e permite aos usuários visualizar cronogramas de partidas, interagir via chat em tempo real com outros torcedores e acompanhar eventos relacionados a jogos competitivos como CS2, Valorant, League of Legends, Rocket League entre outros.

---

## 🌐 Visão Geral

O sistema oferece:

- 📅 Visualização de cronogramas de jogos.
- 💬 Sistema de chat em tempo real entre os usuários.
- 👥 Login e cadastro de usuários.
- 🌍 Interface web.

---

## 📁 Estrutura de Pastas

```
FuriArena-main/
├── bd_furiarena/          # Script do banco de dados MySQL (furiarena.sql)
├── public/                # Arquivos estáticos (HTML, CSS, JS, imagens)
│   ├── cadastro.html
│   ├── chat.html
│   ├── login.html
│   ├── index.html
│   └── assets/
│       ├── css/style.css
│       ├── js/main.js
│       └── img/          # Logos e ícones dos jogos
├── routes/                # Rotas do backend (Node.js)
│   ├── auth.js            # Login/Cadastro
│   └── cronograma.js      # Operações com os jogos e partidas
├── server.js              # Servidor principal com Express e Socket.IO
├── db.js                  # Conexão com banco de dados MySQL
├── package.json           # Dependências do Node.js
└── README.md              # Documentação do projeto

```

---

## ⚙️ Funcionalidades

- Autenticação de usuários (login e cadastro).
- Listagem de partidas por data/jogo.
- Envio e recebimento de mensagens em tempo real via WebSockets.
- Interface simples e direta para uso rápido.

---

## ▶️ Como Executar Localmente

### 1. Pré-requisitos

- Node.js (v18 ou superior)
- XAMPP (ou outro servidor MySQL)
- Navegador web

### 2. Instalar Dependências

Abra o terminal na raiz do projeto e execute:

```bash
npm install
```

### 3. Iniciar Banco de Dados

1. Abra o **XAMPP** e inicie **MySQL**.
2. Crie um banco de dados chamado: `furiarena`
3. Importe o arquivo `bd_furiarena/furiarena.sql`

### 4. Configurar Conexão MySQL

Abra o arquivo `db.js` e configure com seus dados locais:

```
const connection = mysql.createConnection({
  host: 'localhost',
  user: 'root',
  password: '', // ou sua senha
  database: 'furiarena'
});
```

### 5. Executar o Servidor

```bash
node server.js
```

Acesse o sistema em: `http://localhost:3000`

---

## 💬 Tecnologias Utilizadas

- **Node.js + Express** (backend)
- [**Socket.IO**](http://socket.io/) (chat em tempo real)
- **MySQL** (banco de dados)
- **HTML/CSS/JS** (frontend estático)
- **XAMPP** (gerenciamento MySQL local)

---

## 🧠 Possíveis Melhorias Futuras

- Validação de formulários e segurança de login.
- Painel para que um admin gerencie os cronogramas de jogos e campeonatos.
- Layout responsivo com frameworks modernos.
- Moderação de chat para manter a segurança da comunidade.