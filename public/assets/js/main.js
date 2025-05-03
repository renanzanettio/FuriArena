//Chat
var socket = io("http://localhost:3000");

function renderMessage(message) {
  $(".grid-chat").append(
    '<div class="message"><label class="text-message"><label class="username">' +
      message.author +
      ": </label> " +
      message.message +
      "</label>"
  );
}

socket.on("receivedMessage", function (message) {
  renderMessage(message);
});

socket.on("previousMessages", function (messages) {
  for (message of messages) {
    renderMessage(message);
  }
});

$("#chat").submit(function (event) {
  event.preventDefault();

  var author = $("#userName").text();
  var message = $("input[name=message]").val();

  console.log(author);

  if (author.length && message.length) {
    var messageObject = {
      author: author,
      message: message,
    };

    renderMessage(messageObject);
    socket.emit("sendMessage", messageObject);
    $("input[name=message]").val("");
    console.log("enviou");
  }
});

// Cadastro
$("#formCadastro").submit(function (e) {
  e.preventDefault();
  console.log("Formulário de cadastro enviado!");
  const data = {
    nome_usuario: $("input[name=nome_usuario]").val(),
    email_usuario: $("input[name=email_usuario]").val(),
    senha_usuario: $("input[name=senha_usuario]").val(),
  };

  $.post("/auth/register", data)
    .done(() => {
      alert("Usuário cadastrado com sucesso!");
      console.log("Usuário cadastrado com sucesso!");
      window.location.href = "login.html";
    })
    .fail(() => {
      alert("Erro ao cadastrar usuário.");
      console.log("Erro ao cadastrar usuário.");
    });
});

// Login
$("#formLogin").submit(function (e) {
  e.preventDefault();
  const data = {
    email_usuario: $("input[name=email_usuario]").val(),
    senha_usuario: $("input[name=senha_usuario]").val(),
  };

  $.post("/auth/login", data)
    .done(() => {
      alert("Login realizado com sucesso!");
      window.location.href = "chat.html";
    })
    .fail(() => {
      alert("Email ou senha incorretos.");
    });
});

// LogOut
$(".exit").click(function () {
  window.location.href = "/auth/logout";
});

//Busca o nome e exibe no id userName
$(document).ready(function () {
  $.get("/auth/user")
    .done(function (res) {
      $("#userName").text(res.nome);
    })
    .fail(function () {
      $("#userName").text("Visitante");
    });
});

// CRONOGRAMA DE CAMPEONATO

document.addEventListener("DOMContentLoaded", async () => {
  const container = document.getElementById("grid-campeonato");

  try {
    const res = await fetch("/api/cronograma-campeonatos");
    const data = await res.json();

    container.innerHTML = ""; // limpa os cards fixos

    data.forEach((item) => {
      const card = `
            <div class="campeonato">
              <div class="jogo-campeonato">${item.jogo_campeonato}</div>
              <div class="nome-fase-campeonato">
                <div class="nome-campeonato">${item.nome_campeonato}</div>
                <div class="fase-campeonato">${item.status_campeonato}</div>                
              </div>
              <hr class="hr">
            </div>
        `;
      container.innerHTML += card;
    });
  } catch (err) {
    console.error("Erro ao carregar cronograma de campeonatos:", err);
  }
});

// CRONOGRAMA DE JOGOS

