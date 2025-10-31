import React, { useState } from 'react'
import SkillJob from '../SkillJob'
import { useForm } from 'react-hook-form'
import { useDispatch, useSelector } from 'react-redux'
import axios from 'axios'
import { addEditedJobs } from '../../redux/JobInfo'
import BASE_URL from '../config';


const EditJob = ({job,skill,setisEdit}) => {

    const{register,handleSubmit,reset,formState:{errors}} = useForm({mode:'onChange', defaultValues:job})
    const [skills, setSkills] = useState(skill);
    const[skillerror,setSkillError] = useState('');

    const token = useSelector((state) => state.authlogin.user.token)
    const dispatch = useDispatch();

    console.log(skills)

    const submitForm  = async (data) =>{

          try{

        const response = await axios.post(`${BASE_URL}/editJob`,

          {

            ...data,skills
          },     
          {
           headers:{
            Authorization:`Bearer ${token}`
           }
        })
      }

      catch(error){

        console.log(error);
      }

      finally{

        dispatch(addEditedJobs({...data,skills}));
        setisEdit(false)


      }
    }

  return (
    <div className='font-display flex justify-center items-center fixed inset-0 backdrop-blur-xl'>

       <form onSubmit={handleSubmit(submitForm)} className=' w-[360px] bg-mine-shaft-950  md:mx-20 p-4 border border-solid border-mine-shaft-600 rounded-lg shadow-md shadow-mine-shaft-400'>
         
        <h1 className='text-mine-shaft-100 font-bold text-xl text-center col-span-2'>EDIT JOB</h1>
        
        <div className='grid grid-cols-1 md:grid-cols-2 gap-x-5 gap-y-7'>
        
         <div className='flex flex-col gap-2 text-[14px]'>
         <h1 className='text-mine-shaft-50 text-[16px] ml-2'>Job Type</h1>
         <select defaultValue = ""
         {...register('jobType',{required:'JobType is required'})}
         className='w-full bg-mine-shaft-950 text-mine-shaft-200  border border-solid border-mine-shaft-800 rounded-lg p-1.5 focus:outline-none'>
            
            <option value="" disabled>Select a job type</option>
            <option value="Part-Time">Part-Time</option>
            <option value="Full-Time">Full-Time</option>
            <option value="Internship">Internship</option>
            <option value="Freelancing">Freelancing</option>
         </select>

         {errors.jobType && <p className='text-red-500 text-[12px] ml-1.5'>{errors.jobType.message}</p>}
         </div>

          <div className='flex flex-col gap-2 text-[14px] '>
         <h1 className='text-mine-shaft-50 text-[16px] ml-2'>Job Title</h1>
         <select  defaultValue = ""
          {...register('jobTitle',{required:'JobTitle is required'})}
         className='w-full bg-mine-shaft-950 text-mine-shaft-200  border border-solid border-mine-shaft-800 rounded-lg p-1.5 focus:outline-none'>
            
            <option value="" disabled>Select a Job Title</option>
            <option value="Software-Engineer">Software-Engineer</option>
            <option value="Full Stack Developer">Full Stack Developer</option>
            <option value="Data Analyst">Data Analyst</option>
            <option value="AI Enginner">AI Enginner</option>
            <option value="Cloud Engineer">Cloud Engineer</option>
            <option value="Devops Engineer">Devops Engineer</option>
         </select>

           {errors.jobTitle && <p className='text-red-500 text-[12px] ml-1.5'>{errors.jobTitle.message}</p>}
         </div>

          <div className='flex flex-col gap-2 text-[14px] '>
         <h1 className='text-mine-shaft-50 text-[16px] ml-2'>Company</h1>
         <select  defaultValue  = "" 
          {...register('company',{required:'Company is required'})}
         className='w-full bg-mine-shaft-950 text-mine-shaft-200  border border-solid border-mine-shaft-800 rounded-lg p-1.5 focus:outline-none'>
            
            <option value="" disabled>Select Company</option>
            <option value="Google">Google</option>
            <option value="Amazon">Amazon</option>
            <option value="Meta">Facebook</option>
            <option value="Netflix">Netflix</option>
            <option value="Oracle">Oracle</option>
            <option value="Spotify">Spotify</option>
            <option value="Walmart">Walmart</option>
            <option value="Adobe">Adobe</option>
         </select>

          {errors.company && <p className='text-red-500 text-[12px] ml-1.5'>{errors.company.message}</p>}
         </div>


          <div className='flex flex-col gap-2 text-[14px] '>
         <h1 className='text-mine-shaft-50 text-[16px] ml-2'>Experience</h1>
         <select defaultValue = ""
         {...register('experience',{required:'Experience is required'})}
         className='w-full bg-mine-shaft-950 text-mine-shaft-200  border border-solid border-mine-shaft-800 rounded-lg p-1.5 focus:outline-none'>
            
            <option value="" disabled>Select Experience</option>
            
            <option value="Entry Level">Entry Level</option>
            <option value="Intermediate">Intermediate</option>
            <option value="Expert">Expert</option>
         </select>

          {errors.experience && <p className='text-red-500 text-[12px] ml-1.5'>{errors.experience.message}</p>}
         </div>


         <div className='flex flex-col gap-2 text-[14px] '>
          <h1 className='text-mine-shaft-50 text-[16px] '>Location</h1>
          <input 
          type="text" 
          className='w-full border border-solid p-1.5 rounded-lg border-mine-shaft-800  text-mine-shaft-200 focus:outline-none'
            {...register('location',{required:'Location is required'})}
          />

          {errors.location && <p className='text-red-500 text-[12px] ml-1.5'>{errors.location.message}</p>}
         </div>

          <div className='flex flex-col gap-2 text-[14px] '>
          <h1 className='text-mine-shaft-50 text-[16px] '>Salary</h1>
          <input 
          type="text" 
          className='w-full border border-solid p-1.5 rounded-lg border-mine-shaft-800  text-mine-shaft-200 focus:outline-none'
           {...register('salary',
           {required:'Salary is required',valueAsNumber:true,validate:(value) => !isNaN(value) || 'Please enter a valid numeric salary'
           ,min:{value:10000,message:'Salary must be at least ₹10,000'},max:{value:30000000,message: 'Salary cannot exceed ₹3 crore'}})}/>

           {errors.salary && <p className='text-red-500 text-[12px] ml-1.5'>{errors.salary.message}</p>}
         </div>

          
          <div className='flex flex-col gap-1 md:col-span-2'>
          <SkillJob skills={skills} setSkills={setSkills} setSkillError={setSkillError}/>
           {skillerror && <p className='text-red-500 text-[12px] ml-1.5'>Atleast one skill is required</p>}
          </div>
          
  
         <div className='flex flex-col gap-2 w-full text-[14px] md:col-span-2'>

          <h1 className='text-mine-shaft-100 text-[16px] '>About Job</h1>
          <textarea 
          className='border border-solid border-mine-shaft-800 w-full pl-2 pt-2 rounded-lg  text-mine-shaft-200 focus:outline-none '
          {...register('about',{required:'About the job is required',minLength:{value:20,message:'There must be atleast 20 Characters'}})}
          ></textarea>

          {errors.about && <p className='text-red-500 text-[12px] ml-1.5'>{errors.about.message}</p>}
       
           </div>


          <div className='text-[14px] flex justify-center gap-3 md:col-span-2'>        
           <button 
           className='text-mine-shaft-50 px-5 py-1.5 rounded-lg bg-bright-sun-500 hover:bg-bright-sun-600'>Submit</button>
            
            <button onClick={() => setisEdit(false)} className='text-mine-shaft-50 px-5 py-1.5 rounded-lg bg-red-500 hover:bg-red-600'>Cancel</button>
        
          </div> 


          </div> 

        
        
        </form>

      
    </div>
  )
}

export default EditJob
