import { faBuilding, faIndustry, faLocation } from '@fortawesome/free-solid-svg-icons'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import React from 'react'
import { AvatarGroup } from '@mantine/core'
import { Avatar } from '@mantine/core'
import CompanyInfo from './CompanyInfo'
import { useState } from 'react'
import SimilarCompanies from './SimilarCompanies'
import Jobs from './Jobs'
import Employee from './Employee'
import { useLocation } from 'react-router-dom'

const Company = () => {

  const[status,setStatus]  = useState("about");
  const location = useLocation();
  const company = location.state?.company;

  return (
    <div className='mx-10 mt-15 font-display grid grid-cols-1 gap-y-8 md:grid-cols-[80%_20%]'>

      <div className='mr-10'>

         <div className='relative'>
            <img src="banner.jpg" className='h-32 w-full rounded-xl'/>
            <img src={`/Icons/${company}.png`} className='h-32 w-32  absolute top-8 left-9 bg-mine-shaft-900 rounded-4xl p-2'/>
        </div>

        <div className='flex justify-between items-center mt-13'>

        <div className='flex flex-col gap-2'>

        <div className='flex items-center gap-2'>
        <FontAwesomeIcon  icon={faBuilding} className='text-mine-shaft-50 text-xl'/>
        <h1 className='text-mine-shaft-50 text-xl font-bold text'>{company}</h1>
        </div>

        <div className='flex items-center gap-2'>
        
        <FontAwesomeIcon icon={faLocation} className='text-lg text-mine-shaft-300'/>
        <p className='text-mine-shaft-300 text-[14px]'>New York , United States</p>
        
        </div>
        
       </div>

       <div>
         <Avatar.Group >
                         <Avatar src= "avatar.png" />
                         <Avatar src= "avatar1.png"  />
                         <Avatar src= "avatar2.png" />
                        <Avatar color="white" style={{
            backgroundColor: '#4f4f4f'}}>+10K</Avatar>
                    </Avatar.Group>
       </div>

       </div>


       <div className='flex gap-3.5 mt-10 text-xl font-bold border-b border-solid border-mine-shaft-800 pb-5'>
        <div onClick={() => setStatus("about")} className={` ${status == "about" ? 'text-bright-sun-500 hover:text-bright-sun-600' : 'text-mine-shaft-300 hover:text-mine-shaft-400'}`}>About</div>
        <div onClick={() => setStatus("jobs")} className={` ${status == "jobs" ? 'text-bright-sun-500 hover:text-bright-sun-600' : 'text-mine-shaft-300 hover:text-mine-shaft-400'}`}>Jobs</div>
        <div onClick={() => setStatus("employees")} className={` ${status == "employees" ? 'text-bright-sun-500 hover:text-bright-sun-600' : 'text-mine-shaft-300 hover:text-mine-shaft-400'}`}>Employee</div>
       </div>

       {status == "about" && <CompanyInfo/>}
       {status == "jobs" && <Jobs/>}
       {status == "employees" && <Employee/>}

       </div>

       <div>
        <SimilarCompanies/>
       </div>
      
    </div>
  )
}

export default Company
