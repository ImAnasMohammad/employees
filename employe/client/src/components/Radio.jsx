import React, { useState } from 'react'

const Radio = ({children,label,id,direction,selectedOption,setSelectedOption,...input}) => {
  const handleChange = (event) => {
    setSelectedOption(event.target.value);
  };

  return (
    <div className='input-container' style={{flexDirection:direction ?? 'column'}}>
      <label htmlFor={id}>{label} </label>
      <div style={{display:'flex',flex:'1 1 1',justifyContent:'center',alignItems:'center',justifyContent:'center',gap:'20px'}}>
        <label style={{display:'flex',alignItems:'center',justifyContent:'center',width:'110px'}}>
          <input
            type="radio"
            name="options"
            value="male"
            checked={selectedOption === 'male'}
            onChange={handleChange}
          />
          Male
        </label>
        <label style={{display:'flex',alignItems:'center',justifyContent:'center',width:'110px'}}>
          <input
            type="radio"
            name="options"
            value="female"
            checked={selectedOption === 'female'}
            onChange={handleChange}
          />
          Female
        </label>
      </div>
    </div>
  )
}

export default Radio