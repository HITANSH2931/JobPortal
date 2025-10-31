import axios from 'axios';
import React from 'react'
import { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { updateCertificate } from '../../redux/Profile';
import { useForm } from 'react-hook-form';
import BASE_URL from './config';

const EditCert = ({certificate,setEditCert}) => {


    const dispatch = useDispatch();
    const token = useSelector((state) => state.authlogin.user.token)

    const[send,setSend] = useState(false);

    const {register,handleSubmit,reset,formState:{errors,isValid}} = useForm({mode:'onChange',defaultValues:certificate});

    const handleSave = async (data) =>{

       setSend(true);
   
       try{
        
        const response = await axios.post(`${BASE_URL}/updateCert/${data.id}`,{

          ...data
        },{
          headers:{
            Authorization:`Bearer ${token}`
          }
        }) }

        catch(error){

          console.log(error);
        }

        finally{
        
        dispatch(updateCertificate(data));
       
        setEditCert(-1);

        setSend(false);

        }

    }

    const handleCancel = (e) =>{

      setEditCert(-1);
    }


  return (
    <div>

      <form className='mt-3 font-display' onSubmit={handleSubmit(handleSave)}>

            <h1 className='text-mine-shaft-50 font-bold text-lg mb-7'>Edit Certificate</h1>
             
            <div className='grid grid-cols-1 sm:grid-cols-2 gap-4.5'>
            
            <div className='flex flex-col  text-[13px] gap-1.5'>
            <h1 className='text-mine-shaft-50 text-[16px] font-semibold'>Company</h1>
            <select   name="company"  {...register('company',{required:'Company is required'})}
               
        
         className='w-full bg-mine-shaft-950 text-mine-shaft-200  border border-solid border-mine-shaft-800 rounded-lg p-1.5 focus:outline-none'>
            
            <option value="" disabled>Select Company</option>
            <option value="Google">Google</option>
            <option value="Amazon">Amazon</option>
            <option value="Meta">Facebook</option>
            <option value="Netflix">Netflix</option>
            <option value="Oracle">Oracle</option>
            <option value="Spotify">Spotify</option>
            <option value="Walmart">Walmart</option>
            <option value="Pinterest">Pinterest</option>
         </select>

           {errors.company && <p className='text-red-500 text-[13px] ml-2'>{errors.company.message}</p>}


            </div>

            <div className='text-[13px] flex flex-col gap-2'>
                <h1 className='text-[16px] font-semibold text-mine-shaft-50'>Title</h1>
                <input type="text"  name="title" className='text-mine-shaft-200 px-1.5 py-1 border border-solid border-mine-shaft-800 rounded-lg focus:outline-none'
                {...register('title',{required:'Title is required'})}
               
                />

              {errors.title && <p className='text-red-500 text-[13px] ml-2'>{errors.title.message}</p>}

            </div>
           
           <div className='text-[13px] flex flex-col gap-2'>
                <h1 className='text-[16px] font-semibold text-mine-shaft-50'>Issued Date</h1>
                <input type="month"   name="issuedDate" className='text-mine-shaft-200 px-1.5 py-1 border  border-solid border-mine-shaft-800 rounded-lg focus:outline-none'
                 {...register('issuedDate',{required:'Issued Date is required'})}
               
                />

             {errors.issuedDate && <p className='text-red-500 text-[13px] ml-2'>{errors.issuedDate.message}</p>}
 
            </div>
            
            </div>
            
              <div className='flex gap-3 mt-4 font-display text-[14px]'>

             <button disabled={send} className={`text-bright-sun-400 bg-mine-shaft-800 hover:bg-mine-shaft-800 hover:text-bright-sun-500 rounded-xl px-2.5 py-2 ${send ? 'cursor-not-allowed' : ''}`}>Save</button>
             <button type="button" onClick={(e) => handleCancel(e)} className='text-red-500 bg-mine-shaft-800 hover:bg-mine-shaft-900 hover:text-red-600  rounded-xl px-2.5 py-2'>Cancel</button>
             
             </div>
     
      </form>
      
    </div>
  )
}

export default EditCert
