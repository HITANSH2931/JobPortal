import { faEdit, faFloppyDisk, faPlus, faTrash } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import React from 'react'
import { useState } from 'react';
import EditCert from './EditCert';
import { useDispatch, useSelector } from 'react-redux';
import axios from 'axios';
import { addCertificate, deleteCertificate } from '../../redux/Profile';
import { useForm } from 'react-hook-form';

const Certification = () => {

   
   const[edit,setEdit] = useState(false);
   const[editCer,setEditCer]  = useState(false);
   const[editCert,setEditCert]  = useState(-1);

   const dispatch = useDispatch();
   const token = useSelector((state) => state.authlogin.user.token)
   const certificateList = useSelector((state) => state.profile.certificateList)
   const[send,setSend] = useState(false);

   const {register,handleSubmit,reset,formState:{errors,isValid}} = useForm({mode:'onChange'});


   const handleSave = async (data) =>{


    setSend(true);

      try{
     const response = await axios.post(`${BASE_URL}/addCert`,{
        ...data
       },{
        headers:{
          Authorization:`Bearer ${token}`
        }
       });

       dispatch(addCertificate(response.data));
      }

      catch(error){

        console.log(error);
      }

      finally{

       setEdit(false)
       setSend(false);
      }

   }

   const handleDelete = async (cert) =>{

      try{
           
          const response = await axios.post(`${BASE_URL}/deleteCert/${cert.id}`,{},{

            headers:{
              Authorization:`Bearer  ${token}`
            }
          })
      }

      catch(error){

        console.log(error);
      }

      dispatch(deleteCertificate(cert));
        
    }


  return (
    <div className='mt-10 font-display'>

        <div className='flex justify-between  item-center'>
        <h1 className='text-mine-shaft-50 font-bold text-xl mb-6'>Certificate</h1>

        <div className='flex gap-3.5'>
             
             {!editCer ? 
            (<FontAwesomeIcon  icon={faEdit} onClick={() => setEditCer(!editCer)} className='text-bright-sun-400 text-xl' />) : 
            (<FontAwesomeIcon icon={faFloppyDisk} onClick={() => setEditCer(!editCer)}  className='text-bright-sun-400 text-xl'/>)}
            <FontAwesomeIcon  icon={faPlus} onClick={() => setEdit(!edit)} className='text-bright-sun-400 text-xl'/>

        </div>

        </div> 

        {certificateList.length == 0 && <p className='text-mine-shaft-200 text-md'>No Certificate added yet</p>}

        <div className='flex flex-col gap-7'>

        {certificateList?.map((cer,index) =>(

          <div>

          {editCert == index? (<EditCert certificate={cer} setEditCert={setEditCert} />) : 

          (<div>
            <div className='flex flex-wrap justify-between gap-y-3 items-center bg-mine-shaft-900 px-3.5 py-3.5 rounded-lg'>
            <div className='flex items-center gap-3.5'>
                <img src={`Icons/${cer.company}.png`} className='h-12 w-12 rounded-full p-2.5'/>
                <div className='flex flex-col gap-0.5'>
                    <h2 className='text-mine-shaft-50 font-semibold'>{cer.title}</h2>
                    <p className='text-mine-shaft-200 text-[13px]'>{cer.company}</p>
                </div>

                </div>

                <div className='text-mine-shaft-200 text-[15px]'>
                  
                 <p>{cer.issuedDate}</p>

                </div>

                </div>

                {editCer && <div className='ml-2 flex items-center gap-3.5 mt-4 text-[14px]'>
                           
                           <FontAwesomeIcon  icon={faEdit} onClick={() => setEditCert(index)} className='text-bright-sun-400 text-xl'/>
                           <FontAwesomeIcon onClick={() => handleDelete(cer)} icon={faTrash} className='text-red-500 text-xl'/>
       
                           </div>}

                           </div>)}


                           </div>
          
        ))}
        </div>

         {edit && <form className='mt-5' onSubmit={handleSubmit(handleSave)}>

            <h1 className='text-mine-shaft-50 font-bold text-xl mt-8 mb-7'>Add Certificate</h1>
             
            <div className='grid grid-cols-1 sm:grid-cols-2 gap-4.5'>
            
            <div className='flex flex-col  text-[13px] gap-1.5'>
            <h1 className='text-mine-shaft-50 text-[16px] font-semibold'>Company</h1>
            <select  defaultValue  = ""  name="company"   {...register('company',{required:'Company is required'})}
               
        
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
                <input type="text" name="title"   className='text-mine-shaft-200 px-1.5 py-1 border border-solid border-mine-shaft-800 rounded-lg focus:outline-none'
                {...register('title',{required:'Title is required'})}
               
                />

                {errors.title && <p className='text-red-500 text-[13px] ml-2'>{errors.title.message}</p>}

            </div>
           
           <div className='text-[13px] flex flex-col gap-2'>
                <h1 className='text-[16px] font-semibold text-mine-shaft-50'>Issued Date</h1>
                <input type="month" name="issuedDate"  className='text-mine-shaft-200 px-1.5 py-1 border  border-solid border-mine-shaft-800 rounded-lg focus:outline-none'
                  {...register('issuedDate',{required:'Issued Date is required'})}
               
                />

             {errors.issuedDate && <p className='text-red-500 text-[13px] ml-2'>{errors.issuedDate.message}</p>}

            </div>
            
            </div>
            
              <div className='flex gap-3 mt-4 font-display text-[14px]'>

             <button disabled={send}  className={`text-bright-sun-400 bg-mine-shaft-800 rounded-xl px-2.5 py-2 ${send ? 'cursor-not-allowed' : ''}`}>Save</button>
             <button type="button" onClick={() => setEdit(!edit)} className='text-red-500 bg-mine-shaft-800 rounded-xl px-2.5 py-2'>Cancel</button>
             
             </div>
     
      </form>}
      
    </div>
  )
}

export default Certification
