import React from "react";
import { useState, useCallback, useEffect } from "react";
//import firebaseApp from './firebase';
//import {db} from './firebase'
//import * as firebase from 'firebase/app';

//import isEmpty from 'lodash/isEmpty';
import { isEmpty,result,size } from "lodash";
import shortid from "shortid"; //genera id para guardar en memoria
import { deleteDocumento, estadoUsuario, updateDocumento } from "./actions";
import { getCollection,addDocumento } from "./actions";
//import { collection } from "firebase/compat/firestore";



function App() {
  const [task, setTask] = useState("");
  const [tasks, setTasks] = useState("");
  const [editMode,setEditMode] = useState(false);
  const [id,setId] = useState("");
  const [error, setError] = useState(null);
  estadoUsuario(); 
  useEffect(()=>{
    (async()=>{
      const result=await getCollection("tarea")
      if(result.statusResponse){
        setTasks(result.data); //pasando todos las filas para pintarlas en el formulario
        console.log(result);
      }
    })()

  },[])

  /*firebaseApp.auth().onAuthStateChanged(user=>{
    console.log('Hola ' + user);
    user ? console.log('usuario logeado'): console.log('usuario no logeado')

  })*/
  
  //--------------------



  const validForm=()=>{
    let isValid=true;
    setError(null);
    if(isEmpty(task)){
      setError("debes ingresar una tarea");
      isValid=false;
    }
    return isValid;
  }
  //--------------------
  const addTask_enMemoria=(e)=>{
    e.preventDefault();
    /*if(isEmpty(task)){
      //console.log('vacio');
      setError("debes ingresar una tarea");
      return;
    }*/
    if(!validForm()){ 
      return;
    }
    //console.log('Ok')
    const newTask={
      id:shortid.generate(),
      name:task //task=task, si es el mismo nombre se puede escribir solo task
    }
    setTasks([...tasks,newTask]);
    setTask("");
    console.log(task);
  }
//-----------------
const addTask=async(e)=>{
  e.preventDefault();
 
  if(!validForm()){ 
    return;
  }
  //console.log('Ok')
  const result=await addDocumento("tarea",{name: task});
  if(!result.statusResponse){
    setError(result.error);
    return;
  }
  
  setTasks([...tasks,{id:result.data.id,name: task}]);
  setTask("");
  console.log(task);
}



  const deleteTask=async(id)=>{
    const result = await deleteDocumento("tarea",id)
    if(!result.statusResponse){
      setError(result.error);
      return;
    }

    const filtrarTareas=tasks.filter(task=>task.id !== id);
    setTasks(filtrarTareas);
  }

  const editTarea=(laTarea)=>{
    setTask(laTarea.name);
    setEditMode(true);
    setId(laTarea.id);
  }

   
  const grabarTarea=async(e)=>{
    e.preventDefault();

    if(!validForm()){ 
      return;
    }

    if(isEmpty(task)){
      //console.log('vacio');
      return;
    }
    
    const result = await updateDocumento("tarea",id,{name: task})
    if(!result.statusResponse){
      setError(result.error);
      return;
    }

    //setTasks([...tasks,newTask]);
    const editarTareas = tasks.map(item => item.id === id ?{ id,name:task } : item);
    setTasks(editarTareas);
    setEditMode(false);
    setTask("");
    setId("");
    console.log(task);
  }

  
  return (
    <div className="container mt-5">
      <h1>Tareas</h1>
      <hr />
      <div className="row">
        <div className="col-8">
          <h4 className="text-center">Lista de Tareas</h4>
          {size(tasks)===0 ? (<li className="list-group-item">No hay tareas</li>) :
          (
          <ul className="list-group">
            {
              tasks.map((tarea)=>(
                <li className="list-group-item" key={tarea.id}>
                  <span className="lead">{tarea.name}</span>
                  <button className="btn btn-danger btn-sm float-right mx-2"
                    onClick={()=>deleteTask(tarea.id)}
                  >Eliminar</button>
                  <button className="btn btn-warning btn-sm float-right"
                    onClick={()=>editTarea(tarea)}
                  >Editar</button>
                </li>
              )) 
            }
          </ul>
          )}
        </div>
        <div className="col-4">
          <h4 className="text-center">
            { editMode ? "Editar Tarea":"Agregar Tarea" }
          </h4>
          <form onSubmit={ editMode ? grabarTarea : addTask}>
            {
              error && <span className="text-danger mt-2">{error}</span>
            }
            <input 
              type="text" 
              className="form-control mb-2" 
              placeholder="Ingresar la tarea..."
              onChange={(text)=>setTask(text.target.value)}
              value={task}
            />
            
            <button 
              className={ editMode ? "btn btn-warning btn-block":  "btn btn-dark btn-block"} 
              type="submit"
            >
              { editMode ? "Guardar" : "Agregar"}
            </button>

          </form>
        </div>

      </div>
    </div>
  );
}

export default App;
