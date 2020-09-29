$(() => {

  $('#btnNuevoTicket').click(() => {
    const user = firebase.auth().currentUser
    
    if(user == null){
      Materialize.toast(`Debes estar autenticado`, 4000)
      return 
    }

    $('#modalNuevoTicket').modal('open')
  }) 

  $('#btnCreateTicket').click(() => {
    const user = firebase.auth().currentUser
    
    if(user == null){
      Materialize.toast(`Debes estar autenticado`, 4000)
      return 
    }

    const topic = $('#nameAltaTicket').val()
    const idPaciente = $('#idpacienteAltaTicket').val()
    const price = $('#priceAltaTicket').val()
    const idClinica = $('#idclinicaAltaPaciente').val()

    const ticket = new Ticket()
    ticket.createNewTicket(topic,idPaciente,idClinica,price)

  })

    $('#btnTodosTickets').click(() => {
      const user = firebase.auth().currentUser
    
      if(user == null){
        Materialize.toast(`Debes estar autenticado`, 4000)
        return 
      }

        const ticket = new Ticket()
        const idClinica = $('#idclinicaAltaPaciente').val()

        ticket.showTicketByIdClinica(idClinica)

      }) 

      
      $('#btnClinicaTickets').click(() => {
        const user = firebase.auth().currentUser
    
        if(user == null){
          Materialize.toast(`Debes estar autenticado`, 4000)
          return 
        }
        $('#typeSearchid').val('idclinica')
        $('#modalId').modal('open')
      })

      $('#btnConsultorTickets').click(() => {
        const user = firebase.auth().currentUser
    
        if(user == null){
          Materialize.toast(`Debes estar autenticado`, 4000)
          return 
        }
        $('#typeSearchid').val('idconsultor')
        $('#modalId').modal('open')
      })

      $('#btnSearchid').click(() => {
        const user = firebase.auth().currentUser
    
        if(user == null){
          Materialize.toast(`Debes estar autenticado`, 4000)
          return 
        }

        const type = $('#typeSearchid').val()
        const result = $('#idSearch').val()
        const ticket = new Ticket()
        const cif = $('#idclinicaAltaPaciente').val()
        
        switch(type){
            case "idpaciente":    
                ticket.showTicketByIdPaciente(result)
            break
            case "idclinica":
                ticket.showTicketByIdClinica(result)
            break
            case "idconsultor":
                ticket.showTicketByIdConsultor(result)
            break
            case "topic":
                ticket.showTicketByTopic(result)
            break
            case "topicclinica":   
              ticket.showTicketByTopicClinica(cif,result)
            break
            case "pacienteclinica":
              ticket.showTicketByPacienteClinica(cif,result)
            break
        }
        $('#modalId').modal('close')
      })

      $('#btnTodosTicketsClinica').click(() => {

        const tiket = new Ticket()
        const cif = $('#cifClinica').val()
        tiket.showTicketByIdClinica(cif)

      })

      $('#btnConceptoTickets').click(() => {

        const user = firebase.auth().currentUser
    
        if(user == null){
          Materialize.toast(`Debes estar autenticado`, 4000)
          return 
        }
        $('#typeSearchid').val('topicclinica')
        $('#modalId').modal('open')
        

      })

      $('#btnPacienteTickets').click(() => {

        const user = firebase.auth().currentUser
    
        if(user == null){
          Materialize.toast(`Debes estar autenticado`, 4000)
          return 
        }
        $('#typeSearchid').val('pacienteclinica')
        $('#modalId').modal('open')
        

      })

      $("#btnSearchTopicTicket").click(() => {
        const value = $('#searchValueTicket').val()
        const idClinica = $('#idclinicaAltaPaciente').val()
        
        const ticket = new Ticket()
        ticket.showTicketByTopicClinica(idClinica,value)
      })


})