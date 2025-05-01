var socket = io('http://localhost:3000')

function renderMessage(message) {
    $('.grid-chat').append('<div class="message"><label class="username">'+ message.author +': </label> ' + message.message);
}

socket.on('receivedMessage', function(message) {
    renderMessage(message);
})

socket.on('previousMessages', function(messages) {
    for (message of messages) {
        renderMessage(message);
    }
})

$('#chat').submit(function(event) {
    event.preventDefault();

    var author = $('#userName').text();
    var message = $('input[name=message]').val();

    console.log(author);

    if (author.length && message.length) {
        var messageObject = {
            author: author,
            message: message,
        };

        renderMessage(messageObject);
        socket.emit('sendMessage', messageObject);
        $('input[name=message]').val('');
        console.log("enviou");
    }
});



// Cadastro
$('#formCadastro').submit(function (e) {
    e.preventDefault();
    console.log('Formulário de cadastro enviado!');
    const data = {
      nome_usuario: $('input[name=nome_usuario]').val(),
      email_usuario: $('input[name=email_usuario]').val(),
      senha_usuario: $('input[name=senha_usuario]').val(),
    };
  
    $.post('/auth/register', data)
      .done(() => {
        alert('Usuário cadastrado com sucesso!');
        console.log('Usuário cadastrado com sucesso!');
        window.location.href = 'login.html';
      })
      .fail(() => {
        alert('Erro ao cadastrar usuário.');
        console.log('Erro ao cadastrar usuário.');
      });
  });
  
  // Login
  $('#formLogin').submit(function (e) {
    e.preventDefault();
    const data = {
      email_usuario: $('input[name=email_usuario]').val(),
      senha_usuario: $('input[name=senha_usuario]').val(),
    };
  
    $.post('/auth/login', data)
      .done(() => {
        alert('Login realizado com sucesso!');
        window.location.href = 'chat.html';
      })
      .fail(() => {
        alert('Email ou senha incorretos.');
      });
  });

  // LogOut
  $('.exit').click(function () {
    window.location.href = '/auth/logout';
  });

  //Busca o nome e exibe no id userName
  $(document).ready(function () {
    $.get('/auth/user')
      .done(function (res) {
        $('#userName').text(res.nome); // Exibe o nome no elemento com ID userName
      })
      .fail(function () {
        $('#userName').text('Visitante');
      });
  });
  
  
  
