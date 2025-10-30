import { faBriefcase, faLocation, faUserClock } from '@fortawesome/free-solid-svg-icons'
import React from 'react'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import Skills from './Skills'
import About from './About'
import { useLocation } from 'react-router-dom'
import Experience from './Experience'
import Certifcate from './Certifcate'

const ProfilePage = () => {

    const location = useLocation();

    const {user} = location.state;
      
  return (
    <div className='mx-20 mt-15 font-display'>
        
        <div className='relative'>
            <img src="banner.jpg" className='h-32 w-full rounded-xl'/>
            <img src="avatar.png" className='h-32 w-32 rounded-full absolute top-8 left-9 border-4 border-solid border-black'/>
        </div>

        
        <h1 className='text-mine-shaft-50 text-2xl font-bold mt-13'>{user.name}</h1>
        

        <div className=' flex flex-col gap-1.5 mt-0.5 border-b border-solid border-mine-shaft-800 pb-10'>
             <div className='flex items-center gap-1.5 text-[14px] text-mine-shaft-200'>

               {user.profileDto?.jobTitle &&  <div className='flex items-center gap-2'>
                  
               <FontAwesomeIcon icon={faBriefcase} className='text-[15px]'/>
                <p>{user.profileDto?.jobTitle}</p>
                
                <span>•</span>
                 
                 </div>
                 }
                
                {user.profileDto?.company && <p>{user.profileDto?.company}</p>}
             </div>

            {user.profileDto?.location && <div className='text-[13px] text-mine-shaft-300 flex items-center gap-1.5'>
                <FontAwesomeIcon icon={faLocation} className='text-[14px]'/>
                <p>{user.profileDto?.location}</p>      
             </div>}

             {user.profileDto?.experience && <div className='text-[12px] text-mine-shaft-300 flex items-center gap-2'>
                  <FontAwesomeIcon icon={faUserClock} className='text-[13px]'/>
                   <p>Experience {user.profileDto?.experience} years</p>      
             </div>}

        </div>

        <Skills skills={user.profileDto?.skills}/>

       <About about={user.profileDto?.about}/>

       <Experience experienceList={user.profileDto?.exp}/>

       <Certifcate certificateList={user.profileDto?.certificates}/>

      
    </div>
  )
}

export default ProfilePage
