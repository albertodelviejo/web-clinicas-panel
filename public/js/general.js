$(() => {
  $('.tooltipped').tooltip({ delay: 50 })
  $('.modal').modal()

  // Init Firebase nuevamente
  if (!firebase.apps.length) {
    firebase.initializeApp(firebaseConfig);
  }

  //Adicionar el service worker

  navigator.serviceWorker.register('notificaciones-sw.js')
  .then(registro => {
    console.log('service worker registrado')
    firebase.messaging().useServiceWorker(registro)
  }).catch(error => {
    console.error(`Error al registrar el service worker => ${error}`)
  })

  
  //Registrar LLave publica de messaging
  const messaging = firebase.messaging()
  messaging.usePublicVapidKey(
    'BOl0zNKtOKw0owe3sYQzSxE3Yu2qQ8vaJf9yuzr_eerghzMTl5MevON4fPWfToBiM8457sXEcq4y7UDlkjnJtNM'
  )

  //Solicitar permisos para las notificaciones

  messaging.requestPermission()
  .then(() => {
    console.log("permiso otorgado")
    return messaging.getToken()
  }).then(token => {
    const db = firebase.firestore()
    db.settings({
      timestampsInSnapshots: true
    })
    db.collection('tokens')
    .doc(token)
    .set({token: token}).catch(error => {
      console.error(`Error al insertar el token en la BD => ${error}`)
    })
  })

  //Obtener el token cuando se refresca
  messaging.onTokenRefresh(() => {
    messaging.getToken()
    .then(token => {
      console.log("token se ha renovado")
      const db = firebase.firestore()
    db.settings({
      timestampsInSnapshots: true
    })
    db.collection('tokens')
    .doc(token)
    .set({token: token}).catch(error => {
      console.error(`Error al insertar el token en la BD => ${error}`)
    })
    })
  })

  // Recibir las notificaciones cuando el usuario esta foreground

  messaging.onMessage(payload => {
    Materialize.toast(
      `Ya tenemos un nuevo post. Revísalo, se llama ${payload.data.titulo}`,
      6000
    )
  })

  // TODO: Recibir las notificaciones cuando el usuario esta background

  //Listening real time
  const post = new Post()
  post.consultarTodosPost()

  // Firebase observador del cambio de estado
  firebase.auth().onAuthStateChanged(user => {
    if(user){
      $('#btnInicioSesion').text('Salir')
      if(user.photoURL){
        $('#avatar').attr('src', user.photoURL)
      }else{
        $('#avatar').attr('src', 'imagenes/usuario_auth.png')
      }
    }else{
      $('#btnInicioSesion').text('Iniciar Sesión')
      $('#avatar').attr('src', 'imagenes/usuario.png')
    }
  })

  // TODO: Evento boton inicio sesion
  $('#btnInicioSesion').click(() => {
    const user = firebase.auth().currentUser
    if(user){
      $('#btnInicioSesion').text('Iniciar Sesión')
      return firebase.auth().signOut()
      .then(() => {
        $('#avatar').attr('src', 'imagenes/usuario.png')
        Materialize.toast(`Se hizo SignOut`, 4000)
      }).catch(error => {
        Materialize.toast(`Error ${error}`, 4000)
      })
    }

    $('#emailSesion').val('')
    $('#passwordSesion').val('')
    $('#modalSesion').modal('open')
  })

  $('#avatar').click(() => {
    firebase.auth().signOut()
    .then(() => {
      $('#avatar').attr('src', 'imagenes/usuario.png')
      Materialize.toast(`SignOut correcto`, 4000)
    })
    .catch(error => {
      Materialize.toast(`Error al realizar Sign Out ${error}`, 4000)
    })
  })

  $('#btnTodoPost').click(() => {
    $('#tituloPost').text('Posts de la Comunidad')   
    const post = new Post()
    post.consultarTodosPost()
  })

  $('#btnMisPost').click(() => {
    const user = firebase.auth().currentUser
    if(user){
      const post = new Post()
      post.consultarPostxUsuario(user.email)
      $('#tituloPost').text('Mis Posts')
    }else{
      Materialize.toast(`Debes estar autenticado para ver tus posts`, 4000) 
    } 
  })
})
