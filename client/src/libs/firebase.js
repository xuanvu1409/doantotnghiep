import firebase from "firebase";
import "firebase/auth";

const config = {
    apiKey: "AIzaSyAinYjzbYSx87RHS3_K5cCuFco5JDlmgvg",
    authDomain: "do-an-tot-nghiep-4a937.firebaseapp.com",
    databaseURL: "https://do-an-tot-nghiep-4a937-default-rtdb.firebaseio.com",
    projectId: "do-an-tot-nghiep-4a937",
    storageBucket: "do-an-tot-nghiep-4a937.appspot.com",
    messagingSenderId: "425408973729",
    appId: "1:425408973729:web:20347cd9838c5498cdd9e0",
    measurementId: "G-N4MTWZTD1X"
};
firebase.initializeApp(config);
export const auth = firebase.auth;
export const db = firebase.database();