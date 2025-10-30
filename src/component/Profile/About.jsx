import { faEdit, faFloppyDisk } from '@fortawesome/free-solid-svg-icons'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import React, { useState } from 'react'
import { useDispatch, useSelector } from 'react-redux';
import { addAbout } from '../../redux/Profile';
import axios from 'axios';

const About = () => {
  
    const[edit,setEdit] = useState(false);
    const formAbout = useSelector((state) => state.profile.about)
    const[about,setAbout]=  useState(formAbout)

    const token = useSelector((state) => state.authlogin.user.token)
    
    const dispatch = useDispatch();

    const handleSave = async () =>{

      const response = axios.post("http://localhost:8080/addAbout",{
        about:about

      },{
        headers:{
          Authorization:`Bearer ${token}`
        }
      })

      dispatch(addAbout(about));
      setEdit(false);
        
    }

  return (
    <div className='mt-10'>
        
        <div className='flex justify-between items-center'>
        <h1 className='text-mine-shaft-50 font-bold text-lg'>About</h1>

        <div>
            {!edit ? 
            (<FontAwesomeIcon icon={faEdit} onClick={()=> setEdit(!edit)} className='text-bright-sun-400 text-xl'/> ) :
            (<FontAwesomeIcon icon={faFloppyDisk} onClick={()=> setEdit(!edit)} className='text-bright-sun-400 text-xl'/>)} 
        </div>

        </div>

         
        {edit ? (

       <div className='text-[13px]'>
       <textarea value={about} onChange={(e) => setAbout(e.target.value)} className= 'border border-solid border-mine-shaft-800 rounded-lg text-mine-shaft-200 px-2.5 py-2 focus:outline-none mt-3.5  w-full'>
            
       </textarea>

       <div className='text-[14px] flex gap-2.5'> 
       
        <button onClick={() => handleSave()} className='text-bright-sun-400 bg-mine-shaft-800 rounded-lg px-3.5 py-1.5 mt-3.5 hover:bg-mine-shaft-900 hover:text-bright-sun-500'>Save</button>
        <button onClick={() => setEdit(false)} className='text-red-500  bg-mine-shaft-800 rounded-lg px-3.5 py-1.5 mt-3.5 hover:bg-mine-shaft-900 hover:text-red-600'>Cancel</button>
       
        </div>
         
        </div>) :
         
      (  
        <div className='text-[13px] mt-3.5'>
         <textarea value={formAbout}  readOnly className='px-2.5 py-2 border border-solid border-mine-shaft-800 text-mine-shaft-200  rounded-lg focus:outline-none w-full'></textarea>
        </div>
      )}
      
      
      
    </div>
  )
}

export default About;