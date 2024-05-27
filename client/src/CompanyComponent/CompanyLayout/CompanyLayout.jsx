import React from 'react'
import { Outlet } from 'react-router-dom'
import CompanyNavbar from '../CompanyNavbar/CompanyNavbar.jsx'

export default function CompanyLayout({setUserData,userData}) {
    return <>
        <CompanyNavbar setUserData={setUserData } userData={userData}/>
        <Outlet></Outlet>
    </>
}
