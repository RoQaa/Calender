import React from 'react'
import { Link, useNavigate } from 'react-router-dom'
import axios from 'axios';

export default function CompanyNavbar({ setUserData }) {
  const navigate = useNavigate()
  let token = localStorage.getItem('CompanyToken')
  let headers = {
    // 'Content-Type': 'multipart/form-data',
    Authorization: `Bearer ${token}`
  }
  async function logOut() {
    let { data } = await axios(`http://localhost:5000/api/company/logout`, { headers })
    localStorage.clear()
    setUserData(null)
    navigate('/companyLogin')
    console.log(data);
  }



  return <>
    <nav className="navbar navbar-expand-lg mainColor text-white text-center px-5 ">
      <div className="container   ">
        <h2 className="navbar-brand text-white fs-1 text-capitalize fw-bolder"><i class="fa-solid fa-calendar-days"></i> Calendar</h2>
        <button className="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarSupportedContent" aria-controls="navbarSupportedContent" aria-expanded="false" aria-label="Toggle navigation">
          <span className="navbar-toggler-icon "></span>
        </button>
        <div className="collapse navbar-collapse" id="navbarSupportedContent">




          <ul className="navbar-nav me-auto    mb-lg-0 text-white   text-uppercase align-items-center">
            <li className="nav-item">
              <Link className="nav-link text-white" aria-current="page" to='/'>Home</Link>
            </li>
            <li className="nav-item">
              <Link className="nav-link text-white" aria-current="page" to='addEmploye'>Add Employe</Link>
            </li>
            <li className="nav-item">
              <Link className="nav-link text-white" aria-current="page" to='addTask'>Add Task</Link>
            </li>
            <li className="nav-item">
              <Link className="nav-link text-white" aria-current="page" to='comapnyTasks'>Tasks</Link>
            </li>

            <li className="nav-item">
              <Link className="nav-link text-white" aria-current="page" to='companyProfile'>profile</Link>
            </li>







          </ul>

          <ul className="navbar-nav ms-auto    mb-lg-0 text-white   text-uppercase align-items-center">
            <li className="nav-item">
              <Link onClick={() => { logOut() }} className="nav-link text-white" to='companyLogin'>Logout</Link>
            </li>
          </ul>

        </div>
      </div>
    </nav >
  </>
}
