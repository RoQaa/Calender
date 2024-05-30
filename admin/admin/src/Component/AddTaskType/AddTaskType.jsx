import React, { useState } from 'react'
import { Formik, Form, Field, ErrorMessage, useFormik } from 'formik';
import * as Yup from 'yup';
import axios from 'axios';
import { useNavigate } from 'react-router-dom'
import { toast } from "react-hot-toast";
import Tasks from '../Tasks/Tasks.jsx';

export default function AddTaskType() {
  const [Loading, setLoading] = useState(false)
  const [roleList, setroleList] = useState(['user', 'admin', 'manger'])


  let token = localStorage.getItem('userToken')
  let headers = {
    Authorization: `Bearer ${token}`
  }

  async function handleUpdate(values) {
    console.log(values);

  }

  let validationSchema = Yup.object({
    task: Yup.string().required('task is required')
  })

  let formik = useFormik({
    initialValues: {
      user: {
        task: ""

      }
    }
    ,
    onSubmit: handleUpdate,
    validationSchema
  })



  return (
    <div className='container pt-5'>
      <h2 className='text-center mainFont h1'>Add Task Type</h2>

      <form onSubmit={formik.handleSubmit} className='w-100 my-5  p-5 rounded-3 shadow '>

        <label for="task" class="form-label mainFont">Task</label>
        <input className='form-control' type="text" name='task' id='task' value={formik.values.task} onChange={formik.handleChange} onBlur={formik.handleBlur} />
        {formik.errors.task && formik.touched.task ? <div className='form-text text-danger'>{formik.errors.task}</div> : null}


        <div className='row my-2 g-3'>

          <button disabled={!(formik.isValid && formik.dirty)} type='submit' className='btn  mainBtn col-12 '>Add</button>




        </div>

      </form>


      <Tasks />
    </div>
  )
}
