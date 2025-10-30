import React from 'react'
import { Avatar } from '@mantine/core'
import { useSelector } from 'react-redux';

const Landing = () => {

     const isLogout = useSelector((state) => state.authlogin.isLogout);

  return (
    <>
    <div className='flex justify-center mt-20 font-display'>

        <div className='flex flex-col gap-3'>

            <h1 className='text-3xl font-bold text-mine-shaft-100 text-center'>How it <span className='text-bright-sun-300'>Works</span></h1>
            <p className='text-mine-shaft-300 text-center'>Effortlessly navigate through the process and land your dream job</p>

        </div>
       
    </div>

    <div className='font-display grid  grid-cols-1 lg:grid-cols-2 gap-y-12 mx-20 mt-14 items-center'>

        {!isLogout && <div className='relative'>

            <img src="Girl.png" className=' h-[300px] w-[300px] sm:h-[420px] sm:w-[420px] '/>

            <div className='border border-solid border-bright-sun-300 w-36 flex flex-col gap-1 p-2 rounded-xl absolute top-1/2 -left-16 lg:left-[60%] lg:top-1/12 xl:left-1/2 backdrop-blur-md'>
                 
                 <div className='flex justify-center'>
                 <Avatar src="avatar2.png" size="lg"/>
                 </div>

                <p className='text-mine-shaft-100 font-bold text-center'>Complete your profile</p>
                <p className='text-mine-shaft-300 text-[13px] text-center'>70% completed</p>

            </div>

        </div>}

        <div className='font-display flex flex-col gap-12'>
            
            <div className='flex gap-6 '>
                <img src="Apply for job.png" className='h-12 w-12 bg-bright-sun-400 rounded-4xl p-2'/>
                <div className='flex flex-col gap-2'>
                    <h1 className='text-2xl font-semibold text-mine-shaft-100'>Build Your Resume</h1>
                    <p className='text-mine-shaft-300'>Create a standout resume with your skills</p>
                </div>
            </div>

            <div className='flex gap-6 '>
                <img src="Build your resume.png" className='h-12 w-12 bg-bright-sun-400 rounded-4xl p-2'/>
                <div className='flex flex-col gap-2'>
                    <h1 className='text-2xl font-semibold text-mine-shaft-100'>Apply for Job</h1>
                    <p className='text-mine-shaft-300'>Find and apply for jobs that match your skills</p>
                </div>
            </div>

            <div className='flex gap-6 '>
                <img src="Hired.png" className='h-12 w-12 bg-bright-sun-400 rounded-4xl p-2'/>
                <div className='flex flex-col gap-2'>
                    <h1 className='text-2xl font-semibold text-mine-shaft-100'>Get Hired</h1>
                    <p className='text-mine-shaft-300'>Connect with employers and start your new job</p>
                </div>
            </div>


        </div>

     </div>


    </>
  )
}

export default Landing
