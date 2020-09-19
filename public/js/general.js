$(() => {
  $('.tooltipped').tooltip({ delay: 50 })
  $('.modal').modal()

  // Init Firebase nuevamente
  if (!firebase.apps.length) {
    firebase.initializeApp(firebaseConfig);
    this.db = firebase.firestore()
  }

  // Firebase observador del cambio de estado
  firebase.auth().onAuthStateChanged(user => {
    if(user){
      $('#btnInicioSesion').text('Salir')
      if(user.photoURL){
        $('#avatar').attr('src', user.photoURL)
      }else{
        $('#avatar').attr('src', 'imagenes/usuario_auth.png')
        this.db.collection("clinicas")
        .where('mail','==', user.email)
        .onSnapshot(querySnapshot => {
          if(!querySnapshot.empty){
        querySnapshot.forEach(result => {
          $('#title').text(result.data().name)
          $('#subtitle').text(result.data().address)
          $('#idclinicaAltaPaciente').val(result.data().cif)
        })
    }
  }) 
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
})
