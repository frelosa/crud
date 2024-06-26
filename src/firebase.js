// Import the functions you need from the SDKs you need
/*
import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics"; //opcional
*/
/*
import { firebase } from "firebase/app";
import 'firebase/storage'; //habilitar la DB
*/
/*
import firebase from 'firebase/compat/app';
import 'firebase/compat/auth';
import 'firebase/compat/firestore';
*/
import firebaseApp from 'firebase/compat/app';
import 'firebase/compat/auth';
import 'firebase/compat/firestore';
import "firebase/compat/database";
import "firebase/compat/storage";



//Configuracion de que arrojo el sitio firebase en la web
const firebaseConfig = {
    apiKey: "AIzaSyCCdOUOPZpTlnFY8ZwNicSwzCe-jrnjzlk",
    authDomain: "curso-react-crud-76fda.firebaseapp.com",
    projectId: "curso-react-crud-76fda",
    storageBucket: "curso-react-crud-76fda.appspot.com",
    messagingSenderId: "323933780207",
    appId: "1:323933780207:web:f19d006fcf6bb0c808431a",
    measurementId: "G-BK6HN9XGXK"
  };

// Initialize Firebase
/*
const app = initializeApp(firebaseConfig);
const analytics = getAnalytics(app);
*/

//export const firebaseApp = firebase.initializeApp(firebaseConfig);
export default firebaseApp.initializeApp(firebaseConfig);
