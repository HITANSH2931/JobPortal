import React, { useState } from 'react'
import { useForm } from 'react-hook-form'
import { Link, useNavigate } from 'react-router-dom';
import  axios  from 'axios'
import BASE_URL from './config';

const SignUp = () => {

     const[data,setData] = useState('');

     const[send,setSend] = useState(false)

     const navigate = useNavigate();

    const {register,handleSubmit,reset,watch,formState:{errors}}=  useForm({mode:'onChange',defaultValues:{
      role:""
    }});

    const password = watch('password');

    const submitForm = async (data) =>{

      setSend(true);

    try{   
     const response =  await axios.post(`${BASE_URL}/signUp`,{
       
        name:data.name,
        email:data.email,
        password:data.password,
        role:data.role,
        authProvider:"LOCAL"


      });


      reset();
      navigate("/login")

    }
    catch(e){
        
      setData(e.response.data);

       setTimeout(()=> setData(''),7000)
    }

     setSend(false);
        
    }

  return (
    <div className='h-[700px] flex justify-center items-center bg-blue'>

        <form onSubmit={handleSubmit(submitForm)} className='flex flex-col gap-8 p-6 shadow-lg shadow-mine-shaft-600 font-display max-w-md w-full'>
            <h1 className='text-2xl font-bold text-center text-mine-shaft-100'>Create Account</h1>

            {data && <p className='bg-pink-400 text-white  text-center text-[14px] rounded-lg px-2 py-2'>{data}</p>}
            
            <div className='flex flex-col gap-1 text-[14px]'>
            <input type="text" 
                placeholder='Enter your name'
                className={`shadow-xs shadow-mine-shaft-600  text-mine-shaft-200 border border-solid px-3 py-1.5 ${errors.name ? 'border-red-500' : 'border-mine-shaft-600'} focus:outline-none rounded-lg`}
                {...register('name',{required:'Name is required'})} />

            {errors.name && <p className='text-red-500 text-[13px] ml-2'>{errors.name.message}</p>}

            </div>
            
            <div className='flex flex-col gap-1 text-[14px]'>
            <input type="email" 
                  placeholder='Enter your email'
                  className={`shadow-xs shadow-mine-shaft-600  text-mine-shaft-200 border border-solid px-3 py-1.5 ${errors.email ? 'border-red-500' : 'border-mine-shaft-600'}  focus:outline-none rounded-lg`}
                  {...register('email',{required:'Email is Required',pattern:{value: /^[^\s@]+@[^\s@]+\.[^\s@]+$/,message:'Enter valid Email'}})}/>

                  {errors.email && <p className='text-red-500 text-[13px] ml-2'>{errors.email.message}</p>}

            </div>
             
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

            <div className='flex justify-between'>

             <div className='flex flex-col gap-2'>

                <div className='flex gap-3'>
                <input type="radio" value="APPLICANT" className='bg-gray-200 accent-bright-sun-500' 
               {...register('role',{required:'Role is required'})}
               
                />
                <strong className='text-mine-shaft-200'>Applicant</strong>
                </div>

                {errors.role && <p className='text-red-500 text-[13px] ml-2'>{errors.role.message}</p>}


             </div>

              <div className='flex flex-col gap-2'>

                <div className='flex gap-3'>
                <input type="radio" value="RECRUITER" className='bg-gray-200 accent-bright-sun-500'
               {...register('role',{required:'Role is required'})}
               
                />
                <strong className='text-mine-shaft-200'>Recruiter</strong>
                </div>

                {errors.role && <p className='text-red-500 text-[13px] ml-2'>{errors.role.message}</p>}



             </div>

             </div>

           

            <button disabled={send} className={` text-mine-shaft-100 px-3 py-1.5 rounded-lg  ${send ? 'bg-mine-shaft-400 cursor-not-allowed hover:bg-mine-shaft-500' : 'bg-bright-sun-400 hover:bg-bright-sun-500'}`}
            
            >{send ? 'Submitting' : 'Submit'}</button>

            <div className='flex justify-center gap-2 text-[14px]  text-mine-shaft-200'>
                <p>Already Have an Account ?</p>
                <Link to="/login" className="hover:text-bright-sun-400">SignIn</Link>
            </div>
        </form>
      
    </div>
  )
}

export default SignUp
