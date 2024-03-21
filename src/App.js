
import { useState, useCallback } from "react";
//import isEmpty from 'lodash/isEmpty';
import { isEmpty,size } from "lodash";
import shortid from "shortid";



function App() {
  const [task, setTask] = useState("");
  const [tasks, setTasks] = useState("");
  const [editMode,setEditMode] = useState(false);
  const [id,setId] = useState("");

  
  const addTask=(e)=>{
    e.preventDefault();
    if(isEmpty(task)){
      //console.log('vacio');
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

  const deleteTask=(id)=>{
    const filtrarTareas=tasks.filter(task=>task.id !== id);
    setTasks(filtrarTareas);
  }

  const editTarea=(laTarea)=>{
    setTask(laTarea.name);
    setEditMode(true);
    setId(laTarea.id);
  }

  const grabarTarea=(e)=>{
    e.preventDefault();
    if(isEmpty(task)){
      //console.log('vacio');
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
          {size(tasks)===0 ? (<h5>No hay tareas</h5>) :
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
