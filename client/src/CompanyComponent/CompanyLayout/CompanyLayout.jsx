import React from 'react'
import { Outlet } from 'react-router-dom'
import CompanyNavbar from '../CompanyNavbar/CompanyNavbar.jsx'

export default function CompanyLayout({setnewNot, newNot, setUserData, Nots }) {
    return <>
        <div className='min-vh-100'>
            <CompanyNavbar setnewNot={setnewNot} newNot={newNot} setUserData={setUserData} Nots={Nots} />
            <Outlet></Outlet>
        </div>
    </>
}
