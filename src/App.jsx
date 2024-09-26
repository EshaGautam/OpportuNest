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
const router = createBrowserRouter([{
  element:<AppLayout/>,
  children:[
    {
      path:'/',
      element:<LandingPage/>
    },
    {
      path:'/onboarding',
      element:<LandingPage/>
    },
    {
      path:'/jobs',
      element:<JobsPage/>
    } ,
    {
      path:'/job/:id',
      element:<JobsPage/>
    },
    {
      path:'/post-jobs',
      element:<PostJobs/>
    },
    {
      path:'/saved-jobs',
      element:<SaveJobs/>
    },
    {
      path:'/my-jobs',
      element:<MyJobs/>
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
