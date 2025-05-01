var socket = io('http://localhost:3000')

function renderMessage(message) {
    $('.messages').append('<div class="message"><strong>'+ message.author +'</strong>: ' + message.message);
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

    var author = $('input[name=username]').val();
    var message = $('input[name=message]').val();

    if (author.length && message.length) {
        var messageObject = {
            author: author,
            message: message,
        };

        renderMessage(messageObject);
        socket.emit('sendMessage', messageObject);
        $('input[name=message]').val('');
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
        window.location.href = 'index.html';
      })
      .fail(() => {
        alert('Email ou senha incorretos.');
      });
  });

  // LogOut
  $('.exit').click(function () {
    window.location.href = '/auth/logout';
  });
  
  
