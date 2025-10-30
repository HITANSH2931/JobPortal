import { faChevronLeft, faTriangleExclamation } from '@fortawesome/free-solid-svg-icons'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import React from 'react'
import { Navigate, useNavigate } from 'react-router-dom'

const UnAuthorized = () => {

    const navigate = useNavigate();

  return (
    <div className='flex justify-center items-center h-[500px]'>

        <div className='font-display bg-mine-shaft-900 max-w-sm flex flex-col gap-5 py-9  px-2 rounded-lg'>

            <div className='flex justify-center items-center gap-1.5'>
            <FontAwesomeIcon icon={faTriangleExclamation} className='text-red-600 text-3xl'/>
            <h1 className='text-3xl text-red-600 text-center'>403</h1>
            </div>

            <h1 className='text-mine-shaft-100 text-xl text-center'>Unauthorized Access</h1>
            <p className='text-mine-shaft-300 text-[14px] text-center'>Sorry , you dont have permission to view this page due to Role Based Authorization</p>
           
             <div className=' text-[14px] mt-2 flex justify-center'>
        
            <button onClick={() => navigate("/")} className='bg-bright-sun-600 hover:bg-bright-sun-700 text-mine-shaft-100 text-center rounded-lg px-2.5 py-2'>
                <FontAwesomeIcon icon={faChevronLeft} className='text-mine-shaft-100'/>
                Go to Home Page</button>
            </div>

        </div>
      
    </div>
  )
}

export default UnAuthorized
