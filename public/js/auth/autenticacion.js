class Autenticacion {

  constructor () {
    this.db = firebase.firestore()
}

  autEmailPass (email, password) {
    firebase.auth().signInWithEmailAndPassword(email,password)
    .then(result => {
      if(result.user.emailVerified){
        Materialize.toast(`Bienvenido`, 5000)
        $('#avatar').attr('src', 'imagenes/usuario_auth.png')
      }else{
        firebase.auth().signOut()
        Materialize.toast(`Por favor, realize la verificación de la cuenta`, 5000)
      }
    })
    $('.modal').modal('close')
  }

  crearCuentaEmailPass (email, password, name, cif) {

    this.db.collection("clinicas")
        .where('mail','==', email)
        .where('cif','==',cif)
        .onSnapshot(querySnapshot => {
          if(querySnapshot.empty){
            alert("La clínica todavía no ha sido dada de alta por el admin")
            return false
        }else{
          firebase.auth().createUserWithEmailAndPassword(email, password)
      .then(result => {
        result.user.updateProfile({
          displayname : name
        })

        const configuracion = {
          url : 'https://clinicas-plancoberturadental.firebaseapp.com/'
        }

        result.user.sendEmailVerification(configuracion).catch(error => {
          console.error(error)
          Materialize.toast(error.message, 4000
            )
            $('.modal').modal('close')
        })

        querySnapshot.forEach(clinicaresult =>{
          this.db.collection("clinicas").doc(clinicaresult.data().cif).set({
            uid: result.user.uid,
          })
        })

        

        firebase.auth().signOut()

        Materialize.toast(
      `Bienvenido ${name}, acabamos de mandarte un mail para realizar el proceso de verificación`,
      4000
    )
      })

      .catch(error => {
        console.error(error)
        Materialize.toast(error.message, 4000)
      })
        }
        })
  }
}
