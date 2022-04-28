import './App.css';
import {AiOutlineEdit, AiOutlineDelete} from 'react-icons/ai'
import { useEffect, useState } from 'react';
import axios from "axios";


function App() {
  const Todos = ({todos})=>{
    return(
      <div className="todos">
        {todos.map((todo)=>{
          return( 
            <div className="todo">
              <button
                onClick={() => changeStatus(todo)}
                className='checkbox'
                style={{backgroundColor: todo.status?"purple":"white"}}
              >
              </button>
              <p>
                {todo.name}
              </p>
              <button onClick={()=>handleChangeTodo(todo)}>
                <AiOutlineEdit />
              </button>
              <button onClick={() => deletetask(todo)}><AiOutlineDelete /></button>
            </div>
          )  
      })}
      </div>
    )  
  }

  //funcao para botao de newTask
  async function handleNewButton(){
    setDisplayVisible(!displayVisible);
  }

  //funcao para criar lista
  async function createTask(){
    if(inputValue === ""){
      return getTodos()
    }else{
      keyEnter()
      await axios.post("http://localhost:3333/todo",{
        name : inputValue
      })
      getTodos()
      setDisplayVisible(!displayVisible)
      setInputValue("")
      setSelectTodo()
    }
  }

  //funcao para deletar Task
  async function deletetask(todo){
    await axios.delete(`http://localhost:3333/todo/${todo.id}`)
    getTodos()
  }

  //funcao para editar status Task
  async function changeStatus(todo){
    await axios.put("http://localhost:3333/todo",{
      id: todo.id,
      status: !todo.status
    })
    getTodos()
  }
  
  //funcao para selecionar Task
  async function handleChangeTodo(todo){
    showValue(todo)
    setSelectTodo(todo);
    setDisplayVisible(true);   
    keyEnter() 
  }

  //funcao para editar Task
  async function editTodo(){

    if(inputValue===""){
      return getTodos()
    }else{
      await axios.put("http://localhost:3333/todo",{
        id: selectTodo.id,
        name: inputValue,
  
      });
      getTodos()
      setDisplayVisible(false)
      setSelectTodo()
    }
  }
  

  async function getTodos(){
    const response = await axios.get("http://localhost:3333/todo");
    setTodos(response.data)
  }
  const [todos,setTodos] = useState([])
  const [inputValue, setInputValue] = useState("")
  const [displayVisible , setDisplayVisible] = useState(false)
  const [selectTodo , setSelectTodo] = useState()

  useEffect(()=>{
    getTodos();
  },[])


  //funcao para Enter
  async function keyEnter(){
    document.addEventListener("keypress",function(e){
      if(e.key === 'Enter'){
        var btn = document.querySelector('#submit');
        btn.click();
      }
    })
  }

  //funcao para trazer de volta valor no campo ao editar
  // function showValue(todo){
  //   document.getElementsByClassName('inputName').value = todo.name;
  // }


  return (

    <div className="App">
      <header className="container">

        <div className='header'>
          <h1>Lista de Tarefas</h1>
        </div>

        <Todos todos={todos}></Todos>

        <input 
          className='inputName'
          style={{display: displayVisible? "block" : "none"}}
          value={inputValue}
          onChange={(event)=>{
            setInputValue(event.target.value)
          }}
        >
        </input>

        <button
          className='newTaskButton'
          id='submit'
          onClick={displayVisible? selectTodo? editTodo  : createTask : handleNewButton }
        >
           {displayVisible? selectTodo? "editar": "confirmar" : "nova tarefa"}
        </button>  

      </header>
    </div>
  );
}


export default App;
