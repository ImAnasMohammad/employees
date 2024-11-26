import React from 'react'
import NavBar from '../../components/NavBar'
import './dashboard.css'

const Dashboard = () => {
  return (
    <div className='dashboard-wrapper'>
       <NavBar/>
       <div className='dashboard'>
            Welcome to Admin pannel
       </div>
    </div>
  )
}

export default Dashboard