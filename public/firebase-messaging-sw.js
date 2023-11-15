importScripts(
    "https://www.gstatic.com/firebasejs/9.0.0/firebase-app-compat.js"
  );
  importScripts(
    "https://www.gstatic.com/firebasejs/9.0.0/firebase-messaging-compat.js"
  );
  
  const firebaseConfig = {
    apiKey: "AIzaSyBXFesE3-ruPAzaS2FNC24tbhpMPWnkFyA",
    authDomain: "dbms-9e714.firebaseapp.com",
    projectId: "dbms-9e714",
    storageBucket: "dbms-9e714.appspot.com",
    messagingSenderId: "129895412288",
    appId: "1:129895412288:web:eea850ecd2fb2cabe7e5a5",
    measurementId: "G-QNHYWCRS8E"
  };  
  // Initialize the Firebase app in the service worker by passing the generated config
  
  firebase.initializeApp(firebaseConfig);
  
  const messaging = firebase.messaging();
  
  messaging.onBackgroundMessage(function (payload) {
    console.log("Received background message ", payload);
  
    const notificationTitle = payload.notification.title;
    const notificationOptions = {
      body: payload.notification.body,
    };
  
    self.registration.showNotification(notificationTitle, notificationOptions);
  });