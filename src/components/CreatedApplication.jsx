import React from 'react'
import { useUser } from '@clerk/clerk-react';
import { getApplications } from '@/api/apiApplication';
import ApplicationCard from './ApplicationCard';
import useFetch from '@/hooks/useFetch';
import { useEffect } from 'react';
import { BarLoader } from 'react-spinners';

const CreatedApplication = () => {
    const { user } = useUser();
    const {
      loading: loadingApplications,
      data: applications,
      fn: fnApplications,
    } = useFetch(getApplications, {
      user_id: user.id,
    });
    useEffect(() => {
        fnApplications();
      }, []);

      console.log(applications)
      if (loadingApplications) {
        return <BarLoader className="mb-4" width={"100%"} color="#36d7b7" />;
      }
    

      return (
        <div className="flex flex-col gap-2">
          {applications?.map((application) => {
            return (
              <ApplicationCard
                key={application.id}
                application={application}
                isCandidate={true}
              />
            );
          })}
        </div>
      );
}

export default CreatedApplication