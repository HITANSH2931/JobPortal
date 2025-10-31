import React, { useEffect, useState } from 'react'
import {useForm } from 'react-hook-form';
import { Link, useNavigate } from 'react-router-dom';
import axios from 'axios';
import  { useDispatch, useSelector} from 'react-redux'
import { login } from '../redux/UserRedux.js';
import RetrieveInformation from './RetrieveInformation.jsx';
import BASE_URL from './config';

const Login = () => {

     const[data,setData] = useState('');
     const navigate = useNavigate();
     const {register,handleSubmit,reset,formState:{errors,isValid}} = useForm({mode:'onChange'});
     const[send,setSend] = useState(false)

     const[error,setError] = useState('');

     const query = new URLSearchParams(window.location.search);
  
     const {
            getAppliedJobs,
            getSavedJobs,
            getClosedJobs,
            getDraftJobs,
            getPostedJobs,
            getProfileInfo
            } = RetrieveInformation();


     const dispatch  = useDispatch();

     useEffect(() =>{

      let timer;

        if(query.get("message")){
           
         setError(query.get("message"))
         timer =  setTimeout(()=> setError(''),6000);
        }

        return () =>{

          if(timer) clearTimeout(timer);
        } 

    
     },[])

     const SubmitForm = async (data) =>{

        setSend(true)

        try{

          const response = await axios.post(`${BASE_URL}/login`,{

            email:data.email,
            password:data.password
          });

        
          dispatch(login(response.data))

          reset();

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

          navigate("/")
           
        }
        catch(e){

          console.log(e);

          setData(e.response.data);

          setTimeout(()=> setData(''),7000);
        }


        setSend(false)
     }

     const googlelogin  = async () => {

       window.location.href = `${BASE_URL}/oauth2/authorization/google`

     }

      const githublogin  = () => {

         window.location.href = `${BASE_URL}/oauth2/authorization/github`

     }


  return (


    <div className='h-[500px] flex justify-center items-center font-display '>

        <form onSubmit = {handleSubmit(SubmitForm)}className='flex flex-col gap-6 border border-solid border-mine-shaft-800 max-w-md w-full p-6 shadow-lg shadow-mine-shaft-600'>


            <h1 className='text-mine-shaft-100 font-bold text-2xl text-center'>Login</h1>
             
             {error && <p className='bg-pink-400 text-white text-center text-[14px] px-2 py-2 rounded-lg'>{error}</p>}
             {data && <p className='bg-pink-400 text-white text-center text-[14px] px-2 py-2 rounded-lg'>{data} Invalid Email or Password</p>}
            
            <div className='flex flex-col gap-2 text-[14px]'>
            <input  type="text" 
                    placeholder="Enter your email"
                    className={` text-mine-shaft-100 px-3 py-2 rounded-lg border border-solid focus:outline-none shadow-xs shadow-mine-shaft-600 ${!errors.email ? 'border-mine-shaft-600' : 'border-red-500'} `}
                              
                    {...register('email',{required:'Email is required'})}
             />

             {errors.email && <p className='text-red-500 text-[13px] ml-2'>{errors.email.message}</p>}

             </div>


            <div className='text-[14px] flex flex-col gap-2'>

            <input     type="password" 
                       placeholder='Enter your password' 
                       className={`text-mine-shaft-100 px-3 py-2 rounded-lg border border-solid focus:outline-none shadow-xs shadow-mine-shaft-600 ${!errors.password ? 'border-mine-shaft-600' : 'border-red-500'}`}

                       {...register('password',{required:'Password is required',minLength:{value:5,message:'Password length should be Atleast 5'}})}
                       />

              {errors.password && <p className='text-red-500 text-[13px] ml-2'>{errors.password.message}</p>}           

            
            </div>

             
             
             <div className='text-[16px]'>
            <button disabled = {send} className={`text-mine-shaft-50  px-2 py-1.5 rounded-lg  w-full ${!send ? 'bg-bright-sun-400 hover:bg-bright-sun-500 ' : 'bg-mine-shaft-400 hover:bg-mine-shaft-500 cursor-not-allowed'} `}
            
            >{send ?'Submitting' : 'Submit'}</button>
            </div>

            <div className='flex flex-col gap-2'>
            
            <div className='flex justify-center items-center gap-2'>
                 
                <Link to="/forgot" className='hover:text-bright-sun-400 text-mine-shaft-200 text-[14px]'>Forgot Password ? </Link>
                <Link to="/sign-up" className='hover:text-bright-sun-300 text-mine-shaft-200 text-[14px]'>SignUp</Link>

            </div>

            </div>

             <div className="flex items-center gap-2">
                     <div className="flex-grow border-t border-gray-300"></div>
                     <p className="text-mine-shaft-200 text-[13px] text-center hover:text-bright-sun-300">Or Continue with</p>
                     <div className="flex-grow border-t border-gray-300"></div>
             </div>


              <div onClick={googlelogin} className='font-display flex justify-center items-center gap-3 px-2 py-1.5 rounded-lg bg-mine-shaft-50 hover:bg-mine-shaft-100 text-[14px]  shadow-md shadow-mine-shaft-500'>
              <img src="OIP (1).jpg" className='h-5 w-5'/>
              <button type = "button" className='text-mine-shaft-950'>Login with Google</button>
              </div>

              <div onClick={githublogin} className='font-display flex justify-center items-center gap-3 px-2 py-1.5 rounded-lg bg-mine-shaft-50 hover:bg-mine-shaft-100 text-[14px] shadow-md shadow-mine-shaft-500'>
              <img src="github-mark.png" className='h-6 w-6'/>
              <button type = "button" className='text-mine-shaft-950'>Login with Github</button>
              </div>
           
        </form>
      
    </div>
  )
}

export default Login
