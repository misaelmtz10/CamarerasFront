import {initializeApp } from "https://www.gstatic.com/firebasejs/9.13.0/firebase-app.js"

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyAQFw6bkYq1gsb5cI6Per48CNb2thnXclg",
    authDomain: "camareras-b6b7b.firebaseapp.com",
    projectId: "camareras-b6b7b",
    storageBucket: "camareras-b6b7b.appspot.com",
    messagingSenderId: "45092282858",
    appId: "1:45092282858:web:f07969ba45408ef7031293"
  };
  // Initialize Firebase
  const app = initializeApp(firebaseConfig);
  export{app}