import React from 'react'
import { useState } from 'react';
import axios from 'axios';
import { useDispatch, useSelector } from 'react-redux';
import { updateExperience } from '../../redux/Profile';
import { useForm } from 'react-hook-form';
import BASE_URL from './config';

const EditExper = ({experience,setExpIndex}) => {

    const dispatch = useDispatch();
    const token = useSelector((state) => state.authlogin.user.token)
    const[send,setSend] = useState(false);

    const {register,handleSubmit,reset,formState:{errors,isValid}} = useForm({mode:'onChange',defaultValues:experience});

    const handleSave = async (data) =>{

        setSend(true);

       
       try{
        const response = await axios.post(`${BASE_URL}/updateExp/${data.id}`,{
          ...data
          
        },{

            headers:{
              Authorization:`Bearer ${token}`
            }
          }
        )}

        catch(error){

          console.log(error);
        }

        finally{

        dispatch(updateExperience(data))

        setExpIndex(-1);

        setSend(false)

        }    
    }

    const handleCancel = (e) =>{

        e.preventDefault();
        setExpIndex(-1);
       
    }



  return (

    <form className='mt-3 font-display' onSubmit={handleSubmit(handleSave)}>

            <h1 className='text-mine-shaft-50 font-bold text-lg  mb-7'>Edit Experience</h1>
             
            <div className='grid grid-cols-1 sm:grid-cols-2 gap-4.5'>
            
            <div className='flex flex-col  text-[13px] gap-1.5'>
            <h1 className='text-mine-shaft-50 text-[16px] font-semibold'>Company</h1>
            <select  name="company"   {...register('company',{required:'Company is required'})}
        
         className='w-full bg-mine-shaft-950 text-mine-shaft-200  text-[12px] border border-solid border-mine-shaft-800 rounded-lg p-1.5 focus:outline-none'>
            
            <option value="" disabled>Select Company</option>
            <option value="Google">Google</option>
            <option value="Amazon">Amazon</option>
            <option value="Meta">Facebook</option>
            <option value="Netflix">Netflix</option>
            <option value="Oracle">Oracle</option>
            <option value="Spotify">Spotify</option>
            <option value="Walmart">Walmart</option>
            <option value="Pinterest">Pinterest</option>
         </select>

          {errors.company && <p className='text-red-500 text-[13px] ml-2'>{errors.company.message}</p>}

            </div>

        <div className='flex flex-col gap-2 text-[13px] '>
         <h1 className='text-mine-shaft-50 text-[16px] ml-2 font-semibold'>Job Title</h1>
         <select   name="jobTitle"   {...register('jobTitle',{required:'jobTitle is required'})}
         className='w-full bg-mine-shaft-950 text-mine-shaft-200  border border-solid border-mine-shaft-800 rounded-lg p-1.5 focus:outline-none'>
            
            <option value="" disabled>Select a Job Title</option>
            <option value="Software-Engineer">Software-Engineer</option>
            <option value="Full Stack Developer">Full Stack Developer</option>
            <option value="Data Analyst">Data Analyst</option>
            <option value="AI Enginner">AI Enginner</option>
            <option value="Cloud Engineer">Cloud Engineer</option>
            <option value="Devops Engineer">Devops Engineer</option>
         </select>

        {errors.jobTitle && <p className='text-red-500 text-[13px] ml-2'>{errors.jobTitle.message}</p>}

    </div>

    
         <div className='flex flex-col gap-2 text-[13px] sm:col-span-2'>
          <h1 className='text-mine-shaft-50 text-[16px] font-semibold '>Location</h1>
          <input 
          type="text"  name="location"    {...register('location',{required:'Location is required'})}
          className='w-full border border-solid p-1.5 rounded-lg border-mine-shaft-800  text-mine-shaft-200 focus:outline-none'
           
          />

        {errors.location && <p className='text-red-500 text-[13px] ml-2'>{errors.location.message}</p>}


          </div>

          <div className='flex flex-col gap-2 sm:col-span-2 text-[13px]'>
            <h1 className='text-mine-shaft-50 text-[16px] font-semibold'>Summary</h1>
            <textarea   name="summary" className='border border-solid border-mine-shaft-800 rounded-lg px-1.5 py-1 text-mine-shaft-200 focus:outline-none'
             {...register('summary',{required:'Summary is required'})}
            >
                
            </textarea>

          {errors.summary && <p className='text-red-500 text-[13px] ml-2'>{errors.summary.message}</p>}

          </div>

          <div className='flex flex-col gap-2 text-[14px]'>
            <h2 className='text-mine-shaft-50 font-semibold text-[16px]'>Start Date</h2>
            <input type="month"  name="startDate" className='border border-solid text-mine-shaft-200 border-mine-shaft-800 px-1.5 py-1 rounded-lg'
            {...register('startDate',{required:'Start Date is required'})}
           
            />

            {errors.startDate && <p className='text-red-500 text-[13px] ml-2'>{errors.startDate.message}</p>}

          </div>

           <div className='flex flex-col gap-2 text-[14px]'>
            <h2 className='text-mine-shaft-50 font-semibold text-[16px] '>End Date</h2>
            <input type="month" name="endDate" className='border border-solid text-mine-shaft-200 border-mine-shaft-800 px-1.5 py-1 rounded-lg'
             {...register('endDate',{required:'End Date is required'})}
           
            />
            {errors.endDate && <p className='text-red-500 text-[13px] ml-2'>{errors.endDate.message}</p>}

          </div>
     </div>
     
     <div className='flex gap-3 mt-4 font-display text-[14px]'>
     <button disabled={send} className={`text-bright-sun-400 bg-mine-shaft-800 hover:text-bright-sun-500  hover:bg-mine-shaft-900 rounded-xl px-2.5 py-2 ${send ? 'cursor-not-allowed' : ''}`}>Save</button>
     <button type="button" onClick={(e) => handleCancel(e)} className='text-red-500 bg-mine-shaft-800 hover:text-red-600 hover:bg-mine-shaft-900 rounded-xl px-2.5 py-2'>Cancel</button>
     </div>
   

    </form>

  )
}

export default EditExper;
