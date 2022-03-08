import firebase from 'firebase';
const firebaseConfig = {
    apiKey: "AIzaSyDNGD3-Y86wwQ1Tmp2Ll22_CbSLsg0E6_8",
    authDomain: "docs-yt-70e86.firebaseapp.com",
    projectId: "docs-yt-70e86",
    storageBucket: "docs-yt-70e86.appspot.com",
    messagingSenderId: "998449111318",
    appId: "1:998449111318:web:5a19d04a53894faf66f037"
  };

  const app= !firebase.apps.length ? firebase.initializeApp(firebaseConfig) : firebase.app();

  const db= app.firestore();

  export { db };