import React, { useContext, useState } from 'react'
import { useNavigate } from 'react-router-dom'
import axios from 'axios'
import * as Yup from 'yup'
import { useFormik } from 'formik'
import { toast } from "react-hot-toast";

export default function Login() {
  let navigate = useNavigate()



  const [messageErr2, setmessageErr2] = useState('')
  const [loading, setloading] = useState(false)


  async function handelLogin(values) {


    console.log(values);

  }

  let validationSchema2 = Yup.object({
    email: Yup.string().required('email is required').email('email is invalid'),
    password: Yup.string().required('pass is required'),
  })

  let formik2 = useFormik({
    initialValues: {
      email: '',
      password: '',
    },
    validationSchema: validationSchema2,
    onSubmit: handelLogin

  })


  return <>
    <div className='start-0 end-0 top-0 bottom-0   row justify-content-center align-content-center'>



      <div className='col-md-5  '>

        <h2 className="navbar-brand  fs-1 text-capitalize fw-bolder mainFont text-center mb-5 text-success-emphasis " >welcome to Calendar</h2>

        <form onSubmit={formik2.handleSubmit} className=' mx-auto  shadow-lg p-4  rounded-4 '>
          <h3 className='text-center py-3 mainFont'>Login</h3>

          {messageErr2 !== '' ? <div className='alert alert-danger'>{messageErr2}</div> : null}


          <input placeholder='Email' className='form-control mb-2' type="email" name='email' id='email' value={formik2.values.email} onChange={formik2.handleChange} onBlur={formik2.handleBlur} />
          {formik2.errors.email && formik2.touched.email ? <div className='alert alert-danger'>{formik2.errors.email}</div> : null}


          <input placeholder='Password' className='form-control mb-2 my-3' type="password" name='password' id='password' value={formik2.values.password} onChange={formik2.handleChange} onBlur={formik2.handleBlur} />
          {formik2.errors.password && formik2.touched.password ? <div className='alert alert-danger'>{formik2.errors.password}</div> : null}


          {loading ?
            <button type='button' className='btn btn-outline-success w-100 my-2 '><i className='fa fa-spinner fa-spin'></i></button>
            : <button disabled={!(formik2.isValid && formik2.dirty)} type='submit' className='btn mainBtn w-100  my-2 '>Login</button>
          }  </form>
      </div>
    </div>
  </>
}
