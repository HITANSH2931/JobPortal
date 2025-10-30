import { useSelection } from '@mantine/hooks'
import React from 'react'
import SavedJobs from './SavedJobs'
import AppliedJobs from './AppliedJobs'
import { useState } from 'react'
import Offered from './Offered'
import Rejected from './Rejected'
import Accepted from './Accepted'
import Declined from './Declined'

const JobHistory = () => {

    const[status,setStatus] = useState("saved");

  
  return (

    <div>

    <div className='flex flex-wrap gap-10 font-display mx-20 mt-8'>

        <div onClick={() => setStatus("saved")}   className={`${status == "saved" ? 'text-bright-sun-400 hover:text-bright-sun-500' : 'text-mine-shaft-200'} text-xl font-bold`}>Saved</div>
         <div onClick={() => setStatus("offered")}  className={`${status == "offered" ? 'text-bright-sun-400 hover:text-bright-sun-500' : 'text-mine-shaft-200'} text-xl font-bold`}>Offered</div>
        <div onClick={() => setStatus("accepted")} className={`${status == "accepted" ? 'text-bright-sun-400 hover:text-bright-sun-500' : 'text-mine-shaft-200'} text-xl font-bold`}>Accepted</div>
        <div onClick={() => setStatus("rejected")} className={`${status == "rejected" ? 'text-bright-sun-400 hover:text-bright-sun-500' : 'text-mine-shaft-200'} text-xl font-bold`}>Rejected</div>
        <div onClick={() => setStatus("applied")}  className={`${status == "applied" ? 'text-bright-sun-400 hover:text-bright-sun-500' : 'text-mine-shaft-200'} text-xl font-bold`}>Applied</div>
         <div onClick={() => setStatus("declined")}  className={`${status == "declined" ? 'text-bright-sun-400 hover:text-bright-sun-500' : 'text-mine-shaft-200'} text-xl font-bold`}>Declined</div>
       

    </div>

    {status == "saved" && <SavedJobs/>}
    {status == "applied" && <AppliedJobs/>}  
    {status == "accepted" && <Accepted/>}
    {status == "rejected" && <Rejected/>}
    {status == "offered" && <Offered/>}
     {status == "declined" && <Declined/>}
  

    </div>
  )
}

export default JobHistory;
