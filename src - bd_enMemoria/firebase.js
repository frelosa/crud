// Import the functions you need from the SDKs you need
/*
import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics"; //opcional
*/
import firebase from "firebase/app";
import 'firebase/storage';

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

export const firebaseApp = firebase.initializeApp(firebaseConfig);
