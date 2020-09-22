$(() => {

    $('#btnTotalSaldo').click(() => {

        const saldo = new Saldo()
        saldo.showSaldoTotal()

      })

      $('#btnPacienteSaldo').click(() => {
        const user = firebase.auth().currentUser
    
        if(user == null){
          Materialize.toast(`Para editar debes estar autenticado`, 4000)
          return 
        }
        $('#typeSearchid').val('idpacientesaldo')
        $('#modalId').modal('open')
      })

      
      $('#btnClinicaSaldo').click(() => {
        const user = firebase.auth().currentUser
    
        if(user == null){
          Materialize.toast(`Para editar debes estar autenticado`, 4000)
          return 
        }
        $('#typeSearchid').val('idclinicasaldo')
        $('#modalId').modal('open')
      })

      $('#btnConsultorSaldo').click(() => {
        const user = firebase.auth().currentUser
    
        if(user == null){
          Materialize.toast(`Para editar debes estar autenticado`, 4000)
          return 
        }
        $('#typeSearchid').val('idconsultorsaldo')
        $('#modalId').modal('open')
      })

      $('#btnSearchid').click(() => {

        const result = $('#idSearch').val()
        const type = $('#typeSearchid').val()
        const saldo = new Saldo()
        const cif = $('#cifClinica').val()
        
        
        switch(type){
            case "idpacientesaldo":    
            saldo.showSaldoByIdPaciente(result)
            break
            case "idclinicasaldo":
            saldo.showSaldoByIdClinica(result)
            break
            case "idconsultorsaldo":
            saldo.showSaldoByIdConsultor(result)
            break
            case "idpacienteclinica":
            saldo.showSaldoByIdPacienteByClinica(cif,result)
            break;
            case "idconsultorclinica":
            saldo.showSaldoByIdConsultorByClinica(cif,result)
            break
        }

        $('#modalId').modal('close')
      })

      $('#btnTotalSaldoClinica').click(() => {

        const saldo = new Saldo()
        const cif = $('#cifClinica').val()
        saldo.showSaldoByIdClinica(cif)

      })

      $('#btnPacienteSaldoClinica').click(() => {
        const user = firebase.auth().currentUser
    
        if(user == null){
          Materialize.toast(`Para editar debes estar autenticado`, 4000)
          return 
        }

        $('#typeSearchid').val('idpacienteclinica')
        $('#modalId').modal('open')
      })

      $('#btnConsultorSaldoClinica').click(() => {
        const user = firebase.auth().currentUser
    
        if(user == null){
          Materialize.toast(`Para editar debes estar autenticado`, 4000)
          return 
        }

        $('#typeSearchid').val('idconsultorclinica')
        $('#modalId').modal('open')
      })
})