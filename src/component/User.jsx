import { Rating } from '@mantine/core';
import React from 'react'
import { useSelector } from 'react-redux';

const User = () => {

    const testimonials = [
  {
    name: "Shivam Patel",
    feedback: "This job portal made job search easy and quick. Recommended to all job seekers!"
  },
  {
    name: "Abhishek Kullu",
    feedback: "Found my dream job within a week! The application process was smooth."
  },
  {
    name: "Swapnil Pandey",
    feedback: "I secured a job offer within days of applying. Exceptional user experience and support."
  },
  {
    name: "Pavan Barnana",
    feedback: "Highly efficient job portal with excellent resources. Helped me land a great position."
  }
];

   const isLogout = useSelector((state) => state.authlogin.isLogout);

  return (
    <>
    <div className='font-display mt-10 mb-14'>

        <h1 className='text-center text-mine-shaft-100 font-bold text-3xl'>What <span className='text-bright-sun-300'>User</span> says about us</h1>
      
    </div>
      

      <div className='grid grid-cols-1  md:grid-cols-3 sm:grid-cols-2 lg:grid-cols-4 mx-10 gap-3 '>
 
      {testimonials.map((data,index)=>(
            
         <div key={index} className='border border-solid border-bright-sun-400 px-2.5 py-2  flex flex-col gap-3 rounded-xl'>

            <div className='flex gap-4 items-center'>
                <img src="avatar.png" className='h-20 w-20 rounded-4xl p-2'/>

                <div className='flex flex-col gap-2'>
                <h1 className='text-mine-shaft-100 text-xl font-semibold'>{data.name}</h1>
               {!isLogout &&  <Rating defaultValue={3} count={5} readOnly/>}
                </div>

            </div>

            <p className='text-mine-shaft-300 text-center text-[13px]'>{data.feedback}</p>

         </div>

      ))}

      </div>

     

      </>


  )
}

export default User
