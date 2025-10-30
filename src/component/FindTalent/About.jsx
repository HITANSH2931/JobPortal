import React from 'react'

const About = ({about}) => {

  console.log("hello");
  console.log(about)
  return (
    <div className='mt-10 font-display border-b border-solid border-mine-shaft-800 pb-10' >
        
        <h1 className='text-mine-shaft-50 font-bold text-lg ml-1'>About</h1>


        <div className='mt-3.5'>

         {about ? <textarea readOnly className='text-[13px] px-2.5 py-2 border border-solid border-mine-shaft-800 text-mine-shaft-200  rounded-lg focus:outline-none w-full'>{about}</textarea>
         :
         <p className='text-mine-shaft-200'>User has add nothing about himself</p>}

        </div>
   
    </div>
  )
}

export default About
