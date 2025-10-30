import React from 'react'
import Overview from './Overview'
import Applicant from './Applicant'
import { useState } from 'react'
import { useEffect } from 'react'

const Closed = ({job,state,setJob}) => {

  const[status,setStatus] = useState("overview");

   useEffect(() =>{
  
        setStatus("overview");
         
   },[job])


  return (
    <div>

         {job && <div >
                                        
               <div className='flex flex-col gap-1.5'>
                                
                 <div className='flex  gap-2'>
                 <h1 className='text-xl text-mine-shaft-50 font-bold'>{job.jobTitle}</h1>
                       <p className='text-bright-sun-400 rounded-full bg-mine-shaft-800 px-2 py-1 text-[13px]'>Active</p>
                    </div>
                                
                     <div>
                               <p className='text-[14px] text-mine-shaft-200'>{job.location}</p>
                      </div>
                                       
                    </div>
                                
                        <div className='flex flex-wrap gap-7 text-mine-shaft-50 font-bold text-xl mt-13 border-b border-solid border-mine-shaft-800 pb-7'>
                           
                          <h1 onClick={()=> setStatus("overview")} className={`${status == "overview" ? 'text-bright-sun-400 hover:text-bright-sun-500' : ''}`}>Overview</h1>
                          <h1 onClick={()=> setStatus("applicant")}  className={`${status == "applicant" ? 'text-bright-sun-400  hover:text-bright-sun-500' : ''}`}>Applicants</h1>
                                        
                                                
                        </div>
                                
                           {status == "overview" && <Overview job={job} state={state} setJob={setJob}/>}
                           {status == "applicant" && <Applicant job={job}/>}              
                                
                       </div>
            }     
      
    </div>
  )
}

export default Closed
