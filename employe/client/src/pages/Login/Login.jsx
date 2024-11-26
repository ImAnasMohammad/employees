import { useState } from 'react';
import Button from '../../components/Button';
import Input from '../../components/Input';
import './login.css';
import Error from '../../components/Error';
import Logo from '../../components/Logo';
import axios from 'axios'
import { useNavigate } from 'react-router';
import { useAuth } from '../../hooks/useAuth';


const Login = ()=>{
    const [userName,setUserName]=useState('');
    const [password,setPassword]=useState('');
    const [isLoading,setIsLoading]=useState(false);
    const [error,setError]=useState(false);
    const redirect = useNavigate();

    const {updateAuth}= useAuth();

    const handleSubmit = async (e)=>{
        e.preventDefault();
        const url = `${process.env.REACT_APP_BASE_URL}/auth/login`
        try {
            const response = await axios.post(url, {
                email:userName,
                password,
            });

            console.log('Login successful:', response.data);
            setError(false);


            
            if (response.data.token) {
                localStorage.setItem('token', response.data.token);
                updateAuth({newName:response.data.name,newToken:response.data.token});
            }


            redirect('localhost:3000/')
            
        } catch (error) {
            if (error.response) {
                console.error('Error:', error.response.data.message);
                setError(error.response.data.message)
            } else if (error.request) {
                setError(error.response)
                console.error('No response from server:', error.request);
            } else {
                console.log(error.message)
                console.error('Error setting up request:', error.message);
            }
        };
    }


    return<div className='login-main-wrapper'>
        <Logo/>
        <div className='login-label-wrapper'>Login</div>
        <div className='login-wrapper'>
            <form onSubmit={handleSubmit}>
                <div className='login-continer'>
                    <Input value={userName} onChange={(e)=>setUserName(e.target.value)} id="userName">User name</Input>
                    <Input value={password} type={'password'} onChange={(e)=>setPassword(e.target.value)} id="password">Password</Input>
                    {error && <Error>{error}</Error>}
                    <Button disabled={isLoading} type="submit">Login</Button>
                </div>
            </form>
        </div>
    </div>
}


export default Login