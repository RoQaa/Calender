import React from 'react'
import { Outlet } from 'react-router-dom'
import CompanyNavbar from '../CompanyNavbar/CompanyNavbar.jsx'

export default function CompanyLayout({ setUserData }) {
    return <>
        <div className='min-vh-100'>
            <CompanyNavbar setUserData={setUserData}  />
            <Outlet></Outlet>
        </div>
    </>
}
