import { FontAwesomeIcon} from '@fortawesome/react-fontawesome'
import { faAnchor, faArrowRight, faBarChart, faBars, faBell, faCheck, faChevronDown, faCross, faGear } from '@fortawesome/free-solid-svg-icons'
import { Link } from 'react-router-dom'
import {  useDispatch, useSelector } from 'react-redux'
import { NavLink } from 'react-router-dom'
import Logout from '../Logout'
import { useState } from 'react'
import { Notification, ScrollArea } from '@mantine/core'
import { IconX, IconCheck } from '@tabler/icons-react';
import MenuBar from '../MenuBar'
import DropDown from '../DropDown'
import axios from 'axios'
import { removeNotification } from '../redux/UserRedux'
import { getTimeAgo } from './getTimeAgo'


const Navbar = () => {

  const auth = useSelector((state) => state.authlogin.isAuthenticated)
  const name = useSelector((state)=>state.authlogin.user?.name)
  const[openBar,setOpenBar] = useState(false);
  

  const classes = {
  root: 'bg-blue-500 text-white',
  title: 'text-lg font-bold',
  description: 'text-sm',
  }; 

  const checkIcon = <IconCheck size={16} />;

  const notificationList =  useSelector((state) => state.authlogin.notification);
  console.log(notificationList);

  const[notified,setNotified] = useState(false);
  const[logout,setLogOut] =  useState(false);

  const token = useSelector((state) => state.authlogin.user?.token);
  const dispatch = useDispatch();

  const handleMarkAsRead = async (noti) =>{

    try{

       const response = await axios.get("http://localhost:8080/api/notification/markRead",{
        params:{
          id:noti.id
        },
        headers:{
          Authorization:`Bearer ${token}`
        }
       })
    }

    catch(error){

      console.log(error);
    }

    finally{

      dispatch(removeNotification(noti))
    }
  }


  return (

    <>
    <div className='h-24  flex justify-around items-center  font-display'>

        <div className='flex items-center gap-1'>
            <FontAwesomeIcon icon={ faAnchor } className='text-bright-sun-400 text-3xl'/>
            <Link to="/"><h1 className='text-bright-sun-400 font-bold text-3xl hidden sm:block'>JobHook</h1></Link>
        </div>

        <div className='text-mine-shaft-300 xl:flex xl:justify-between gap-7 mt-6 hidden '>
            
            <NavLink to="/findJob"  className={({ isActive }) =>`pb-5  ${isActive   ? 'text-bright-sun-400 border-b-2 border-solid border-bright-sun-500'  : 'hover:text-mine-shaft-100' }`}>
  
            <div >Find Jobs</div></NavLink>

            <NavLink to="/talent" className={({ isActive }) =>`pb-5  ${isActive   ? 'text-bright-sun-400 border-b-2 border-solid border-bright-sun-500'  : 'hover:text-mine-shaft-100' }`}><div >Find Talent</div></NavLink>
            
            <NavLink to="/postJob" className={({ isActive }) =>`pb-5  ${isActive   ? 'text-bright-sun-400 border-b-2 border-solid border-bright-sun-500'  : 'hover:text-mine-shaft-100' }`}>
            <div >Post Job</div></NavLink >
            
            <NavLink to="/seeJob" className={({ isActive }) =>`pb-5  ${isActive   ? 'text-bright-sun-400 border-b-2 border-solid border-bright-sun-500'  : 'hover:text-mine-shaft-100' }`}><div >Posted Jobs</div></NavLink>

            <NavLink to="/jobHistory" className={({ isActive }) =>`pb-5  ${isActive   ? 'text-bright-sun-400 border-b-2 border-solid border-bright-sun-500'  : 'hover:text-mine-shaft-100' }`}>
            <div >Job History</div></NavLink>

             <NavLink to="/messaging" className={({ isActive }) =>`pb-5  ${isActive   ? 'text-bright-sun-400 border-b-2 border-solid border-bright-sun-500'  : 'hover:text-mine-shaft-100' }`}>
            <div >Messaging</div></NavLink>


        </div>
     

        {auth ? 
        (<div className='flex  items-center gap-4 relative mr-10'>

           <div className='xl:hidden block'> <DropDown/> </div>
            
           <MenuBar setLogOut={setLogOut}/>

            <div>
            <FontAwesomeIcon onClick={() => setNotified(!notified)} icon={faBell} className='text-xl text-mine-shaft-200 hover:text-mine-shaft-300'/>
            <p className='bg-bright-sun-500  text-mine-shaft-100 rounded-full flex justify-center items-center absolute -top-2 -right-2 w-6 h-6 text-[12px] '>{notificationList.length}</p>
             
           
                      
            {notified && <div className='absolute top-full left-0 w-60 mt-4 backdrop-blur-md'>

                <ScrollArea h={120} type="scroll" offsetScrollbars overscrollBehavior="none" scrollbarSize={2} scrollHideDelay={3000}
                       
                       styles={{
            
                       scrollbar: {
                       backgroundColor: '#2d2d2d'
                       },
            
                      thumb: {
                      backgroundColor: '#2d2d2d'
                      },
                      }}>

                      
                <div>
              
             {notificationList?.map((noti,index) =>(

                  <div className='mb-2 bg-mine-shaft-950 rounded-md'>

                      <Notification   icon={checkIcon} radius="md"  onClose={() => handleMarkAsRead(noti)}

                       styles={{

                       root: {
                      backgroundColor: '#3d3d3d', 
                        },

                      description: {
                      color: '#b0b0b0',         
                     fontSize: '11px',    
                      },

                      icon:{

                        backgroundColor:"#00a63e"
                      },

                        closeButton: {
                        color: '#ff0000',
                        },
                      
                      }} >

                       {noti.message}
                      </Notification>  

                      <p className=' text-mine-shaft-300 text-[11px] text-center mt-2'>Notified {getTimeAgo(noti.notificationCreatedAt)}</p>
        
     
                  </div>
             ))}

             </div>



            </ScrollArea>
            
            </div>}  
            </div>
             

        </div>)
        
        :
        
        (
        <div className='text-bright-sun-400 '>
            
            <Link to="/login"><button className='px-5 py-1 font-bold hover:border hover:border-solid hover:rounded-lg hover:bg-gray-800'>Login</button></Link>
        </div>)

     }


     {logout && <Logout setLogout={setLogOut}/>}


      
    </div>



    </>
  )
}

export default Navbar
