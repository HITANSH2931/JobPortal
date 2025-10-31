import { faBriefcase, faDotCircle, faEdit, faFloppyDisk, faLocation, faUserClock } from '@fortawesome/free-solid-svg-icons'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import React from 'react'
import { useState } from 'react'
import SkillJob from './SkillJob'
import  { useDispatch, useSelector } from 'react-redux'
import Experience from './Experience'
import Certification from './Certification'
import About from './About'
import { addProfileInfo } from '../../redux/Profile'
import axios from 'axios'
import { useForm } from 'react-hook-form'
import BASE_URL from '../config';

const Profile = () => {

    const[edit,setEdit] = useState(false);
    const dispatch = useDispatch();
   
    const formData = useSelector((state) => state.profile.profileInfo)

    const token = useSelector((state)=> state.authlogin.user.token)

    const[profileInfo,setProfileInfo] = useState(formData)

    const[send,setSend] = useState(false);

    const {register,handleSubmit,reset,formState:{errors,isValid}} = useForm({mode:'onChange',defaultValues:profileInfo});
  

    const handleSave = async (data) =>{

      setSend(true);

      dispatch(addProfileInfo(data))

      try{

      const response = await axios.post(`${BASE_URL}/addProfileInfo`,{
        ...data,
      },{
        headers:{
          Authorization:`Bearer ${token}`
        }
      })
    }

    catch(error){

      console.log(error);
    }

    finally{

      setSend(false);
      setEdit(false);

    }
    }
 

  return (
    <div className='mx-20 mt-15 font-display'>
        
        <div className='relative'>
            <img src="banner.jpg" className='h-32 w-full rounded-xl'/>
            <img src="avatar.png" className='h-32 w-32 rounded-full absolute top-8 left-9 border-4 border-solid border-black'/>
        </div>

        <div className='flex justify-between items-center flex-wrap gap-y-2 mt-10'>
        <h1 className='text-mine-shaft-50 text-2xl font-bold'>Hitansh Joshi</h1>
        
        {!edit ? (<div>
            <FontAwesomeIcon onClick={() => setEdit(!edit)} icon={faEdit} className='text-bright-sun-400 text-xl'/>
        </div>) :
        (<div>
            <FontAwesomeIcon onClick={() => setEdit(!edit)} icon={faFloppyDisk} className='text-bright-sun-400 text-xl'/>
        </div>)}
        </div>

       
        {!edit? (
        <div className=' flex flex-col gap-1.5 mt-1.5'>
             <div className='flex items-center flex-wrap gap-1.5  text-[14px] text-mine-shaft-200'>
                
               {formData.jobTitle && <div className='flex  items-center gap-1.5'>
                
                <FontAwesomeIcon icon={faBriefcase} className='text-[15px]'/>
                <p>{formData.jobTitle}</p>
                
                </div>}

               {formData.company && <div className='flex gap-1'>  
                
                 <span>•</span>
                <p >{formData.company}</p>

                </div>}

             </div>

           {formData.location &&  <div className='text-[13px] text-mine-shaft-300 flex items-center gap-1.5'>
                <FontAwesomeIcon icon={faLocation} className='text-[14px]'/>
                <p>{formData.location}</p>      
             </div>}

             {formData.exp && <div className='text-[12px] text-mine-shaft-300 flex items-center gap-2'>
                <FontAwesomeIcon icon={faUserClock} className='text-[13px]'/>
                <p>Experience {formData.exp} years</p>      
             </div>}


        </div>) : (

          <div>

            <form onSubmit={handleSubmit(handleSave)}>

            <div className='grid grid-cols-2 gap-x-5 gap-y-2 mt-2'>
                 
                 <div className='flex flex-col gap-1.5 text-[12px]'>
                 <h1 className='text-mine-shaft-50 text-[15px]'>Job Title</h1>
                <input type="text"   name="jobTitle" className='border border-solid border-mine-shaft-800  text-mine-shaft-200 rounded-lg px-1.5 py-2  focus:outline-none'
                  {...register('jobTitle',{required:'jobTitle is required'})}
                />
                 
                  {errors.jobTitle && <p className='text-red-500 text-[13px] ml-2'>{errors.jobTitle.message}</p>}

                </div>

                
                 <div className='flex flex-col gap-1.5 text-[12px]'>
                 <h1 className='text-mine-shaft-50 text-[15px]'>Company</h1>
                <input type="text"   name="company" className='border border-solid border-mine-shaft-800  text-mine-shaft-200 rounded-lg px-1.5 py-2  focus:outline-none'
                  {...register('company',{required:'company is required'})}/>

                  {errors.company && <p className='text-red-500 text-[13px] ml-2'>{errors.company.message}</p>}

                </div>


                 <div className='flex flex-col gap-1.5 text-[12px]'>
                 <h1 className='text-mine-shaft-50 text-[15px]'>Location</h1>
                <input type="text"  name="location" className='border border-solid border-mine-shaft-800  text-mine-shaft-200 rounded-lg px-1.5 py-2  focus:outline-none'

                 {...register('location',{required:'location is required'})}/>

                {errors.location && <p className='text-red-500 text-[13px] ml-2'>{errors.location.message}</p>}

                </div>

                <div className='flex flex-col gap-1.5 text-[12px]'>
                 <h1 className='text-mine-shaft-50 text-[15px]'>Experience</h1>
                <input type="text" name="exp" className='border border-solid border-mine-shaft-800  text-mine-shaft-200 rounded-lg px-1.5 py-2  focus:outline-none'

                  {...register('exp',{required:'Experience is required'})}/>

                {errors.exp && <p className='text-red-500 text-[13px] ml-2'>{errors.exp.message}</p>}

                </div>


            </div>

            <div className='flex gap-2.5 mt-3.5 text-[14px]'>
              <button disabled={send} className={`text-bright-sun-400 bg-mine-shaft-800 hover:bg-mine-shaft-900 hover:text-bright-sun-500 px-3.5 py-1 rounded-lg ${send ? 'cursor-not-allowed' : ''}`}>Save</button>
              <button type="button" onClick={() => setEdit(!edit)}  className='text-red-500 hover:bg-mine-shaft-900 hover:text-red-600 bg-mine-shaft-800 px-3.5 py-1 rounded-lg'>Cancel</button>
            </div>

            </form>

            </div>
        )}

        
        <SkillJob/>

        <About/>

        <Experience/>

        <Certification/>
      
    </div>
  )
}

export default Profile
