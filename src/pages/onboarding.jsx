import { useUser } from '@clerk/clerk-react';
import { Button } from '@/components/ui/button';
import React, { useEffect } from 'react';
import { BarLoader } from 'react-spinners';
import { useNavigate } from 'react-router-dom';

const OnBoarding = () => {
  const { user, isLoaded } = useUser();
  const navigate = useNavigate();

  const navigateUser = (role) => {
    const route = role === '/recruiter' ? '/post-jobs' : '/jobs';
    navigate(route);
  };

  const handleRoleSelection = async (role) => {
    try {
      await user.update({ unsafeMetadata: { role } });
      navigateUser(role);
    } catch (error) {
      console.error("Error updating role:", error);
    }
  };

  useEffect(() => {
    if (isLoaded && user?.unsafeMetadata?.role) {
      navigateUser(user.unsafeMetadata.role);
    }
  }, [isLoaded, user?.unsafeMetadata?.role, navigate]);

  if (!isLoaded) {
    return <BarLoader className='mb-4' width={"100%"} color="#36d7b7" />;
  }

  return (
    <div className='flex flex-col items-center justify-center mt-32'>
      <h2 className='gradient-title font-extrabold sm:text-8xl tracking-tighter'>I am a...</h2>
      <div className='mt-16 grid grid-cols-2 gap-4 w-full md:px-40'>
        <Button variant='blue' className='h-36 text-2xl' onClick={() => handleRoleSelection("candidate")}>
          Candidate
        </Button>
        <Button variant='destructive' className='h-36 text-2xl' onClick={() => handleRoleSelection("recruiter")}>
          Recruiter
        </Button>
      </div>
    </div>
  );
};

export default OnBoarding;
