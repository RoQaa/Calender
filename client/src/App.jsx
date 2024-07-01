import './App.css';
import { RouterProvider, createBrowserRouter } from 'react-router-dom';
import { useEffect, useState } from 'react';
import CompanyLayout from './CompanyComponent/CompanyLayout/CompanyLayout.jsx';
import CompanyScren from './CompanyComponent/CompanyScren/CompanyScren.jsx';
import CompanyLogin from './CompanyComponent/CompanyLogin/CompanyLogin.jsx';
import AddEmploye from './CompanyComponent/AddEmploye/AddEmploye.jsx';
import CompanyProfile from './CompanyComponent/CompanyProfile/CompanyProfile.jsx';
import AddTask from './CompanyComponent/AddTask/AddTask.jsx';
import ComapnyTasks from './CompanyComponent/CompanyTasks/CompanyTasks.jsx';
import EmployeProfile from './CompanyComponent/EmployeProfile/EmployeProfile.jsx';
import toast, { Toaster } from 'react-hot-toast';
import axios from 'axios'
import ProtactecdRoute from './CompanyComponent/ProtactecdRoute/ProtactecdRoute.jsx';
import { io } from 'socket.io-client';
import Notifaction from './CompanyComponent/Notifaction/Notifaction.jsx';

const socket = io(process.env.REACT_APP_Socket)
function App() {
  const [userData, setUserData] = useState(null);
  const [userInfo, setUserInfo] = useState({});
  const [newNot, setnewNot] = useState(false)
  const [nots, setNots] = useState([]);
  const [timeDifference, setTimeDifference] = useState({ hours: 0, minutes: 0 });

  let userSocketId = null;

  const saveData = () => {
    setUserData(localStorage.getItem('CompanyToken'));
  };

  const getUserNot = async () => {
    const token = localStorage.getItem('CompanyToken');
    const headers = {
      Authorization: `Bearer ${token}`,
    };

    try {
      const res = await axios.get(`${process.env.REACT_APP_API}/company/getMyNotes`, { headers });
      res?.data?.notes?.map((not) => {
        const timestampStr = not.createdAt;
        const timestamp = new Date(timestampStr);
        const currentTime = new Date();
        const timeDiffInSeconds = (currentTime - timestamp) / 1000;
        let timeDiffMessage = '';
        if (timeDiffInSeconds >= 60 * 60 * 24 * 30) {
          const months = Math.floor(timeDiffInSeconds / (60 * 60 * 24 * 30));
          timeDiffMessage = `${months} month${months > 1 ? 's' : ''} ago`;
        } else if (timeDiffInSeconds >= 60 * 60 * 24 * 7) {
          const weeks = Math.floor(timeDiffInSeconds / (60 * 60 * 24 * 7));
          timeDiffMessage = `${weeks} week${weeks > 1 ? 's' : ''} ago`;
        } else if (timeDiffInSeconds >= 60 * 60 * 24) {
          const days = Math.floor(timeDiffInSeconds / (60 * 60 * 24));
          timeDiffMessage = `${days} day${days > 1 ? 's' : ''} ago`;
        } else if (timeDiffInSeconds >= 60 * 60) {
          const hours = Math.floor(timeDiffInSeconds / (60 * 60));
          timeDiffMessage = `${hours} hour${hours > 1 ? 's' : ''} ago`;
        } else {
          const minutes = Math.floor(timeDiffInSeconds / 60);
          timeDiffMessage = `${minutes} minute${minutes > 1 ? 's' : ''} ago`;
        }
        not.timeDiffMessage = timeDiffMessage;
      })
      setNots(res.data.notes);
      console.log(res.data);
    } catch (err) {
      if (err.response?.status === 401) {
        localStorage.clear();
        setUserData(null);
        toast.error(err.response?.data?.message);
      } else {
        setNots([])

        // toast.error(err.response?.data?.message);
      }
    }
  };

  const getUserInfo = async () => {
    if (localStorage.getItem('CompanyToken')) {
      saveData();
      const token = localStorage.getItem('CompanyToken');
      const headers = {
        Authorization: `Bearer ${token}`,
      };

      try {
        const res = await axios.get(`${process.env.REACT_APP_API}/company/myProfile`, { headers });
        userSocketId = res.data.data?._id;
        setUserInfo(res.data.data);

        if (userSocketId) {
          socket.off(`Notification`);
        }


        socket.on('Notification', (data) => {
          if (data.note.to === userSocketId) {
            setnewNot(true)
            getUserNot()


            toast.custom((t) => (
              <div
                className={`toast ${t.visible ? 'show' : 'hide'} bg-white shadow-lg rounded-lg pointer-events-auto d-flex`}
              >
                <div className="flex-grow-1 w-0 p-4 overflow-hidden">
                  <div className="d-flex align-items-start overflow-hidden">
                    <div className="flex-shrink-0 pt-1 pe-4">
                      <i className="fa-solid fa-calendar-days fs-1 text-primary"></i>
                    </div>
                    <div className="ml-3 flex-grow-1 overflow-hidden">
                      <p className="text-sm font-weight-bold text-dark text-capitalize">
                        {data.admin?.name}
                      </p>
                      <p className="mt-1 text-sm text-muted text-truncate">
                        {data.note?.description}
                      </p>
                    </div>
                  </div>
                </div>
                <div className="d-flex border border-start">
                  <button
                    onClick={() => toast.dismiss(t.id)}
                    className="btn w-100 border-0 rounded-0 rounded-right p-4 d-flex align-items-center justify-content-center text-primary"
                  >
                    Close
                  </button>
                </div>
              </div>
            ));
          }
        });
      } catch (err) {
        if (err.response?.status === 401) {
          localStorage.clear();
          setUserData(null);
          toast.error(err.response?.data?.message);
        } else {
          toast.error(err.response?.data?.message);
        }
      }

      getUserNot();
    }
  };

  useEffect(() => {
    getUserInfo();
  }, []);


  let routes = createBrowserRouter([
    {
      path: '', element: <CompanyLayout setnewNot={setnewNot} newNot={newNot} setUserData={setUserData} Nots={nots} />,
      children: [
        { index: true, element: <ProtactecdRoute> <CompanyScren getUserNot={getUserNot} setUserData={setUserData} /></ProtactecdRoute> },
        { path: 'addEmploye', element: <ProtactecdRoute> <AddEmploye setUserData={setUserData} /> </ProtactecdRoute> },
        { path: 'addTask', element: <ProtactecdRoute> <AddTask setUserData={setUserData} /> </ProtactecdRoute> },
        { path: 'comapnyTasks', element: <ProtactecdRoute> <ComapnyTasks setUserData={setUserData} /></ProtactecdRoute> },
        { path: 'companyProfile', element: <ProtactecdRoute> <CompanyProfile setUserData={setUserData} /></ProtactecdRoute> },
        { path: 'companyNotifaction', element: <ProtactecdRoute> <Notifaction Nots={nots} setnewNot={setnewNot} setUserData={setUserData} /></ProtactecdRoute> },
        { path: 'companyLogin', element: <CompanyLogin getUserInfo={getUserInfo} saveData={saveData} getUserNot={getUserNot} /> },
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
