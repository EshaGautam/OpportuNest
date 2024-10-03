import React from "react";
import { useUser } from "@clerk/clerk-react";
import { BarLoader } from "react-spinners";
import CreatedApplication from "@/components/CreatedApplication";
import CreatedJob from "@/components/CreatedJob";

const MyJobs = () => {
  const { isLoaded, user } = useUser();

  if (!isLoaded) {
    return <BarLoader className="mt-4" width={"100%"} color="#36d7b7" />;
  }
  return (
    <div>
      <h1 className="flex flex-col items-center justify-center gradient-title text-4xl font-extrabold sm:text-6xl lg:text-8xl tracking-tighter py-4">
        {user?.unsafeMetadata?.role === "candidate"
          ? "My Applications"
          : "My Jobs"}
      </h1>
      {user?.unsafeMetadata?.role === "candidate"
          ? <CreatedApplication/>
          : 
          <CreatedJob/>}
    </div>
  );
};

export default MyJobs;
