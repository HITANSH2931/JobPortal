import React, { useState } from 'react'
import { useForm } from 'react-hook-form'
import { Link, useNavigate } from 'react-router-dom'
import axios from 'axios'
import BASE_URL from './config';

const Forgot = () => {

    const{register,handleSubmit,reset,formState:{errors}} = useForm({mode:'onChange'})

    const navigate = useNavigate();

    const[data,setData] = useState('');

    const[send,setSend]  =useState(false)

    const submitForm  = async (data) =>{

      console.log(data);

      setSend(true)

      try{
      

          const response = await axios.post(`${BASE_URL}/verifyEmail/${data.email}`)

           reset();

           navigate("/otp",{ state:{email:data.email}});

      }

      catch(e){

        setData(e.response.data);

        setTimeout(() => setData(''),7000)
      }

      setSend(false)
      
    }



  return (
    <div className='h-[500px] flex justify-center items-center'>

      <form onSubmit={handleSubmit(submitForm)} className='flex flex-col gap-6 p-6 max-w-md w-full shadow-lg shadow-mine-shaft-600 font-display'>

        <h1 className='text-2xl text-mine-shaft-100 font-bold text-center'>Verify your Email</h1>

        {data && <p className='bg-pink-400 text-white text-center text-[14px] px-2 py-2 rounded-lg'>{data} </p>}

        <div className='flex flex-col gap-1 text-[14px]'>
            <input type="email" 
                  placeholder='Enter your email'
                  className={`shadow-xs shadow-mine-shaft-600  text-mine-shaft-200 border border-solid px-3 py-1.5 ${errors.email ? 'border-red-500' : 'border-mine-shaft-600'}  focus:outline-none rounded-lg`}
                  {...register('email',{required:'Email is Required',pattern:{value: /^[^\s@]+@[^\s@]+\.[^\s@]+$/,message:'Enter valid Email'}})}/>

                  {errors.email && <p className='text-red-500 text-[13px] ml-2'>{errors.email.message}</p>}

        </div>
       
       <button disabled={send} className={`w-full  px-2  py-1.5 rounded-lg text-mine-shaft-100  ${send ? 'bg-mine-shaft-400 hover:bg-mine-shaft-500 cursor-not-allowed' : 'bg-bright-sun-400 hover:bg-bright-sun-500'}`}
       
       >{send ? 'Verifying' : 'Verify'}</button>

      </form>
      
    </div>
  )
}

export default Forgot
