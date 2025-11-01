import React, { useEffect } from 'react'
import { useLocation, useNavigate } from 'react-router-dom'
import { getTimeAgo } from './getTimeAgo';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faBookmark, faBriefcase, faDollarSign, faLocation, faMoneyBill, faUserTie } from '@fortawesome/free-solid-svg-icons';
import { getSalary } from './getSalary';
import { Link } from 'react-router-dom';
import {useDispatch, useSelector} from'react-redux';
import { applied, saved } from '../redux/UserRedux';
import axios from 'axios';
import { useState } from 'react';
import BASE_URL from './config';

const ViewJob = () => {

    const saveJobs = useSelector((state) => state.authlogin.savedJobs)
    const appliedJobs = useSelector((state) => state.authlogin.appliedJobs)

    const token = useSelector((state) => state.authlogin.user?.token)
    const [save,setSave] = useState(false)

    const navigate = useNavigate();

    const dispatch = useDispatch();

    const location = useLocation();
    const job = location.state?.jobData;
    const jobs = location.state?.jobs;
  
   
    const filteredJobs = jobs.filter((ele) => ele.company == job.company && ele.jobTitle!=job.jobTitle && ele.id!=job.id).slice(0,3);

    const handleApply = async () =>{

        setSave(true);

        if(appliedJobs.some((ele) => ele.id == job.id)){

            setSave(false);
            return;
        }

        const response = await axios.post(`${BASE_URL}/applyJob`,{},{
            headers:{
                Authorization:`Bearer ${token}`
            },

            params:{
                jobId:job.id
            }
        })
     
        console.log(response.data)
        dispatch(applied(response.data));

        setSave(false);

    }

    const handleSave = async (job) =>{

    setSave(true);

     const savedJob = saveJobs.find((j) => j.jobId == job.id)

     if(savedJob){

        try{

         const response = await axios.post(`${BASE_URL}/handleRemoveSaveJob`,{},{

            params:{
                saveId:savedJob.id

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

        setSave(false);
      }
         dispatch(removeSavedJob(job));
     }

     else{
     try{

        const response = await axios.post(`${BASE_URL}/handleSaveJob`,{},{

            params:{
                jobId:job.id

            },

            headers:{
                Authorization:`Bearer ${token}`
            }
        })

        dispatch(saved(response.data))
     }

     catch(error){

        console.log(error);
     }

     finally{

        setSave(false);
     }
    }
  }

  return (
    <div className='mt-10 mx-20 font-display grid grid-cols-1 lg:grid-cols-[70%_30%]'>

        <div className='mr-10'>
 
          <div className='flex justify-between flex-wrap gap-y-5 border-b border-solid border-mine-shaft-800 pb-10'>         
          <div className='flex items-center gap-4 ml-5'>
                    <img src={`/Icons/${job.company}.png`} className='h-14 w-14'/>
                    <div className='flex flex-col gap-1 '>
                        <p className='text-mine-shaft-50 text-xl font-semibold '>{job.jobTitle}</p>
                        <div className='flex flex-wrap gap-1.5'>
                        <p className='text-mine-shaft-400 text-[14px]'>{job.company}</p>
                        <p className='text-mine-shaft-400 text-[14px]'>: {job.totalApplications} Applicants</p>
                        <p className='text-mine-shaft-400 text-[14px]'>: Posted {getTimeAgo(job.timestamp)}</p>
                        </div>
                    </div>
          </div>

          <div className='flex flex-col  items-center gap-4'>

            <button  disabled={save} onClick={() => handleApply(job)} 
            className={` font-semibold border border-solid ${appliedJobs?.some((ele) => ele.id == job.id) ? 'bg-green-800 text-mine-shaft-50' : 'text-bright-sun-400 hover:text-bright-sun-500'}  border-mine-shaft-800 rounded-xl px-4.5 py-1.5`}
            >{appliedJobs?.some((ele) => ele.id == job.id) ? 'Applied' : 'Apply'}</button>
            
          <button disabled={save}><FontAwesomeIcon  icon={faBookmark} onClick={() => handleSave()}
             className={`text-xl  ${saveJobs.some((ele) => ele?.jobId == job.id) ? 'text-green-500': 'text-mine-shaft-700'} `}/>
         </button>
          </div>
          </div>  

        <div className='grid  grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4  gap-y-10 gap-x-4 mt-15 border-b border-solid border-mine-shaft-800 pb-10'>

            <div className='flex flex-col  gap-1.5 '>
                <FontAwesomeIcon icon={faLocation} className=' text-2xl text-bright-sun-400'/>
                <p className='text-mine-shaft-200 text-[12px]'>Location</p>
                <p className='text-mine-shaft-100 text-[16px]'>{job.location}</p>
                
            </div>

            
            <div className='flex flex-col gap-1.5 '>
                <FontAwesomeIcon icon={faBriefcase} className='text-2xl text-bright-sun-400'/>
                <p className='text-mine-shaft-200 text-[12px]'>Experience</p>
                <p className='text-mine-shaft-100 text-[16px]'>{job.experience}</p>
                
            </div>

            
            <div className='flex flex-col gap-1.5 '>
                <FontAwesomeIcon icon={faDollarSign} className=' text-2xl text-bright-sun-400 '/>
                <p className='text-mine-shaft-200 text-[12px]'>Salary</p>
                <p className='text-mine-shaft-100 text-[16px]'>{getSalary(job.salary)}</p>
                
            </div>

            
            <div className='flex flex-col gap-1.5'>
                <FontAwesomeIcon icon={faUserTie} className='text-2xl text-bright-sun-400'/>
                <p className='text-mine-shaft-200 text-[12px]'>Job Type</p>
                <p className='text-mine-shaft-100 text-[16px]'>{job.jobType}</p>
                
            </div>
        </div>

        <div className='mt-15 flex flex-col gap-2.5 border-b border-solid border-mine-shaft-800 pb-10'>
            <h1 className='text-lg text-mine-shaft-50 font-semibold ml-1'>Required Skills</h1>
            
            <div className='flex flex-wrap gap-5'>
            {job.skills.map((skill,index)=>(

                <p key={index} className='text-bright-sun-400 hover:text-bright-sun-500 text-[14px] border border-solid rounded-4xl border-mine-shaft-800 px-3 py-2'>{skill}</p>

            ))}
            </div>
        </div>

        <div className='mt-15 flex flex-col gap-2.5 border-b border-solid border-mine-shaft-800 pb-10'>
            <h1 className='text-lg font-semibold text-mine-shaft-50'>About the job</h1>
            <p className='text-[13px] text-mine-shaft-300'>{job.about}</p>
        </div>

        <div className='mt-10 flex flex-col gap-4 border-b border-solid border-mine-shaft-800 pb-10'>
            <h1 className='text-lg font-semibold text-mine-shaft-50 '>About the company</h1>
           
           <div className='flex flex-wrap gap-y-5 justify-between'>
        
           <div className='flex items-center gap-3'>
              <img src={`Icons/${job.company}.png`} className='h-10 w-10 bg-mine-shaft-800 rounded-full p-2'/>
              <div className='flex flex-col gap-0.5'>
              <h3 className='text-mine-shaft-50 font-semibold text-lg'>{job.company}</h3>
              <p className='text-[13px] text-mine-shaft-300'>10 K + employees</p>
              </div>
           </div>

           <div className='text-[14px]'>
            <button onClick={() => navigate("/company",{state:{company:job.company}})}className='text-bright-sun-400 hover:text-bright-sun-500 bg-mine-shaft-800 px-4 py-1.5 rounded-lg'>Company page</button>
           </div>

        </div>  

          <div>
            <p className='text-[14px] text-mine-shaft-300'>Lorem ipsum dolor sit amet consectetur, adipisicing elit. Doloribus, consectetur a et excepturi id magnam libero. Aliquid rerum rem non, facilis sed qui, nulla eius labore voluptas repudiandae, repellendus necessitatibus asperiores ipsum cum quos. Tempore totam, repellendus perspiciatis rem itaque a doloremque est rerum, consequatur et, corrupti commodi laudantium eum architecto cum quaerat natus numquam autem quas aspernatur beatae error. Expedita nemo sapiente delectus pariatur ea voluptates iure, adipisci maiores amet natus saepe quia laborum perferendis rem nobis deleniti dignissimos quasi ex laboriosam voluptatibus sint eius ducimus error? Illum architecto culpa corrupti laudantium quasi sapiente, non vitae suscipit ad nam.</p>
          </div>

        </div>   

        
      
    </div>

       <div className='flex flex-col gap-5'>
        <h1 className='text-mine-shaft-50 text-xl font-semibold mt-10'>Recommended Jobs</h1>
       
        {filteredJobs.length == 0 && <p className='text-mine-shaft-200'>No More Jobs found</p>}

        <div className='grid grid-cols-1  gap-7 w-full'>
        {filteredJobs.map((job,index) =>(

            <div key={index} className='flex flex-col gap-4 font-display bg-mine-shaft-900 rounded-lg  p-4 shadow-md shadow-mine-shaft-800 hover:border hover:border-bright-sun-300'>
                
               

                <div className='flex items-center gap-4'>
                    <img src={`/Icons/${job.company}.png`} className='h-8 w-8'/>
                    <div className='flex flex-col gap-1 '>
                        <p className='text-mine-shaft-50 text-[14px] font-semibold'>{job.jobTitle}</p>
                        <div className='flex flex-wrap gap-1.5'>
                        <p className='text-mine-shaft-400 text-[12px]'>{job.company}</p>
                        <p className='text-mine-shaft-400 text-[12px]'>{job.totalApplications} applicants</p>
                        </div>
                        </div>
                </div>


                    <div className='flex justify-between flex-wrap gap-y-5 text-[13px] text-bright-sun-300'>
                        <p className='px-2 py-1 rounded-lg bg-mine-shaft-800'>{job.jobType}</p>
                        <p className='px-2 py-1 rounded-lg bg-mine-shaft-800'>{job.experience}</p>
                        <p className='px-2 py-1 rounded-lg bg-mine-shaft-800'>{job.location}</p>
                    </div>

                    <div>
                        <p className='text-[13px] text-mine-shaft-400'>{job.about}</p>
                    </div>

                    <div className='flex justify-between items-center'>
                        <p className='text-mine-shaft-200 text-[14px]'>{getSalary(job.salary)}</p>
                        <p className='text-mine-shaft-200 text-[12px]'>Posted {getTimeAgo(job.timestamp)}</p>
                    </div>
                     
                     <div className='text-[14px] flex justify-center'>
                     <Link 
                     state={{jobData:job,jobs:jobs}}
                     to="/viewJob" className='w-full'>
                     <button className=' text-mine-shaft-50 bg-bright-sun-500 hover:bg-bright-sun-600 rounded-lg px-1.5 py-1 w-full'>View Job</button>
                     </Link>
                     </div>
              

            </div>
        ))}

        </div>
         
         <div className='flex justify-center'>
           <Link to="/findJob"><p className='text-bright-sun-400 hover:text-bright-sun-500 font-semibold text-center border border-solid border-mine-shaft-800 px-3 py-2.5 rounded-lg'>Find more Jobs</p></Link>
         </div>
        </div>

    </div>
  )
}

export default ViewJob
