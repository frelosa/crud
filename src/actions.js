import  firebaseApp  from "./firebase";
//import {db} from './firebase'
import firebase from "./firebase";
import 'firebase/compat/auth';
import 'firebase/compat/firestore';
import "firebase/compat/database";
import "firebase/compat/storage";

export const estadoUsuario=()=>{
    //console.log(firebaseApp);
firebaseApp.auth().onAuthStateChanged(user=>{
    console.log('Hola ' + user);
    user ? console.log('usuario logeado'): console.log('usuario no logeado')
  })
}

const db = firebase.firestore(firebaseApp);
//función para conctar con la tabla o coleccion "tarea" de firebase
export const getCollection=async(collection) => {
    const result = {
        statusResponse: false,
        data: null,
        error: null 
    }
    try {
        const data = await db.collection(collection).get();
        /*const arrayData = data.docs.map(doc => console.log(doc.data()));
        console.log(arrayData);    */
        const arrayData = data.docs.map(doc => ({id:doc.id,...doc.data()}));
        result.statusResponse=true;
        result.data=arrayData;
    } catch (error) {
        result.error = error;
    }
    return result;
}

export const addDocumento=async(collection,data)=>{
    const result = { statusResponse: false, data: null, error: null }
    try {
        const response = await db.collection(collection).add(data);
        result.data = { id: response.id}
        result.statusResponse=true;
     } catch (error) {
        result.error = error;
    }
    return result;
}

export const getDocumento = async(collection, id)=> {
    const result = { statusResponse: false, data: null, error: null }
    try {
        const response = await db.collection(collection).doc(id).get();
        result.data={id: response.id, ...response.data() }
        result.statusResponse=true;
    } catch (error) {
        result.error = error;       
    }   
    return result;
}

export const updateDocumento = async(collection, id, data)=> {
    const result = { statusResponse: false, error: null }
    try {
        await db.collection(collection).doc(id).update(data);
        result.statusResponse=true;
    } catch (error) {
        result.error = error;       
    }   
    return result;
}

export const deleteDocumento = async(collection, id, data)=> {
    const result = { statusResponse: false, error: null }
    try {
        await db.collection(collection).doc(id).delete();
        result.statusResponse=true;
    } catch (error) {
        result.error = error;       
    }   
    return result;
}