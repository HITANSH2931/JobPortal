import { faEdit, faFloppyDisk, faPlus, faTrash } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import React from 'react'
import { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { addExperience, deleteExperience } from '../../redux/Profile';
import EditExper from './EditExper';
import axios from 'axios';
import { useForm } from 'react-hook-form';
import BASE_URL from '../config';

const Experience = () => {

    const[edit,setEdit] = useState(false);
    const[edit1,setEdit1] = useState(false);

    const[send,setSend] = useState(false);

    const[expIndex,setExpIndex] = useState(-1);

     const {register,handleSubmit,reset,formState:{errors,isValid}} = useForm({mode:'onChange'});
      

    const dispatch = useDispatch();
    
    const experienceList = useSelector((state) => state.profile.experienceList);
    const token = useSelector((state) => state.authlogin.user.token)

    const handleChange = (data) =>{


      console.log(data);

     
    }

    const handleSave = async (data) =>{

      setSend(true)

      console.log(data)

      const response = await axios.post(`${BASE_URL}/addExp`,{
        ...data
      },{
        headers:{
          Authorization:`Bearer ${token}`
        }
      })


      dispatch(addExperience(response.data))

      setEdit(false);

      setSend(false)

      reset();

    }

    const handleDelete = async (exp) =>{

      try{
           
          const response = await axios.post(`${BASE_URL}/deleteExp/${exp.id}`,{},{

            headers:{
              Authorization:`Bearer  ${token}`
            }
          })
      }

      catch(error){

        console.log(error);
      }

      dispatch(deleteExperience(exp));
        
    }

  return (
    <div className='mt-10 font-display'>
         
        <div className='flex justify-between mb-6'>
        <h1 className='text-mine-shaft-50 font-bold text-xl '>Experience</h1>

        <div className='flex gap-4'>
        
        {!edit1 ? 
        (<FontAwesomeIcon icon ={faEdit} onClick={() => setEdit1(!edit1)} className='text-bright-sun-400 text-xl'/>) :
        (<FontAwesomeIcon icon ={faFloppyDisk} onClick={() => setEdit1(!edit1)} className='text-bright-sun-400 text-xl'/>)
      
      }
        <FontAwesomeIcon icon={faPlus}  onClick={() => setEdit(!edit)} className='text-bright-sun-400 text-xl' />

        </div>
        </div>

        {experienceList.length == 0 && <p className='text-mine-shaft-200 text-md'>No experience added yet</p>}

        <div className='flex flex-col gap-6'>

        {
            experienceList?.map((exp,index) => (

              <div>

                {expIndex == index ? (<EditExper experience={exp} setExpIndex={setExpIndex}/>) :

               ( <div>
                <div className='flex flex-col gap-4 bg-mine-shaft-900  px-3 py-3.5 rounded-lg'>

                <div className='flex flex-wrap  gap-y-4 justify-between items-center'>
                <div className='flex items-center gap-3.5'>
                    <img src={`Icons/${exp.company}.png`} className='h-12 w-12 rounded-full p-2.5 bg-mine-shaft-700'/>
                    <div className='flex flex-col gap-0.5'>
                        <h2 className='text-mine-shaft-50 font-semibold'>{exp.jobTitle}</h2>
                        <div className='flex gap-2'>
                            <p className='text-mine-shaft-200 text-[13px]'>{exp.company}</p>
                            <p className='text-mine-shaft-200 text-[13px]'>{exp.location}</p>
                        </div>
                    </div>
                </div>

                 <div className='flex gap-2'>
                  <p className='text-mine-shaft-200 text-[15px]'>{exp.startDate}</p>
                  <p className='text-mine-shaft-200 text-[15px]'>-</p>
                  <p className='text-mine-shaft-200 text-[15px]'>{exp.endDate}</p>
                 </div>

                 </div>

                <div>
                    <p className='text-mine-shaft-200 text-[14px]'>{exp.summary}</p>
                </div>

                </div>

                {edit1 && <div className='ml-2 flex items-center gap-3.5 mt-4 text-[14px]'>
                    
                    <FontAwesomeIcon  onClick={() => setExpIndex(index)} icon={faEdit} className='text-bright-sun-400 text-lg'/>
                    <FontAwesomeIcon onClick={() => handleDelete(exp)} icon={faTrash} className='text-red-500 text-lg'/>

                    </div>}

            </div> )}

            </div>    
            ))
        }

        </div>

        {edit && <form className='mt-5' onSubmit={handleSubmit(handleSave)}>

            <h1 className='text-mine-shaft-50 font-bold text-lg  mb-7'>Add Experience</h1>
             
            <div className='grid grid-cols-1 sm:grid-cols-2 gap-4.5'>
            
            <div className='flex flex-col  text-[13px] gap-1.5'>
            <h1 className='text-mine-shaft-50 text-[16px] font-semibold'>Company</h1>
            <select  defaultValue  = ""  name="company"

            {...register('company',{required:'company is required'})}
            
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
         <select  defaultValue = "" name="jobTitle" 
           {...register('jobTitle',{required:'jobTitle is required'})}
           
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
          type="text"  name="location" 
          className='w-full border border-solid p-1.5 rounded-lg border-mine-shaft-800  text-mine-shaft-200 focus:outline-none'
          
          {...register('location',{required:'location is required'})}
        
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
     <button disabled={send}  className={`text-bright-sun-400 bg-mine-shaft-800 hover:text-bright-sun-500 hover:bg-mine-shaft-900 ${send ? 'cursor-not-allowed' : ''} rounded-xl px-2.5 py-2`}>Save</button>
     <button type="button" onClick={() => setEdit(!edit)} className='text-red-500 bg-mine-shaft-800 hover:text-red-600 hover:bg-mine-shaft-900 rounded-xl px-2.5 py-2'>Cancel</button>
     </div>
   

    </form>}

    </div>
  )
}

export default Experience
