import React, { useState } from 'react';

function Checkbox({direction,id,label,setSelectedCourses,selectedCourses}) {
  const courses = [
    'MCA',
    'BCA',
    'BSC'
  ];


  const handleCheckboxChange = (event) => {
    const { value, checked } = event.target;

    if (checked) {
      // Add course to the selected list
      setSelectedCourses((prev) => [...prev, value]);
    } else {
      // Remove course from the selected list
      setSelectedCourses((prev) => prev.filter((course) => course !== value));
    }
  };

  return (
    <div className='input-container' style={{flexDirection:direction ?? 'column'}}>
      <label htmlFor={id}>{label} </label>
      <div style={{display:'flex',alignItems:'center',justifyContent:'center',gap:'5px'}}>
        {courses.map((course) => (
          <label key={course} style={{flex:'0 0 0',width:'70px',display:'flex',justifyContent:'center',alignItems:'center'}}>
            <input
              type="checkbox"
              value={course}
              checked={selectedCourses.includes(course)}
              onChange={handleCheckboxChange}
              style={{flex:'0 0 0'}}
            />
            {course}
          </label>
        ))}
      </div>
    </div>
  );
}

export default Checkbox;
