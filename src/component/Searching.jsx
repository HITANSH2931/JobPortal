import { faBriefcase, faGraduationCap, faLocation, faSearch, faUpDown } from '@fortawesome/free-solid-svg-icons'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import React, { useState } from 'react'
import { Slider } from '@mantine/core'
import { useSelector } from 'react-redux'


const Searching = ({jobTitle, setJobTitle,jobType, setJobType, experience,setExperience, setLocation,location,sort,SetSort,salary,SetSalary}) => {

    

    const isLogout = useSelector((state) => state.authlogin.isLogout);
    

    const handleReset = () =>{

      setExperience('');
      setJobType('');
      setLocation('');
      setJobTitle('')
      SetSort('');
    }

  return (
    <div className='grid  grid-cols-1 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 mb-15 mt-10 gap-5'>

        <div className='border border-solid border-mine-shaft-900 flex items-center gap-2 rounded-lg px-2 py-1.5'>
            <FontAwesomeIcon icon={faSearch} className='text-bright-sun-400 text-xl'/>

              <select value={jobType} onChange={(e)=> setJobType(e.target.value)}
         className=' w-full bg-mine-shaft-950 text-mine-shaft-200  focus:outline-none'>
            
            <option value='' disabled>Job Type</option>
            <option value="Part-Time">Part-Time</option>
            <option value="Full-Time">Full-Time</option>
            <option value="Internship">Internship</option>
            <option value="Freelancing">Freelancing</option>
         </select>
        </div>

        <div className='border border-solid border-mine-shaft-900 flex items-center px-2 py-1.5 gap-2 rounded-lg'>
            <FontAwesomeIcon icon={faLocation} className='text-bright-sun-400 text-xl'/>
            <input value={location} onChange={(e) => setLocation(e.target.value)} type="text" placeholder='Location' className='text-mine-shaft-50 w-full focus:outline-none'/>
        </div>

        <div className='border border-solid border-mine-shaft-900 flex items-center px-2 py-1.5 gap-2 rounded-lg'>

            <FontAwesomeIcon icon={faBriefcase} className='text-bright-sun-400 text-xl'/>
              <select value={experience} onChange={(e) => setExperience(e.target.value)}
         className=' w-full bg-mine-shaft-950 text-mine-shaft-200  focus:outline-none'>
            
            <option value='' disabled>Experience</option>
            <option value="Entry Level">Entry Level</option>
            <option value="Intermediate">Intermediate</option>
            <option value="Expert">Expert</option>
           
         </select>

        </div>

        <div className='border border-solid border-mine-shaft-800 flex items-center px-2 py-1.5 gap-2 rounded-lg'>

            <FontAwesomeIcon icon={faGraduationCap} className='text-bright-sun-400 text-xl'/>
              <select  value = {jobTitle} onChange={(e) => setJobTitle(e.target.value)}
         className='w-full bg-mine-shaft-950 text-mine-shaft-200 focus:outline-none'>
            
            <option value="" disabled>Job Title</option>
            <option value="Software-Engineer">Software-Engineer</option>
            <option value="Full Stack Developer">Full Stack Developer</option>
            <option value="Data Analyst">Data Analyst</option>
            <option value="AI Enginner">AI Enginner</option>
            <option value="Cloud Engineer">Cloud Engineer</option>
            <option value="Devops Engineer">Devops Engineer</option>
         </select>

        </div>

      


        <div className='flex items-center gap-2 border border-solid border-mine-shaft-800 rounded-lg px-2 py-3.5'>
          <FontAwesomeIcon icon={faUpDown} className='text-bright-sun-400 text-xl'/>
          <select className='w-full bg-mine-shaft-950 text-mine-shaft-200 focus:outline-none' onChange={(e) => SetSort(e.target.value)} value={sort}>
            <option value="" disabled>Sort By Salary</option>
            <option value="HIGH">High to Low</option>
            <option value="LOW">Low to High</option>
          </select>   
          
        </div>

         <div className='flex flex-col justify-center gap-1.5 border border-solid border-mine-shaft-800 rounded-lg px-2 py-1.5'>

            <div className='flex justify-between items-center'>
            <h1 className='text-mine-shaft-200'>Salary</h1>
            <p className='text-mine-shaft-300 text-[13px]'>0 LPA TO 300 LPA</p>
            </div>

        {!isLogout && <Slider
          color="yellow"
          value={salary == '' ? 10000:salary}
          onChange={(val) => SetSalary(val)}
          min={10000}
          max={30000000}
          step={10000}
    />}
    
        </div>

          <div className='flex flex-col justify-center'>
          <button onClick={handleReset} className=' w-full bg-bright-sun-500 hover:bg-bright-sun-600 text-mine-shaft-100 rounded-lg px-1.5 py-1'>Reset</button>
        </div>

      
    </div>
  )
}

export default Searching
