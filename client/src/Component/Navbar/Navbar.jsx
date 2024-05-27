import React, { useState } from 'react'
import { Link } from 'react-router-dom'
//test
export default function Navbar() {
  const [activeLink, setActiveLink] = useState(0);

  const handleLinkClick = (index) => {
    setActiveLink(index);
  };
  return <>
    <nav className="navbar navbar-expand-lg mainColor text-white text-center px-5 ">
      <div className="container-fluid  ">
        <h2 className="navbar-brand text-white fs-1 text-capitalize fw-bolder"><i class="fa-solid fa-calendar-days"></i> Calendar</h2>
        <button className="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarSupportedContent" aria-controls="navbarSupportedContent" aria-expanded="false" aria-label="Toggle navigation">
          <span className="navbar-toggler-icon "></span>
        </button>
        <div className="collapse navbar-collapse" id="navbarSupportedContent">




          <ul className="navbar-nav me-auto    mb-lg-0 text-white   text-uppercase align-items-center">


            <li className="nav-item">
              <Link onClick={() => handleLinkClick(0)} className={activeLink === 0 ? 'nav-link active  text-white' : 'nav-link text-white'} aria-current="page" to='/arc-admin'>Company</Link>
            </li>

            <li className="nav-item">
              <Link onClick={() => handleLinkClick(1)} className={activeLink === 1 ? 'nav-link active  text-white' : 'nav-link text-white'} to='createAccount'>Create Acount</Link>
            </li>
            <li className="nav-item">
              <Link onClick={() => handleLinkClick(2)} className={activeLink === 2 ? 'nav-link active  text-white' : 'nav-link text-white'} to='addTaskType'>Add Task Type</Link>
            </li>
            <li className="nav-item">
              <Link onClick={() => handleLinkClick(3)} className={activeLink === 3 ? 'nav-link active  text-white' : 'nav-link text-white'} to='sendNotifications'>Send Notifications</Link>
            </li>
            <li className="nav-item">
              <Link onClick={() => handleLinkClick(4)} className={activeLink === 4 ? 'nav-link active  text-white' : 'nav-link text-white'} to='profile'>Profile</Link>
            </li>



          </ul>

          <ul className="navbar-nav ms-auto    mb-lg-0 text-white   text-uppercase align-items-center">


            <li className="nav-item">
              <div className='nav-link text-white '>

                <h5>
                  <img className='img-fluid rounded-circle col-2 me-2 shadow-lg p-2' src="https://img.freepik.com/free-photo/portrait-man-laughing_23-2148859448.jpg?size=338&ext=jpg&ga=GA1.1.553209589.1714694400&semt=ais" alt="" />
                  Mohamed</h5>



              </div>
            </li>
            <li className="nav-item">
              <Link className="nav-link text-white" to='login'>Logout</Link>
            </li>
          </ul>

        </div>
      </div>
    </nav >
  </>
}
