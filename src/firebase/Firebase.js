
import firebase from "firebase/app";
import "firebase/firestore";
import "firebase/auth";

const firebaseConfig = {
    apiKey: "AIzaSyDEYdFhJyKlHkw4fCXoOOUF6ef6z_etofg",
    authDomain: "burger-app-e9557.firebaseapp.com",
    databaseURL: "https://burger-app-e9557.firebaseio.com",
    projectId: "burger-app-e9557",
    storageBucket: "burger-app-e9557.appspot.com",
    messagingSenderId: "1041053403407",
    appId: "1:1041053403407:web:7ccd92c1beaf0152e1d67a",
    measurementId: "G-Q7TXP9DDGD"
};

firebase.initializeApp(firebaseConfig);
firebase.firestore().enablePersistence();

export default firebase;