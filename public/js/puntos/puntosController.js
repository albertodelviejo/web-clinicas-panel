$(() => {

    $('#btnTodosPuntos').click(() => {

        const puntos = new Puntos()
        puntos.showPuntosTotal()

      })

      $('#btnPacientePuntos').click(() => {
        const user = firebase.auth().currentUser
    
        if(user == null){
          Materialize.toast(`Para editar debes estar autenticado`, 4000)
          return 
        }
        $('#typeSearchClinica').val('idpacientepoints')
        $('#modalNombreClinica').modal('open')
      })

      
      $('#btnClinicaPuntos').click(() => {
        const user = firebase.auth().currentUser
    
        if(user == null){
          Materialize.toast(`Para editar debes estar autenticado`, 4000)
          return 
        }
        $('#typeSearchClinica').val('idclinicapoints')
        $('#modalNombreClinica').modal('open')
      })

      $('#btnSearchClinica').click(() => {

        const type = $('#typeSearchClinica').val()
        const result = $('#nameSearchClinica').val()
        
        
        switch(type){
            case "idpacientepoints":    
            const paciente = new Paciente()
            paciente.showPacientesById(result)
            break
            case "idclinicapoints":
                const  puntos = new Puntos()
                puntos.showPuntosTotalClinica(result)
            break
        }
      })
})