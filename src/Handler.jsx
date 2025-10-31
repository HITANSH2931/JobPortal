import React, { useEffect, useState } from 'react'
import { useNavigate } from 'react-router-dom';
import { useForm } from 'react-hook-form';
import axios from 'axios';
import { useDispatch, useSelector } from 'react-redux';
import { login } from './redux/UserRedux';
import RetrieveInformation from './component/RetrieveInformation';
RetrieveInformation
import BASE_URL from './config';

const Handler = () => {

    const navigate = useNavigate();
    const { register, handleSubmit, formState: { errors } } = useForm();
    const dispatch = useDispatch();
    const query = new URLSearchParams(window.location.search);
    const [loading,setLoading] = useState(false);

     const {
            getAppliedJobs,
            getSavedJobs,
            getClosedJobs,
            getDraftJobs,
            getPostedJobs,
            getProfileInfo
            } = RetrieveInformation();
 

    useEffect(() =>{

    const idParam = query.get("id");
    const tokenParam = query.get("token");
    const nameParam = query.get("name");
    const emailParam = query.get("email");
    const roleParam = query.get("role");

    if(!(roleParam == "null")){

     dispatch(login({id:idParam,token:tokenParam,name:nameParam,email:emailParam,role:roleParam}))

       if(roleParam == "APPLICANT"){
          
          getAppliedJobs(tokenParam);
          getSavedJobs(tokenParam);

         }
        
        else{
         getClosedJobs(tokenParam);
         getDraftJobs(tokenParam);
         getPostedJobs(tokenParam);
        }


        getProfileInfo(tokenParam)

        navigate("/")

    }


    },[])

    const handleSend = async (data)=>{

      setLoading(true);

      try{

      const response = await axios.get(`${BASE_URL}/addRole`,{

        params:{
          role:data.role,
          email:query.get("email")
        }
       
      })

      dispatch(login(response.data));

        if(response.data.role == "APPLICANT"){
          
          getAppliedJobs(response.data.token);
          getSavedJobs(response.data.token);

         }
        
        else{
         getClosedJobs(response.data.token);
         getDraftJobs(response.data.token);
         getPostedJobs(response.data.token);
        }


        getProfileInfo(response.data.token)
    }

    catch(error){

      console.log(error)
    }

    finally{

      navigate("/");
      setLoading(false);
    }
       
    }

    
  return (
    <div className='flex justify-center items-center h-[500px]'>

        <form onSubmit={handleSubmit(handleSend)} className='w-[360px] p-12 bg-mine-shaft-900 flex flex-col gap-9 rounded-lg'>

            <h1 className='text-mine-shaft-100 font-bold text-xl text-center'>Select Role</h1>
             
             <div className='flex justify-between'>
             <div className='flex flex-col gap-2'>

                <div className='flex gap-3'>
                <input type="radio" className='text-mine-shaft-100 accent-bright-sun-500' value="APPLICANT"
               {...register('role',{required:'Role is required'})}
               
                />
                <strong className='text-mine-shaft-100'>Applicant</strong>
                </div>

                {errors.role && <p className='text-red-500 text-[14px] ml-2'>{errors.role.message}</p>}


             </div>

              <div className='flex flex-col gap-2'>

                <div className='flex gap-3'>
                <input type="radio" className='text-mine-shaft-100 accent-bright-sun-500' value="RECRUITER"
                 {...register("role",{required:'Select a Role'})} />

                <strong className='text-mine-shaft-100'>Recruiter</strong>
                </div>

                 {errors.role && <p className='text-red-500 text-[14px] ml-2'>{errors.role.message}</p>}


             </div>

             </div>

             


             <button disabled={loading} className={`text-mine-shaft-100 bg-bright-sun-500 px-2.5 py-2 rounded-lg hover:bg-bright-sun-600 ${loading ? 'cursor-not-allowed' : ''}`}>Submit</button>


        </form>

      
    </div>
  )
}

export default Handler
