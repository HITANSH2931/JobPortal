import React, { useState } from 'react'
import { Link, useNavigate } from 'react-router-dom';
import { UserProfiles } from './UserProfiles';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faLocation } from '@fortawesome/free-solid-svg-icons';
import Pagination from '../Pagination';
import { useEffect } from 'react';
import { useSelector } from 'react-redux';


const TalentCard = ({name,location,title,skill}) => {

     
     const navigate = useNavigate();

     const users = UserProfiles();
     console.log(users);

      const[pageJobs,setPageJobs] = useState([]);
      const[pageNo,setPageNo] = useState(1);

        useEffect(() => {
      
           if (users?.length > 0) {
           const initialPageUsers = users.slice(0, 8);
           setPageJobs(initialPageUsers);
           }
          }, [users]);
        

     const filteredProfiles = pageJobs.filter((profile,index) =>(

       (name ? profile.name.startsWith(name) : true) &&
       (location ? profile.profileDto?.location.startsWith(location) : true) &&
       (title ? profile.profileDto?.jobTitle == title : true) &&
       (skill ? profile.profileDto?.skills.some((s) => s.startsWith(skill)) : true)
     ))

  return (

    <div className='mt-15 font-display'>

        {filteredProfiles.length == 0 &&  <img src="Users.png" className='h-96 w-96 mx-auto'/>}

       
    <div className='grid  grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-7'>

         
        {filteredProfiles?.map((user,index) =>(

        <div key={index} className=' flex flex-col gap-4 bg-mine-shaft-900 rounded-lg p-4 shadow-md shadow-mine-shaft-800 hover:border hover:border-bright-sun-400'>
        <div className='flex items-center gap-2.5'>
            <img src="avatar.png" className='h-12 w-12 rounded-full'/>
            <div className='flex flex-col gap-1'>
                <p className='font-semibold text-mine-shaft-100'>{user.name}</p>

                <div className='flex gap-1 text-mine-shaft-300 text-[12px]'>
                   
                   {user.profileDto?.jobTitle && <p>{user.profileDto?.jobTitle}</p>}
                    
                    {user.profileDto?.company &&  <p className='text-[15px]'>·</p>}
                    
                    {user.profileDto?.company && <p>{user.profileDto?.company}</p>}

                    

                </div>
            </div>
        </div>

        <div className='flex justify-between'>
           
          {user.profileDto?.experience && <p className='text-mine-shaft-300 text-[12px]'>{`Experience ${user.profileDto?.experience}`} years</p>}

          {user.profileDto?.location &&  <div className='flex items-center gap-2'>

            <FontAwesomeIcon icon={faLocation} className='text-mine-shaft-300 text-sm'/>
            <p className='text-mine-shaft-300 text-[12px]'>{user.profileDto?.location}</p>

           </div>}

        </div>

        <div className='flex justify-between flex-wrap gap-y-2'>

            {user.profileDto?.skills.slice(0,4).map((skill,index) =>(
                
                <div className='text-[13px]'>
                <p className='text-bright-sun-400 bg-mine-shaft-800 rounded-lg px-2 py-1'>{skill}</p>
                </div>

            ))}
              
            
        </div>

        <div>
            <p className='text-[13px] text-mine-shaft-400 line-clamp-2'>{user.profileDto?.about}</p>
        </div>

        <div className='flex justify-around gap-9 text-[14px]'>
           
         <button onClick={() => navigate("/profilePage",{state:{user:user}})} className='bg-bright-sun-500 text-mine-shaft-50 px-2.5 py-1 rounded-lg w-full hover:bg-bright-sun-600'>Profile</button>
         <button onClick={() => navigate("/messaging",{state:{userName:user.name}})} className='bg-bright-sun-500 text-mine-shaft-50 px-2.5 py-1 rounded-lg w-full hover:bg-bright-sun-600'>Message</button>
        
        </div>

        </div>

        ))}
      
    </div>

    <Pagination jobs={users} filteredJobs={filteredProfiles}  pageNo={pageNo} setPageNo={setPageNo} setPageJobs={setPageJobs}/>

    </div>
  )
}

export default TalentCard
