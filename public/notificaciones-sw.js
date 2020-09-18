importScripts('https://www.gstatic.com/firebasejs/5.5.8/firebase-app.js')
importScripts('https://www.gstatic.com/firebasejs/5.5.8/firebase-messaging.js')

if (!firebase.apps.length) {
    firebase.initializeApp({
        projectId: "blogeekplatzi-42241",
        messagingSenderId: "801448327651"
    });
  }

  const messaging = firebase.messaging()

  messaging.setBackgroundMessageHandler(payload => {
      const tituloNotificacion = 'Ya tenemos un nuevo post'
      const opcionesNotificacion = {
          body: payload.data.titulo,
          icon: 'icons/icon_new_post.png',
          click_action: "https://blogeekplatzi-42241.web.app/"
      }
      return self.ServiceWorkerRegistration.showNotification(
          tituloNotificacion,
          opcionesNotificacion
      )
  })




