import logo from './logo.svg';
import './App.css';
import { RouterProvider, createBrowserRouter } from 'react-router-dom';

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
import ProtactecdAdminRoute from './Component/ProtactecdAdminRoute/ProtactecdAdminRoute.jsx';
import toast, { Toaster } from 'react-hot-toast';
import axios from 'axios'
import AddCompany from './Component/AddCompany/AddCompany.jsx';

function App() {
  const [AdminData, setAdminData] = useState(null)
  const [AdminInfo, setAdminInfo] = useState(null)



  function saveAdminData() {
    setAdminData(localStorage.getItem('AdminToken'))
  }

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
      setAdminInfo(res?.data?.data)
    })
  }

  useEffect(() => {
    if (localStorage.getItem('AdminToken') != null) {
      saveAdminData()
      getAdminInfo()
    }
  }, [])

  let routes = createBrowserRouter([
    {
      path: 'arc-admin', element: <Layout setAdminData={setAdminData} setAdminInfo={setAdminInfo} AdminData={AdminData} saveAdminData={saveAdminData} AdminInfo={AdminInfo} />, children: [
        { index: true, element: <ProtactecdAdminRoute><Users /></ProtactecdAdminRoute> },
        { path: 'addTaskType', element: <ProtactecdAdminRoute> <AddTaskType /></ProtactecdAdminRoute> },
        // { path: 'createAccount', element: <ProtactecdAdminRoute> <CreateAccount /></ProtactecdAdminRoute> },
        { path: 'addCompany', element: <ProtactecdAdminRoute> <AddCompany /> </ProtactecdAdminRoute> },
        { path: 'profile', element: <ProtactecdAdminRoute> <Profile setAdminData={setAdminData} /> </ProtactecdAdminRoute> },
        { path: 'sendNotifications', element: <ProtactecdAdminRoute> <SendNotifications  setAdminData={setAdminData}/></ProtactecdAdminRoute> },
        { path: 'employees/:id', element: <ProtactecdAdminRoute> <Employees /></ProtactecdAdminRoute> },
        { path: 'login', element: <Login AdminInfo={AdminInfo} saveAdminData={saveAdminData} setAdminInfo={setAdminInfo} /> },
        { path: '*', element: <ProtactecdAdminRoute> <NotFound /></ProtactecdAdminRoute> }
      ]
    },

  ])


  return <>
    <Toaster toastOptions={{
      duration: 3000
    }} />
    <RouterProvider router={routes}>

    </RouterProvider>
  </>;
}

export default App;
