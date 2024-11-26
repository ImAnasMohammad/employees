import React from 'react'

const Input = ({children,id,direction,...input}) => {
  return (
    <div className='input-container' style={{flexDirection:direction ?? 'column'}}>
      <label htmlFor={id}>{children} </label>
      <input id={id} {...input}/>
    </div>
  )
}

export default Input