// Função que carrega os jogos de acordo com o valor da radio
async function carregarJogos(jogoSelecionado) {
  const container = document.getElementById("grid-jogos");

  try {
    const res = await fetch("/api/cronograma-jogos");
    const data = await res.json();

    container.innerHTML = "";
    var existe = false;
    data.forEach((item) => {
      //compara as linhas da query com o valor do jogo selecionado
      if (item.jogo_campeonato === jogoSelecionado) {
        existe = true;
        const card = `
          <div class="container-jogo">
            <div class="datahora-times">
              <div class="data-hora-jogo">
                <label class="hora">${item.hora_campeonato}</label>
                <label class="data">${item.data_campeonato[8]}${item.data_campeonato[9]}/${item.data_campeonato[5]}${item.data_campeonato[6]}</label>
              </div>
              <div class="time-campeonato-jogo">
                <label class="time">
                  <div class="nome-time">FURIA</div>
                  <div class="placar">${item.placar_furia_campeonato} <label class="vs">vs</label> ${item.placar_adversario_campeonato}</div>
                  <div class="nome-time">${item.nome_time}</div>
                </label>
                <label class="campeonato">${item.nome_campeonato}</label>
              </div>
            </div>
            <div class="play-partidas-jogo">
              <div class="status-partida">${item.status_partida}</div>
              <a href="${item.link_partida}"><iconify-icon icon="mdi:play" class="play"></iconify-icon></a>
              <div class="partidas-jogo">
                <img src="${item.img_jogo_campeonato}" alt="Logo do Jogo">
                MD${item.qtd_partida}
              </div>
            </div>
          </div>
        `;
        container.innerHTML += card;
      }

      //Se o botão tudos estiver selecionado ele deve executar essa função
      if ("todos" === jogoSelecionado) {
        const card = `
          <div class="container-jogo">
            <div class="datahora-times">
              <div class="data-hora-jogo">
                <label class="hora">${item.hora_campeonato}</label>
                <label class="data">${item.data_campeonato[8]}${item.data_campeonato[9]}/${item.data_campeonato[5]}${item.data_campeonato[6]}</label>
              </div>
              <div class="time-campeonato-jogo">
                <label class="time">
                  <div class="nome-time">FURIA</div>
                  <div class="placar">${item.placar_furia_campeonato} <label class="vs">vs</label> ${item.placar_adversario_campeonato}</div>
                  <div class="nome-time">${item.nome_time}</div>
                </label>
                <label class="campeonato">${item.nome_campeonato}</label>
              </div>
            </div>
            
            <div class="play-partidas-jogo">
              <div class="status-partida">${item.status_partida}</div>
              <a href="${item.link_partida}"><iconify-icon icon="mdi:play" class="play"></iconify-icon></a>
              <div class="partidas-jogo">
                <img src="${item.img_jogo_campeonato}" alt="Logo do Jogo">
                MD${item.qtd_partida}
              </div>
            </div>
          </div>
        `;
        container.innerHTML += card;
      }
    });
    if(existe == false && jogoSelecionado != "todos"){
      container.innerHTML = '<br><br><label class="sem-jogos">Sem jogos Recentes</label>'
    }
  } catch (err) {
    console.error("Erro ao carregar cronograma de jogos:", err);
  }
}

// Quando o DOM estiver pronto
document.addEventListener("DOMContentLoaded", () => {
  const radios = document.querySelectorAll('input[name="jogo"]');

  radios.forEach((radio) => {
    radio.addEventListener("change", () => {
      const selectedValue = radio.value;
      carregarJogos(selectedValue);
    });
  });
});

// EXECUTAR ASSIM QUE INICIAR A PAGINA

document.addEventListener("DOMContentLoaded", async () => {
  const container = document.getElementById("grid-jogos");

  try {
    const res = await fetch("/api/cronograma-jogos");
    const data = await res.json();

    container.innerHTML = "";

    data.forEach((item) => {
      const card = `
            <div class="container-jogo">
              <div class="datahora-times">
                <div class="data-hora-jogo">
                  <label class="hora">${item.hora_campeonato}</label>
                  <label class="data">${item.data_campeonato[8]}${item.data_campeonato[9]}/${item.data_campeonato[5]}${item.data_campeonato[6]}</label>
                </div>
                <div class="time-campeonato-jogo">
                  <label class="time">
                    <div class="nome-time">FURIA</div>
                    <div class="placar">${item.placar_furia_campeonato} <label class="vs">vs</label> ${item.placar_adversario_campeonato}</div>
                    <div class="nome-time">${item.nome_time}</div>
                  </label>
                  <label class="campeonato">${item.nome_campeonato}</label>
                </div>
              </div>
              <div class="play-partidas-jogo">
                <div class="status-partida">${item.status_partida}</div>
                <a href="${item.link_partida}"><iconify-icon icon="mdi:play" class="play"></iconify-icon></a>
                <div class="partidas-jogo">
                  <img src="${item.img_jogo_campeonato}" alt="Logo do LOL">
                  MD${item.qtd_partida}
                </div>
              </div>
            </div>
        `;
      container.innerHTML += card;
    });
  } catch (err) {
    console.error("Erro ao carregar cronograma de jogos:", err);
  }
});
