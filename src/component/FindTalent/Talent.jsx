import React from 'react'
import Searching from './Searching'
import TalentCard from './TalentCard'
import { useState } from 'react'

const Talent = () => {

      const [name,setName] = useState('');
      const[location,setLocation] = useState('');
      const[title,setTitle] = useState('');
      const[skill,setSkill] = useState('');

  return (
    <div className='mt-10 mx-10'>

        <Searching name={name} location={location} title={title} skill={skill} setName={setName} setLocation={setLocation} setTitle={setTitle} setSkill={setSkill}/>

        <TalentCard name={name} location={location} title={title} skill={skill}/>
      
    </div>
  )
}

export default Talent
