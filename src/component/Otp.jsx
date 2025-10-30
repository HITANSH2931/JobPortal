import React, { useEffect, useRef, useState } from 'react'
import { useLocation, useNavigate } from 'react-router-dom';
import axios from 'axios';

const Otp = () => {

  const [input,setInput] = useState(new Array(5).fill(''));
  const inputRef = useRef([]);
  const [seconds,setSeconds]  = useState(59);
  const [minute,setMinute] = useState(1);
  const navigate = useNavigate();
  const location = useLocation();
  const email = location.state?.email;
  const[data,setData] = useState('');

  const [res,setRes] = useState('')
  const[send,setSend] = useState(false);


  useEffect(()=> {

    if(minute == 0 && seconds == 0) return;

    if(seconds == 0) {
      
      setMinute(minute-1);
      setSeconds(59);

    }

   const interval = setInterval(()=>{
      
    console.log("hello",seconds)
     
      

      setSeconds(seconds-1); 
       
    },1000)

    return () => {
        
      console.log("clean",seconds);
     
      
      clearInterval(interval)
    };

  },[seconds]);

  const handleChange = (e,index) =>{

    if(isNaN(input[index])) return

    const newIn = [...input];

    newIn[index] = e.target.value.slice(-1);
    
    setInput(newIn);

    setRes(newIn.join(''));

    inputRef.current[index+1]?.focus();
  }

  const handleDown = (e,index) =>{

       if(e.key === 'Backspace'){

        const newInput = [...input];

          if(input[index]){

          
          newInput[index] = '';

          setInput(newInput);

          }

          else{

            if(index == 0) return;
              
        
          newInput[index-1] = '';

          setInput(newInput);

          inputRef.current[index-1]?.focus();
          }

          setRes(newInput.join(''))
            
           
       }
      }
       const handleReset = async () =>{

           if(seconds == 0 && minute ==0){

              setSeconds(59);
              setMinute(1);
           

           const response = await axios.get(`http://localhost:8080/resendCode/${email}`)

           console.log(response.data);

           setData(response.data);

           setTimeout(()=> setData(''),9000);

           }


       }

       const handleSubmit =async  (e) =>{

          e.preventDefault();

          setSend(true);

          try{
              
            const response = await axios.get("http://localhost:8080/verifyCode",{

              params:{
                email:email,
                code:res
              }
            });

            console.log(response.data);

             navigate("/password",{state:{email:email}});
          }

          catch(e){

            setData(e.response.data);

            setTimeout(()=>setData(''),7000);

              
          }

          setSend(false);

         
       }
       
  

  return (
    <div className='h-[500px] flex justify-center items-center'>

        <form className='flex flex-col gap-9 max-w-md w-full shadow-lg shadow-mine-shaft-600 p-6 font-display'>

            <h1 className='text-2xl text-center text-mine-shaft-100 font-bold'>Enter the Otp</h1>

              {data && <p className='bg-pink-400 text-white text-center text-[14px] px-2 py-2 rounded-lg leading-8 '>{data}</p>}

            <div className='flex justify-between'>
              <p onClick={()=> handleReset()} disabled = {!(seconds == 0 && minute == 0)} className={` text-[14px]  ${minute == 0 && seconds == 0 ? 'text-bright-sun-400 hover:border-b hover: border-bright-sun-400' : 'cursor-not-allowed text-mine-shaft-300 hover:border-b hover: border-mine-shaft-300'}`}>Resend Code</p>
              <p className='text-mine-shaft-300 text-[14px]'>Time Left : 0{minute} : {seconds < 10 ? `0${seconds}` : seconds}</p>
            </div>

            <div className='flex justify-around'>
              
              {input.map((inp,index) =>(

                 <input type="text"
                        key={index}
                        value={inp} 
                        ref={(ele) => inputRef.current[index] = ele}
                        onChange={(e) => handleChange(e,index)}
                        onKeyDown={(e) => handleDown(e,index)}
                        className=' text-mine-shaft-50 border border-solid border-mine-shaft-600 focus:outline-none text-center py-2 w-[50px]' />
                
              ))}
               
            </div>

            <button onClick ={(e)=>handleSubmit(e)} disabled={seconds == 0 && minute == 0 || res.length < 5 || send} className={` px-2 py-2 rounded-lg text-mine-shaft-100 ${send || seconds == 0 && minute == 0 || res.length !=5 ? 'bg-mine-shaft-400 hover:bg-mine-shaft-500 cursor-not-allowed' : 'bg-bright-sun-400 hover:bg-bright-sun-500 '} `}
            
             >{send ? 'Submitting' : 'Submit'}</button>

        </form>
      
    </div>
  )
}

export default Otp
