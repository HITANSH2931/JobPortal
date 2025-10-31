import React from 'react'
import { useEffect,useState } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faLocation,faCircle } from '@fortawesome/free-solid-svg-icons';
import axios from 'axios';
import { useSelector } from 'react-redux';
import BASE_URL from '../config';

const Rejected = ({job}) => {
     
         const[user,setUser] = useState([]);
         const token = useSelector((state) => state.authlogin.user.token);

         const[loading,setLoading] = useState(true);
     
         useEffect(() =>{
     
         const appliedUser = async () =>{

          try{
     
           const response = await axios.get(`${BASE_URL}/getRejectedUsers`,{
     
             params:{
               jobId:job.id
             },
             headers:{
     
               Authorization:`Bearer ${token}`
     
             }
           })

  
           console.log(response);
           setUser(response.data);

          }

          catch(error){

            console.log(error);
          }

          finally{

            setLoading(false);
          }
         }
     
         appliedUser();
     
       },[])
     
       return (

        <div>

          <div className='mt-10'>
              {loading && <p className='text-mine-shaft-300 text-bold text-lg text-center'>Loading rejected users taking too much time than expected  ......</p>}
       
               {!loading && user.length == 0 && <img src="Icons/image.png" className='h-[30%] w-[30%] mx-auto rounded-4xl'/>}
       
           </div>
     
         <div className='grid  grid-cols-3 gap-7 mt-15 font-display'>   
             
             {user.map((u,index) =>(
     
             <div key={index} className=' flex flex-col gap-4 bg-mine-shaft-900 rounded-lg p-4 shadow-md shadow-mine-shaft-800 hover:border hover:border-bright-sun-400'>
             <div className='flex items-center gap-2.5'>
                 <img src="avatar.png" className='h-12 w-12 rounded-full'/>
                 <div className='flex flex-col gap-1'>
                     <p className='font-semibold text-mine-shaft-100'>{u.name}</p>
     
                     <div className='flex items-center gap-1 text-mine-shaft-300 text-[12px]'>
                         <p>{u.profileDto?.jobTitle}</p>
                        {u.profileDto?.company && <FontAwesomeIcon icon={faCircle} className='text-[4px]'/>}
                         <p>{u.profileDto?.company}</p>
                     </div>
                 </div>
             </div>
     
             <div className='flex justify-between flex-wrap gap-y-2'>
     
                 {u.profileDto?.skills.slice(0,4).map((skill,index) =>(
                     
                     <div className='text-[13px]'>
                     <p className='text-bright-sun-400 bg-mine-shaft-800 rounded-lg px-2 py-1'>{skill}</p>
                     </div>
     
                 ))}
                   
                 
             </div>
     
             <div className='flex justify-between items-center text-mine-shaft-300 text-[12px] mt-3'>
     
             {u.profileDto?.experience && <p className='font-semibold'>Exp : {u.profileDto?.experience} years</p>}
     
            {u.profileDto?.location &&   <div className='flex items-center gap-1 '>
                 <FontAwesomeIcon icon={faLocation} />
                 <p>{u.profileDto?.location}</p>
               </div>}
               
             </div>
     
             <div>
                 <p className='text-[13px] text-mine-shaft-400 line-clamp-2'>{u.profileDto?.about}</p>
             </div>
     
         
     
             </div>
     
             ))}
           
         </div>

         </div>
         
         
       )
     }


export default Rejected
