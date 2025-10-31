import React, { useEffect } from 'react'
import { useSelector } from 'react-redux'
import { getSalary } from '../getSalary';
import { getTimeAgo } from '../getTimeAgo';
import axios from 'axios'
import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import BASE_URL from '../config';

const Offered = () => {

  const[offeredJobs,setOfferedJobs] = useState([]);

  const navigate = useNavigate();

  const[loading,setLoading] = useState(true);

  const token = useSelector((state) => state.authlogin.user.token);

  useEffect(() =>{
   
  getJobs();
   
  },[])

   const getJobs = async () => {

    try{

        const response = await axios.get(`${BASE_URL}/getOfferedJobs`,{

            headers:{
                Authorization:`Bearer ${token}`
            }
        })

        setOfferedJobs(response.data);
    }

    catch(error){

        console.log(error);
    }

    finally{

        setLoading(false);
    }

}


  const acceptOffer = async (job) =>{
   
     try{
      
     const response = await axios.get(`${BASE_URL}/acceptOffer`,{

        params:{
            jobId:job.id
        },
        headers:{
            Authorization:`Bearer ${token}`
        }
      })
    }

    catch(error){

        console.log(error);
    }

    finally{

        getJobs();
    }
  }

     const rejectOffer = async (job) =>{

    try{

      const response = await axios.get(`${BASE_URL}/declineOffer`,{

        params:{
            jobId:job.id
        },
        headers:{
            Authorization:`Bearer ${token}`
        }
      })

    }

    catch(error){

        console.log(error);
    }

    finally{

        getJobs();
    }
  }


  return (

    <div>

         <div className='mt-10'>
                {loading && <p className='text-mine-shaft-300 text-bold text-lg text-center'>Loading offered jobs taking too much time than expected  ......</p>}
       
               {!loading && offeredJobs.length == 0 && <img src="noJob.webp" className='h-[30%] w-[30%] mx-auto'/>}
       
           </div>
     
         <div className='grid sm:grid-cols-1 md:grid-cols-2 lg:grid-cols-3  xl:grid-cols-4 gap-7 mt-10 mx-10' >
          
                  {offeredJobs.map((job,index) =>(
          
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
                                  <p className='text-mine-shaft-200 text-[12px]'>Offered {getTimeAgo(job.timestamp)}</p>
                                 
                              </div>
                               
                              

                               <div className='text-[13px] flex justify-around gap-2'>
                                 <button onClick={() => navigate("/viewJob",{state:{jobData:job}})} className=' text-mine-shaft-50 bg-bright-sun-500 hover:bg-bright-sun-600 rounded-lg px-2 py-1.5 '>View Job</button>
                                <button onClick={() => acceptOffer(job)} className=' text-mine-shaft-50 bg-bright-sun-500 hover:bg-bright-sun-600 rounded-lg px-2 py-1.5 '>Accept offer</button>
                                <button onClick={() => rejectOffer(job)} className=' text-mine-shaft-50 bg-bright-sun-500 hover:bg-bright-sun-600 rounded-lg px-2 py-1.5'>Decline offer</button>
                               </div>
                        
          
                      </div>
                  ))}
       
                  </div>

                  </div>
  )
}

export default Offered
