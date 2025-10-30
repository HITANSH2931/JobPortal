import React from 'react'
import { Carousel, CarouselSlide } from '@mantine/carousel';
import { useSelector } from 'react-redux';

const JobCategory = () => {

    const jobCategories = [
  {
    title: "Web Developer",
    description: "Build and maintain websites for clients",
    newJobs: "2k+ new job posted"
  },
  {
    title: "Arts & Design",
    description: "Create visual content for branding and media",
    newJobs: "500+ new job posted"
  },
  {
    title: "UI-UX Designer",
    description: "Design user interfaces and enhance user experience",
    newJobs: "800+ new job posted"
  },
  {
    title: "Content Writing",
    description: "Write and edit content for various platforms",
    newJobs: "1.5k+ new job posted"
  },
  {
    title: "Data Entry",
    description: "Input data into systems accurately and efficiently",
    newJobs: "1k+ new job posted"
  },
  {
    title: "Customer Support",
    description: "Assist customers with inquiries and issues",
    newJobs: "1.2k+ new job posted"
  },
  {
    title: "Sales",
    description: "Sell products and services to customers",
    newJobs: "900+ new job posted"
  },
  {
    title: "Finance",
    description: "Manage financial records and transactions",
    newJobs: "700+ new job posted"
  },
  {
    title: "Human Resource",
    description: "Recruit, manage, and support company employees",
    newJobs: "600+ new job posted"
  }
];

 const isLogout = useSelector((state) => state.authlogin.isLogout);

  return (

    <>
    <div className='font-display mt-24  mb-28 flex justify-center'>

        <div className='flex flex-col gap-5 w-[700px]'>
        <h1 className='font-bold text-4xl text-center text-mine-shaft-100'> Browse <span className='text-bright-sun-400'>Job</span> Category</h1>
        <p className='text-xl text-mine-shaft-300 text-center '>Explore diverse job opportunites tailored to your skills. Start your career journey today!</p>
         </div>

    </div>


   {!isLogout &&  <Carousel
      withIndicators
      height={250}
      slideSize="25%"
      slideGap="md"
      emblaOptions={{ loop: true, align: 'start', slidesToScroll: 4 }}
    >
     
     {jobCategories.map((cat,index) =>(

       <Carousel.Slide>
          
          <div className='font-display w-[280px] border border-solid border-bright-sun-500 px-2 py-4 flex flex-col gap-2.5 rounded-md hover:shadow-lg hover:shadow-bright-sun-500'>
             
             <img src={`${cat.title}.png`} className='h-12 w-12  bg-bright-sun-400 rounded-4xl p-2 mx-auto'/>
            
             <h1 className='font-bold text-mine-shaft-100 text-xl text-center'>{cat.title}</h1>
             <p className='text-mine-shaft-300 text-center'>{cat.description}</p>
            <p className='text-bright-sun-400 text-lg text-center'>{cat.newJobs}</p>
          </div>
          
       </Carousel.Slide>

     ))}

    </Carousel>}


    </>
)
}

export default JobCategory;
