import React from 'react'
import { Outlet } from 'react-router-dom'
import Header from '@/components/Header'
const AppLayout = () => {
  return (
  <div >
    <div className='grid-background'></div>
    <main className='min-h-screen  container '>
        <Header/>
        <Outlet/>
    </main>
    <div className="p-10 text-center bg-[#009688] mt-28">
       Connecting Talents To Opportunity......
      </div>
  </div>
  )
}

export default AppLayout