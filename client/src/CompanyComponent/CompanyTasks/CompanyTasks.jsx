import React, { useEffect, useState } from 'react'
import { useFormik } from 'formik';
import * as Yup from 'yup'
import axios from 'axios'
import toast from 'react-hot-toast'

export default function ComapnyTasks({setUserData}) {

  const [UpdateMood, setUpdateMood] = useState(false)
  const [AssignToMood, setAssignToMood] = useState(false)
  const [Tasks, setTasks] = useState([])
  const [CompanyEmployeTasksTime, setCompanyEmployeTasksTime] = useState([])
  const [LoadingTasks, setLoadingTasks] = useState(false)
  const [UpdateLoading, setUpdateLoading] = useState(false)
  const [TasksType, setTasksType] = useState([])



  async function getTasks() {
    setLoadingTasks(true)
    let token = localStorage.getItem('CompanyToken')
    let headers = {
      Authorization: `Bearer ${token}`
    }

    await axios(`http://localhost:5000/api/task/getAllTasks`, { headers }).catch((err) => {
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
      setTasks(res.data.data)
      const splitDateTimeArray = res.data.data.map(task => {
        const [date, timeWithMilliseconds] = task.dueDate.split('T');
        const time = timeWithMilliseconds.split('.')[0];
        return { date, time };
      });
      console.log(splitDateTimeArray);
      setCompanyEmployeTasksTime(splitDateTimeArray)
      setLoadingTasks(false)


    })
  }
  
  async function getTaskType() {
    let token = localStorage.getItem('CompanyToken')
    let headers = {
      Authorization: `Bearer ${token}`
    }
    await axios(`http://localhost:5000/api/typeTask/getTaskType`, { headers }).catch((err) => {
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
      setTasksType(res.data.data)
    })
  }
  useEffect(() => {
    getTasks()
  }, [])




  let validationSchema = Yup.object({
    name: Yup.string().required('name is required'),
    description: Yup.string().required('description is required'),
    time: Yup.string().required('time is required'),
    date: Yup.string().required('date is required'),

    kind: Yup.string().required('kind is required'),
    priority: Yup.number().required('priority is required'),
  })

  let formik = useFormik({
    initialValues: {
      user: {
        _id: "",
        name: "",
        description: "",
        date: "",
        time: "",
        kind: "",
        priority: ""
      }
    }

    ,
    onSubmit: handleUpdate,
    validationSchema
  })
  async function handleUpdate(values) {
    console.log(values);
    setUpdateLoading(true)
    let token = localStorage.getItem('CompanyToken')
    let headers = {
      Authorization: `Bearer ${token}`
    }
    await axios.patch(`http://localhost:5000/api/task/updateTask/${values._id}`, {
      name: values.name,
      description: values.description,
      kind: values.kind,
      priority: values.priority,
      dueDate: `${values.date}T${values.time}`,

    }, { headers }).catch((err) => {
      if (err?.response?.status == 401) {
        localStorage.clear()
        setUserData(null)

        setUpdateLoading(false)

        toast.error(err?.response?.data?.message)
      } else {
        setUpdateLoading(false)

        toast.error(err?.response?.data?.message)
      }
    }).then((res) => {
      console.log(res);
      console.log(res.data.data);
      toast.success(res.data.message)
      getTasks()
      setUpdateLoading(false)
      setUpdateMood(false)


    })
  }

  async function handelUpdatedData(index) {
    getTaskType()
    const taskData = Tasks[index]
    const taskTime = CompanyEmployeTasksTime[index]
    formik.setValues({
      _id: taskData._id,
      name: taskData.name,
      description: taskData.description,
      date: taskTime.date,
      time: taskTime.time,
      kind: taskData.kind._id,
      priority: taskData.priority
    })
    setUpdateMood(true)

  }


  async function deleteTask(_id) {
    let token = localStorage.getItem('CompanyToken')
    let headers = {
        Authorization: `Bearer ${token}`
    }
    await axios.delete(`http://localhost:5000/api/task/deleteTask/${_id}`,{ headers }).catch((err) => {
        if (err?.response?.status == 401) {
            console.log(err);
            localStorage.clear()
            setUserData(null)
            toast.error(err?.response?.data?.message)
        } else {
            console.log(err);
            toast.error(err?.response?.data?.message)
        }
    }).then((res) => {
        console.log(res);
        toast.success(res?.data?.message)
        getTasks()
    })
}


  return <>
    {UpdateMood ?
      <div className='start-0 end-0 top-0 bottom-0   bg-body-secondary bg-opacity-50 fixed-top row justify-content-center align-content-center'>
        <div className='col-xl-4 col-lg-6 col-md-8 col-10 formRes'>
          <form onSubmit={formik.handleSubmit} className='w-100 my-5  p-5 bg-light rounded-3 shadow mainFont'>
            <h2 className=' text-center fw-bolder mb-5'>Update User Data</h2>

            <label for="name" className="form-label fw-bold">Name</label>
            <input className='form-control' type="text" name='name' id='name' value={formik.values.name} onChange={formik.handleChange} onBlur={formik.handleBlur} />
            {formik.errors.name && formik.touched.name ? <div className='form-text text-danger'>{formik.errors.name}</div> : null}

            <label for="description" className="form-label fw-bold">description</label>
            <textarea className='form-control' type="text" name='description' id='description' value={formik.values.description} onChange={formik.handleChange} onBlur={formik.handleBlur} />
            {formik.errors.description && formik.touched.description ? <div className='form-text text-danger'>{formik.errors.description}</div> : null}

            <label for="date" class="form-label mainFont mt-2 ">date</label>
            <input className='form-control' type="date" name='date' id='date' value={formik.values.date} onChange={formik.handleChange} onBlur={formik.handleBlur} />
            {formik.errors.date && formik.touched.date ? <div className='form-text text-danger'>{formik.errors.date}</div> : null}

            <label for="time" class="form-label mainFont mt-2 ">time</label>
            <input className='form-control' type="time" name='time' id='time' value={formik.values.time} onChange={formik.handleChange} onBlur={formik.handleBlur} />
            {formik.errors.time && formik.touched.time ? <div className='form-text text-danger'>{formik.errors.time}</div> : null}

            <label for="kind" class="form-label mainFont mt-2 ">Task type</label>
            <select class="form-select" aria-label="Default select example" name='kind' id='kind' value={formik.values.kind} onChange={formik.handleChange} onBlur={formik.handleBlur}>

              <option disabled selected>select Task type</option>
              {TasksType.map((task) => {
                return <option value={task._id}>{task.name}</option>
              }
              )}
            </select>

            <label for="priority" className="form-label mt-2 fw-bold">priority</label>
            <select className="form-select mainFont" aria-label="Default select example" name='priority' id='priority' value={formik.values.priority} onChange={formik.handleChange} onBlur={formik.handleBlur}>
              <option disabled selected>select priority</option>
              <option value={0} >Low</option>
              <option value={1} >Midium</option>
              <option value={2} >High</option>
            </select>

            <div className='row my-2 g-3'>
              {UpdateLoading ? <button type='button' className='btn mainBtn col-12 rounded-pill  '><i className='fa fa-spinner fa-spin'></i></button>
                : <button disabled={!(formik.isValid && formik.dirty)} type='submit' className='btn mainBtn rounded-pill  col-12 '>save changes</button>
              }


              <button onClick={() => { setUpdateMood(false) }} type='reset' className='btn mx-auto btn-outline-danger col-12 '>cancel</button>

            </div>

          </form>
        </div>
      </div>
      : null}

    {AssignToMood ?
      <div className='start-0 end-0 top-0 bottom-0   bg-body-secondary bg-opacity-50 fixed-top row justify-content-center align-content-center'>
        <div className='col-xl-4 col-lg-6 col-md-8 col-10 formRes'>
          <div className='my-5  p-5 bg-light rounded-3 shadow mainFont'>
            <table class="table table-striped  table-hover mx-auto text-center w-100 rounded-3  ">
              <thead >
                <tr >
                  <th scope="col" className='mainFont' >#</th>
                  <th scope="col" className='mainFont'>Name</th>
                  <th scope="col" className='mainFont'>Email</th>
                </tr>
              </thead>
              <tbody>
                <tr className='align-baseline'>
                  <th scope="row" className='mainFont'>1</th>
                  <td className='mainFont'>mohamed</td>
                  <td className='mainFont'>mohamed@gmail.com</td>
                </tr>
                <tr className='align-baseline'>
                  <th scope="row" className='mainFont'>1</th>
                  <td className='mainFont'>mohamed</td>
                  <td className='mainFont'>mohamed@gmail.com</td>
                </tr>

              </tbody>
            </table>
            <button onClick={() => { setAssignToMood(false) }} type='reset' className='btn mx-auto btn-outline-danger col-12 '>Back</button>
          </div>
        </div>
      </div>
      : null}

    <div className='container pt-5'>
      <h2 className='text-center mainFont h1'>Company Tasks</h2>
      <div className='p-5'>
        {LoadingTasks ? <div className='col-12 text-center my-5 py-5'>
          <i className='fa fa-spin fa-spinner fa-3x text-success'></i>
        </div> : <div className='table-responsive'><table class="table table-striped  table-hover mx-auto text-center mb-5">
          <thead >
            <tr >
              <th scope="col" className='mainFont' >#</th>
              <th scope="col" className='mainFont'>title</th>
              <th scope="col" className='mainFont'>date</th>
              <th scope="col" className='mainFont'>time</th>
              <th scope="col" className='mainFont'>Tasktype</th>
              <th scope="col" className='mainFont'>Acthions</th>

            </tr>
          </thead>
          <tbody>
            {Tasks.map((task, index) => {
              return <tr className='align-baseline'>
                <th scope="row" className='mainFont'>{index + 1}</th>
                <td className='mainFont'>{task.name}</td>
                <td className='mainFont'>{CompanyEmployeTasksTime[index].date}</td>
                <td className='mainFont'>{CompanyEmployeTasksTime[index].time}</td>
                <td className='mainFont'>{task.kind.name}</td>
                <td>
                  <div class="dropdown">
                    <button class="btn mainIcon  " type="button" data-bs-toggle="dropdown" aria-expanded="false">
                      <i class="fa-solid fa-list fa-0 mainFont"></i>
                    </button>
                    <ul class="dropdown-menu">
                      <li onClick={()=>{deleteTask(task._id)}} className="dropdown-item mainFont mainClick"><i class="fa-regular fa-trash-can me-2"></i>delete</li>
                      <li onClick={()=>{handelUpdatedData(index)}} className="dropdown-item mainFont mainClick"><i class="fa-regular fa-pen-to-square me-2"></i>update</li>
                    </ul>
                  </div>
                </td>
              </tr>
            })}




          </tbody>
        </table></div>}
      </div>
    </div>
  </>
}
