class Puntos {

    constructor () {
      this.db = firebase.firestore()
  }

  showPuntosTotal(){
    this.db.collection('pacientes')
    .onSnapshot(querySnapshot => {
    $('#clinicas').empty()
    if(querySnapshot.empty){
        $('#clinicas').append(`<h4>No se han encontrado resultados</h4>`)
    }else{
        var totalpoints = 0
       querySnapshot.forEach(post => {
        totalpoints = totalpoints + post.data().points
            
       })

       let postHtml = this.obtenerPostTemplate(
        "Puntos en total del sistema: " + totalpoints,
       )
       $('#clinicas').append(postHtml) 
    }
})
}

showPuntosTotalClinica(idClinica){
    this.db.collection('pacientes')
    .where('idClinica','==', idClinica)
    .onSnapshot(querySnapshot => {
    $('#clinicas').empty()
    if(querySnapshot.empty){
        $('#clinicas').append(`<h4>No se han encontrado resultados</h4>`)
    }else{
        var totalpoints = 0
       querySnapshot.forEach(post => {
        totalpoints = totalpoints + post.data().points 
       })

       let postHtml = this.obtenerPostTemplate(
        "Puntos en total: " + totalpoints,
       )
       $('#clinicas').append(postHtml) 
    }
})
}

showPuntosTotalPaciente(id){
    this.db.collection('pacientes')
    .where('id','==', id)
    .onSnapshot(querySnapshot => {
    $('#modalresultspaciente').empty()
    if(querySnapshot.empty){
        $('#modalresultspaciente').append(`<h4>No se han encontrado resultados</h4>`)
    }else{
        var totalpoints = 0
       querySnapshot.forEach(post => {
        totalpoints = totalpoints + post.data().points 
       })

       let postHtml = this.obtenerPostTemplate(
        "Puntos en total: " + totalpoints,
       )
       $('#modalresultspaciente').append(postHtml) 
    }
})
}

obtenerPostTemplate (
    title,
  ) {
      return `
      <article class="post">
            <div class="post-titulo">
                <h5 align="center">${title}</h5>
            </div>
        </article>`
  }

}