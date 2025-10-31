import { faUser } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { ScrollArea } from '@mantine/core';
import Chatting from './Chatting';
import { useEffect, useState } from 'react';
import axios from 'axios';
import { useSelector } from 'react-redux';
import { getRandomColor } from './getRandomColor';
import { useLocation } from 'react-router-dom';
import BASE_URL from './component/config';

const Messaging = () => {

    const location = useLocation();
    const userName = location.state?.userName

    const[users,setUsers] = useState([]);
    const token =  useSelector((state) => state.authlogin.user?.token);
    const[receiverId,setReceiverId] = useState(null);
    const[name,setName] = useState(null);
    const[loading,setLoading] = useState(true);


    const[input,setInput] = useState(userName || '');
    const filteredUsers  = users?.filter(u => {
      
    return input ? u.name.startsWith(input) : true;
    
})

   console.log(filteredUsers);

    useEffect(() =>{

      const  getUsersDetails = async () =>{

        try{

          const response = await axios.get(`${BASE_URL}/Users`,{

            headers:{
              Authorization:`Bearer ${token}`
            }
          })

          setUsers(response.data);
        }

        catch(error){

          console.log(error);
        }

        finally{

          setLoading(false);
        }
      }

      getUsersDetails();

    },[])

    const handleClick=(user) =>{
       
       setReceiverId(user.id);
       setName(user.name);
    }
  

  
  return (

    <div className=' bg-black h-[800px] mt-8'>
      ChatApplication
    <div className="sm:mx-15 border border-solid shadow-[0_0_10px] shadow-mine-shaft-900 mt-10 grid grid-cols-1 md:grid-cols-[50%_50%] font-display p-8  bg-gradient-to-r from-[#0f0c29] via-[#302b63] to-[#24243e]  rounded-xl h-[620px]">

       <ScrollArea h={520} type="scroll" offsetScrollbars overscrollBehavior="none" scrollbarSize={2} scrollHideDelay={3000} styles={{

       scrollbar: {
       backgroundColor: '#2d2d2d'
       },

      thumb: {
      backgroundColor: '#2d2d2d'
      },
      }}
      
      className={`${receiverId ? 'hidden' : ''} md:flex`}
      
      >

      <div className='flex flex-col gap-7 px-8' >
        
        <img src="download.png" className=' h-10 w-56 mt-4' alt="logo"/>

        <div className='text-[12px]'>
          <input onChange={(e) => setInput(e.target.value)}
            value={input}
            type="text" 
            placeholder="Search User...." 
            className='w-full border border-solid border-mine-shaft-600 bg-mine-shaft-950 rounded-full focus:outline-none text-mine-shaft-100 px-3.5 py-2'
          />
        </div>
   
        {loading && <p className='text-mine-shaft-200  font-bold text-center mt-6'>Loading users.....</p>}    
        {!loading && filteredUsers.length == 0 && <p className='text-mine-shaft-200  font-bold text-center mt-6'>No Users Found for the search</p>}

       
       <div  className='flex flex-col gap-7'>
          {filteredUsers.map((user, index) => (
            <div key={index} className='flex items-center gap-3.5'>

              <div  className='text-xl font-bold text-mine-shaft-50 bg-mine-shaft-900 rounded-full w-10 h-10 flex justify-center items-center' 
                 style={{ backgroundColor: getRandomColor() }}>

                {user.name.charAt(0).toUpperCase()}               

              </div>

              <p onClick={() => handleClick(user)} className='text-mine-shaft-100 text-xl font-semibold text-[15px]'>{user.name}</p>
            </div>
          ))}
        </div>

        

      </div>

      </ScrollArea>

     {receiverId && <Chatting receiverId={receiverId} name={name} setReceiverId={setReceiverId}/>}
     {!receiverId && <div>


      <div className='md:flex md:flex-col gap-3 justify-center items-center h-[500px] border-l border-mine-shaft-600 hidden'>
        <img src="logo_icon.svg" className='h-16 w-16'/>
        <p className='font-bold text-xl text-mine-shaft-100'>Chat anytime,anywhere</p>
      </div>
      
      
      
     </div>
      }
     
      </div>

      </div>
  )
}

export default Messaging;
