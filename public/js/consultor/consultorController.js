$(() => {

    $('#btnAltaConsultor').click(() => {

        const user = firebase.auth().currentUser
  
      if(user == null){
        Materialize.toast(`Para dar de alta debes estar autenticado`, 4000)
        return 
      }

      $('#modalAltaConsultor').modal('open')
      
    })

    $('#btnCreateConsultor').click(() => {
        const consultor = new Consultor()

        const name = $('#nameAltaConsultor').val()
        const surname1 = $('#surname1AltaConsultor').val() 
        const surname2 = $('#surname2AltaConsultor').val()
        const email = $('#mailAltaConsultor').val()
        const birthday = $('#birthdayAltaConsultor').val()
        const address = $('#addressAltaConsultor').val()
        const phone_number = $('#phoneAltaConsultor').val()
        const dni = $('#dniAltaConsultor').val()
        const idConsultor = $('#idConsultorAltaConsultor').val()
        const status = $('#statusAltaConsultor').val()
        $('.determinate').attr('style', `width: 0%`)    
        
        consultor.createConsultor(
            name, 
        surname1, 
        surname2, 
        idConsultor,
        dni, 
        phone_number,
        email,  
        birthday, 
        address, 
        status)
            .then(resp => {
              Materialize.toast(`Consultor añadido correctamente`, 4000)
              $('.modal').modal('close')
            })
            .catch(err => {
              Materialize.toast(`Error => ${err}`, 4000)
            })
        
      })

    $('#btnEditarConsultor').click(() => {

      const user = firebase.auth().currentUser

    if(user == null){
      Materialize.toast(`Para editar debes estar autenticado`, 4000)
      return 
    }

    $('#typeSearchid').val('editconsultor')
    $('#modalId').modal('open')
  })

  $('#btnIdConsultores').click(() => {
    const user = firebase.auth().currentUser

    if(user == null){
      Materialize.toast(`Para editar debes estar autenticado`, 4000)
      return 
    }
    $('#typeSearchid').val('findidconsultor')
    $('#modalId').modal('open')
  })

     $('#btnSearchid').click(() => {

        const result = $('#idSearch').val()
        const type = $('#typeSearchid').val()
        const idConsultor= $('#idConsultor').val()

        const consultor = new Consultor()

        switch(type){
          case "findidconsultor":
          consultor.showConsultorById(result)
          break
          case "editconsultor":
          consultor.getConsultorById(result)
          break
          case "findidpacienteconsultor":
          consultor.showAllPacientesByConsultorById(idConsultor,result)
          break
          case "findpacienteconsultorclinica":
          consultor.showAllPacientesByConsultorByClinica(idConsultor, result)
          break  
          case "findticketsconsultor":
          consultor.showTicketByIdConsultorByTopic(idConsultor, result)
          break
          case "findticketsconsultorpaciente":
          consultor.showTicketByIdConsultorByPaciente(idConsultor, result)
          break
          case "findticketsconsultorclinica":
            consultor.showTicketByIdConsultorByClinica(idConsultor,result)
            break
        }
    $('#modalId').modal('close')
  })
  
      $('#btnTodosConsultores').click(() => {

        const consultor = new Consultor()
        consultor.showConsultorAll()

      })  

      
      $('#btnActivosConsultores').click(() => {

        const consultor = new Consultor()
        consultor.showActiveConsultor()

      })

      $('#btnInactivosConsultores').click(() => {

        const consultor = new Consultor()
        consultor.showInactiveConsultor()

      })

      $('#btnEsperaConsultores').click(() => {

        const consultor = new Consultor()
        consultor.showStandbyConsultor()

      })

      $('#btnTodosPacientesConsultor').click(() => {

        const consultor = new Consultor()
        const idConsultor= $('#idConsultor').val()
        consultor.showAllPacientesFromConsultor(idConsultor)

      }) 

      $('#btnIdPacientesConsultor').click(() => {
        const user = firebase.auth().currentUser
    
        if(user == null){
          Materialize.toast(`Para editar debes estar autenticado`, 4000)
          return 
        }
        $('#typeSearchid').val('findidpacienteconsultor')
        $('#modalId').modal('open')
      })

      $('#btnPacientesConsultorClinica').click(() => {
        const user = firebase.auth().currentUser
    
        if(user == null){
          Materialize.toast(`Para editar debes estar autenticado`, 4000)
          return 
        }
        $('#typeSearchid').val('findpacienteconsultorclinica')
        $('#modalId').modal('open')
      })

      $('#btnTodosTicketsConsultor').click(() => {

        const consultor = new Consultor()
        const idConsultor= $('#idConsultor').val()
        consultor.showTicketByIdConsultor(idConsultor)

      }) 

      $('#btnConceptoTicketsConsultor').click(() => {
        const user = firebase.auth().currentUser
    
        if(user == null){
          Materialize.toast(`Para editar debes estar autenticado`, 4000)
          return 
        }
        $('#typeSearchid').val('findticketsconsultor')
        $('#modalId').modal('open')
      })

      $('#btnConsultorTicketsPaciente').click(() => {
        const user = firebase.auth().currentUser
    
        if(user == null){
          Materialize.toast(`Para editar debes estar autenticado`, 4000)
          return 
        }
        $('#typeSearchid').val('findticketsconsultorpaciente')
        $('#modalId').modal('open')
      })

      $('#btnConsultorTicketsClinica').click(() => {
        const user = firebase.auth().currentUser
    
        if(user == null){
          Materialize.toast(`Para editar debes estar autenticado`, 4000)
          return 
        }
        $('#typeSearchid').val('findticketsconsultorclinica')
        $('#modalId').modal('open')
      })
      
      $('#btnSaldosConsultor').click(() => {

        const saldo = new Saldo()
        const idConsultor= $('#idConsultor').val()
        saldo.showSaldoByIdConsultor(idConsultor)

      }) 
  })