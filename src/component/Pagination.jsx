import { faArrowLeft, faArrowRight, faChevronLeft, faChevronRight } from '@fortawesome/free-solid-svg-icons'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import React from 'react'

const Pagination = ({jobs,filteredJobs,pageNo,setPageNo,setPageJobs}) => {

    const jobsPerPage = 8;
    const totalPages = Math.ceil(jobs.length/jobsPerPage);

    const totalPage = Array.from(
                      { length: Math.min(5, totalPages - pageNo + 1) },
                      (_, i) => i + Number(pageNo)
                     );

                     console.log(totalPage)

    const handleChange = (e) =>{

        const start = jobsPerPage*e.target.value-jobsPerPage;
        const end =   jobsPerPage*e.target.value;
   
        const sliceJobs = jobs.slice(start,end);
        setPageJobs(sliceJobs);
        setPageNo(e.target.value);

    }

    const handleLeft = (e) =>{

        const newPageNo = pageNo-1;
        console.log("hello")

        if(newPageNo == 0) return;

        console.log("end");

        const start = jobsPerPage*newPageNo-jobsPerPage;
        const end =   jobsPerPage*newPageNo;
   
        const sliceJobs = jobs.slice(start,end);
        setPageJobs(sliceJobs);
        setPageNo(newPageNo);
    }

    const handleRight = (e) =>{
        
        console.log("hello");

        if(pageNo == totalPages) return;

        console.log("end");

        const newPageNo = pageNo + 1;

        const start = jobsPerPage*newPageNo-jobsPerPage;
        const end =   jobsPerPage*newPageNo;
   
        const sliceJobs = jobs.slice(start,end);
        setPageJobs(sliceJobs);
        setPageNo(newPageNo);
    }

  return (

    <div>

     {!filteredJobs.length == 0 &&    
    <div className='mt-10 flex justify-center'>

        <div className='flex flex-wrap items-center gap-5'>

       
       {pageNo != 1 &&  ( <FontAwesomeIcon onClick={handleLeft} icon={faChevronLeft} className='text-mine-shaft-50 bg-mine-shaft-700 hover:bg-mine-shaft-800 px-4 py-3.5 rounded-lg'/>)}

        {totalPage.map((page,index) =>(

            <button key={index} value={page} onClick={(e) => handleChange(e)} 
            className={`text-mine-shaft-50 ${pageNo == page ? 'bg-bright-sun-500 text-mine-shaft-100' :'bg-mine-shaft-700 hover:bg-mine-shaft-800'}  px-5 py-2.5 rounded-lg`}>{page}</button>

        ))}

        {pageNo !=totalPages && <FontAwesomeIcon onClick={handleRight} icon={faChevronRight} className='text-mine-shaft-50 bg-mine-shaft-700 hover:bg-mine-shaft-800 px-4 py-3.5 rounded-lg'/>}
        </div>
       
       
      
    </div>}

    </div>

    
  )
}

export default Pagination
