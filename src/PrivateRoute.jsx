import React, { useEffect } from 'react'
import { useSelector } from 'react-redux';
import { Outlet, useNavigate } from 'react-router-dom'

const PrivateRoute = () => {

    const navigate = useNavigate();
    const isAuthenticated = useSelector((state) => state.authlogin.isAuthenticated);

    useEffect(() =>{

        if(!isAuthenticated) navigate("/login")

    },[isAuthenticated])

  return <Outlet/>
}

export default PrivateRoute
