import React from 'react'

const CompanyInfo = () => {

    const  specialities = [
    "Search Engine",
    "Online Advertising (AdWords, AdSense)",
    "Cloud Computing",
    "Android Operating System",
    "Artificial Intelligence",
    "YouTube",
    "Productivity Tools (Gmail, Google Docs)"
  ]

  return (
    <div className='mt-8 flex flex-col gap-6'>

        <div className='flex flex-col gap-1 border-b border-solid border-mine-shaft-800 pb-8'>

            <h3 className='text-lg text-mine-shaft-100 font-semibold'>Overview</h3>
            <p className='text-[15px] text-mine-shaft-300'>Google LLC is an American multinational technology company that specializes in Internet-related services and products, including a powerful search engine, online advertising technologies, cloud computing, software, and hardware. It is considered one of the Big Five tech companies</p>

        </div>

        <div className='flex flex-col gap-1 border-b border-solid border-mine-shaft-800 pb-8'>

             <h3 className='text-lg  text-mine-shaft-100 font-semibold'>Industry</h3>
            <p className='text-[15px] text-mine-shaft-300'>Information Technology & Services</p>

        </div>

        <div className='flex flex-col gap-1 border-b border-solid border-mine-shaft-800 pb-8'>

             <h3 className='text-lg  text-mine-shaft-100 font-semibold'>Link</h3>
           <a
            href="https://www.google.com"
            target="_blank"
            rel="noopener noreferrer"
           className="hover:underline text-[15px] text-mine-shaft-300 "
           >
            www.google.com
         </a>
            
        </div>

        <div className=' flex flex-col gap-1 border-b border-solid border-mine-shaft-800 pb-8'>

            <strong className='text-mine-shaft-100 text-lg font-semibold'>Specialities</strong>

            <ul className='text-mine-shaft-300 text-[15px] flex flex-wrap gap-3'> 

            {specialities.map((spec,index) =>(

                <li>{spec}</li>
            ))}

            </ul>
        </div>
      
    </div>
  )
}

export default CompanyInfo
