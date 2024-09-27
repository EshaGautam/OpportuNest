/* eslint-disable react/prop-types */
import { Navigate, useLocation } from "react-router-dom";
import { useUser } from "@clerk/clerk-react";

const ProtectedRoute = ({ children }) => {
  const { isSignedIn, isLoaded, user } = useUser();
  const { pathname } = useLocation();

  if (!isLoaded) {
    return null; 
  }


  if (!isSignedIn) {
    return <Navigate to="/?sign-in=true" />;
  }

  if (user && user.unsafeMetadata?.role === undefined && pathname !== '/onboarding') {
    return <Navigate to='/onboarding' />;
  }

  return children;
};

export default ProtectedRoute;
