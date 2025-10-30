import React from 'react'
import { useSelector } from 'react-redux';
import { getSalary } from '../getSalary'
import { getTimeAgo } from '../getTimeAgo'
import { useNavigate } from 'react-router-dom';

const SavedJobs = () => {

     const savedJobs = useSelector((state)=> state.authlogin.savedJobs);
     const navigate = useNavigate();

  return (

     <div className='mt-10'>

     {savedJobs.length  == 0 && <img src="noJob.webp" className='h-[30%] w-[30%] mx-auto'/>}

    {savedJobs.length != 0 &&
    <div className='grid sm:grid-cols-1 md:grid-cols-2 lg:grid-cols-3  xl:grid-cols-4 gap-7  mx-10' >
   
           {savedJobs.map((job,index) =>(
   
               <div key={index} className='flex flex-col gap-4 font-display bg-mine-shaft-900 rounded-lg  p-4 shadow-md shadow-mine-shaft-800 hover:border hover:border-bright-sun-300'>
                   
                   <div className='flex justify-between'>
   
                   <div className='flex items-center gap-4'>
                       <img src={`/Icons/${job.company}.png`} className='h-8 w-8'/>
                       <div className='flex flex-col gap-1 '>
                           <p className='text-mine-shaft-50 text-[14px] font-semibold'>{job.jobTitle}</p>
                           <div className='flex gap-1.5'>
                           <p className='text-mine-shaft-400 text-[12px]'>{job.company}</p>
                    
                           </div>
                           </div>
                   </div>        
   
                   </div>
   
   
                       <div className='flex flex-wrap justify-between gap-y-2.5 text-[13px] text-bright-sun-300'>
                           <p className='px-2 py-1 rounded-lg bg-mine-shaft-800'>{job.jobType}</p>
                           <p className='px-2 py-1 rounded-lg bg-mine-shaft-800'>{job.experience}</p>
                           <p className='px-2 py-1 rounded-lg bg-mine-shaft-800'>{job.location}</p>
                       </div>
   
                       <div>
                           <p className='text-[13px] text-mine-shaft-400'>{job.about}</p>
                       </div>
   
                       <div className='flex justify-between items-center'>
                           <p className='text-mine-shaft-200 text-[14px]'>{getSalary(job.salary)}</p>
                           <p className='text-mine-shaft-200 text-[12px]'>Saved {getTimeAgo(job.savedAt)}</p>
                       </div>
                        
                        <div className='text-[14px] flex justify-center'>
                        <button onClick={() => navigate("/viewJob",{state:{jobData:job}})} className=' text-mine-shaft-50 bg-bright-sun-500 hover:bg-bright-sun-600 rounded-lg px-1.5 py-1 w-full'>View Job</button>
                        </div>
                 
   
               </div>
           ))}

           </div>}

           </div>
  )
}

export default SavedJobs
