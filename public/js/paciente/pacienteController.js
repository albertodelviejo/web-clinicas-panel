$(() => {

    $('#btnAltaPaciente').click(() => {

        const user = firebase.auth().currentUser
  
      if(user == null){
        Materialize.toast(`Debes estar autenticado`, 4000)
        return 
      }

      $('#modalAltaPaciente').modal('open')
      
    })

    $('#btnCreatePaciente').click(() => {
      const user = firebase.auth().currentUser
    
      if(user == null){
        Materialize.toast(`Debes estar autenticado`, 4000)
        return 
      }
        const paciente = new Paciente()

        const name = $('#nameAltaPaciente').val()
        const surname1 = $('#surname1AltaPaciente').val() 
        const surname2 = $('#surname2AltaPaciente').val()
        const email = $('#mailAltaPaciente').val()
        const gender = $('#genderAltaPaciente').val()
        const birthday = $('#birthdayAltaPaciente').val()
        const address = $('#addressAltaPaciente').val()
        const phone_number = $('#phoneAltaPaciente').val()
        const id_type = $('#idtypeAltaPaciente').val()
        const id = $('#idAltaPaciente').val()
        const idClinica = $('#idclinicaAltaPaciente').val()
        const idConsultor = $('#idconsultorAltaPaciente').val()
        const is_credit_plan = $('#iscreditAltaPaciente').val()
        const marital_status = $('#maritalAltaPaciente').val()
        const mobile_number = $('#mobileAltaPaciente').val() 
        const status = $('#statusAltaPaciente').val()
        $('.determinate').attr('style', `width: 0%`)    
        
        paciente.createPaciente(
            name, 
        surname1, 
        surname2, 
        email, 
        gender, 
        birthday, 
        address, 
        phone_number,
        id_type, 
        id, 
        idClinica,
        idConsultor,
        is_credit_plan,
        marital_status,
        mobile_number,
        status)
            .then(resp => {
              Materialize.toast(`Paciente añadida correctamente`, 4000)
              $('.modal').modal('close')
            })
            .catch(err => {
              Materialize.toast(`Error => ${err}`, 4000)
            })
        
      })

  $('#btnIdPacientes').click(() => {
    const user = firebase.auth().currentUser

    if(user == null){
      Materialize.toast(`Debes estar autenticado`, 4000)
      return 
    }

    $('#typeSearchid').val('findidpaciente')
    $('#modalId').modal('open')
  })

  $('#btnEditarPaciente').click(() => {

    const user = firebase.auth().currentUser

  if(user == null){
    Materialize.toast(`Debes estar autenticado`, 4000)
    return 
  }

  $('#typeSearchid').val('editpaciente')
  $('#modalId').modal('open')
})

$('#btnSearchid').click(() => {

  const result = $('#idSearch').val()
  const idpaciente = $('#idPaciente').val()
  const type = $('#typeSearchid').val()
  const idClinica = $('#idclinicaAltaPaciente').val()

  const paciente = new Paciente()
  const ticket = new Ticket()

  switch(type){
    case "findidpaciente":
      paciente.showPacientesByIdByidClinica(idClinica, result)
    break
    case "editpaciente":
      paciente.getPacienteById(result)
    break
    case "conceptoticketpaciente":
      ticket.showTicketByIdPacienteByTopic(idpaciente,result)
    break
}

})

    

      $('#btnTodosPacientes').click(() => {
        const user = firebase.auth().currentUser
    
        if(user == null){
          Materialize.toast(`Debes estar autenticado`, 4000)
          return 
        }

        const paciente = new Paciente()
        const idClinica = $('#idclinicaAltaPaciente').val()
        paciente.showPacientesByIdClinica(idClinica)

      })  

      
      $('#btnActivosPacientes').click(() => {
        const user = firebase.auth().currentUser
    
        if(user == null){
          Materialize.toast(`Debes estar autenticado`, 4000)
          return 
        }

        const clinica = new Clinica()
        const idClinica = $('#idclinicaAltaPaciente').val()
        clinica.showPacientesActivosByClinica(idClinica)

      })

      $('#btnInactivosPacientes').click(() => {
        const user = firebase.auth().currentUser
    
        if(user == null){
          Materialize.toast(`Debes estar autenticado`, 4000)
          return 
        }

        const clinica = new Clinica()
        const idClinica = $('#idclinicaAltaPaciente').val()
        clinica.showPacientesInactivosByClinica(idClinica)

      })

      $('#btnEsperaPacientes').click(() => {
        const user = firebase.auth().currentUser
    
        if(user == null){
          Materialize.toast(`Debes estar autenticado`, 4000)
          return 
        }

        const clinica = new Clinica()
        const idClinica = $('#idclinicaAltaPaciente').val()
        clinica.showPacientesEsperaByClinica(idClinica)

      })

      $('#btnCreditPlanPacientes').click(() => {
        const user = firebase.auth().currentUser
    
        if(user == null){
          Materialize.toast(`Debes estar autenticado`, 4000)
          return 
        }

        const paciente = new Paciente()
        const idClinica = $('#idclinicaAltaPaciente').val()
        paciente.showIsCreditPacienteByidClinica(idClinica)

      })

      $('#btnTodosTicketsPaciente').click(() => {
        const user = firebase.auth().currentUser
    
        if(user == null){
          Materialize.toast(`Debes estar autenticado`, 4000)
          return 
        }
        
        const id = $('#idPaciente').val()
        const ticket = new Ticket()
        ticket.showTicketByIdPaciente(id)

      })

      $('#btnConceptoTicketsPaciente').click(() => {
        const user = firebase.auth().currentUser
    
        if(user == null){
          Materialize.toast(`Debes estar autenticado`, 4000)
          return 
        }
      
      
        $('#typeSearchid').val('conceptoticketpaciente')
        $('#modalId').modal('open')

      })

      $('#btnPuntosPaciente').click(() => {
        const user = firebase.auth().currentUser
    
        if(user == null){
          Materialize.toast(`Debes estar autenticado`, 4000)
          return 
        }
        
        const id = $('#idPaciente').val()
        const puntos = new Puntos()
        puntos.showPuntosTotalPaciente(id)

      })

      $('#btnSaldosPaciente').click(() => {
        const user = firebase.auth().currentUser
    
        if(user == null){
          Materialize.toast(`Debes estar autenticado`, 4000)
          return 
        }
        
        const id = $('#idPaciente').val()
        const saldo = new Saldo()
        saldo.showSaldoByIdPaciente(id)
      })


      
  })