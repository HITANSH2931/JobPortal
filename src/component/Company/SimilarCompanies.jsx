import { faUpRightFromSquare } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import React from 'react'

const SimilarCompanies = () => {

    const companies = [
  {
    name: "Google",
    employeeSize: "190,000+"
  },
  {
    name: "Amazon",
    employeeSize: "1,500,000+"
  },
  {
    name: "Adobe",
    employeeSize: "29,000+"
  },
  {
    name:"Netflix",
    employeeSize: "13,000+"
  },
  {
    name: "Spotify",
    employeeSize: "9,000+"
  },
  {
    name: "Apple",
    employeeSize: "160,000+"
  },
  {
    name: "Meta",
    employeeSize: "66,000+"
  }
];

  return (
    <div className='flex flex-col gap-6'>

        <h1 className='text-xl text-mine-shaft-100 font-bold text-center'>Similar Companies</h1>

            <div className='flex flex-col gap-7'>
            
            {companies.map((com,index) =>(

                <div className='flex justify-between items-center'>

                <div className='flex gap-3.5 items-center'>
                    <img src={`/Icons/${com.name}.png`}  className='h-10 w-10 bg-mine-shaft-800 p-1.5 rounded-lg'/>

                    <div className='flex flex-col gap-0.5'>
                        <strong className='text-mine-shaft-100 text-[15px] font-semibold'>{com.name}</strong>
                        <p className='text-mine-shaft-300 text-[13px]'>{com.employeeSize}</p>
                    </div>
                </div>

                <div>

                    <FontAwesomeIcon icon={faUpRightFromSquare} className='text-bright-sun-500 text-xl'/>

                </div>

                </div>
            ))}

         
        </div>
      
    </div>
  )
}

export default SimilarCompanies
