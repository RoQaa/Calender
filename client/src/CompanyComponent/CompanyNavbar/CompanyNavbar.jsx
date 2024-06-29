import React, { useEffect, useState, useRef } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import axios from 'axios';

export default function CompanyNavbar({ setnewNot, newNot, setUserData, Nots }) {
  const navigate = useNavigate()
  // const [Nots, setNots] = useState([])

  async function logOut() {
    let token = localStorage.getItem('CompanyToken')
    let headers = {
      // 'Content-Type': 'multipart/form-data',
      Authorization: `Bearer ${token}`
    }
    await axios(`${process.env.REACT_APP_API}/company/logout`, { headers }).then((data) => {
      localStorage.clear()
      setUserData(null)
      navigate('/companyLogin')
      console.log(data);
    })
  }



  const [isNavbarOpen, setIsNavbarOpen] = useState(false);
  const navbarRef = useRef(null);

  const handleToggle = () => {
    setIsNavbarOpen(!isNavbarOpen);
  };

  const handleClickOutside = (event) => {
    if (navbarRef.current && !navbarRef.current.contains(event.target)) {
      setIsNavbarOpen(false);
    }
  };

  useEffect(() => {
    if (isNavbarOpen) {
      document.addEventListener('mousedown', handleClickOutside);
    } else {
      document.removeEventListener('mousedown', handleClickOutside);
    }

    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, [isNavbarOpen]);

  return (
    <nav className="navbar navbar-expand-lg mainColor text-white px-5" ref={navbarRef}>
      <div className="container">
        <h2 className="navbar-brand text-white fs-1 text-capitalize fw-bolder">
          <i className="fa-solid fa-calendar-days"></i> Calendar
        </h2>
        <button
          className="navbar-toggler"
          type="button"
          data-bs-toggle="collapse"
          data-bs-target="#navbarSupportedContent"
          aria-controls="navbarSupportedContent"
          aria-expanded={isNavbarOpen ? "true" : "false"}
          aria-label="Toggle navigation"
          onClick={handleToggle}
        >
          <span className="navbar-toggler-icon"></span>
        </button>

        <div className={`collapse navbar-collapse ${isNavbarOpen ? 'show' : ''}`} id="navbarSupportedContent">
          <ul className="navbar-nav me-auto mb-lg-0 text-white text-uppercase align-items-start">
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

          <ul className="navbar-nav ms-auto mb-lg-0 text-white text-uppercase align-items-start">
            <li className="nav-item m-2">
              <div className="dropdown" onClick={() => { setnewNot(false) }}>
                {newNot ? <>
                  <span className=' fs-4 fw-bolder text-danger'>"</span>
                  <i className="fa-regular fa-bell fs-4  " data-bs-toggle="dropdown" aria-expanded="false"></i>
                  <span className='fs-4 fw-bolder text-danger'>"</span>
                </>
                  : <>
                    <i className="fa-regular fa-bell fs-4" data-bs-toggle="dropdown" aria-expanded="false"></i>

                  </>
                }
                <Link to="companyNotifaction">
                  <ul className="dropdown-menu dropdown-menu2 p-3 dropdown-menu-start dropdown-menu-lg-end">
                    {Nots.length === 0 ? (
                      <li>
                        <div className="dropdown-item">
                          <div className="toast-header">
                            <strong className="me-auto">don't have Notifactions</strong>
                          </div>
                        </div>
                      </li>
                    ) : null}
                    {Nots?.map((not, index) => (
                      <React.Fragment key={index}>
                        <li>
                          <div className="dropdown-item">
                            <div className="toast-header">
                              <img src="https://img.freepik.com/free-photo/portrait-man-laughing_23-2148859448.jpg?size=338&ext=jpg&ga=GA1.1.553209589.1714694400&semt=ais" className="rounded overflow-hidden col-1 me-2" alt="..." />
                              <strong className="me-auto">Bootstrap</strong>
                              <small>11 mins ago</small>
                            </div>
                            <div className="toast-body ms-4 ps-3 text-truncate">
                              {not?.description}
                            </div>
                          </div>
                        </li>
                        <li><hr className="dropdown-divider" /></li>
                      </React.Fragment>
                    ))}
                  </ul>
                </Link>
              </div>
            </li>
            <li className="nav-item">
              <Link onClick={logOut} className="nav-link text-white" to='companyLogin'>Logout</Link>
            </li>
          </ul>
        </div>
      </div>
    </nav>
  );
};

