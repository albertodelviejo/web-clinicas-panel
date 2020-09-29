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

      const typeForm = $('#typeForm').val()
      
        const paciente = new Paciente()

        const name = $('#nameAltaPaciente').val()
        const surname1 = $('#surname1AltaPaciente').val() 
        const surname2 = $('#surname2AltaPaciente').val()
        const email = $('#mailAltaPaciente').val()
        var gender = ""
        if($('#maleActivePaciente').prop("checked")){
          gender = "male"
        }else if ($('#femaleActivePaciente').prop("checked")){
          gender = "female"
        }else if ($('#otherActivePaciente').prop("checked")){
          gender = "other"
        }
        const birthday = $('#birthdayAltaPaciente').val()
        const address = $('#addressAltaPaciente').val()
        const phone_number = $('#phoneAltaPaciente').val()
        const id_type = ""
        if($('#dniActivePaciente').prop("checked")){
          id_type = "DNI"
        }else if ($('#passActivePaciente').prop("checked")){
          id_type = "Passport"
        }else if ($('#nieActivePaciente').prop("checked")){
          id_type = "NIE"
        }
        const id = $('#idAltaPaciente').val()
        const idConsultor = $('#idconsultorAltaPaciente').val()
        const is_credit_plan = ""
        if($('#iscredittruePaciente').prop("checked")){
          is_credit_plan = "true"
        }else if ($('#iscreditfalsePaciente').prop("checked")){
          is_credit_plan = "false"
        }
        const marital_status = $('#maritalAltaPaciente').val()
        const mobile_number = $('#mobileAltaPaciente').val() 
        const status = ""
        if($('#statusActivePaciente').prop("checked")){
          status = "active"
        }else if ($('#statusInactivePaciente').prop("checked")){
          status = "inactive"
        }else if ($('#statusStandbyPaciente').prop("checked")){
          status = "standby"
        }
        $('.determinate').attr('style', `width: 0%`)  
        
        if (name == "")
          {
            alert("Por favor, introduzca un nombre");
            return false;
          }
          if (surname1 == "")
          {
            alert("Por favor, introduzca el primer apellido");
            return false;
          }
          if (surname2 == "")
          {
            alert("Por favor, introduzca el segundo apellido");
            return false;
          }
          if (email == "")
          {
            alert("Por favor, introduzca el email");
            return false;
          }
          if (phone_number == "")
          {
            alert("Por favor, introduzca un teléfono");
            return false;
          }
          if (address == "")
          {
            alert("Por favor, introduzca una dirección");
            return false;
          }
          if (id_type == "")
          {
            alert("Por favor, introduzca un tipo de id");
            return false;
          }
          if (id == "")
          {
            alert("Por favor, introduzca un id");
            return false;
          }
          if (idConsultor == "")
          {
            alert("Por favor, introduzca un id Consultor");
            return false;
          }
          if (is_credit_plan == "")
          {
            alert("Por favor, introduzca si tiene credit plan");
            return false;
          }
          if (gender == "")
          {
            alert("Por favor, introduzca un genero");
            return false;
          }
          if (marital_status == "")
          {
            alert("Por favor, introduzca un estado civil");
            return false;
          }
          if (mobile_number == "")
          {
            alert("Por favor, introduzca un numero movil");
            return false;
          }
          if (status == "")
          {
            alert("Por favor, introduzca un estatus");
            return false;
          }
        
        switch(typeForm){
          case "create":
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
          break
          case "update":
              paciente.updatePaciente(name, 
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
                      Materialize.toast(`Paciente actualizado correctamente`, 4000)
                      $('.modal').modal('close')
                    })
                    .catch(err => {
                      Materialize.toast(`Error => ${err}`, 4000)
                    })
          break
        }
        
        
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

      $("#btnSearchNamePaciente").click(() => {
        const value = $('#searchValuePaciente').val()
        const idClinica = $('#idclinicaAltaPaciente').val()
        
        const paciente = new Paciente()
        paciente.showPacienteByName(value, idClinica)
      })


      
  })