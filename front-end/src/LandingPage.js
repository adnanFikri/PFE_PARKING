import React from 'react';
import { Link, Route, Routes, useParams } from 'react-router-dom';
import Home from './component/Home';
import AjoutStationnements from './component/AjoutStationnements';
import ChercherParking from './component/ChercherParking';
import ConsulterDepenses from './component/ConsulterDepenses';
import ServiceNombre from './component/ServiceNombre';
import ShowPage from './component/ShowPage';
import Register from './AUTH/Register';
import Login from './AUTH/Login';
import Example from './Navbar';
import Logout from './AUTH/Logout';
import Profile from './AUTH/Profile';
// import Register from './Register';

const LandingPage = () => {
    const id = useParams()
    return (
        <>
            <div >
                <Routes>
                    <Route path='/' element={<Home />}></Route>
                    <Route path='/ajoutStationnements' element={<AjoutStationnements />}></Route>
                    <Route path='/chercherParking' element={<ChercherParking />}></Route>
                    <Route path='/consulterDepenses' element={<ConsulterDepenses />}></Route>
                    <Route path='/serviceNombre' element={<ServiceNombre />} />
                    <Route path='/show/:id' element={<ShowPage />} />
                    <Route path='/register' element={<Register />} />
                    <Route path='/login' element={<Login />} />
                    <Route path='/logout' element={<Logout />} />
                    <Route path='/profile' element={<Profile />} />
                </Routes>

            </div>
        </>
    );
};

export default LandingPage;