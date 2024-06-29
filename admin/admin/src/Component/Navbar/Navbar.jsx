import axios from 'axios';
import React, { useEffect, useState, useRef } from 'react'
import toast from 'react-hot-toast';
import { Link, useNavigate } from 'react-router-dom'
//test
export default function Navbar({ AdminData, setAdminData }) {
  const [activeLink, setActiveLink] = useState(0);
  const [AdminName, setAdminName] = useState({});

  const handleLinkClick = (index) => {
    setActiveLink(index);
  };

  async function getAdminInfo() {
    let token = localStorage.getItem('AdminToken')
    let headers = {
      Authorization: `Bearer ${token}`
    }
    await axios(`${process.env.REACT_APP_API}/company/myProfile`, { headers }).catch((err) => {
      if (err?.response?.status == 401) {
        localStorage.clear()
        setAdminData(null)
        toast.error(err?.response?.data?.message)
      } else {
        toast.error(err?.response?.data?.message)
      }
    }).then((res) => {
      console.log(res);
      console.log(res?.data?.data);
      setAdminName(res?.data?.data)
    })
  }

  useEffect(() => {
    if (localStorage.getItem('AdminToken') != null) {
      getAdminInfo()
    }
  }, [])

  const navigate = useNavigate()

  async function logOut() {
    let token = localStorage.getItem('AdminToken')
    let headers = {
      // 'Content-Type': 'multipart/form-data',
      Authorization: `Bearer ${token}`
    }
    let { data } = await axios(`${process.env.REACT_APP_API}/company/logout`, { headers })
    localStorage.clear()
    setAdminData(null)
    navigate('/arc-admin/login')
    console.log(data);
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

  return <>
    {AdminData ? <nav className="navbar navbar-expand-lg mainColor text-white text-center px-5" ref={navbarRef}>
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
          <ul className="navbar-nav me-auto mb-lg-0 text-white text-uppercase align-items-center">
            <li className="nav-item">
              <Link onClick={() => handleLinkClick(0)} className={activeLink === 0 ? 'nav-link active text-white' : 'nav-link text-white'} aria-current="page" to='/arc-admin'>Company</Link>
            </li>
            <li className="nav-item">
              <Link onClick={() => handleLinkClick(2)} className={activeLink === 2 ? 'nav-link active text-white' : 'nav-link text-white'} to='addTaskType'>Add Task Type</Link>
            </li>
            <li className="nav-item">
              <Link onClick={() => handleLinkClick(3)} className={activeLink === 3 ? 'nav-link active text-white' : 'nav-link text-white'} to='sendNotifications'>Send Notifications</Link>
            </li>
            <li className="nav-item">
              <Link onClick={() => handleLinkClick(4)} className={activeLink === 4 ? 'nav-link active text-white' : 'nav-link text-white'} to='profile'>Profile</Link>
            </li>
          </ul>

          <ul className="navbar-nav ms-auto mb-lg-0 text-white text-uppercase align-items-center">
            <li className="nav-item">
              <Link className="nav-link text-white" onClick={logOut}>Logout</Link>
            </li>
          </ul>
        </div>
      </div>
    </nav> : null}
  </>
}
