import React, { useState } from 'react'
import { Formik, Form, Field, ErrorMessage, useFormik } from 'formik';
import * as Yup from 'yup';
import axios from 'axios';
import { useNavigate } from 'react-router-dom'
import { toast } from "react-hot-toast";

export default function SendNotifications() {

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
    notification: Yup.string().required('notification is required'),
    sendTo: Yup.string().required('sendTo is required')
  })

  let formik = useFormik({
    initialValues: {
      user: {
        notification: "",
        sendTo: ""
      }
    }
    ,
    onSubmit: handleUpdate,
    validationSchema
  })



  return <>
    <div className='container pt-5'>
      <h2 className='text-center mainFont h1'>Send Notifications</h2>

      <form onSubmit={formik.handleSubmit} className='w-100 my-5  p-5 rounded-3 shadow '>

        <label for="notification" class="form-label mainFont">Notification</label>
        <input className='form-control' type="text" name='notification' id='notification' value={formik.values.notification} onChange={formik.handleChange} onBlur={formik.handleBlur} />
        {formik.errors.notification && formik.touched.notification ? <div className='form-text text-danger'>{formik.errors.notification}</div> : null}

        <label for="sendTo" className="form-label  mainFont ">sendTo</label>

        <select className="form-select mainFont" aria-label="Default select example" name='sendTo' id='sendTo' value={formik.values.sendTo} onChange={formik.handleChange} onBlur={formik.handleBlur}>

          <option disabled selected>select sendTo</option>

          <option >All</option>
          <option >Mohamed</option>
          <option >Ayman</option>



        </select>

        <div className='row my-2 g-3'>

          <button disabled={!(formik.isValid && formik.dirty)} type='submit' className='btn  mainBtn col-12 '>Add</button>

        </div>

      </form>

    </div>
  </>
}
