import './css/home.css'
import { useEffect, useState  } from 'react';
import axios from '../AUTH/axios';
import { useNavigate, Link, useLocation } from 'react-router-dom';

function LoggedUser() {
    const [user, setUser] = useState(null);
    const [loading, setLoading] = useState(true);
    const [loadingL, setLoadingL] = useState(false);
    const navigate = useNavigate();
    const location = useLocation()

    useEffect(() => {
        const access_token = localStorage.getItem('access_token');
        
        if (!access_token) {
            setLoading(false);
            return;
        }

        axios.get('api/user', {
            headers: {
                'Authorization': `Bearer ${access_token}`
            }
        })
        .then(response => {
            console.log(response);
            // localStorage.setItem('logged_user', true);
            // console.log(localStorage.getItem('logged_user'));
            setUser(response.data.user);
            setLoading(false);

        })
        .catch(error => {
            console.error(error);
            setLoading(false);
        });
    }, [location]);
// -=-=-=-=-=-=-=- LOGGED OUT -=-=-=-=-=-=-=-=
const handleLogout = async () => {
        const access_token = localStorage.getItem('access_token');
        // console.log('token from logout : '+access_token);
        if (!access_token) {
            return;
        }
        setLoadingL(true);

        axios.post('api/logout', {}, {
            headers: {
                'Authorization': `Bearer ${access_token}`
            }
        })
            .then(response => {
                localStorage.removeItem('access_token');
                localStorage.setItem('logged_user', 'false');
                navigate('/login');
                window.location.reload();
            })
                .catch(error => {
                    console.error(error);
                    setLoadingL(false);
                });
};

    if (loading) {
        return <p>Loading user details...</p>;
    }

    if (!user) {
        return (
            <div>
                <p>Not logged in.</p>
                <Link to="/login" >Login</Link>
            </div>
        );
    }

    return (
        <div className='contain'>
            <h1>Logged In User Details</h1>
            <p>Name: {user.firstName}</p>
            <p>Email: {user.email}</p>
            <button className='btn-logout' onClick={handleLogout} disabled={loadingL} >Logout</button>
        </div>
    );
}

export default LoggedUser;
