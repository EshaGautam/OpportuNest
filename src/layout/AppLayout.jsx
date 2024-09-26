import React from 'react'
import { Outlet } from 'react-router-dom'
import Header from '@/components/Header'
const AppLayout = () => {
  return (
  <div >
    <div className='grid-background'></div>
    <main className='min-h-screen min-w-full container'>
        <Header/>
        <Outlet/>
    </main>
    <div></div>
  </div>
  )
}

export default AppLayout