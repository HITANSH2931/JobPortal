import React from 'react'
import { useLocation } from 'react-router-dom'
import { useState } from 'react';
import Overview from './Overview';
import Applicant from './Applicant';
import { getTimeAgo } from '../getTimeAgo';
import { useEffect } from 'react';
import { useSelector } from 'react-redux';
import axios from 'axios';
import Offered from './Offered';
import Rejected from './Rejected';
import Accepted from './Accepted';
import Declined from './Declined';
import Active from './Active';
import Drafts from './Drafts';
import Closed from './Closed';

const SeeJob = () => {
  
    const[state,setState]  =useState("active");
    const[job,setJob] = useState(null);
   
    const activeJobs = useSelector((state) => state.info.active);
    const draftJobs = useSelector((state) => state.info.draft);
    const closedJobs = useSelector((state) => state.info.closed);

    useEffect(() =>{

     
    },[])

    

  return (
    <div className='mx-20 font-display mt-10 grid grid-cols-1 md:grid-cols-[20%_80%] gap-10'>

         <div className='flex flex-col gap-2'>

            <h1 className='text-mine-shaft-100 text-xl font-semibold ml-1.5'>Jobs</h1>

            <div className='flex flex-wrap gap-3 text-[15px]'>

                <button onClick={() => {setState("active"); setJob(null)}} className={` text-mine-shaft-100 rounded-md ${state == "active" ? 'bg-bright-sun-500' : 'bg-mine-shaft-800'} px-3 py-1`}>{`Active [${activeJobs.length}]`}</button>
                <button onClick={() => {setState("drafts"); setJob(null)}} className={` text-mine-shaft-100 rounded-md ${state =="drafts" ? 'bg-bright-sun-500' : 'bg-mine-shaft-800'} px-3 py-1`} >{`Drafts [${draftJobs.length}]`}</button>
                <button onClick={() => {setState("closed"); setJob(null)}} className={` text-mine-shaft-100 rounded-md ${state == "closed" ? 'bg-bright-sun-500' : 'bg-mine-shaft-800'} px-3 py-1`}>{`Closed [${closedJobs.length}]`}</button>

            </div>

             {state == "active" && <div className='flex flex-col gap-4 mt-5'>

                {activeJobs.length == 0 && <img src="Actives.png" className='h-56 w-56'/>}
                        
                        {activeJobs.map((job,index) =>(
                        
                          <div key={index}  onClick={() => setJob(job)} className='border-l-4 border-solid border-bright-sun-400 bg-mine-shaft-800 rounded-xl p-2 hover:bg-mine-shaft-900'>
                        
                         <h2 className='text-mine-shaft-50 text-[15px] font-semibold'>{job.jobTitle}</h2>
                         <h3 className='text-mine-shaft-200 text-[14px]'>{job.location}</h3>
                         <h5 className='text-mine-shaft-300 text-[13px]'>Posted {getTimeAgo(job.timeStamp)}</h5>

                          </div>
                          ))}
            </div>}

            {state == "drafts" && <div className='flex flex-col gap-4 mt-5'>

              {draftJobs.length == 0 && <img src="Draft.png" className='h-56 w-56'/>}
                        
                        {draftJobs.map((job,index) =>(
                        
                          <div key={index}  onClick={() => setJob(job)} className='border-l-4 border-solid border-bright-sun-400 bg-mine-shaft-800 rounded-xl p-2 hover:bg-mine-shaft-900'>
                        
                         <h2 className='text-mine-shaft-50 text-[15px] font-semibold'>{job.jobTitle}</h2>
                         <h3 className='text-mine-shaft-200 text-[14px]'>{job.location}</h3>
                         <h5 className='text-mine-shaft-300 text-[13px]'>Draft {getTimeAgo(job.timeStamp)}</h5>

                          </div>
                          ))}

                          </div>}

                {state == "closed" && <div className='flex flex-col gap-4 mt-5'>

                  {closedJobs.length == 0 &&  <img src="Closed.png" className='h-56 w-56'/>}
                        
                        {closedJobs.map((job,index) =>(
                        
                          <div key={index}  onClick={() => setJob(job)} className='border-l-4 border-solid border-bright-sun-400 bg-mine-shaft-800 rounded-xl p-2 hover:bg-mine-shaft-900'>
                        
                         <h2 className='text-mine-shaft-50 text-[15px] font-semibold'>{job.jobTitle}</h2>
                         <h3 className='text-mine-shaft-200 text-[14px]'>{job.location}</h3>
                         <h5 className='text-mine-shaft-300 text-[13px]'>Closed</h5>

                          </div>
                          ))}

                          </div>}              

       </div>

       {state == "active" && <Active job={job} state={state} setJob={setJob}/>} 
       {state == "drafts" && <Drafts job={job} state={state} setJob={setJob}/>}
       {state == "closed" && <Closed job={job} state={state} setJob={setJob}/>}
            
                
                             

   
    </div>
  )
}

export default SeeJob
