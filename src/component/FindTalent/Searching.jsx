import { faCode, faGraduationCap, faLocation, faUser } from '@fortawesome/free-solid-svg-icons'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import React from 'react'

const Searching = ({name,location,title,skill,setName,setLocation,setTitle,setSkill}) => {

  const handleReset = () =>{
     
     setName('');
     setLocation('');
     setTitle('');
     setSkill('');
  }

  return (
    <div className='grid  grid-cols-1 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-5'>

        <div className='flex items-center gap-2 border border-solid border-mine-shaft-800 p-3 rounded-lg'>
            <FontAwesomeIcon  icon={faUser} className='text-xl text-bright-sun-400'/>
            <input type="text" value={name} onChange={(e) => setName(e.target.value)} placeholder="Find By Name" className='w-full text-mine-shaft-100 focus:outline-none'/>
        </div>

        <div className='flex items-center gap-2 border border-solid border-mine-shaft-800 p-3 rounded-lg'>
            <FontAwesomeIcon  icon={faLocation} className='text-xl text-bright-sun-400 '/>
            <input type="text" value={location} onChange={(e) => setLocation(e.target.value)} placeholder="Location" className='w-full text-mine-shaft-100 focus:outline-none'/>
        </div>

            <div className='border border-solid border-mine-shaft-800 flex items-center px-2 py-1.5 gap-2 rounded-lg'>
        
                    <FontAwesomeIcon icon={faGraduationCap} className='text-bright-sun-400 text-xl'/>
                    <select value={title} onChange={(e) => setTitle(e.target.value)}
                 className='w-full bg-mine-shaft-950 text-mine-shaft-100 focus:outline-none'>
                    
                    <option value="" disabled>Job Title</option>
                    <option value="Software-Engineer">Software-Engineer</option>
                    <option value="Full Stack Developer">Full Stack Developer</option>
                    <option value="Data Analyst">Data Analyst</option>
                    <option value="AI Enginner">AI Enginner</option>
                    <option value="Cloud Engineer">Cloud Engineer</option>
                    <option value="Devops Engineer">Devops Engineer</option>
                 </select>
        
                </div>

                 <div className='flex justify-between border border-solid border-mine-shaft-800 p-3 rounded-lg'>
                  
                  <div className='flex items-center gap-2'>
                 <FontAwesomeIcon  icon={faCode} className='text-xl text-bright-sun-400 '/>
                 <input type="text" value={skill} onChange={(e) => setSkill(e.target.value)} placeholder="Find By Skill"  list="skillsList" className='w-full text-mine-shaft-100 focus:outline-none'/>
                 </div>

               </div>
                
                <div className='flex items-center'>
               <button  onClick={() => handleReset()}className='w-full bg-bright-sun-500 hover:bg-bright-sun-600 text-mine-shaft-100 rounded-lg px-1.5 py-1 '>Reset</button>
               </div>
      
    </div>
  )
}

export default Searching
