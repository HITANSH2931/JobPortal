import { faBookmark, faCircle, faClipboardList } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import React, { useState } from 'react'
import Searching from './Searching';
import { getTimeAgo } from './getTimeAgo';
import Pagination from './Pagination';
import { useEffect } from 'react';
import { getSalary } from './getSalary';
import { useDispatch,useSelector } from 'react-redux';
import { removeSavedJob, saved } from '../redux/UserRedux';
import { Link, useLocation } from 'react-router-dom';
import axios from 'axios';
import Notification from '../Notification';
import BASE_URL from './config';

const FindJob = () => {
    
    const saveJobs= useSelector((state) => state.authlogin.savedJobs);

    const l = useLocation();
    const title = l.state?.jobTitle
    const loca = l.state?.location

   
    
    const[jobTitle,setJobTitle] = useState(title ||'');
    const[jobType,setJobType] = useState('');
    const[experience,setExperience] = useState('');
    const[location,setLocation] = useState(loca || '');
    const[sort,SetSort] = useState('')
    const[salary,SetSalary] = useState('')

     console.log(salary)
    
    const[loading,setLoading] = useState(true);
    
    const[jobs,setJobs] = useState([])

    const[pageJobs,setPageJobs] = useState([]);
    const[pageNo,setPageNo] = useState(1);

    const dispatch = useDispatch();

    const token = useSelector((state) => state.authlogin.user?.token)
    console.log(token)

    useEffect(()=>{

    const getAllJobs = async () =>{

        try{
        const response = await axios.get(`${BASE_URL}/getAllJobs`,{

            headers:{
                Authorization:`Bearer ${token}`
            }
        })
    

        setJobs(response.data);
    }

    catch(error){

        console.log(error);
        
    }

    finally{

        setLoading(false);
    }

      
    }

    
    if(token) getAllJobs();

    },[])


     useEffect(() => {

     if (jobs.length > 0) {
     const initialPageJobs = jobs.slice(0, 8);
     setPageJobs(initialPageJobs);
     }
    }, [jobs]);
  
  
    const filteredJobs = pageJobs.filter((job) =>{

       return  (jobTitle ? job.jobTitle == jobTitle : true) &&
               (jobType ? job.jobType === jobType : true) &&
               (location ? job.location.startsWith(location) : true) &&
               (experience ? job.experience == experience : true) &&
               (salary ? job.salary == salary : true)
        
      }).sort((a,b) =>{
         
         if(!sort) return 0;
         else if(sort == "HIGH") return Number(b.salary)-Number(a.salary);
         else return Number(a.salary)-Number(b.salary);
      })
    
    const handleSave = async (job) =>{

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

    
       
    }
  }

  return (

    <div className='mx-10'>

      <Searching jobTitle={jobTitle} setJobTitle ={setJobTitle} jobType={jobType} setJobType={setJobType} experience={experience} setExperience={setExperience} location={location} setLocation={setLocation} sort={sort} SetSort={SetSort} salary={salary} SetSalary={SetSalary} />
    
    <div>
         {loading && <p className='text-mine-shaft-300 text-bold text-lg text-center'>Loading jobs taking too much time than expected  ......</p>}

        {!loading && filteredJobs.length == 0 && <img src="noJob.webp" className='h-[30%] w-[30%] mx-auto'/>}

    </div>

    <div className='grid sm:grid-cols-1 md:grid-cols-2 lg:grid-cols-3  xl:grid-cols-4 gap-7 font-display' >


        {filteredJobs.map((job,index) =>(

            <div key={index} className='flex flex-col gap-4 font-display bg-mine-shaft-900 rounded-lg  p-4 shadow-md shadow-mine-shaft-800 hover:border hover:border-bright-sun-300'>
                
                <div className='flex justify-between'>

                <div className='flex items-center gap-4'>
                    <img src={`/Icons/${job.company}.png`} className='h-8 w-8'/>
                    <div className='flex flex-col gap-1 '>
                        <p className='text-mine-shaft-50 text-[14px] font-semibold'>{job.jobTitle}</p>
                        <div className='flex  items-center gap-1.5'>
                        <p className='text-mine-shaft-400 text-[12px]'>{job.company}</p>
                        <FontAwesomeIcon icon={faCircle} className='text-[4px] text-mine-shaft-400'/>
                        <p className='text-mine-shaft-400 text-[12px]'>{job.totalApplications} applicants </p>
                        </div>
                        </div>
                </div>

                        <div>
                            <FontAwesomeIcon onClick={() => handleSave(job)} icon={faBookmark} 
                            className={`${saveJobs.some((ele) => ele?.jobId == job.id) ? 'text-green-500' : 'text-mine-shaft-500'}`}/>
                        </div>

                </div>


                    <div className='flex justify-between  flex-wrap  text-[13px] text-bright-sun-400'>
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

     <Pagination jobs={jobs} filteredJobs={filteredJobs}  pageNo={pageNo} setPageNo={setPageNo} setPageJobs={setPageJobs}/>

    </div>

    )
}

export default FindJob;
