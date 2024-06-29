import React, { useEffect, useState } from 'react'
import { Formik, Form, Field, ErrorMessage, useFormik } from 'formik';
import * as Yup from 'yup';
import axios from 'axios';
import { useNavigate } from 'react-router-dom'
import { toast } from "react-hot-toast";
import Tasks from '../Tasks/Tasks.jsx';

export default function AddTaskType() {
  const [Loading, setLoading] = useState(false)
  const [GetLoading, setGetLoading] = useState(false)
  const [CreateMood, setCreateMood] = useState(false)

  const [TasksList, setTasksList] = useState([])

  async function getTasksType() {

    setGetLoading(true)
    let token = localStorage.getItem('AdminToken')
    let headers = {
      Authorization: `Bearer ${token}`
    }
    await axios(`${process.env.REACT_APP_API}/typeTask/getTaskType`, { headers }).catch((err) => {
      if (err?.response?.status == 401) {
        console.log(err);
        localStorage.clear()
        toast.error(err?.response?.data?.message)
        setGetLoading(false)
      } else {
        console.log(err);
        toast.error(err?.response?.data?.message)
        setGetLoading(false)
      }
    }).then((res) => {
      console.log(res);
      setTasksList(res?.data?.data)
      setGetLoading(false)
    })
  }

  useEffect(() => {
    getTasksType()
  }, [])




  async function handleCreate(values) {
    console.log(values);
    setLoading(true)
    let token = localStorage.getItem('AdminToken')
    let headers = {
      Authorization: `Bearer ${token}`
    }
    await axios.post(`${process.env.REACT_APP_API}/typeTask/createTaskType`, { name: values.task }, { headers }).catch((err) => {
      if (err?.response?.status == 401) {
        console.log(err);
        localStorage.clear()
        toast.error(err?.response?.data?.message)
        setLoading(false)
      } else {
        console.log(err);
        toast.error(err?.response?.data?.message)
        setLoading(false)
      }
    }).then((res) => {
      console.log(res);
      toast.success(res?.data?.message)
      formik.resetForm()
      getTasksType()
      setLoading(false)
      setCreateMood(false)
    })
  }
  let validationSchema = Yup.object({
    task: Yup.string().required('task is required')
  })
  let formik = useFormik({
    initialValues: {
      task: ""
    }
    ,
    onSubmit: handleCreate,
    validationSchema
  })

  const [UpdateMood, setUpdateMood] = useState(false)
  const [UpdateLoading, setUpdateLoading] = useState(false)


  let validationSchema2 = Yup.object({
    name: Yup.string().required('name is required'),
  })

  let formik2 = useFormik({
    initialValues: {
      _id: "",
      name: ""
    }
    ,
    onSubmit: handleUpdate,
    validationSchema: validationSchema2
  })
  async function handleUpdate(values) {
    console.log(values);
    setUpdateLoading(true)
    let token = localStorage.getItem('AdminToken')
    let headers = {
      Authorization: `Bearer ${token}`
    }
    await axios.patch(`${process.env.REACT_APP_API}/typeTask/updateTaskType/${values._id}`, { name: values.name }, { headers }).catch((err) => {
      if (err?.response?.status == 401) {
        console.log(err);
        localStorage.clear()
        toast.error(err?.response?.data?.message)
        setUpdateLoading(false)
      } else {
        console.log(err);
        toast.error(err?.response?.data?.message)
        setUpdateLoading(false)
      }
    }).then((res) => {
      console.log(res);
      toast.success(res?.data?.message)
      formik2.resetForm()
      getTasksType()
      setUpdateLoading(false)
      setUpdateMood(false)
    })
  }

  function getTypeData(index) {
    const selectedType = TasksList[index]
    formik2.setValues({
      _id: selectedType._id,
      name: selectedType.name
    })
    setUpdateMood(true)
  }

  async function deleteType(_id) {
    let token = localStorage.getItem('AdminToken')
    let headers = {
      Authorization: `Bearer ${token}`
    }
    await axios.delete(`${process.env.REACT_APP_API}/typeTask/deleteTaskType/${_id}`, { headers }).catch((err) => {
      if (err?.response?.status == 401) {
        console.log(err);
        localStorage.clear()
        toast.error(err?.response?.data?.message)
      } else {
        console.log(err);
        toast.error(err?.response?.data?.message)
      }
    }).then((res) => {
      console.log(res);
      toast.success(res?.data?.message)
      getTasksType()
    })
  }




  return <>
    {UpdateMood ?
      <div className='start-0 end-0 top-0 bottom-0   bg-body-secondary bg-opacity-50 fixed-top row justify-content-center align-content-center'>
        <div className='col-xl-4 col-lg-6 col-md-8 col-10 formRes'>
          <form onSubmit={formik2.handleSubmit} className='w-100 my-5  p-5 bg-light rounded-3 shadow mainFont'>
            <h2 className=' text-center fw-bolder mb-5'>Update Type</h2>

            <label for="name" className="form-label fw-bold">name</label>
            <input className='form-control' type="text" name='name' id='name' value={formik2.values.name} onChange={formik2.handleChange} onBlur={formik2.handleBlur} />
            {formik2.errors.name && formik2.touched.name ? <div className='form-text text-danger'>{formik2.errors.name}</div> : null}
            <div className='row my-2 g-3 px-2'>
              {UpdateLoading ? <button type='button' className='btn mainBtn col-12 rounded-pill  '><i className='fa fa-spinner fa-spin'></i></button>
                : <button disabled={!(formik2.isValid && formik2.dirty)} type='submit' className='btn mainBtn  col-12 rounded-pill'>save changes</button>
              }
              <button onClick={() => { setUpdateMood(false) }} type='reset' className='btn mx-auto btn-outline-danger col-12 rounded-pill'>cancel</button>
            </div>

          </form>
        </div>
      </div>
      : null}

    {CreateMood ?
      <div className='start-0 end-0 top-0 bottom-0   bg-body-secondary bg-opacity-50 fixed-top row justify-content-center align-content-center'>
        <div className='col-xl-4 col-lg-6 col-md-8 col-10 formRes'>
          <form onSubmit={formik.handleSubmit} className='w-100 my-5  p-5 bg-light rounded-3 shadow mainFont'>
            <h2 className=' text-center fw-bolder mb-5'>Add New Type</h2>

            <label for="task" class="form-label mainFont">Task</label>
            <input className='form-control' type="text" name='task' id='task' value={formik.values.task} onChange={formik.handleChange} onBlur={formik.handleBlur} />
            {formik.errors.task && formik.touched.task ? <div className='form-text text-danger'>{formik.errors.task}</div> : null}


            <div className='row my-2 g-3 px-2'>
              {Loading ? <button type='button' className='btn mainBtn col-12 rounded-pill  '><i className='fa fa-spinner fa-spin'></i></button>
                :
                <button disabled={!(formik.isValid && formik.dirty)} type='submit' className='btn  mainBtn col-12 rounded-pill'>Add</button>
              }
              <button onClick={() => { setCreateMood(false) }} type='reset' className='btn mx-auto btn-outline-danger col-12 rounded-pill'>cancel</button>

            </div>
          </form>
        </div>
      </div>
      : null}

    <div className='container pt-5'>
      <h2 className='text-center mainFont h1'>Task Types</h2>
      <div className=' p-5'>
        <button onClick={() => { setCreateMood(true) }} className='btn mainBtn w-100 mb-2'>Add New Company</button>

        {GetLoading ? <div className='col-12 text-center my-5 py-5'>
          <i className='fa fa-spin fa-spinner fa-3x text-success'></i>
        </div> :<div className='table-responsive '>
          <table class="table table-striped  table-hover mx-auto text-center ">
            <thead >
              <tr >
                <th scope="col" className='mainFont' >#</th>
                <th scope="col" className='mainFont'>Task</th>
                <th scope="col" className='mainFont'>Acthions</th>

              </tr>
            </thead>
            <tbody>
              {TasksList.map((type, index) => {
                return <tr className='align-baseline'>
                  <th scope="row" className='mainFont'>{index + 1}</th>
                  <td className='mainFont'>{type.name}</td>
                  <td>
                    <div class="dropdown">
                      <button class="btn mainIcon  " type="button" data-bs-toggle="dropdown" aria-expanded="false">
                        <i class="fa-solid fa-list fa-0 mainFont"></i>
                      </button>
                      <ul class="dropdown-menu">
                        <li onClick={() => { deleteType(type._id) }} className="dropdown-item mainFont mainClick"><i class="fa-regular fa-trash-can me-2"></i>delete</li>
                        <li onClick={() => { getTypeData(index) }} className="dropdown-item mainFont mainClick"><i class="fa-regular fa-pen-to-square me-2"></i>update</li>
                      </ul>
                    </div>
                  </td>
                </tr>
              })}



            </tbody>
          </table>
          </div>
        }
      </div>


    </div>
  </>
}
