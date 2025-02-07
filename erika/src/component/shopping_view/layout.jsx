import React from 'react'
import { Outlet } from 'react-router-dom'
import Shop_header from './header'
import Footer from './Footer'

const Shop_Layout = () => {
  return (
    <div className='flex flex-col bg-white relative'>
  <Shop_header />
  
  <main className='flex flex-col w-full'>
    <Outlet />
  </main>
  
  <Footer />
</div>
  )
}

export default Shop_Layout
