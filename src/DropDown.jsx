import React from 'react'
import { NavLink } from 'react-router-dom'
import { Menu } from '@mantine/core';
import { IconSearch, IconUsers, IconPlus, IconClipboardList, IconHistory, IconMessage } from '@tabler/icons-react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faBars } from '@fortawesome/free-solid-svg-icons';

const DropDown = () => {
  return (

     <Menu  width={200} radius="md" styles={{

      dropdown: {
      backgroundColor: "#2d2d2d",
      border:"none",
      boxShadow:"0 0 10px #454545",
      marginTop:"5px"
                 
     },

      item: {
        color:"#e7e7e7",
    }
    
    }}>

      <Menu.Target>

        <FontAwesomeIcon icon={faBars} className='text-mine-shaft-100 text-xl'/>
       
      </Menu.Target>

      <Menu.Dropdown>

        <Menu.Item  color="#4f4f4f" leftSection={<IconSearch size={14} />}>

         <NavLink to="/findJob"  className={({ isActive }) =>` ${isActive   ? 'text-bright-sun-400'  : '' }`}>
  
         <div >Find Jobs</div></NavLink>

        </Menu.Item>

        <Menu.Item  color="#4f4f4f" leftSection={<IconUsers size={14} />}>

        <NavLink to="/talent" className={({ isActive }) =>`  ${isActive   ? 'text-bright-sun-400 '  : '' }`}><div >Find Talent</div></NavLink>    
          
        </Menu.Item>

        <Menu.Item
           color="#4f4f4f"
          leftSection={<IconPlus size={14} />}
          
        >
         <NavLink to="/postJob" className={({ isActive }) =>`${isActive   ? 'text-bright-sun-400'  : '' }`}>
        <div >Post Job</div></NavLink >
           
        </Menu.Item>

         <Menu.Item
           color="#4f4f4f"
          leftSection={<IconClipboardList size={14} />}
          
        >
         <NavLink to="/seeJob" className={({ isActive }) =>`${isActive   ? 'text-bright-sun-400' : '' }`}><div >Posted Jobs</div></NavLink>
           
        </Menu.Item>


         <Menu.Item
          color="#4f4f4f"
          leftSection={<IconHistory size={14} />}
          
        >
         <NavLink to="/jobHistory" className={({ isActive }) =>`${isActive   ? 'text-bright-sun-400 '  : '' }`}>
        <div >Job History</div></NavLink>

        </Menu.Item>


         <Menu.Item
           color="#4f4f4f"
          leftSection={<IconMessage size={14} />}
          
        >
         <NavLink to="/messaging" className={({ isActive }) =>`${isActive   ? 'text-bright-sun-400'  : '' }`}>
        <div >Messaging</div></NavLink>

           
        </Menu.Item>



      </Menu.Dropdown>
    </Menu>

  
  )
}

export default DropDown
