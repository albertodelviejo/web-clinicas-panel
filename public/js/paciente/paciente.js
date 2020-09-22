class Paciente {
    constructor () {
        this.db = firebase.firestore()
    }

    createPaciente(
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
        status
        ){

            const clinica = new Clinica()

            clinica.addPacienteToClinica(idClinica, id)

            return this.db.collection("pacientes").doc(id).set({
                name: name,
                surname1: surname1,
                surname2: surname2,
                email: email,
                gender: gender,
                birthday: birthday,
                address: address,
                phone_number: phone_number,
                id_type: id_type,
                id: id,
                idClinica: idClinica,
                idConsultor: idConsultor,
                is_credit_plan: is_credit_plan,
                marital_status: marital_status,
                mobile_number: mobile_number,
                paid_balance: 0,
                points: 0,
                total_balance: 0,
                status: status
            }).then(refDoc => {
                console.log(`Id de paciente => ${refDoc.id}`)
            }).catch(error => {
              console.log(`Error de alta => ${error}`)
            })
    }


    showPacienteAll(){
        this.db.collection('pacientes')
    .onSnapshot(querySnapshot => {
        $('#clinicas').empty()
        if(querySnapshot.empty){
            $('#clinicas').append(`<h4>No se han encontrado resultados</h4>`)//this.obtenerTemplatePostVacio())
        }else{
           querySnapshot.forEach(post => {
            const title = post.data().name + " " + post.data().surname1 + " " + post.data().surname2
                var creditPlan = "";
                if (post.data().is_credit_plan){
                    creditPlan = "Sí"
                }else{
                    creditPlan = "No"
                }
                let postHtml = this.obtenerPostTemplate(
                       title,
                       "Dirección",
                       post.data().address,
                       "Email",
                       post.data().email,
                       "Teléfono",
                       post.data().phone_number,
                       "Puntos",
                       post.data().points,
                       "Credit Plan",
                       creditPlan,
                       "Saldo Pagado",
                       post.data().payed_balance + "€",
                       "ID",
                       post.data().id
                   )
                   $('#clinicas').append(postHtml) 
           })
        }
    })
    }

    showPacientesByIdByidClinica(idClinica,idUser){
        this.db.collection('pacientes')
        .where('id', '==', idUser)
        .where('idClinica', '==', idClinica)
        .onSnapshot(querySnapshot => {
            $('#clinicas').empty()
            if(querySnapshot.empty){
                $('#clinicas').append(`<h4>No se han encontrado resultados</h4>`)//this.obtenerTemplatePostVacio())
            }else{
               querySnapshot.forEach(post => {
                const title = post.data().name + post.data().surname1 + post.data().surname2
                var creditPlan ="";
                if (post.data().is_credit_plan){
                    creditPlan = "Sí"
                }else{
                    creditPlan = "No"
                }
                let postHtml = this.obtenerPostTemplate(
                       title,
                       "Dirección",
                       post.data().address,
                       "Email",
                       post.data().email,
                       "Teléfono",
                       post.data().phone_number,
                       "ID",
                       post.data().id,
                       "Credit Plan",
                       creditPlan,
                       "Saldo Pagado",
                       post.data().payed_balance + "€",
                   )
                   $('#clinicas').append(postHtml) 
               })
            }
        })
    }

    showPacientesByIdClinica(idClinica){
        this.db.collection('pacientes')
        .where('idClinica','==', idClinica)
        .onSnapshot(querySnapshot => {
            $('#clinicas').empty()
            if(querySnapshot.empty){
                $('#clinicas').append(`<h4>No se han encontrado resultados</h4>`)//this.obtenerTemplatePostVacio())
            }else{
               querySnapshot.forEach(post => {
                const title = post.data().name + post.data().surname1 + post.data().surname2
                var creditPlan = "";
                if (post.data().is_credit_plan){
                    creditPlan = "Sí"
                }else{
                    creditPlan = "No"
                }
                let postHtml = this.obtenerPostTemplate(
                       title,
                       "Dirección",
                       post.data().address,
                       "Email",
                       post.data().email,
                       "Teléfono",
                       post.data().phone_number,
                       "ID",
                       post.data().id,
                       "Credit Plan",
                       creditPlan,
                       "Saldo Pagado",
                       post.data().payed_balance + "€",
                   )
                   $('#clinicas').append(postHtml) 
               })
            }
        })
    }

    showActivePaciente(){
        this.db.collection('pacientes')
        .where('status', '==', "active")
        .onSnapshot(querySnapshot => {
        $('#clinicas').empty()
        if(querySnapshot.empty){
            $('#clinicas').append(`<h4>No se han encontrado resultados</h4>`)//this.obtenerTemplatePostVacio())
        }else{
           querySnapshot.forEach(post => {
            const title = post.data().name + post.data().surname1 + post.data().surname2
            var creditPlan = "";
            if (post.data().is_credit_plan){
                creditPlan = "Sí"
            }else{
                creditPlan = "No"
            }
            let postHtml = this.obtenerPostTemplate(
                   title,
                   "Dirección",
                   post.data().address,
                   "Email",
                   post.data().email,
                   "Teléfono",
                   post.data().phone_number,
                   "ID",
                   post.data().id,
                   "Credit Plan",
                   creditPlan,
                   "Saldo Pagado",
                   post.data().payed_balance + "€",
               )
               $('#clinicas').append(postHtml) 
           })
        }
    })
    }

    showInactivePaciente(){
        this.db.collection('pacientes')
        .where('status', '==', "inactive")
        .onSnapshot(querySnapshot => {
        $('#clinicas').empty()
        if(querySnapshot.empty){
            $('#clinicas').append(`<h4>No se han encontrado resultados</h4>`)//this.obtenerTemplatePostVacio())
        }else{
           querySnapshot.forEach(post => {
            const title = post.data().name + post.data().surname1 + post.data().surname2
            var creditPlan = "";
            if (post.data().is_credit_plan){
                creditPlan = "Sí"
            }else{
                creditPlan = "No"
            }
            let postHtml = this.obtenerPostTemplate(
                   title,
                   "Dirección",
                   post.data().address,
                   "Email",
                   post.data().email,
                   "Teléfono",
                   post.data().phone_number,
                   "ID",
                   post.data().id,
                   "Credit Plan",
                   creditPlan,
                   "Saldo Pagado",
                   post.data().payed_balance + "€",
               )
               $('#clinicas').append(postHtml) 
           })
        }
    })
    }

    showStandbyPaciente(){
        this.db.collection('pacientes')
        .where('status', '==', "standby")
        .onSnapshot(querySnapshot => {
        $('#clinicas').empty()
        if(querySnapshot.empty){
            $('#clinicas').append(`<h4>No se han encontrado resultados</h4>`)//this.obtenerTemplatePostVacio())
        }else{
           querySnapshot.forEach(post => {
            const title = post.data().name + post.data().surname1 + post.data().surname2
            var creditPlan = "";
            if (post.data().is_credit_plan){
                creditPlan = "Sí"
            }else{
                creditPlan = "No"
            }
            let postHtml = this.obtenerPostTemplate(
                   title,
                   "Dirección",
                   post.data().address,
                   "Email",
                   post.data().email,
                   "Teléfono",
                   post.data().phone_number,
                   "ID",
                   post.data().id,
                   "Credit Plan",
                   creditPlan,
                   "Saldo Pagado",
                   post.data().payed_balance + "€",
               )
               $('#clinicas').append(postHtml) 
           })
        }
    })
    }

    showIsCreditPacienteByidClinica(idClinica){
        this.db.collection('pacientes')
        .where('idClinica','==',idClinica)
        .where('is_credit_plan', '==', "true")
        .onSnapshot(querySnapshot => {
        $('#clinicas').empty()
        if(querySnapshot.empty){
            $('#clinicas').append(`<h4>No se han encontrado resultados</h4>`)//this.obtenerTemplatePostVacio())
        }else{
           querySnapshot.forEach(post => {
            const title = post.data().name + post.data().surname1 + post.data().surname2
            var creditPlan = "";
            if (post.data().is_credit_plan){
                creditPlan = "Sí"
            }else{
                creditPlan = "No"
            }
            let postHtml = this.obtenerPostTemplate(
                   title,
                   "Dirección",
                   post.data().address,
                   "Email",
                   post.data().email,
                   "Teléfono",
                   post.data().phone_number,
                   "ID",
                   post.data().id,
                   "Credit Plan",
                   creditPlan,
                   "Saldo Pagado",
                   post.data().payed_balance + "€",
               )
               $('#clinicas').append(postHtml) 
           })
        }
    })
    }

    

    getPacienteById(id){
        this.db.collection('pacientes')
        .where('id', '==', id)
    .onSnapshot(querySnapshot => {
        $('#clinicas').empty()
        if(querySnapshot.empty){
            $('#clinicas').append(`<h2>No se ha encontrado ningun paciente<h3>`)//this.obtenerTemplatePostVacio())
        }else{
           querySnapshot.forEach(post => {
        $('#nameAltaPaciente').val(post.data().name)
        $('#surname1AltaPaciente').val(post.data().surname1) 
        $('#surname2AltaPaciente').val(post.data().surname2)
        $('#mailAltaPaciente').val(post.data().email)
        $('#genderAltaPaciente').val(post.data().gender)
        $('#birthdayAltaPaciente').val(post.data().birthday)
        $('#addressAltaPaciente').val(post.data().address)
        $('#phoneAltaPaciente').val(post.data().phone_number)
        $('#idtypeAltaPaciente').val(post.data().id_type)
        $('#idAltaPaciente').val(post.data().id)
        $('#idclinicaAltaPaciente').val(post.data().idClinica)
        $('#idconsultorAltaPaciente').val(post.data().idConsultor)
        $('#iscreditAltaPaciente').val(post.data().is_credit_plan)
        $('#maritalAltaPaciente').val(post.data().marital_status)
        $('#mobileAltaPaciente').val(post.data().mobile_number) 
        $('#statusAltaPaciente').val(post.data().status)
        $('.determinate').attr('style', `width: 0%`)
              
            $('#modalAltaPaciente').modal('open')
           })
        }
    })
    }

    getPacienteforModal(id){
        this.db.collection('pacientes')
        .where('id', '==', id)
    .onSnapshot(querySnapshot => {
        $('#clinicas').empty()
        if(querySnapshot.empty){
            $('#clinicas').append(`<h2>Error<h3>`)//this.obtenerTemplatePostVacio())
        }else{
           querySnapshot.forEach(post => {
            $('#modaltitlepaciente').text(post.data().name)
            $('#idPaciente').val(id)
            
            $('.determinate').attr('style', `width: 0%`)
              
            $('#modalItemPaciente').modal('open')
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
        field7title,
        field7,
      ) {
        return `
        <article onclick=test("${field7}") class="post">
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
              <script>
                function test(id){
                 const paciente = new Paciente();
                 paciente.getPacienteforModal(id);
                }
                </script>
          </article>`
      }

}