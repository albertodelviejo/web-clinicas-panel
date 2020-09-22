class Ticket {

    constructor () {
      this.db = firebase.firestore()
  }

  createNewTicket(topic, idPaciente, idClinica, price){

    var counter = 0

    var docRef = this.db.collection("clinicas").doc(idClinica);
    var docRefTickets = this.db.collection("tickets")
    var docRefPacientes = this.db.collection("pacientes").doc(idPaciente)

        docRef.get().then(function(doc) {
            if (doc.exists) {
               counter = doc.data().tickets.length
            }else{
                //TODO
            }
        
            counter = counter + 1
            docRef
            .update({
                tickets : firebase.firestore.FieldValue.arrayUnion(counter)
            }).then(refDoc => {
                //console.log(`Ticket añadido a clinica => ${refDoc.counter}`)
            }).catch(error => {
              console.log(`Error de alta => ${error}`)
            })

            docRefPacientes.update({
                tickets : firebase.firestore.FieldValue.arrayUnion(counter)
            }).then(refDoc => {
                //console.log(`Ticket añadido a clinica => ${refDoc.counter}`)
            }).catch(error => {
              console.log(`Error de alta => ${error}`)
            })
        
        const points = parseFloat(price) / 2
      return docRefTickets.doc(counter.toString()).set({
          date: firebase.firestore.FieldValue.serverTimestamp(),
          idClinica: idClinica,
          idConsultor: 0,
          idPaciente: idPaciente,
          idTicket: counter,
          price: price,
          points: points,
          topic: topic
      }).then(refDoc => {
        $('#modalNuevoTicket').modal('close')
      }).catch(error => {
        console.log(`Error de alta => ${error}`)
      })
        
        }) 
  }

  showTicketAll(){
    this.db.collection('tickets')
    .orderBy('date', 'desc')
    .onSnapshot(querySnapshot => {
    $('#clinicas').empty()
    if(querySnapshot.empty){
        $('#clinicas').append(`<h4>No se han encontrado resultados</h4>`)
    }else{
       querySnapshot.forEach(post => {
            let postHtml = this.obtenerPostTemplate(
                   post.data().topic,
                   "Precio",
                   post.data().price,
                   "CIF Clínica",
                   post.data().idClinica,
                   "Id Consultor",
                   post.data().idConsultor,
                   "DNI Paciente",
                   post.data().idPaciente,
                   "Puntos ganados",
                   post.data().points,
                   "Fecha",
                   post.data().date,
               )
               $('#clinicas').append(postHtml) 
       })
    }
})
}

showTicketByIdPaciente(idPaciente){
    this.db.collection('tickets')
    .where('idPaciente', '==', idPaciente)
    .onSnapshot(querySnapshot => {
        $('#modalresultspaciente').empty()
        if(querySnapshot.empty){
            $('#modalresultspaciente').append(`<h4>No se han encontrado resultados</h4>`)//this.obtenerTemplatePostVacio())
        }else{
           querySnapshot.forEach(post => {
            let postHtml = this.obtenerPostTemplate(
                post.data().topic,
                "Precio",
                post.data().price,
                "CIF Clínica",
                post.data().idClinica,
                "Id Consultor",
                post.data().idConsultor,
                "DNI Paciente",
                post.data().idPaciente,
                "Puntos ganados",
                post.data().points,
                "Fecha",
                post.data().date,
               )
               $('#modalresultspaciente').append(postHtml) 
           })
        }
    })
}

showTicketByIdPacienteByTopic(idPaciente,topic){
    this.db.collection('tickets')
    .where('idPaciente', '==', idPaciente)
    .where('topic','==', topic)
    .onSnapshot(querySnapshot => {
        $('#modalresultspaciente').empty()
        if(querySnapshot.empty){
            $('#modalresultspaciente').append(`<h4>No se han encontrado resultados</h4>`)//this.obtenerTemplatePostVacio())
        }else{
           querySnapshot.forEach(post => {
            let postHtml = this.obtenerPostTemplate(
                post.data().topic,
                "Precio",
                post.data().price,
                "CIF Clínica",
                post.data().idClinica,
                "Id Consultor",
                post.data().idConsultor,
                "DNI Paciente",
                post.data().idPaciente,
                "Puntos ganados",
                post.data().points,
                "Fecha",
                post.data().date,
               )
               $('#modalresultspaciente').append(postHtml) 
           })
        }
    })
}

showTicketByIdClinica(idClinica){
    this.db.collection('tickets')
    .where('idClinica', '==', idClinica)
    .onSnapshot(querySnapshot => {
        $('#clinicas').empty()
        if(querySnapshot.empty){
            $('#clinicas').append(`<h4>No se han encontrado resultados</h4>`)//this.obtenerTemplatePostVacio())
        }else{
           querySnapshot.forEach(post => {
            let postHtml = this.obtenerPostTemplate(
                post.data().topic,
                "Precio",
                post.data().price,
                "CIF Clínica",
                post.data().idClinica,
                "Id Consultor",
                post.data().idConsultor,
                "DNI Paciente",
                post.data().idPaciente,
                "Puntos ganados",
                post.data().points,
                "Fecha",
                post.data().date,
               )
               $('#clinicas').append(postHtml) 
           })
        }
    })
}

showTicketByIdConsultor(idConsultor){
    this.db.collection('tickets')
    .where('idConsultor', '==', idConsultor)
    .onSnapshot(querySnapshot => {
        $('#clinicas').empty()
        if(querySnapshot.empty){
            $('#clinicas').append(`<h4>No se han encontrado resultados</h4>`)//this.obtenerTemplatePostVacio())
        }else{
           querySnapshot.forEach(post => {
            let postHtml = this.obtenerPostTemplate(
                post.data().topic,
                "Precio",
                post.data().price,
                "CIF Clínica",
                post.data().idClinica,
                "Id Consultor",
                post.data().idConsultor,
                "DNI Paciente",
                post.data().idPaciente,
                "Puntos ganados",
                post.data().points,
                "Fecha",
                post.data().date,
               )
               $('#clinicas').append(postHtml) 
           })
        }
    })
}

showTicketByTopic(topic){
    this.db.collection('tickets')
    .where('topic', '==', topic)
    .onSnapshot(querySnapshot => {
        $('#clinicas').empty()
        if(querySnapshot.empty){
            $('#clinicas').append(`<h4>No se han encontrado resultados</h4>`)//this.obtenerTemplatePostVacio())
        }else{
           querySnapshot.forEach(post => {
            let postHtml = this.obtenerPostTemplate(
                post.data().topic,
                "Precio",
                post.data().price,
                "CIF Clínica",
                post.data().idClinica,
                "Id Consultor",
                post.data().idConsultor,
                "DNI Paciente",
                post.data().idPaciente,
                "Puntos ganados",
                post.data().points,
                "Fecha",
                post.data().date,
               )
               $('#clinicas').append(postHtml) 
           })
        }
    })
}

showTicketByTopicClinica(cif,topic){
    this.db.collection('tickets')
    .where('idClinica','==', cif)
    .where('topic', '==', topic)
    .onSnapshot(querySnapshot => {
        $('#clinicas').empty()
        if(querySnapshot.empty){
            $('#clinicas').append(`<h4>No se han encontrado resultados</h4>`)//this.obtenerTemplatePostVacio())
        }else{
           querySnapshot.forEach(post => {
            let postHtml = this.obtenerPostTemplate(
                post.data().topic,
                "Precio",
                post.data().price,
                "CIF Clínica",
                post.data().idClinica,
                "Id Consultor",
                post.data().idConsultor,
                "DNI Paciente",
                post.data().idPaciente,
                "Puntos ganados",
                post.data().points,
                "Fecha",
                post.data().date,
               )
               $('#clinicas').append(postHtml) 
           })
        }
    })
}

showTicketByPacienteClinica(cif,idPaciente){
    this.db.collection('tickets')
    .where('idClinica','==', cif)
    .where('idPaciente', '==', idPaciente)
    .onSnapshot(querySnapshot => {
        $('#clinicas').empty()
        if(querySnapshot.empty){
            $('#clinicas').append(`<h4>No se han encontrado resultados</h4>`)//this.obtenerTemplatePostVacio())
        }else{
           querySnapshot.forEach(post => {
            let postHtml = this.obtenerPostTemplate(
                post.data().topic,
                "Precio",
                post.data().price,
                "CIF Clínica",
                post.data().idClinica,
                "Id Consultor",
                post.data().idConsultor,
                "DNI Paciente",
                post.data().idPaciente,
                "Puntos ganados",
                post.data().points,
                "Fecha",
                post.data().date,
               )
               $('#clinicas').append(postHtml) 
           })
        }
    })
}

obtenerPostTemplate (
    title,
    field1title,
    field1,
    field2title,
    field2,
    field3title,
    field3,
    field4title,
    field4,
    field5title,
    field5,
    field6title,
    field6,
  ) {
    return `
    <article class="post">
          <div class="post-titulo">
              <h5>${title}</h5>
          </div>
          <div class="row">
              <div class="col m6">
                  ${field1title}: ${field1}
              </div>
              <div class="col m6">
                  ${field2title}: ${field2}
              </div>
          </div>
          <div class="row">
              <div class="col m6">
                  ${field3title}: ${field3}
              </div>
              <div class="col m6">
                  ${field4title}: ${field4}
              </div>
          </div>
          <div class="row">
              <div class="col m6">
              ${field5title}: ${field5}
              </div>
              <div class="col m6">
              ${field6title}: ${field6}
              </div>        
          </div>
      </article>`
  }
}