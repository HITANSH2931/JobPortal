import React from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { useNavigate } from 'react-router-dom';
import { enableLogout, logout } from './redux/UserRedux';
import { clearProfile } from './redux/Profile';
import { clearInfo } from './redux/JobInfo';

const Logout = ({setLogout}) => {

  const dispatch = useDispatch();
  const navigate = useNavigate();

  const email = useSelector((state) => state.authlogin.user?.email);

  const handleLogout = () =>{

    localStorage.removeItem("auth")
    localStorage.removeItem("profile")
    localStorage.removeItem("jobInfo");

    dispatch(logout());
    dispatch(clearProfile())
    dispatch(clearInfo());
    
    dispatch(enableLogout());

    setLogout(false);

    navigate("/login");
  }

  return (
    <div className='flex justify-center items-center fixed inset-0 backdrop-blur-xl  font-display'>

        <div className='shadow-md shadow-mine-shaft-600 bg-mine-shaft-100 max-w-sm  rounded-2xl'>

            
            <div className='p-14 flex flex-col gap-5'>

            <h1 className='text-mine-shaft-950 font-semibold text-2xl text-center'>Are you sure you want to logout ?</h1>
            <p className='text-mine-shaft-700  text-[16px] text-center'>Logout of Job Portal as {email}</p>
            
            <div onClick={() => handleLogout()} className='text-[14px] flex justify-center'><button className='w-full text-mine-shaft-50 bg-mine-shaft-900 hover:bg-mine-shaft-950 rounded-2xl p-1.5 font-bold '>Logout</button></div>
            <div onClick={() => {setLogout(false); dispatch(enableLogout())}} className='text-[14px] flex justify-center'><button className='w-full text-mine-shaft-950 bg-mine-shaft-100 hover:bg-mine-shaft-200 rounded-2xl p-1.5  border border-mine-shaft-300 font-bold'>Cancel</button></div>

            </div>
            
            

        </div>
      
    </div>
  )
}

export default Logout
