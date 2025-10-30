import React, { useEffect } from 'react'
import { useSelector } from 'react-redux'
import { Outlet, useNavigate } from 'react-router-dom';

const PublicRoute = () => {

    const isAuthenticated = useSelector((state) => state.authlogin.isAuthenticated);
    const navigate = useNavigate();

    useEffect(() =>{

        if(isAuthenticated) navigate("/")
        
    },[])

  return <Outlet/>
    
}

export default PublicRoute
