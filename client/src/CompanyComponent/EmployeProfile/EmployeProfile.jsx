import React, { useEffect, useState } from 'react'
import { useParams } from 'react-router-dom'
import axios from 'axios'
import toast from 'react-hot-toast'



export default function EmployeProfile({ setUserData }) {
  const { id } = useParams()
  const [Loading, setLoading] = useState(false)
  const [CompanyEmploye, setCompanyEmploye] = useState({})
  const [CompanyEmployeTasks, setCompanyEmployeTasks] = useState([])

  const [CompanyEmployeTasksTime, setCompanyEmployeTasksTime] = useState([])

  const [LoadingTasks, setLoadingTasks] = useState(false)





  async function getEmployeData() {
    setLoading(true)
    let token = localStorage.getItem('CompanyToken')
    let headers = {
      Authorization: `Bearer ${token}`
    }
    await axios(`${process.env.REACT_APP_API}/company/getOneEmployee/${id}`, { headers }).catch((err) => {
      if (err?.response?.status == 401) {
        localStorage.clear()
        setUserData(null)
        toast.error(err?.response?.data?.message)
        setLoading(false)
      } else {
        toast.error(err?.response?.data?.message)
        setLoading(false)
      }
    }).then((res) => {
      console.log(res);
      console.log(res.data.data);
      setCompanyEmploye(res.data.data)
      console.log(CompanyEmploye);
      setLoading(false)
    })
  }
  async function getEmployeTaksData() {
    setLoadingTasks(true)
    let token = localStorage.getItem('CompanyToken')
    let headers = {
      Authorization: `Bearer ${token}`
    }
    await axios(`${process.env.REACT_APP_API}/task/getEmployeeTasks/${id}`, { headers }).catch((err) => {
      if (err?.response?.status == 401) {
        localStorage.clear()
        setUserData(null)

        toast.error(err?.response?.data?.message)
        setLoadingTasks(false)
      } else {
        toast.error(err?.response?.data?.message)
        setLoadingTasks(false)
      }
    }).then((res) => {
      console.log(res);
      console.log(res.data.data);
      setCompanyEmployeTasks(res.data.data)
      const splitDateTimeArray = res.data.data.map(task => {
        const [date, timeWithMilliseconds] = task.dueDate.split('T');
        const time = timeWithMilliseconds.split('.')[0];
        return { date, time };
      });
      console.log(splitDateTimeArray);
      setCompanyEmployeTasksTime(splitDateTimeArray)
      console.log(CompanyEmploye);
      setLoadingTasks(false)
    })
  }



  useEffect(() => {
    console.log(id);
    getEmployeData()
    getEmployeTaksData()
  }, [])







  return <>


    <div className="container py-5 overflow-auto">
      <h2 className='text-center mainFont h1'>Employe data</h2>
      <div className='col-md-10 mt-5 mx-auto row align-items-center bg-light shadow-lg rounded-3 p-5 mb-5'>
        <div className='col-md-4  '>
          {Loading ? <div className='col-12 text-center my-5 py-5'>
            <i className='fa fa-spin fa-spinner fa-3x text-success'></i>
          </div> : <div className='col-md-6 mx-auto'>
            <div className='text-center'>
              <img className='img-fluid rounded-circle shadow-lg p-1 mainColor ' src="https://img.freepik.com/free-photo/portrait-man-laughing_23-2148859448.jpg?size=338&ext=jpg&ga=GA1.1.553209589.1714694400&semt=ais" alt="" />
              <h5 className='pt-3'>{CompanyEmploye.name}</h5>
              <p className='text-muted'>{CompanyEmploye.email}</p>

            </div>
          </div>}

        </div>
        <div className='col-md-8 '>
          <h4 className='text-center mainFont pb-2'>Tasks</h4>
          {LoadingTasks ? <div className='col-12 text-center my-5 py-5'>
            <i className='fa fa-spin fa-spinner fa-3x text-success'></i>
          </div> : <div className='table-responsive'>
            {CompanyEmployeTasks?.length != 0 ? <table class="table table-striped  table-hover mx-auto text-center mb-5">
              <thead >
                <tr >
                  <th scope="col" className='mainFont' >#</th>
                  <th scope="col" className='mainFont'>title</th>
                  <th scope="col" className='mainFont'>date</th>
                  <th scope="col" className='mainFont'>time</th>
                  <th scope="col" className='mainFont'>Tasktype</th>

                </tr>
              </thead>
              <tbody>
                {CompanyEmployeTasks.map((task, index) => {
                  return <tr className='align-baseline'>
                    <th scope="row" className='mainFont'>{index + 1}</th>
                    <td className='mainFont'>{task.name}</td>
                    <td className='mainFont'>{CompanyEmployeTasksTime[index].date}</td>
                    <td className='mainFont'>{CompanyEmployeTasksTime[index].time}</td>
                    <td className='mainFont'>{task.kind.name}</td>

                  </tr>
                })}




              </tbody>
            </table> : <>
              <div className='col-12 text-center my-5 py-5'>
                <h3 className='mainFont'>Don't have tasks</h3>
              </div>
            </>}
          </div>}

        </div>
      </div>





    </div>

  </>
}
