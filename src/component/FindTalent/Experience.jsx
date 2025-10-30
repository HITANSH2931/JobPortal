import React from 'react'

const Experience = ({experienceList}) => {

  return (
    
      <div className='mt-10 font-display border-b border-solid border-mine-shaft-800 pb-10'>
         
        <h1 className='text-mine-shaft-50 font-bold text-xl mb-7'>Experience</h1>


        {(!experienceList || experienceList.length == 0) && <p className='text-mine-shaft-200 text-md'>No Experience added </p>}

        <div className='flex flex-col gap-6'>

        {
            experienceList?.map((exp,index) => (

             
               
                <div className='flex flex-col gap-4 bg-mine-shaft-900  px-3 py-3.5 rounded-lg'>

                <div className='flex justify-between items-center'>
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

              
            ))
        }

        </div>

      
    </div>
  )
}

export default Experience
