import React from 'react'
import image from '../assets/image.png'
import Google from '../assets/Google.png'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faSearch } from '@fortawesome/free-solid-svg-icons'
import { Avatar} from '@mantine/core'
import Companies from './Companies'
import JobCategory from './JobCategory'
import Landing from './Landing'
import User from './User'
import Subscribe from './Subscribe'
import Footer from './Footer'
import { useSelector } from 'react-redux'
import { useForm } from 'react-hook-form'
import { useNavigate } from 'react-router-dom'


const Header = () => {

     const isLogout = useSelector((state) => state.authlogin.isLogout);
     const {register,handleSubmit,reset,formState:{errors}} = useForm({mode:'onChange'})
     const navigate = useNavigate();


     const handleChange  = (data) =>{

        console.log(data);
        navigate("/findJob",{state:{jobTitle:data.jobTitle,location:data.location}})
     }

    
  return (

    <>
    <div className='grid grid-cols-1 lg:grid-cols-2 gap-y-12 font-display  mx-15 mt-10  '>
        
        <div className='flex flex-col gap-6 mt-10'> 
        
            <h1 className='text-white font-bold text-6xl leading-20'>Find your <span className='text-bright-sun-300'>dream job </span>with us</h1>
            <p className='text-mine-shaft-200 text-lg'>Good life begins with a good company. Start explore thousands of jobs in one place.</p>

            <form onSubmit={handleSubmit(handleChange)}>
            
            <div className='flex flex-wrap gap-3'>
                <div className='border bordr-solid bg-mine-shaft-900 px-2 py-1.5 rounded-lg flex flex-col gap-2 text-[14px]'>
                    <p className='text-mine-shaft-100 '>Job Title</p>
                    <input type="text"  placeholder="Software Engineer" className='text-mine-shaft-300  focus:outline-none' 
                     {...register('jobTitle',{required:'JobTitle is Required'})}/>

                     {errors.jobTitle && <p className='text-red-500 text-[13px]'>{errors.jobTitle.message}</p>}
                </div>
                <div className='border border-solid bg-mine-shaft-900 px-2 py-1.5 rounded-lg flex flex-col gap-2 text-[14px]'>
                    <p className='text-mine-shaft-100 '>Location</p>
                    <input type="text"  placeholder="Banglore" className='text-mine-shaft-300 focus:outline-none'
                     {...register('location',{required:'Location is Required'})}/>

                     {errors.location && <p className='text-red-500 text-[13px]'>{errors.location.message}</p>}
                </div>

                <div className='bg-bright-sun-400 flex items-center px-3.5  rounded-lg hover:bg-bright-sun-500'>
                    <button><FontAwesomeIcon  icon  = {faSearch} className='text-mine-shaft-100 text-4xl '/></button>
                </div>

            </div>
            </form>
       
        </div>

        {!isLogout && <div className='relative flex justify-center'>
            <img src={image} alt="job-portal" className=' h-[350px] w-[300px] sm:h-[450px] sm:w-[450px]' />

            <div className=' border border-solid border-bright-sun-400 p-2.5 flex flex-col gap-3 w-52 rounded-lg absolute top-[95%] -left-14 sm:top-1/12 sm:left-0 md:top-1/3 md:left-[11%] lg:top-0  lg:left-[4%] xl:top-1/4 xl:left-1/12 backdrop-blur-md'>

                <div className='flex gap-4 items-center'>
                    <img src={Google} className='h-8 w-8'/>

                    <div>
                    <p className='text-[14px] text-mine-shaft-100'>Software Engineer</p>
                    <p className='text-[12px] text-mine-shaft-300'>Chicago</p>
                    </div>

                </div>

                <div className='flex gap-5'>
                    <p className='text-[12px] text-mine-shaft-300'>1 day ago</p>
                    <p className='text-[12px] text-mine-shaft-300'>120 Applicants</p>
                </div>

            </div>

             <div className='border border-solid border-bright-sun-300 w-36 px-4 py-2 rounded-lg flex flex-col gap-2 absolute bottom-[75%] -right-12 sm:bottom-1/3 sm:right-1/12 backdrop-blur-md'>
              <p className='text-mine-shaft-100 text-mine-sh text-center text-[14px]'>10K+ got job</p>
              <Avatar.Group >
                 <Avatar src= "avatar.png" />
                 <Avatar src= "avatar1.png"  />
                 <Avatar src= "avatar2.png" />
                <Avatar color="white" style={{
    backgroundColor: '#4f4f4f'}}>+9K</Avatar>
            </Avatar.Group>
            </div>
           

        </div>}
      
    </div>

    <Companies/>
    <JobCategory/>
    <Landing/>
    <User/>
    <Subscribe/>
   

    </>


  )
}

export default Header
