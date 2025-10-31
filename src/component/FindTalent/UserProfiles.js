import axios from "axios";
import { useEffect } from "react";
import { useSelector } from "react-redux";
import { useState } from "react";
import BASE_URL from '../config';

export const UserProfiles = () =>{

  const [users,setUsers] = useState([]);
  const token  = useSelector((state) => state.authlogin.user?.token);

  useEffect(() =>{

    const getUsers = async () =>{

     try{

         const response = await axios.get(`${BASE_URL}/getAllUsersInfo`,{
           
          
            headers:{
              Authorization:`Bearer ${token}`
            
           }
         })
         console.log(response.data)
         setUsers(response.data);
     }

     catch(error){
      console.log(error);

     }

    }

    getUsers();

  },[]);

  return users;


}

