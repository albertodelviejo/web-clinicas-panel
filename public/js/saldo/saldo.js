class Saldo {
    constructor () {
        this.db = firebase.firestore()
    }

    showSaldoTotal(){
        this.db.collection('pacientes')
        .onSnapshot(querySnapshot => {
        $('#clinicas').empty()
        if(querySnapshot.empty){
            $('#clinicas').append(`<h4>No se han encontrado resultados</h4>`)
        }else{
            var total_paid_balance = 0
            var total_balance = 0
           querySnapshot.forEach(post => {
            total_paid_balance = total_paid_balance + parseInt(post.data().paid_balance)
            total_balance = total_balance + parseInt(post.data().total_balance)
           })
           const left_balance = total_balance - total_paid_balance
           let postHtml = this.obtenerPostTemplate(
            "Saldo concedido: " + total_balance,
            "Saldo pagado: " + total_paid_balance,
            "Saldo a deber: " + left_balance,
           )
           $('#clinicas').append(postHtml)
        }
    })
    }

    showSaldoByIdClinica(idClinica){
        this.db.collection('pacientes')
        .where('idClinica', '==', idClinica)
        .onSnapshot(querySnapshot => {
        $('#modalresults').empty()
        if(querySnapshot.empty){
            $('#modalresults').append(`<h4>No se han encontrado resultados</h4>`)
        }else{
            var total_paid_balance = 0
            var total_balance = 0
           querySnapshot.forEach(post => {
            total_paid_balance = total_paid_balance + parseInt(post.data().paid_balance)
            total_balance = total_balance + parseInt(post.data().total_balance)
           })
           const left_balance = total_balance - total_paid_balance
           let postHtml = this.obtenerPostTemplate(
            "Saldo concedido: " + total_balance,
            "Saldo pagado: " + total_paid_balance,
            "Saldo a deber: " + left_balance,
           )
           $('#modalresults').append(postHtml)
        }
    })
    }

    showSaldoByIdConsultor(idConsultor){
        this.db.collection('pacientes')
        .where('idConsultor', '==', idConsultor)
        .onSnapshot(querySnapshot => {
        $('#modalresultsconsultor').empty()
        if(querySnapshot.empty){
            $('#modalresultsconsultor').append(`<h4>No se han encontrado resultados</h4>`)
        }else{
            var total_paid_balance = 0
            var total_balance = 0
           querySnapshot.forEach(post => {
            total_paid_balance = total_paid_balance + parseInt(post.data().paid_balance)
            total_balance = total_balance + parseInt(post.data().total_balance)
           })
           const left_balance = total_balance - total_paid_balance
           let postHtml = this.obtenerPostTemplate(
            "Saldo concedido: " + total_balance,
            "Saldo pagado: " + total_paid_balance,
            "Saldo a deber: " + left_balance,
           )
           $('#modalresultsconsultor').append(postHtml)
        }
    })
    }

    showSaldoByIdPaciente(id){
        this.db.collection('pacientes')
        .where('id', '==', id)
        .onSnapshot(querySnapshot => {
        $('#modalresultspaciente').empty()
        if(querySnapshot.empty){
            $('#modalresultspaciente').append(`<h4>No se han encontrado resultados</h4>`)
        }else{
            var total_paid_balance = 0
            var total_balance = 0
           querySnapshot.forEach(post => {
            total_paid_balance = total_paid_balance + parseInt(post.data().paid_balance)
            total_balance = total_balance + parseInt(post.data().total_balance)
           })
           const left_balance = total_balance - total_paid_balance
           let postHtml = this.obtenerPostTemplate(
            "Saldo concedido: " + total_balance,
            "Saldo pagado: " + total_paid_balance,
            "Saldo a deber: " + left_balance,
           )
           $('#modalresultspaciente').append(postHtml)
        }
    })
    }

    showSaldoByIdConsultorByClinica(cif,idConsultor){
        this.db.collection('pacientes')
        .where('idClinica','==', cif)
        .where('idConsultor', '==', idConsultor)
        .onSnapshot(querySnapshot => {
        $('#modalresults').empty()
        if(querySnapshot.empty){
            $('#modalresults').append(`<h4>No se han encontrado resultados</h4>`)
        }else{
            var total_paid_balance = 0
            var total_balance = 0
           querySnapshot.forEach(post => {
            total_paid_balance = total_paid_balance + parseInt(post.data().paid_balance)
            total_balance = total_balance + parseInt(post.data().total_balance)
           })
           const left_balance = total_balance - total_paid_balance
           let postHtml = this.obtenerPostTemplate(
            "Saldo concedido: " + total_balance,
            "Saldo pagado: " + total_paid_balance,
            "Saldo a deber: " + left_balance,
           )
           $('#modalresults').append(postHtml)
        }
    })
    }

    showSaldoByIdPacienteByClinica(cif,id){
        this.db.collection('pacientes')
        .where('idClinica','==', cif)
        .where('id', '==', id)
        .onSnapshot(querySnapshot => {
        $('#modalresults').empty()
        if(querySnapshot.empty){
            $('#modalresults').append(`<h4>No se han encontrado resultados</h4>`)
        }else{
            var total_paid_balance = 0
            var total_balance = 0
           querySnapshot.forEach(post => {
            total_paid_balance = total_paid_balance + parseInt(post.data().paid_balance)
            total_balance = total_balance + parseInt(post.data().total_balance)
           })
           const left_balance = total_balance - total_paid_balance
           let postHtml = this.obtenerPostTemplate(
            "Saldo concedido: " + total_balance,
            "Saldo pagado: " + total_paid_balance,
            "Saldo a deber: " + left_balance,
           )
           $('#modalresults').append(postHtml)
        }
    })
    }



    obtenerPostTemplate (
        title,
        title2,
        title3
      ) {
          return `
          <article class="post">
                <div class="post-titulo">
                    <h5 align="center">${title}</h5>
                </div>
                <div class="post-titulo">
                    <h5 align="center">${title2}</h5>
                </div>
                <div class="post-titulo">
                    <h5 align="center">${title3}</h5>
                </div>
            </article>`
      }
}