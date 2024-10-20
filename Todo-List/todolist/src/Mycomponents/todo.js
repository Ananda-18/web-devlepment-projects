import React from 'react'

function Todo(props) {
  return (
    <li className='list-item'>
      {props.item}
      <span className='delete-button'>
      <i class="fa-regular fa-trash-can"
      onClick={e=>{
        props.deleteItem(props.index)
      }}></i>
      </span>
    </li>
  )
}

export default Todo

