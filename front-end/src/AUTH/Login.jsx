import React from 'react';
import img from '../images/background-image-login.jpg'
import './login.css';
import { useState } from 'react';
import axios from './axios';
import { useNavigate } from 'react-router-dom';


const Login = () => {
    const styles = {
        backgroundImage: `url(${img})`,
        backgroundSize: 'cover',
        backgroundRepeat: 'no-repeat',
    };

    // -=-=-=-=-==- states -=-=-=-=-==-
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [loading, setLoading] = useState(false);
    const [errors, setErrors] = useState('');
    const [credentials, setCredentials] = useState('');
    const navigate = useNavigate();
    

    // ============ Login ============
    const Login = (event) => {
        event.preventDefault();
        setLoading(true);

        axios.post('api/login', { email, password })
            .then(response => {
                localStorage.setItem('access_token', response.data.access_token);
                localStorage.setItem('logged_user', 'true');
                navigate('/');
                window.location.reload();
            })
            .catch(error => {
                if( error.response.data.errors.credentials == 'The provided credentials are incorrect.'){
                    setCredentials('Invalid credentials. Please try again.');
                    console.log(error.response.data.errors);
                    setErrors('');
                }else{
                    setErrors(error.response.data.errors);
                    setCredentials('');
                }
                console.log(error.response.data.errors);
                setLoading(false);
            });
    };
    

    return (
        <div className='2xl:ml-80 flex justify-center'>
            <div className='text-center w-11/12 parent ' style={styles} >

                <form className='mx-40 pt-52 form-login' onSubmit={Login}>
                {/* <form className='mx-40 pt-52 form-login pb-28 2xl:mx-80'> */}

                    <div className="grid mt-24 md:grid-cols-2 border-gray-300"></div>

                    <div className="mb-6">
                        <label htmlFor="email" className="block mb-2 text-sm font-medium text-gray-100 dark:text-white">Email address</label>
                        <input type="email" value={email} onChange={(e)=> setEmail(e.target.value)}  id="email" className="bg-transparent  border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500" placeholder="john.doe@company.com" required/>
                        <p className='message-error'>{errors.email}</p>
                    </div> 

                    <div className="mb-6">
                        <label htmlFor="password"  className="block mb-2 text-sm font-medium text-gray-100 dark:text-white">Password</label>
                        <input type="password" value={password} onChange={(e)=> setPassword(e.target.value)} id="password" className="bg-transparent  border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500" placeholder="•••••••••" required/>
                        <p className='message-error'>{errors.password}</p>
                    </div> 

                    <div className="flex items-start mb-6">
                        <div className="flex items-center h-5">
                            <input id="remember" type="checkbox" value="" className="w-4 h-4 border border-gray-300 rounded bg-gray-50 focus:ring-3 focus:ring-blue-300 dark:bg-gray-700 dark:border-gray-600 dark:focus:ring-blue-600 dark:ring-offset-gray-800" required/>
                        </div>
                        <label htmlFor="remember" className="ml-2 text-sm font-medium text-gray-100 dark:text-gray-300">Remember me</label>
                    </div>
                    
                    <button type="submit" className="text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm w-full sm:w-auto px-5 py-2.5 text-center dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800">Login</button>
                    <p className='message-error'>{credentials}</p>
                    <div className="grid gap-6 mb-48 md:grid-cols-2"></div>
                    <div className="grid gap-6 mb-48 md:grid-cols-2"></div>
                </form>
            
        </div>
        </div>
        
    );
};

export default Login;