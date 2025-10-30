import React from 'react'

const Subscribe = () => {
  return (
    <div className='font-display mt-32 mx-10 border border-solid bg-mine-shaft-900 px-10 py-8 rounded-xl grid grid-cols-1 md:grid-cols-2 items-center gap-16'>

      <div >
        <h1 className='text-center text-mine-shaft-100 font-bold text-4xl'>Never Wants to Miss Any <span className='text-bright-sun-400'>Job News?</span></h1>
      </div>


        <div className='border border-solid bg-mine-shaft-700 rounded-lg grid  sm:grid-cols-2 grid-cols-1 p-2 '>
        <input type="text" placeholder="Enter your email" className='text-mine-shaft-300 text-xl focus:outline-none pl-3'/>
        <button className='text-mine-shaft-100 bg-bright-sun-400 m-2 px-1.5 py-1  rounded-lg hover:bg-bright-sun-500'>Subscribe</button>
        </div>

    </div>
  )
}

export default Subscribe
