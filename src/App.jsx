import { useState } from 'react'

import './App.css'
import AppLayout from './layout/AppLayout'
import LandingPage from './pages/landing'
import { createBrowserRouter, RouterProvider } from 'react-router-dom'
import JobsPage from './pages/jobs'
import MyJobs from './pages/my-jobs'
import PostJobs from './pages/post-jobs'
import SaveJobs from './pages/save-jobs'
import { ThemeProvider } from './components/theme-provider'
import OnBoarding  from './pages/onboarding'
import ProtectedRoutes from './components/protected-route'
import JobListing from './pages/job-listings'
const router = createBrowserRouter([{
  element:<AppLayout/>,
  children:[
    {
      path:'/',
      element:<LandingPage/>
    },
    {
      path:'/onboarding',
      element:(
      <ProtectedRoutes>
        <OnBoarding />
      </ProtectedRoutes>)
    },
    {
      path:'/jobs',
      element:(
      <ProtectedRoutes>
        <JobListing/>
      </ProtectedRoutes>)
    } ,
    {
      path:'/job/:id',
      element:(
      <ProtectedRoutes>
        <JobsPage/>
      </ProtectedRoutes>)
    },
    {
      path:'/post-jobs',
      element:(
      <ProtectedRoutes>
        <PostJobs/>
      </ProtectedRoutes>)
    },
    {
      path:'/saved-jobs',
      element:(
      <ProtectedRoutes>
       <SaveJobs/>
      </ProtectedRoutes>)
    },
    {
      path:'/my-jobs',
      element:(
      <ProtectedRoutes>
        <MyJobs/>
      </ProtectedRoutes>)
    },

  ]
}])



function App() {
  const [count, setCount] = useState(0)

  return (
    <ThemeProvider defaultTheme="dark" storageKey="vite-ui-theme">
    <RouterProvider router={router}/>
  </ThemeProvider>
 
  )
}

export default App
