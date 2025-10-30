import React from 'react'
import Marquee from "react-fast-marquee";
import { useSelector } from 'react-redux';

const Companies = () => {

     const isLogout = useSelector((state) => state.authlogin.isLogout);   
     const company = ["Amazon","Figma","Google","Meta","Microsoft","Oracle","Pinterest","Slack","Spotify","Walmart","youtube","Netflix","image"]

     return (
    <>
    <div className='font-display mt-36 sm:mt-10 mb-14'>

        <h1 className='text-mine-shaft-100 text-4xl text-center font-semibold'>Trusted  By <span className='text-bright-sun-300'>1000+</span>  Companies</h1>

       
   </div>  

    {!isLogout && <Marquee pauseOnHover={true} speed={60}>

        
            {company.map((com, index) => (

             <div key={index} className='ml-28  px-2 py-0.5 hover:border-solid : hover:rounded-xl hover:bg-mine-shaft-800' >
            <img src={`${com}.png`} className='h-16 w-32' />
           </div>
        
          ))}

         
            
            
        </Marquee>}
        </>
  
  )
}

export default Companies
