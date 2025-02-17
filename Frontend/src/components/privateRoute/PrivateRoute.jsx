import React from 'react';
import { Outlet, Navigate } from 'react-router-dom';

const PrivateRoute = ()=>{
    const token = localStorage.getItem('token');
    return token? <Outlet/>: <Navigate to='/'/>
    // outlet is for inner routes so if i have the token then it will simply go to all inner routes 
}

export default PrivateRoute;
