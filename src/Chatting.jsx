import React, { useEffect, useState } from 'react'
import { ScrollArea } from '@mantine/core'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faChevronLeft, faUser } from '@fortawesome/free-solid-svg-icons'
import { useDispatch, useSelector } from 'react-redux'
import axios from 'axios'
import { addAllMessages, addMessages } from './redux/UserRedux'
import { useRef } from 'react'
import { getRandomColor } from './getRandomColor'
import BASE_URL from './component/config';


const Chatting = ({receiverId,name,setReceiverId}) => {

   const senderId = useSelector((state) => state.authlogin.user.id);

   const messages = useSelector((state) => state.authlogin.messages); 
   const typing = useSelector((state) => state.authlogin.isTyping); 

   const token = useSelector((state) => state.authlogin.user.token);
   
   const[input,setInput] = useState('')

   const dispatch = useDispatch();

  const viewportRef = useRef(null);
  const typingTimeout = useRef(null);


   useEffect(() => {
    const viewport = viewportRef.current;
    if (viewport) {
    
      viewport.scrollTo({
        top: viewport.scrollHeight,
        behavior: 'smooth', 
      });
    }
  }, [messages]);

   const handleClick = async (message) =>{

      try{

       const response = await axios.post(`${BASE_URL}/sendMessage`,{
         
          senderId:senderId,
          receiverId:receiverId,
          message:message

       },{
        headers:{
        Authorization:`Bearer ${token}`
       }})

       dispatch(addMessages(response.data));
      
    }

    catch(error){

       console.log(error);
    }   
  
   setInput('');
       
   }

   useEffect(() =>{

      const getAllMessages = async () =>{

        try{

        const response = await axios.get(`${BASE_URL}/getAllMessage`,
            
            {

             params:{

                senderId:senderId,
                receiverId:receiverId

                },

            headers:{
                Authorization:`Bearer ${token}`
            }
        })

        dispatch(addAllMessages(response.data))
        

    }

    catch(error){

        console.log(error);
    }
      }

      getAllMessages();

   },[receiverId])

   const handleChange = async (value) =>{

       setInput(value);

       if(value.length == 0) return;

       if(typingTimeout.current) clearTimeout(typingTimeout.current);

       setTyping(true);

       typingTimeout.current = setTimeout(() => {

        setTyping(false);
          
       },3000)

   }

   const setTyping = async (typing) =>{

        try{
          
          const response = await axios.get(`${BASE_URL}/typing`,{

             params:{

              receiverId:receiverId,
              isTyping:typing
               
             },

             headers:{
               Authorization:`Bearer ${token}`
             }
          })
       }

       catch(error){

          console.log(error);
       }
   }

    useEffect(() => {
    return () => {
      if (typingTimeout.current) {
        clearTimeout(typingTimeout.current);
        typingTimeout.current = null;
        setTyping(false);
        console.log("Hello",receiverId)

      }
    };
  }, []);

  return (
     
      <div className="mt-4 flex flex-col gap-9 border-l border-mine-shaft-500 pl-7 font-display">
     
     
           <div className='text-mine-shaft-100  border-b border-mine-shaft-600  pb-7 flex justify-center items-center gap-2.5 backdrop-blur-md'>
     
            
            <div  className='text-xl font-bold text-mine-shaft-50 bg-mine-shaft-900 rounded-full w-10 h-10 flex justify-center items-center' 
                 style={{ backgroundColor: getRandomColor() }}>

                {name.charAt(0).toUpperCase()}               

              </div>

             <h1 className='text-center font-bold text-xl'>{name}</h1>

             <div className='block md:hidden'>
             <FontAwesomeIcon onClick={() => setReceiverId(null)} icon={faChevronLeft} className='text-xl text-mine-shaft-100 '/>
             </div>

           </div>
     
           <ScrollArea h={300} type="scroll" offsetScrollbars overscrollBehavior="none" scrollbarSize={2} scrollHideDelay={3000} viewportRef={viewportRef}
           
           styles={{

           scrollbar: {
           backgroundColor: '#2d2d2d'
           },

          thumb: {
          backgroundColor: '#2d2d2d'
          },
          }}>
          
           <div className='flex flex-col gap-5 backdrop-blur-md'>
     
             {messages?.map((mess,index) =>(
     
                 <div className={`${mess.senderId == senderId ? 'text-start text-mine-shaft-50 ' : 'text-end text-mine-shaft-50 '}`}>
                 <p className={`text-[14px] ${mess.senderId == senderId ? 'bg-teal-600 ' : 'bg-purple-700'} inline-block rounded-full px-3.5 py-2`}>{mess.message}</p>
                 <p className='text-mine-shaft-100 mt-2 text-[13px] pl-2'>{mess.timestamp}</p>
                 </div>
             ))}
           </div>
     
           </ScrollArea>

       <div className='text-mine-shaft-300 text-center text-[15px] font-semibold'>{typing}</div>
     
           <div className='backdrop-blur-md text-[13px] flex items-center gap-2'>
     
             <input onChange={(e) => handleChange(e.target.value)} value={input} type="text" placeholder="Send a messsage" className='w-full text-mine-shaft-100 focus:outline-none border border-solid border-mine-shaft-600 rounded-full px-2.5 py-2'/>
              <img onClick={() => handleClick(input)} src="send_button.svg" className='h-8 w-8'/>
           </div>
     
           </div>
     
  )
}

export default Chatting
