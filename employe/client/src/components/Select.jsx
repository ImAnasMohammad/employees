import React from 'react'

const Select = ({direction,id,label,value,setValue,...attributes}) => {
  return (
    <div className='input-container' style={{flexDirection:direction ?? 'column'}}>
      <label htmlFor={id}>{label} </label>
      <select {...attributes} className='select' value={value} onChange={(e)=>setValue(e.target.value)} >
          <option value={''}>Select Designation</option>
          <option value={'HR'}>HR</option>
          <option value={'Manager'}>Manager</option>
          <option value={'sales'}>sales</option>
      </select>
    </div>

  )
}

export default Select