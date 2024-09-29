import { getSingleJob } from '@/api/apiJobs';
import React, { useEffect } from 'react'
import { BarLoader } from 'react-spinners';
import { useUser } from '@clerk/clerk-react';
import { useParams } from 'react-router-dom';
import useFetch from '@/hooks/useFetch';
import { Briefcase, DoorClosedIcon, DoorOpenIcon, MapPinIcon } from 'lucide-react';
import MDEditor from '@uiw/react-md-editor';

const JobsPage = () => {
  const {isLoaded,user}= useUser()
  const {id} = useParams()

  
  const {
    loading: loadingJobs,
    data: job,
    fn: fnJob,
  } = useFetch(getSingleJob, {job_id:id });

   useEffect(()=>{
    if(isLoaded){
      fnJob()
    }
   },[isLoaded])

   
  if (!isLoaded || loadingJobs) {
    return <BarLoader className="mb-4" width={"100%"} color="#36d7b7" />;
  }


  return (
    <div className='flex flex-col gap-8 px-10'>
      <div className='flex flex-col-reverse gap-6 md:flex-row justify-between items-center'>
        <h1 className='gradient-title font-extrabold pb-3 text-4xl sm:text-6xl'>{job?.title}</h1>
        <img src={job?.company?.logo_url} className='h-12' alt={job?.title}/>
      </div>
      <div className='flex justify-between'>
        <div className='flex gap-2'>
          <MapPinIcon/>
          {job?.location}
        </div>
        <div className='flex gap-2'>
          <Briefcase/>
          {job?.application?.length}Applicants
        </div>
        <div className='flex gap-2'>
        
          {job?.isOpen?<><DoorOpenIcon/>Open</> : <><DoorClosedIcon/>Close</>}
        </div>

      </div>
      <h2 className='text-2xl sm:text-3xl font-bold'>About the job</h2>
      <p className='sm:text-lg'>{job?.description}</p>
      <h2 className='text-2xl sm:text-3xl font-bold'> What we are looking for</h2>
      <MDEditor.Markdown source={job?.requirements} className='bg-transparent text-white  sm:text-lg wmde-markdown' />
    </div>
  )
}

export default JobsPage 