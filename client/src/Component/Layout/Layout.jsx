import React from 'react'
import Navbar from '../Navbar/Navbar.jsx'
import Users from '../Users/Users.jsx'
import { Outlet } from 'react-router-dom'

export default function Layout() {
  return <>
  <Navbar/>
  <div>
  <Outlet></Outlet>

  </div>
  </>
}
