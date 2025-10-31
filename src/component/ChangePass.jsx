import React, { useState } from 'react'
import { useForm } from 'react-hook-form'
import { useLocation, useNavigate } from 'react-router-dom';
import axios from 'axios'
import BASE_URL from './config';

const ChangePass = () => {

     const location = useLocation();
     const email = location.state?.email;
     const navigate = useNavigate();

     const{register,handleSubmit,watch,formState:{errors}} = useForm({mode:'onChange'});
     const password = watch('password');

     const[send,setSend] = useState(false);

     const[data,setData] = useState('');

     const submitForm = async (data) =>{


      setSend(true);

    
          const response = await axios.post(`${BASE_URL}/changePassword`,{

             email:email,
             password:password

          });

      
      setData(response.data);

      setTimeout(()=> setData('') ,3000)
      setTimeout(() => navigate("/") ,4000)
      
      setSend(false);
    }

  return (
    <div className='h-[500px] flex justify-center items-center'>

        <form onSubmit={handleSubmit(submitForm)}className='flex flex-col gap-6 p-6 shadow-md shadow-mine-shaft-600 max-w-md w-full font-display'>

            <h1 className='text-2xl text-mine-shaft-100 font-bold text-center'>Change Password</h1>

              {data && <p className='bg-pink-400 text-white  text-center text-[14px] rounded-lg px-2 py-2'>{data}</p>}

            <div className='flex flex-col gap-1 text-[14px]'>
             <input type="password" 
                placeholder='Password'
                className={`shadow-xs shadow-mine-shaft-600  text-mine-shaft-200 border border-solid px-3 py-1.5 ${errors.password ? 'border-red-500' : 'border-mine-shaft-600'} focus:outline-none rounded-lg`}
                {...register('password',{required:'Password is required',pattern:{value:/^(?=.*[A-Z])(?=.*[a-z])(?=(?:.*\d){3,})(?=.*[\W]).+$/,
                                                         message:'Password must contain at least one uppercase letter, one lowercase letter, one special character, and at least 3 digits'}})}
                />

               {errors.password && <p className='text-red-500 text-[13px] ml-2'>{errors.password.message}</p>}

             </div>   
             
            <div className='flex flex-col gap-1 text-[14px]'>
            <input type="password" 
                  placeholder='Confirm your password'
                className={`shadow-xs shadow-mine-shaft-600  text-mine-shaft-200 border border-solid px-3 py-1.5 ${errors.confirmPass ? 'border-red-500' : 'border-mine-shaft-600'} focus:outline-none rounded-lg `}
                 {...register('confirmPass',{required:'Password is required',validate:value => value== password || 'Password do not match'})}
                 />

            {errors.confirmPass && <p className='text-red-500 ml-2 text-[13px]'>{errors.confirmPass.message}</p>}

            </div>

            <button disabled ={send} className={` text-mine-shaft-100 px-3 py-1.5 rounded-lg ${!send ? 'bg-bright-sun-400 hover:bg-bright-sun-500' : 'bg-mine-shaft-400 hover:bg-mine-shaft-500 cursor-not-allowed'} `}>
              Submit
            </button>
            
        </form>
      
    </div>
  )
}

export default ChangePass
