import { getSingleJob, updateHiringStatus } from '@/api/apiJobs';
import React, { useEffect } from 'react'
import { BarLoader } from 'react-spinners';
import { useUser } from '@clerk/clerk-react';
import { useParams } from 'react-router-dom';
import useFetch from '@/hooks/useFetch';
import { Briefcase, DoorClosedIcon, DoorOpenIcon, MapPinIcon } from 'lucide-react';
import MDEditor from '@uiw/react-md-editor';
import { Select,SelectContent,SelectGroup,SelectItem,SelectTrigger,SelectValue } from '@/components/ui/select';
import ApplyJobDrawer from '@/components/ApplyJobDrawer';
import ApplicationCard from '@/components/ApplicationCard';
const JobsPage = () => {
  const {isLoaded,user}= useUser()
  const {id} = useParams()


  
  const {
    loading: loadingJobs,
    data: job,
    fn: fnJob,
  } = useFetch(getSingleJob, {job_id:id });
  
  const {
    loading: loadingHiringStatus,
    fn: fnHiringStatus,
  } = useFetch(updateHiringStatus, {job_id:id });

  const handleStatusChange = (value) => {
    const isOpen = value === "open";
    fnHiringStatus(isOpen).then(() => fnJob());
  };



   useEffect(()=>{
    if(isLoaded){
      fnJob()
    }
   },[isLoaded])

   
  if (!isLoaded || loadingJobs) {
    return <BarLoader className="mb-4" width={"100%"} color="#36d7b7" />;
  }


  return (
    <div className='flex flex-col gap-8 px-10 mt-20'>
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
          {job?.applications?.length} Applicants
        </div>
        <div className='flex gap-2'>
        
          {job?.isOpen?<><DoorOpenIcon/>Open</> : <><DoorClosedIcon/>Close</>}
        </div>

    

      </div>
      {loadingHiringStatus && <BarLoader width={"100%"} color="#36d7b7" />}
      {job?.recruiter_id == user?.id && (
        <Select onValueChange={handleStatusChange}>
          <SelectTrigger
            className={`w-full ${job?.isOpen ? "bg-green-950" : "bg-red-950"}`}
          >
            <SelectValue
              placeholder={
                "Hiring Status " + (job?.isOpen ? "( Open )" : "( Closed )")
              }
            />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="open">Open</SelectItem>
            <SelectItem value="closed">Closed</SelectItem>
          </SelectContent>
        </Select>
      )}
      <h2 className='text-2xl sm:text-3xl font-bold'>About the job</h2>
      <p className='sm:text-lg'>{job?.description}</p>
      <h2 className='text-2xl sm:text-3xl font-bold'> What we are looking for</h2>
      <MDEditor.Markdown source={job?.requirements} className='bg-transparent text-white  sm:text-lg wmde-markdown' />
      {/* render applications  */}
      { job?.recruiter_id !== user?.id && <ApplyJobDrawer job={job} user={user} fetchJob={fnJob} applied={job?.applications?.find((ap)=>ap.candidate_id === user.id)}/> }
      {loadingHiringStatus && <BarLoader width={"100%"} color="#36d7b7" />}
      {job?.applications?.length > 0 && job?.recruiter_id === user?.id && (
        <div className="flex flex-col gap-2">
          <h2 className="font-bold mb-4 text-xl ml-1">Applications</h2>
          {job?.applications.map((application) => {
            return (
              <ApplicationCard key={application.id} application={application} />
            );
          })}
        </div>
      )}
    </div>
  )
}

export default JobsPage 