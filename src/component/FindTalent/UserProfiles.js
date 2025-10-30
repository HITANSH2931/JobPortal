import axios from "axios";
import { useEffect } from "react";
import { useSelector } from "react-redux";
import { useState } from "react";

export const UserProfiles = () =>{

  const [users,setUsers] = useState([]);
  const token  = useSelector((state) => state.authlogin.user?.token);

  useEffect(() =>{

    const getUsers = async () =>{

     try{

         const response = await axios.get("http://localhost:8080/getAllUsersInfo",{
           
          
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

