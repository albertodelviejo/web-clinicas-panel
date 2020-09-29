class Usuario{

    constructor () {
        this.db = firebase.firestore()
    }
    
    showUsuarioAll(){
        const idClinica = $('#idclinicaAltaPaciente').val()
        this.db.collection('usuarios')
        .where('idClinica','==', idClinica)
    .onSnapshot(querySnapshot => {
        $('#clinicas').empty()
        if(querySnapshot.empty){
            $('#clinicas').append(`<h4>No se han encontrado resultados</h4>`)//this.obtenerTemplatePostVacio())
        }else{
           querySnapshot.forEach(post => {

               let postHtml = this.obtenerPostTemplate(
                post.data().name,
                "Id paciente",
                post.data().id,
                "Email",
                post.data().email,
               )
               $("#section-title").text("Usuarios")
               $("#menuUsuario").show()
               $("#clinicas").attr('class', 'posts');
               $('#clinicas').append(postHtml) 

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
      ) {
          return `
          <article onclick=test("${field1}") class="post">
                <div class="post-titulo">
                    <h5>${title}</h5>
                </div>
                <p>${field1title}: ${field1} ${field2title}: ${field2}</p>
            </article>`
      } 
}