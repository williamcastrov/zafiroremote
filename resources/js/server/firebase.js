import firebase from 'firebase/compat/app';

const firebaseConfig = {
  apiKey: "AIzaSyDH2fRQTRoFTCox4TmjjXp5g8WRJFN2GoQ",
  authDomain: "zafirogimcloud.firebaseapp.com",
  projectId: "zafirogimcloud",
  storageBucket: "zafirogimcloud.appspot.com",
  messagingSenderId: "1074430014050",
  appId: "1:1074430014050:web:a9598398f22e1cf67ed73b"
  };

// Exporto Firebase Inicializado
export default firebase.initializeApp(firebaseConfig);

//******************* Version de Firebase en Package.json
//"firebase": "^9.1.0",
