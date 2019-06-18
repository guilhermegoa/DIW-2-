$(document).ready(function () {


  //Caso logado vai para tela principal
  // if (localStorage.getItem('logado') == 'sim') {
  //   $('#tela-login').hide();
  //   $('#tela-principal').show();
  //   carregaLocalStorage();
  //   carregaCards();
  // }

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
    for (i = dbGoa.length - 1; i >= 0; i--) {
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
  function carregaPost() {
    dbGoa = JSON.parse(localStorage.getItem('dbGuilhermeOliveira'));
    noticia = localStorage.getItem('noticia')
    $('#tela-post').html('')
    $('#tela-post').append(`<div class="post-post">
        <h2>${dbGoa[noticia].titulo}</h2>
        <img src="${dbGoa[noticia].imagem}" alt="" />
        <p>${dbGoa[noticia].conteudo}</p>
      </div>
      <section id="comentarios">
        <div class="comentario-like">
          <a type="button" >
            <div class="like"><img id="botao-like"
              src="https://cdn4.iconfinder.com/data/icons/like-18/32/459-01-512.png"
              alt="likeImg"/></a>
             <p>${dbGoa[noticia].like}</p>
            </div>
          <div><spam id="data-post">${dbGoa[noticia].data}</span></div>
        </div>
      </section>`);

  }

  //Funçao carrega comentario   
  function carregaComentario() {
    $('#comentario-carrega').html('')
    for (i = dbGoa[noticia].comentario.length - 1; i >= 0; i--) {
      let coment = dbGoa[noticia].comentario[i].comentario;
      let nome = dbGoa[noticia].comentario[i].nome;
      $('#comentario-carrega').append(`<div><p>${nome}</p><p>${coment}</p></div>`);
    }
  }

  //Funçao novo comentario
  function novoComentario() {
    $('#novo-comentario').html('')
    $('#novo-comentario').append(`<div class="coment-coment">
    <input type="text"  id="comentario-nome" placeholder="Nome">
    <textarea id="criar-comentario" cols="100" rows="10" ></textarea>
    <div><button id="comentario-postar">Comentar</button></div>
  </div>`)
  }

  function pegaData() {

    let data = new Date();
    let dia = data.getDate();
    let mes = data.getMonth();
    let ano = data.getFullYear();
    date = dia + "/" + mes + "/" + ano;
    localStorage.setItem('data', date);
  }

  //EVENTOS
  function adicionarEventos() {

    // $('#login-cadastro').on('click', function () {
    //   $('#tela-login').hide();
    //   $('#tela-cadastro').show();
    // });

    // $('#cadastro-confirmar').on('click', function () {
    //   let usuario = {
    //     nome: $('#cadastro-nome').val(),
    //     senha: $('#cadastro-senha').val()
    //   };

    //   if (!usuario.nome || !usuario.senha) {
    //     alert('Há campo em branco');
    //   } else {
    //     $('#cadastro-nome').val('');
    //     $('#cadastro-email').val('');
    //     $('#cadastro-senha').val('');
    //     localStorage.setItem('usuario', JSON.stringify(usuario));
    //     $('#tela-cadastro').fadeOut();
    //     $('#tela-login').fadeIn();
    //   }
    // });

    // $('#login-botao').on('click', function () {
    //   usuario = localStorage.getItem('usuario');
    //   usuario = JSON.parse(usuario);
    //   let nome = $('#login-nome').val();
    //   let senha = $('#login-senha').val();

    //   if (nome === usuario.nome && senha === usuario.senha) {
    //     $('#tela-login').hide();
    //     $('#tela-principal').show();
    //     localStorage.setItem('logado', 'sim');
    //     carregaLocalStorage();
    //     carregaCards();
    //     location.reload();
    //   } else {
    //     alert("Senha/Nome digitados errados ou nao é cadastrado");
    //   }
    // });

    $('.principal-card').on('click', function (event) {
      var noticia = $(event.currentTarget).attr('noticia');
      localStorage.setItem('noticia', noticia);
      $('#tela-principal').hide();
      $('#tela-post').show();
      $('#comentario-carrega').show();
      $('#novo-comentario').show();
      carregaPost();
      carregaComentario()
      novoComentario();
      eventoPostar();
      eventoLike();
    });

    $('#header-botao').on('click', function () {
      $('#tela-post').hide();
      $('#comentario-carrega').hide();
      $('#novo-comentario').hide();
      $('#tela-principal').hide();
      $('#tela-criar-post').show();
    });

    $('#criar-post-postar').on('click', function () {
      pegaData();
      let data = localStorage.getItem('data');
      let novoPost = {
        autor: $('#criar-post-autor').val(),
        titulo: $('#criar-post-titulo').val(),
        descricao: $('#criar-post-descricao').val(),
        imagem: $('#criar-post-imagem').val(),
        conteudo: $('#criar-post-conteudo').val(),
        data: data,
        like: "0",
        comentario: []
      };
      dbGoa = JSON.parse(localStorage.getItem('dbGuilhermeOliveira'));
      JSON.stringify(novoPost);

      if (!novoPost.autor || !novoPost.titulo || !novoPost.descricao || !novoPost.conteudo) {
        alert('Há campos em branco');
      } else {
        $('#criar-post-autor').val('');
        $('#criar-post-titulo').val('')
        $('#criar-post-descricao').val('')
        $('#criar-post-imagem').val('');
        $('#criar-post-conteudo').val('');
        dbGoa.push(novoPost);
        localStorage.setItem('dbGuilhermeOliveira', JSON.stringify(dbGoa));
        $('#tela-criar-post').hide();
        $('#tela-principal').show();
        carregaCards();
        adicionarEventos();
      }
    })
  }

  function eventoPostar() {
    $('#comentario-postar').on('click', function () {
      let comentario = {
        nome: $('#comentario-nome').val(),
        comentario: $('#criar-comentario').val()
      }
      dbGoa = JSON.parse(localStorage.getItem('dbGuilhermeOliveira'));
      noticia = localStorage.getItem('noticia')

      if (!comentario.comentario || !comentario.nome) {
        alert('Campo de comnetario esta em branco');
      } else {
        JSON.stringify(comentario);
        dbGoa[noticia].comentario.push(comentario);
        localStorage.setItem('dbGuilhermeOliveira', JSON.stringify(dbGoa));
        $('#comentario-nome').val('');
        $('#criar-comentario').val('');
        carregaComentario();
      }

    })

  };

  function eventoLike() {
    $('#botao-like').on('click', function () {
      dbGoa = JSON.parse(localStorage.getItem('dbGuilhermeOliveira'));
      noticia = localStorage.getItem('noticia');
      like = dbGoa[noticia].like;
      parseInt(like, 10);
      like++;
      JSON.stringify(dbGoa)
      dbGoa[noticia].like = like;
      localStorage.setItem('dbGuilhermeOliveira', JSON.stringify(dbGoa))
      carregaPost();
      eventoLike();
    })
  }

  //Rodar ao entrar
  carregaLocalStorage();
  carregaCards();
  adicionarEventos();
});