// Give the service worker access to Firebase Messaging.
// Note that you can only use Firebase Messaging here. Other Firebase libraries
// are not available in the service worker.

import { initializeApp } from "https://www.gstatic.com/firebasejs/9.8.3/firebase-app.js";
import { getAnalytics } from "https://www.gstatic.com/firebasejs/9.8.3/firebase-analytics.js";


// Initialize the Firebase app in the service worker by passing in
// your app's Firebase config object.
// https://firebase.google.com/docs/web/setup#config-object
firebase.initializeApp({
    apiKey: "AIzaSyCg9bA8QSUFV9JqzihP7zaRJmXbYGosTBU",
    authDomain: "waz3ly-shipping.firebaseapp.com",
    projectId: "waz3ly-shipping",
    storageBucket: "waz3ly-shipping.appspot.com",
    messagingSenderId: "261176629809",
    appId: "1:261176629809:web:0ba120226365b8ec851310",
    measurementId: "G-0M1RNBWS92"
});

const app = initializeApp(firebaseConfig);
const analytics = getAnalytics(app);

// Retrieve an instance of Firebase Messaging so that it can handle background
// messages.
// const messaging = firebase.messaging();
