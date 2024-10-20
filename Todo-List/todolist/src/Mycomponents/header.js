import React, { useState } from 'react'

function Header(props) {
    let [inputText,setInputText] = useState('');
    const handleEnterPress = (e)=>{
        if(e.keyCode===13){
            props.addList(inputText)
            setInputText("")
        }
    }
  return (
    <div className='input-container'>
      <input type="text" className='input-box' placeholder="Enter your Task"
      value={inputText} 
      onChange={e=>{
        setInputText(e.target.value)}}
      onKeyDown={handleEnterPress}       
        />
      <button className='add-button'
      onClick={()=>{
        props.addList(inputText)
        setInputText("")
      }}>+</button>
    </div>
  )
}

export default Header

