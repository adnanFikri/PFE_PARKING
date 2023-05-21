import React, { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from './axios';

const Logout = () => {
    const navigate = useNavigate();


    useEffect( () =>{
        const access_token = localStorage.getItem('access_token');

        if (!access_token) {
            return;
        }
        // setLoadingL(true);

        axios.post('api/logout', {}, {
            headers: {
                'Authorization': `Bearer ${access_token}`
            }
        })
            .then(response => {
                localStorage.removeItem('access_token');
                localStorage.setItem('logged_user', 'false');
                // window.location.reload();
                // console.log(localStorage.getItem('logged_user'));
                navigate('/');
                
                // window.location.reload();
            })
                .catch(error => {
                    console.error(error);
                    // setLoadingL(false);
                });
    });
    return (
        <div>
            logout...
        </div>
    );
};

export default Logout;