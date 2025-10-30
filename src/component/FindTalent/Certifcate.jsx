import React from 'react'

const Certifcate = ({certificateList}) => {

  console.log(certificateList)
  return (
       <div className='mt-10 font-display border-b border-solid border-mine-shaft-800 pb-10'>
     
         
             <h1 className='text-mine-shaft-50 font-bold text-xl mb-6'>Certificate</h1>
     
     
             {(!certificateList || certificateList.length == 0) && <p className='text-mine-shaft-200 text-md'>No Certificate added yet</p>}
     
             <div className='flex flex-col gap-7'>
     
             {certificateList?.map((cer,index) =>(
     
        
                 <div className='flex justify-between items-center bg-mine-shaft-900 px-3.5 py-3.5 rounded-lg'>
                 <div className='flex items-center gap-3.5'>
                     <img src={`Icons/${cer.company}.png`} className='h-12 w-12 rounded-full p-2.5'/>
                     <div className='flex flex-col gap-1.5'>
                         <h2 className='text-mine-shaft-50 font-semibold'>{cer.title}</h2>
                         <p className='text-mine-shaft-200 text-[13px]'>{cer.company}</p>
                     </div>
     
                     </div>
     
                     <div className='text-mine-shaft-200 text-[15px]'>
                       
                      <p>{cer.issuedDate}</p>
     
                     </div>
     
                     </div>
               
             ))}
             </div>

             </div>
     
  )
}

export default Certifcate
