import { faAnchor } from '@fortawesome/free-solid-svg-icons'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faFacebook, faInstagram, faTelegram, faTwitter } from '@fortawesome/free-brands-svg-icons';

import React from 'react'

const Footer = () => {
  return (
    <>
    <div className='mt-28 grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 mx-10 font-display gap-5'>

        <div className='flex flex-col gap-3 ' >

            <div className='flex items-center gap-2 mx-auto'>
                <FontAwesomeIcon icon={faAnchor} className='text-bright-sun-400 text-xl '/>
                <h1 className='text-bright-sun-400 font-bold text-xl'>JobHook</h1>
            </div>

            <p className='text-mine-shaft-300 text-[14px] text-center'>Job portal with user profiles, skill updates, certifications, work experience and admin job postings</p>

               <div className='flex gap-3 my-3 mx-auto'>
                <FontAwesomeIcon icon={faInstagram} className='text-bright-sun-400 text-xl bg-mine-shaft-900 rounded-4xl p-2'/>
                <FontAwesomeIcon icon={faFacebook} className='text-bright-sun-400 text-xl bg-mine-shaft-900 rounded-4xl p-2'/>
                <FontAwesomeIcon icon={faTwitter} className='text-bright-sun-400 text-xl bg-mine-shaft-900 rounded-4xl p-2'/>
                 <FontAwesomeIcon icon={faTelegram} className='text-bright-sun-400 text-xl bg-mine-shaft-900 rounded-4xl p-2'/>
             </div>

        </div>

        <div className='flex flex-col gap-3 mx-auto'>

         <h1 className='text-bright-sun-400 font-bold text-xl '>Product</h1>

            <div className='flex flex-col gap-0.5'>
            <p className='text-mine-shaft-300 text-[14px] hover:text-bright-sun-400 hover:ml-3'>Find Job</p>
            <p className='text-mine-shaft-300 text-[14px] hover:text-bright-sun-400 hover:ml-3'>Find Company</p>
            <p className='text-mine-shaft-300 text-[14px] hover:text-bright-sun-400 hover:ml-3'>Find Employee</p>
            </div>

        </div>

         <div className='flex flex-col  gap-3 mx-auto  '>

            <h1 className='text-bright-sun-400 font-bold text-xl '>Company</h1>

            <div className='flex flex-col  gap-0.5'>
            <p className='text-mine-shaft-300 text-[14px] hover:text-bright-sun-400 hover:ml-3'>About Us</p>
            <p className='text-mine-shaft-300 text-[14px] hover:text-bright-sun-400 hover:ml-3'>Contact Us</p>
            <p className='text-mine-shaft-300 text-[14px] hover:text-bright-sun-400 hover:ml-3'>Privacy Policy</p>
          </div>

          

        </div>

        <div className='flex flex-col gap-3 mx-auto'>

            <h1 className='text-bright-sun-400 font-bold text-xl '>Support</h1>

            <div className='flex flex-col gap-0.5'>
            <p className='text-mine-shaft-300 text-[14px] hover:text-bright-sun-400 hover:ml-3'>Help & Support</p>
            <p className='text-mine-shaft-300 text-[14px] hover:text-bright-sun-400 hover:ml-3'>Feedback</p>
            <p className='text-mine-shaft-300 text-[14px] hover:text-bright-sun-400 hover:ml-3'>FAQS</p>
            </div>

        </div>

      
    </div>


    <div className='font-display border-t border-t-mine-shaft-700 py-8 mt-10'>
        <h1 className='text-mine-shaft-300 font-semibold text-center text-md'>Designed and Developed By  <span className='text-bright-sun-400'>Hitansh Joshi</span></h1>
    </div>

     
    </>
  )
}

export default Footer
