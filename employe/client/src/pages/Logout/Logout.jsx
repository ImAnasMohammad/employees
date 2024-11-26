import React, { useEffect } from 'react'
import { Link, useNavigate } from 'react-router'
import { useAuth } from '../../hooks/useAuth';

const Logout = () => {

    const redirect = useNavigate();
    const {updateAuth} = useAuth();

    useEffect(()=>{
        if(localStorage.getItem('token')){
            updateAuth({newName:'',newToken:null})
            localStorage.removeItem('token');
            redirect('/login');
        }
    },[])
  return (
    <div>Logout...<Link to="/login">Login?</Link></div>
  )
}

export default Logout