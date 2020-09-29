class Autenticacion {

  constructor () {
    this.db = firebase.firestore()
}

  autEmailPass (email, password) {
    this.db.collection("clinicas")
        .where('mail','==', email)
        .onSnapshot(querySnapshot => {
          if(querySnapshot.empty){
            alert("Credenciales incorrectas")
            return false
        }else{
    firebase.auth().signInWithEmailAndPassword(email,password)
    .then(result => {
      if(result.user.emailVerified){
        Materialize.toast(`Bienvenido`, 5000)
        $('#avatar').attr('src', 'imagenes/usuario_auth.png')
        querySnapshot.forEach(result => {
          $('#title').text(result.data().name)
          $('#subtitle').text(result.data().address)
          $('#idclinicaAltaPaciente').val(result.data().cif)
        })

      }else{
        firebase.auth().signOut()
        Materialize.toast(`Por favor, realize la verificación de la cuenta`, 5000)
      }
    })
    $('.modal').modal('close')
  }
  })
}

  crearCuentaUserEmailPass (email, password,name, dni,  cif) {

    this.db.collection("usuarios")
        .where('mail','==', email)
        .where('cif','==',cif)
        .onSnapshot(querySnapshot => {
          if(querySnapshot.empty){
            firebase.auth().createUserWithEmailAndPassword(email, password)
      .then(result => {

        const configuracion = {
          url : 'https://plancoberturadentalapp.web.app/'
        }

        result.user.sendEmailVerification(configuracion).catch(error => {
          console.error(error)
          return Materialize.toast(error.message, 4000
            )
            $('.modal').modal('close')
        })

        this.db.collection("usuarios").doc(id).set({
          uid: result.user.uid,
          name: name,
          email: email,
          id: dni, 
          idClinica: cif
        })
    
        firebase.auth().signOut()

        return Materialize.toast(
      `Bienvenido ${name}, acabamos de mandarte un mail para realizar el proceso de verificación`,
      4000
    )
      })
        }else{
          Materialize.toast("El usuario ya existe en la base de datos", 4000)
        }
        })
  }

  crearCuentaEmailPass (email, password, name, cif) {

    this.db.collection("usuarios")
        .where('mail','==', email)
        .where('cif','==',cif)
        .onSnapshot(querySnapshot => {
          if(querySnapshot.empty){
            alert("La clínica todavía no ha sido dada de alta por el admin")
            return false
        }else{
          firebase.auth().createUserWithEmailAndPassword(email, password)
      .then(result => {

        querySnapshot.forEach(clinicaresult =>{

          console.error(clinicaresult.data().cif)
          console.error(result.user.uid)
          
         let clinica = this.db.collection("clinicas").doc(clinicaresult.data().cif)

         clinica.update({
          uid: result.user.uid,
        }).then(function() {
          console.log("Document successfully updated!");
      })
      .catch(function(error) {
          // The document probably doesn't exist.
          console.error("Error updating document: ", error);
      });
        })

        const configuracion = {
          url : 'https://plancoberturadentalapp.web.app/'
        }

        result.user.sendEmailVerification(configuracion).catch(error => {
          console.error(error)
          return Materialize.toast(error.message, 4000
            )
            $('.modal').modal('close')
        })
    
        firebase.auth().signOut()

        return Materialize.toast(
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
