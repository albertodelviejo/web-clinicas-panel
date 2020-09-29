$(() => {

    $('#btnAltaUsuario').click(() => {
        $('#modalSesion').modal('close');
        $('#modalRegistroUsuario').modal('open');
    });

    $('#btnRegistroUsuarioEmail').click(() => {
        const nombreUsuario = $('#nombreUsuarioAppReg').val()
        const email = $('#emailUsuarioAppReg').val()
        const password = $('#passwordUsuarioAppReg').val()
        const idClinica = $('#idclinicaAltaPaciente').val()
        const dni = $('#dniUsuarioAppReg').val()

        const auth = new Autenticacion()
        auth.crearCuentaUserEmailPass(email,password, nombreUsuario,dni,idClinica)
    });
})