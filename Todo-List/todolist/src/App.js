import React, { useState } from 'react'
import './App.css'
import Header from './Mycomponents/header'
import Todo from './Mycomponents/todo';

function App() {
  const [lsitTodo,setListTodo] = useState([]);
  let addList = (inputText)=>{
    if(inputText!=='')
      setListTodo([...lsitTodo,inputText]);
  }
  const deleteListItem = (key)=>{
    let newListTodo =[...lsitTodo];
    newListTodo.splice(key,1)
    setListTodo([...newListTodo])
  }
  return (
    <div className='main-container'>
      <div className='center-container'>
        <Header addList={addList}/>
        <br/>
        <h1 className='app-heading'>Todo</h1>
        <br/>
        <hr/>
        <br/>
        <br/>
        {lsitTodo.map((listItem,i)=>{
          return (
            <Todo key={i} index={i} item = {listItem} deleteItem={deleteListItem}/>
        ) 
        })}
      </div>
     </div>
  );
}

export default App
