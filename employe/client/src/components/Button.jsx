import React from 'react'

const Button = ({children,...button}) => {
  return (
    <button {...button} className='main-button'  >{children}</button>
  )
}

export default Button