import React from 'react'
import Navbar from '../Navbar/Navbar.jsx'
import Users from '../Users/Users.jsx'
import { Outlet } from 'react-router-dom'

export default function Layout({ setAdminData, AdminData, saveAdminData, AdminInfo, setAdminInfo }) {
  return <>
    <div className='min-vh-100'>
      <Navbar setAdminData={setAdminData} setAdminInfo={setAdminInfo} AdminData={AdminData} saveAdminData={saveAdminData} AdminInfo={AdminInfo} />
      <Outlet></Outlet>
    </div>
  </>
}
