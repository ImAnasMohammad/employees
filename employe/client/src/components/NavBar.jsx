import React from 'react'
import { Link } from 'react-router'
import Logo from './Logo';
import { useAuth } from '../hooks/useAuth';

const NavBar = () => {
  const {name} = useAuth();
  return (
    <>
        <Logo/>
        <div className='nav-wrapper'>
            <div>
                <Link to="/">Home</Link>
                <Link to={'/employees'}>Employee list</Link>
            </div>

            <div>
                <span>{name}-</span>
                <Link to={'/logout'}>Logout</Link>
            </div>
        </div>
    </>
  )
}

export default NavBar