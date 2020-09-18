class Autenticacion {
  autEmailPass (email, password) {
    firebase.auth().signInWithEmailAndPassword(email,password)
    .then(result => {
      if(result.user.emailVerified){
        Materialize.toast(`Bienvenido ${result.user.displayName}`, 5000)
        $('#avatar').attr('src', 'imagenes/usuario_auth.png')
      }else{
        firebase.signOut()
        Materialize.toast(`Por favor, realize la verificación de la cuenta`, 5000)
      }
    })
    $('.modal').modal('close')
  }

  crearCuentaEmailPass (email, password, nombres) {
    firebase.auth().createUserWithEmailAndPassword(email, password)
      .then(result => {
        result.user.updateProfile({
          displayname : nombres
        })

        const configuracion = {
          url : 'https://blogeekplatzi-42241.web.app/'
        }

        result.user.sendEmailVerification(configuracion).catch(error => {
          console.error(error)
          Materialize.toast(error.message, 4000
            )
            $('.modal').modal('close')
        })

        firebase.auth().signOut()

        Materialize.toast(
      `Bienvenido ${nombres}, debes realizar el proceso de verificación`,
      4000
    )
      })

      .catch(error => {
        console.error(error)
        Materialize.toast(error.message, 4000)
      })


    

   
    
  }

  authCuentaGoogle () {
    const provider = new firebase.auth.GoogleAuthProvider()
    firebase.auth().signInWithPopup(provider)
    .then(result => {
      $('#avatar').attr('src', result.user.photoURL)
      $('.modal').modal('close')
      Materialize.toast(`Bienvenido ${result.user.displayName} !! `, 4000)
    })
    .catch(error => {
      console.error(error)
      Materialize.toast(`Error al autenticarse con Google: ${error} `, 4000)
    })
  }

  authCuentaFacebook () {
    const provider = new firebase.auth.FacebookAuthProvider()
    firebase.auth().signInWithPopup(provider)
    .then(result => {
      $('#avatar').attr('src', result.user.photoURL)
      $('.modal').modal('close')
      Materialize.toast(`Bienvenido ${result.user.displayName} !! `, 4000)
    })
    .catch(error => {
      console.error(error)
      Materialize.toast(`Error al autenticarse con Facebook: ${error} `, 4000)
    })
  }

  authTwitter () {
    // TODO: Crear auth con twitter
  }
}
