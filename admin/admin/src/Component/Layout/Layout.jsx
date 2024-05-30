import React from 'react'
import Navbar from '../Navbar/Navbar.jsx'
import Users from '../Users/Users.jsx'
import { Outlet } from 'react-router-dom'

export default function Layout({ AdminData ,saveAdminData}) {
  return <>
    <div className='min-vh-100'>
      <Navbar AdminData={AdminData} saveAdminData={saveAdminData} />
      <Outlet></Outlet>
    </div>
  </>
}
