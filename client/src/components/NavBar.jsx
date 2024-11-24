import React from 'react'
import { Link } from 'react-router'
import Logo from './Logo'

const NavBar = () => {
  return (
    <>
        <Logo/>
        <div className='nav-wrapper'>
            <div>
                <Link to="/">Home</Link>
                <Link to={'/employees'}>Employee list</Link>
            </div>

            <div>
                <span>User-</span>
                <Link to={'/logout'}>Logout</Link>
            </div>
        </div>
    </>
  )
}

export default NavBar