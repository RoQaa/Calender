import './App.css';
import { RouterProvider, createBrowserRouter } from 'react-router-dom';
import WOW from 'wowjs';
import Layout from './Component/Layout/Layout.jsx';
import Users from './Component/Users/Users.jsx';
import AddTaskType from './Component/AddTaskType/AddTaskType.jsx';
import CreateAccount from './Component/CreateAccount/CreateAccount.jsx';
import Profile from './Component/Profile/Profile.jsx';
import SendNotifications from './Component/SendNotifications/SendNotifications.jsx';
import Login from './Component/Login/Login.jsx';
import NotFound from './Component/NotFound/NotFound.jsx';
import { useEffect, useState } from 'react';
import Employees from './Component/Employees/Employees.jsx';
import CompanyLayout from './CompanyComponent/CompanyLayout/CompanyLayout.jsx';
import CompanyScren from './CompanyComponent/CompanyScren/CompanyScren.jsx';
import CompanyLogin from './CompanyComponent/CompanyLogin/CompanyLogin.jsx';
import AddEmploye from './CompanyComponent/AddEmploye/AddEmploye.jsx';
import CompanyProfile from './CompanyComponent/CompanyProfile/CompanyProfile.jsx';
import AddTask from './CompanyComponent/AddTask/AddTask.jsx';
import ComapnyTasks from './CompanyComponent/CompanyTasks/CompanyTasks.jsx';
import EmployeProfile from './CompanyComponent/EmployeProfile/EmployeProfile.jsx';
import AddCompany from './Component/AddCompany/AddCompany.jsx';
import CompanyWelcome from './CompanyComponent/CompanyWelcome/CompanyWelcome.jsx';
import CompanyWelcomeii from './CompanyComponent/CompanyWelcomeii/CompanyWelcomeii.jsx';
import toast, { Toaster } from 'react-hot-toast';
import axios from 'axios'
import ProtactecdRoute from './CompanyComponent/ProtactecdRoute/ProtactecdRoute.jsx';
import ProtactecdAdminRoute from './Component/ProtactecdAdminRoute/ProtactecdAdminRoute.jsx';

// import {config}from 'dotenv'

function App() {

  const [userData, setUserData] = useState(null)

  const [AdminData, setAdminData] = useState(null)




  function saveData() {
    setUserData(localStorage.getItem('CompanyToken'))
  }

  function saveAdminData() {
    setAdminData(localStorage.getItem('AdminToken'))
  }

  async function getUserInfo() {
    let token = localStorage.getItem('CompanyToken')
    let headers = {
      Authorization: `Bearer ${token}`
    }
    await axios(`http://localhost:5000/api/company/myProfile`, { headers }).catch((err) => {
      if (err?.response?.status == 401) {
        localStorage.clear()
        setUserData(null)
        toast.error(err?.response?.data?.message)
        console.log(err?.response?.data?.message);

      } else {
        console.log(err?.response?.data?.message);
        toast.error(err?.response?.data?.message)
      }
    }).then((res) => {
      console.log(res);
      console.log(res.data.data);
    })
  }

  async function getAdminInfo() {
    let token = localStorage.getItem('AdminToken')
    let headers = {
      Authorization: `Bearer ${token}`
    }
    await axios(`http://localhost:5000/api/company/myProfile`, { headers }).catch((err) => {
      if (err?.response?.status == 401) {
        localStorage.clear()
        setUserData(null)
        toast.error(err?.response?.data?.message)
      } else {
        toast.error(err?.response?.data?.message)
      }
    }).then((res) => {
      console.log(res);
      console.log(res.data.data);
    })
  }

  useEffect(() => {
    if (localStorage.getItem('CompanyToken') != null) {
      saveData()
      getUserInfo()
    }
    if (localStorage.getItem('AdminToken') != null) {
      saveAdminData()
      getAdminInfo()
    }
  }, [])



  let routes = createBrowserRouter([
    {
      path: 'arc-admin', element: <Layout />, children: [
        { index: true, element: <ProtactecdAdminRoute><Users /></ProtactecdAdminRoute> },
        { path: 'addTaskType', element: <ProtactecdAdminRoute> <AddTaskType /></ProtactecdAdminRoute> },
        { path: 'createAccount', element: <ProtactecdAdminRoute> <CreateAccount /></ProtactecdAdminRoute> },
        { path: 'addCompany', element: <ProtactecdAdminRoute> <AddCompany /> </ProtactecdAdminRoute> },
        { path: 'profile', element: <ProtactecdAdminRoute> <Profile /> </ProtactecdAdminRoute> },
        { path: 'sendNotifications', element: <ProtactecdAdminRoute> <SendNotifications /></ProtactecdAdminRoute> },
        { path: 'employees', element: <ProtactecdAdminRoute> <Employees /></ProtactecdAdminRoute> },
        { path: 'login', element: <Login /> },
        { path: '*', element: <ProtactecdAdminRoute> <NotFound /></ProtactecdAdminRoute> }
      ]
    },
    {
      path: '', element: <CompanyLayout setUserData={setUserData} />,
      children: [
        { index: true, element: <ProtactecdRoute> <CompanyScren setUserData={setUserData} /></ProtactecdRoute> },
        { path: 'addEmploye', element: <ProtactecdRoute> <AddEmploye setUserData={setUserData} /> </ProtactecdRoute> },
        { path: 'addTask', element: <ProtactecdRoute> <AddTask setUserData={setUserData} /> </ProtactecdRoute> },
        { path: 'comapnyTasks', element: <ProtactecdRoute> <ComapnyTasks setUserData={setUserData} /></ProtactecdRoute> },
        { path: 'companyProfile', element: <ProtactecdRoute> <CompanyProfile setUserData={setUserData} /></ProtactecdRoute> },
        { path: 'companyLogin', element: <CompanyLogin saveData={saveData} /> },
        { path: 'employeProfile/:id', element: <ProtactecdRoute> <EmployeProfile setUserData={setUserData} /> </ProtactecdRoute> },


      ]
    }
  ])




  return <>
    <Toaster toastOptions={{
      duration: 3000
    }} />
    <RouterProvider router={routes}>

    </RouterProvider>
  </>
}

export default App;
