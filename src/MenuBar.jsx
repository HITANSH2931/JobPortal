
import { Menu, Text } from '@mantine/core';
import {
  IconSettings,
  IconSearch,
  IconMessageCircle,
  IconTrash,
} from '@tabler/icons-react';
import { useDispatch } from 'react-redux';
import { disableLogout } from './redux/UserRedux';
import { useNavigate } from 'react-router-dom';
import { useSelector } from 'react-redux';

   
  const MenuBar = ({setLogOut}) => {

    const dispatch = useDispatch();
    const navigate = useNavigate();

    const name = useSelector((state) => state.authlogin.user?.name)

    const handleLogoutPage = () =>{

    setLogOut(true);

    dispatch(disableLogout());
  }

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
        <div className='flex items-center gap-3.5 font-display  '>
          <img src="avatar.png" className='h-11 w-11 rounded-full'/>
           
           <ul className='flex flex-col '>

           <li className='text-[14px] text-mine-shaft-100 font-semibold bg-min'>{name}</li>

           </ul>

        </div>
      </Menu.Target>

      <Menu.Dropdown>
        <Menu.Label>Application</Menu.Label>
        <Menu.Item  color="#4f4f4f" leftSection={<IconSettings size={14} />} onClick={() => navigate("/profile")}>
          Profile
        </Menu.Item>
        <Menu.Item  color="#4f4f4f" leftSection={<IconMessageCircle size={14} />} onClick={() => navigate("/messaging")}>
          Messages
        </Menu.Item>
        <Menu.Item
           color="#4f4f4f"
          leftSection={<IconSearch size={14} />}
          
        >
          Search
        </Menu.Item>

        <Menu.Divider />

        <Menu.Label>Danger zone</Menu.Label>
    
        <Menu.Item onClick={() => handleLogoutPage()}
          color="red"
          leftSection={<IconTrash size={14} />}
        >
          Delete my account
        </Menu.Item>
      </Menu.Dropdown>
    </Menu>
  );
}

export default MenuBar;