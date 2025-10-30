import React, { useEffect } from 'react'
import { getTimeAgo } from '../getTimeAgo'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faBriefcase, faCircle, faDollarSign, faLocation, faUserTie } from '@fortawesome/free-solid-svg-icons'
import { getSalary } from '../getSalary'
import { useNavigate } from 'react-router-dom'
import EditJob from './EditJob'
import { useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { addClosedJobs, addOpenJobs, removeDraftJobs } from '../../redux/JobInfo'
import axios from 'axios'


const Overview = ({job,state,setJob}) => {

    const navigate = useNavigate();
    const[isEdit,setisEdit] = useState(false);

    const dispatch = useDispatch();
    const token = useSelector((state) => state.authlogin.user.token);

    const[applicants,setApplicants] = useState(0);

    useEffect(() =>{

      if(state == "active"){

        const getApplicantsCount  = async () =>{

          try{

              const response = await axios.get("http://localhost:8080/totalApplicants",{

                params:{
                  jobId:job.id
                },
                headers:{

                  Authorization:`Bearer ${token}`
                }

              })

              setApplicants(response.data);
          }

          catch(error){

            console.log(error)
          }

          
      }
      getApplicantsCount();

    }


    },[job])

    const getJobStatus = () =>{

      switch(state){

        case 'active' : return `Posted ${getTimeAgo(job.timeStamp)}`

        case 'drafts' : return  `Draft ${getTimeAgo(job.timeStamp)}`

        case 'closed' : return `Closed ${getTimeAgo(job.closedAt)}`

        default: return ''
      }
    }

    const handleClosedJob = async () =>{

      try{

        const response = await  axios.get("http://localhost:8080/closeJob",{

           params:{
             
            jobId:job.id
           },
           headers:{
            Authorization:`Bearer ${token}`
           }
        })

        dispatch(addClosedJobs(response.data));
      }

      catch(error){

        console.log(error);
      }

      setJob(null)
    
    }

    const handleOpenJob = async () =>{

        try{

        const response = await axios.get("http://localhost:8080/openJob",{

           params:{
             
            jobId:job.id
           },
           headers:{
            Authorization:`Bearer ${token}`
           }
        })

        dispatch(addOpenJobs(response.data));
      }

      catch(error){

        console.log(error);
      }

        
        setJob(null);
    }

    const handlePublishDraftJob = async () =>{

      try{

        const response = await axios.get("http://localhost:8080/publishDraftJob",{

          params:{
            draftId:job.id
          },
          headers:{
            Authorization:`Bearer ${token}`
          }
        })

        dispatch(removeDraftJobs(response.data));
      }

      catch(error){

        console.log(error);
      }
    }

  return (
    <div>     

        <div className='flex gap-y-3  [@media(min-width:300px)]:flex-col [@media(min-width:600px)]:flex-row [@media(min-width:600px)]:justify-between mt-10 border-b border-solid border-mine-shaft-800 pb-10'>

        <div className='flex items-center gap-5 '>
            <img src={`/Icons/${job.company}.png`} className='h-16 w-16 bg-mine-shaft-800 rounded-2xl p-2'/>

            <div className='flex flex-col gap-1.5'>
                <h3 className='font-semibold text-mine-shaft-50 text-xl'>{job.jobTitle}</h3>
                 
                 <div className='flex flex-wrap items-center gap-1'>
                  <p className='text-mine-shaft-300 text-[13px]'>{job.company}</p>
                  <FontAwesomeIcon icon={faCircle} className='text-[4px] text-mine-shaft-400'/>
                  <p className='text-mine-shaft-300 text-[13px]'>{getJobStatus()}</p>

                  {state == 'active' && <>
                  <FontAwesomeIcon icon={faCircle} className='text-[4px] text-mine-shaft-400'/>
                  <p className='text-mine-shaft-300 text-[13px]'>{applicants} applicant</p>
                   </>}
                  
                </div>

            </div>
        </div>

        <div className='flex flex-col gap-3 text-[15px]'>
            
            {state == 'active' ? <>
            <button onClick={() => setisEdit(true)} className='text-bright-sun-400 hover:text-bright-sun-500 bg-mine-shaft-800 px-5 py-1 rounded-lg '>Edit</button>
            <button onClick={() => handleClosedJob()} className='text-red-400 hover:text-red-500 bg-mine-shaft-800 px-5 py-0.5 rounded-lg '>Close</button>
            </> :
             state == 'closed' ? 
             <div>

              <button onClick={() => handleOpenJob()} className='text-blue-300 hover:text-blue-400 bg-mine-shaft-800 px-5 py-1.5 rounded-lg '>Open</button>

             </div> : <div>

                      <button onClick={() => handlePublishDraftJob()} className='text-blue-300 hover:text-blue-400 bg-mine-shaft-800 px-5 py-1.5 rounded-lg '>Publish Job</button>
              
                    </div>}

        
        </div>

        </div>


          <div className='grid  grid-cols-2 md:grid-cols-3 lg:grid-cols-4  gap-y-10 gap-x-4 mt-10 border-b border-solid border-mine-shaft-800 pb-10'>
        
                    <div className='flex flex-col  gap-1.5 '>
                        <FontAwesomeIcon icon={faLocation} className=' text-2xl text-bright-sun-400'/>
                        <p className='text-mine-shaft-200 text-[12px]'>Location</p>
                        <p className='text-mine-shaft-100 text-[16px]'>{job.location}</p>
                        
                    </div>
        
                    
                    <div className='flex flex-col gap-1.5 '>
                        <FontAwesomeIcon icon={faBriefcase} className=' text-2xl text-bright-sun-400'/>
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


            <div className='mt-10 flex flex-col gap-3.5 border-b border-solid border-mine-shaft-800 pb-10'>
             <h1 className='text-lg text-mine-shaft-50 font-semibold ml-2.5'>Required Skills</h1>
            
            <div className='flex flex-wrap gap-5'>
            {job.skills?.map((skill,index)=>(

                <p key={index} className='text-bright-sun-400 hover:text-bright-sun-500 text-[14px] border border-solid rounded-4xl border-mine-shaft-800 px-3 py-2'>{skill}</p>

            ))}
            </div>
        </div>


          <div className='mt-10 flex flex-col gap-2.5 border-b border-solid border-mine-shaft-800 pb-10'>
            <h1 className='text-lg font-semibold text-mine-shaft-50'>About the job</h1>
            <p className='text-[14px] text-mine-shaft-300 '>{job.about}</p>
        </div>   

          
         <div className='mt-10 flex flex-col gap-4 border-b border-solid border-mine-shaft-800 pb-10'>
            <h1 className='text-lg font-semibold text-mine-shaft-50'>About the company</h1>
           
           <div className='flex flex-wrap gap-y-5 justify-between'>
        
           <div className='flex  items-center gap-3'>
              <img src={`Icons/${job.company}.png`} className='h-10 w-10 bg-mine-shaft-800 rounded-full p-2'/>
              <div className='flex flex-col gap-0.5'>
              <h3 className='text-mine-shaft-50 font-semibold text-lg'>{job.company}</h3>
              <p className='text-[13px] text-mine-shaft-300'>10 K + employees</p>
              </div>
           </div>

           <div className='text-[14px]'>
            <button  onClick={() => navigate("/company",{state:{company:job.company}})}className='text-bright-sun-400 hover:text-bright-sun-500 bg-mine-shaft-800 px-4 py-1.5 rounded-lg'>Company page</button>
           </div>

        </div>  

          <div>
            <p className='text-[14px] text-mine-shaft-300'>Lorem ipsum dolor sit amet consectetur, adipisicing elit. Doloribus, consectetur a et excepturi id magnam libero. Aliquid rerum rem non, facilis sed qui, nulla eius labore voluptas repudiandae, repellendus necessitatibus asperiores ipsum cum quos. Tempore totam, repellendus perspiciatis rem itaque a doloremque est rerum, consequatur et, corrupti commodi laudantium eum architecto cum quaerat natus numquam autem quas aspernatur beatae error. Expedita nemo sapiente delectus pariatur ea voluptates iure, adipisci maiores amet natus saepe quia laborum perferendis rem nobis deleniti dignissimos quasi ex laboriosam voluptatibus sint eius ducimus error? Illum architecto culpa corrupti laudantium quasi sapiente, non vitae suscipit ad nam.</p>
          </div>

        </div> 


        {isEdit && <EditJob job={job} skill={job.skills} setisEdit={setisEdit}/>}


      
    </div>
  )
}

export default Overview
