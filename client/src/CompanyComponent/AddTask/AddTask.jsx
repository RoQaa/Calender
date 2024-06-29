import React, { useEffect, useState } from 'react'
import { Formik, Form, Field, ErrorMessage, useFormik } from 'formik';
import * as Yup from 'yup';
import axios from 'axios';
import { useNavigate } from 'react-router-dom'
import { toast } from "react-hot-toast";
import Select from 'react-select';

export default function AddTask({ setUserData }) {

  const [employeeOptions, setemployeeOptions] = useState([])

  const [taskTypes, settaskTypes] = useState([])
  const [Loading, setLoading] = useState(false)
  const [EmployesLoading, setEmployesLoading] = useState(false)
  let navigate = useNavigate()



  async function getCompanyEmployes() {
    setEmployesLoading(true)
    let token = localStorage.getItem('CompanyToken')
    let headers = {
      Authorization: `Bearer ${token}`
    }
    await axios(`${process.env.REACT_APP_API}/company/getEmployees`, { headers }).catch((err) => {
      if (err?.response?.status == 401) {
        localStorage.clear()
        setUserData(null)
        setEmployesLoading(false)

        toast.error(err?.response?.data?.message)
      } else {
        setEmployesLoading(false)
        toast.error(err?.response?.data?.message)
      }
    }).then((res) => {
      console.log(res);
      console.log(res?.data?.data);
      setemployeeOptions(res?.data?.data?.map((employee) => ({
        value: employee._id,
        label: employee.email,
      })))
      console.log(employeeOptions);
      setEmployesLoading(false)


    })
  }
  async function getTaskTypes() {
    await axios(`${process.env.REACT_APP_API}/typeTask/getTaskType`).catch((err) => {
      if (err?.response?.status == 401) {
        localStorage.clear()
        setUserData(null)
        toast.error(err?.response?.data?.message)
      } else {
        toast.error(err?.response?.data?.message)
      }
    }).then((res) => {
      console.log(res);
      console.log(res?.data?.data);
      settaskTypes(res?.data?.data)
      console.log(taskTypes);

    })
  }
  useEffect(() => {
    getCompanyEmployes()
    getTaskTypes()
  }, [])


  async function handleAdd(values) {

    const myTime = `${values.date}T${values.time}:00`
    console.log(values);
    console.log(myTime);
    const NewDate = new Date(myTime)
    console.log(NewDate);
    setLoading(true)
    let token = localStorage.getItem('CompanyToken')
    let headers = {
      Authorization: `Bearer ${token}`
    }
    await axios.post(`${process.env.REACT_APP_API}/task/createTask`, {
      name: values.name,
      description: values.description,
      dueDate: NewDate,
      kind: values.kind,
      priority: values.priority,
      employee: values.employee

    }, { headers }).catch((err) => {
      if (err?.response?.status == 401) {
        localStorage.clear()
        setUserData(null)
        setLoading(false)

        toast.error(err?.response?.data?.message)
      } else {
        setLoading(false)

        toast.error(err?.response?.data?.message)
      }
    }).then((res) => {
      console.log(res);
      console.log(res.data.data);
      toast.success(res.data.message)
      setLoading(false)
      navigate('/comapnyTasks')
      formik.resetForm()

    })

  }

  let validationSchema = Yup.object({
    name: Yup.string().required('name is required'),
    date: Yup.string().required('date is required'),
    description: Yup.string().required('description is required'),
    time: Yup.string().required('time is required'),
    kind: Yup.string().required('Task type is required'),
    priority: Yup.string().required('priority  is required'),
    employee: Yup.array().required('employee  is required'),
  })

  let formik = useFormik({
    initialValues: {
      user: {
        name: "",
        description: "",
        date: "",
        time: "",
        kind: "",
        priority: "",
        employee: []
      }
    }
    ,
    onSubmit: handleAdd,
    validationSchema
  })





  return (
    <div className='container pt-5'>
      <h2 className='text-center mainFont h1'>Add Task</h2>

      <form onSubmit={formik.handleSubmit} className='col-md-6 mx-auto my-5  p-5 rounded-3 shadow '>

        <label for="name" class="form-label mainFont">name</label>
        <input className='form-control' type="text" name='name' id='name' value={formik.values.name} onChange={formik.handleChange} onBlur={formik.handleBlur} />
        {formik.errors.name && formik.touched.name ? <div className='form-text text-danger'>{formik.errors.name}</div> : null}


        <label for="description" class="form-label mainFont mt-2 ">description</label>
        <input className='form-control' type="text" name='description' id='description' value={formik.values.description} onChange={formik.handleChange} onBlur={formik.handleBlur} />
        {formik.errors.description && formik.touched.description ? <div className='form-text text-danger'>{formik.errors.description}</div> : null}


        <label for="date" class="form-label mainFont mt-2 ">date</label>
        <input className='form-control' type="date" name='date' id='date' value={formik.values.date} onChange={formik.handleChange} onBlur={formik.handleBlur} />
        {formik.errors.date && formik.touched.date ? <div className='form-text text-danger'>{formik.errors.date}</div> : null}


        <label for="time" class="form-label mainFont mt-2 ">time</label>
        <input className='form-control' type="time" name='time' id='time' value={formik.values.time} onChange={formik.handleChange} onBlur={formik.handleBlur} />
        {formik.errors.time && formik.touched.time ? <div className='form-text text-danger'>{formik.errors.time}</div> : null}



        <label for="priority" class="form-label mainFont mt-2 ">priority</label>

        <select class="form-select" aria-label="Default select example" name='priority' id='priority' value={formik.values.priority} onChange={formik.handleChange} onBlur={formik.handleBlur}>

          <option disabled selected>select Tasktype</option>

          <option value='0'>low</option>
          <option value='1'>mid</option>
          <option value='2'>high</option>
        </select>


        <label for="kind" class="form-label mainFont mt-2 ">Task type</label>

        <select class="form-select" aria-label="Default select example" name='kind' id='kind' value={formik.values.kind} onChange={formik.handleChange} onBlur={formik.handleBlur}>

          <option disabled selected>select Tasktype</option>

          {taskTypes.map((task) => {
            return <option value={task._id}>{task.name}</option>
          })}



        </select>

        <label for="employee" class="form-label mainFont mt-2 ">Employes</label>

        {EmployesLoading ? <div className='col-12 text-center my-5 py-5'>
          <i className='fa fa-spin fa-spinner fa-3x text-success'></i>
        </div> : <>

          <Select
            id="employee"
            name="employee"
            options={employeeOptions}
            isMulti
            value={formik?.values?.employee?.map((employeeId) =>
              employeeOptions.find((option) => option.value === employeeId)
            )}
            onChange={(selectedOptions) => {
              formik.setFieldValue(
                'employee',
                selectedOptions ? selectedOptions?.map((option) => option.value) : []
              );
            }}
            onBlur={formik.handleBlur}
            className=""
          />

        </>}


        <div className='row my-2 g-3'>
          {Loading ? <button type='button' className='btn mainBtn col-12 rounded-pill  '><i className='fa fa-spinner fa-spin'></i></button>
            : <button disabled={!(formik.isValid && formik.dirty)} type='submit' className='btn  mainBtn col-12 rounded-pill '>Add</button>
          }
        </div>
      </form>
    </div>
  )
}
