import React from 'react'

const Skills = ({skills}) => {

      
  return (

    
      <div className="flex flex-col gap-2 mt-10 border-b border-solid border-mine-shaft-800 pb-10">
      
    
      <h1 className="text-mine-shaft-50 text-lg font-bold mb-1">Skills</h1>

       {(!skills || skills.length == 0) && <p className='text-mine-shaft-200 text-md'>No Skills Added By User</p>}

   
      {skills && <div className="flex flex-wrap gap-3 border border-solid border-mine-shaft-800  px-2 py-3 rounded-lg text-[14px] w-full">

        {skills?.map((skill,index) => (

          <div className="bg-bright-sun-600 inline-flex items-center  px-2.5 py-1 gap-2 rounded-2xl">

          <p className="text-mine-shaft-100">{skill}</p>

          </div>

        ))}

      </div>}

      </div>
  )
}

export default Skills
