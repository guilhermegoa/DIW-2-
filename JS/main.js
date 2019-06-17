$(document).ready(function () {

  //Caso logado vai para tela principal
  if (localStorage.getItem('logado') == 'sim') {
    $('#tela-login').fadeOut('fast');
    $('#tela-principal').fadeIn();
    carregaLocalStorage();
    carregaCards();
  }

  //Caso nao exista db no localStorage
  function carregaLocalStorage() {
    var dbGoa = JSON.parse(localStorage.getItem('dbGuilhermeOliveira'));
    if (!dbGoa) {
      localStorage.setItem('dbGuilhermeOliveira', JSON.stringify(db));
    }
  }

  //Carregar cards
  function carregaCards() {
    dbGoa = JSON.parse(localStorage.getItem('dbGuilhermeOliveira'));
    $('#tela-principal').html('')
    for (i = 0; i < dbGoa.length; i++) {
      $('#tela-principal').append(`<ul>
            <a href="#" type="button">
            <li class="principal-card" noticia="${[i]}">
            <img src="${dbGoa[i].imagem}" alt="" />
            <div>
              <div class="carregaCards-td">
                  <h3>${dbGoa[i].titulo}</h3>
                  <span>${dbGoa[i].data}</span>
              </div>
              <p>${dbGoa[i].descricao}</p>
            </div>
          </li>
        </a>
      </ul>`);
    }
  };

  //Carrega post
  function carregaPost(noticia) {
    dbGoa = JSON.parse(localStorage.getItem('dbGuilhermeOliveira'));
    $('#tela-post').append(`<div class="post-post">
        <h2>${dbGoa[noticia].titulo}</h2>
        <img src="${dbGoa[noticia].imagem}" alt="" />
        <p>${dbGoa[noticia].conteudo}</p>
      </div>
      <section id="comentarios">
        <div class="comentario-like">
          <a type="button" id="botao-like">
            <div class="like"><img
              src="https://cdn4.iconfinder.com/data/icons/like-18/32/459-01-512.png"
              alt="likeImg"/></a>
             <p>${dbGoa[noticia].like}</p>
            </div>
          <div><spam id="data-post">${dbGoa[noticia].data}</span></div>
        </div>
        <div class="coment-coment">
          <div id="comentario-carrega"></div>
          <textarea
            name=""
            id="novo-comentario"
            cols="100"
            rows="10"
          ></textarea>
          <div><button id="comentario-postar">Comentar</button></div>
        </div>
      </section>`);
  }

  //EVENTOS
  $('#login-cadastro').on('click', function () {
    $('#tela-login').fadeOut();
    $('#tela-cadastro').fadeIn();
  });

  $('#cadastro-confirmar').on('click', function () {
    let usuario = {
      nome: $('#cadastro-nome').val(),
      senha: $('#cadastro-senha').val()
    };

    if (!usuario.nome || !usuario.senha) {
      alert('Há campo em branco');
    } else {
      $('#cadastro-nome').val('');
      $('#cadastro-email').val('');
      $('#cadastro-senha').val('');
      localStorage.setItem('usuario', JSON.stringify(usuario));
      $('#tela-cadastro').fadeOut();
      $('#tela-login').fadeIn();
    }
  });

  $('#login-botao').on('click', function () {
    usuario = localStorage.getItem('usuario');
    usuario = JSON.parse(usuario);
    let nome = $('#login-nome').val();
    let senha = $('#login-senha').val();

    if (nome === usuario.nome && senha === usuario.senha) {
      $('#tela-login').fadeOut();
      $('#tela-principal').fadeIn();
      localStorage.setItem('logado', 'sim');
      carregaLocalStorage();
      carregaCards();
    } else {
      alert("Senha/Nome digitados errados ou nao é cadastrado");
    }
  });

  $('.principal-card').on('click', function (event) {
    var noticia = $(event.currentTarget).attr('noticia');
    localStorage.setItem('noticia', noticia);
    $('#tela-principal').fadeOut();
    $('#tela-post').fadeIn();
    carregaPost(noticia);
  });

  $('#header-botao').on('click', function () {
    if (localStorage.getItem('logado') == 'sim') {
      $('#tela-post').fadeOut();
      $('#tela-principal').fadeOut();
      $('#tela-criar-post').fadeIn();
    }
  })

  $('#criar-post-postar').on('click', function () {
    let novoPost = {
      autor: $('#criar-post-autor').val(),
      titulo: $('#criar-post-titulo').val(),
      descricao: $('#criar-post-descricao').val(),
      imagem: $('#criar-post-autor').val(),
      conteudo: $('#criar-post-conteudo').val(),
      data: "",
      like: "0",
      comentario: []
    };

    JSON.stringify(novoPost);

    if (!novoPost.autor || !novoPost.titulo || !novoPost.descricao || !novoPost.conteudo) {
      alert('Há campos em branco');
    } else {
      $('#criar-post-autor').val('');
      $('#criar-post-titulo').val('')
      $('#criar-post-descricao').val('')
      $('#criar-post-autor').val('');
      $('#criar-post-conteudo').val('');
      dbGoa.push(novoPost);
      localStorage.setItem('dbGuilhermeOliveira', JSON.stringify(dbGoa));
      $('#tela-criar-post').fadeOut();
      $('#tela-principal').fadeIn();
      carregaCards();
    }
  })

  $('#comentario-postar').on('click', function () {
    alert('apertou')
  })

  $('#botao-like').on('click', function () {
    alert('apertou');
  })


})