import React, { useContext, useEffect, useState } from 'react'
import { useNavigate } from 'react-router-dom'
import axios from 'axios'
import * as Yup from 'yup'
import { useFormik } from 'formik'
import { toast } from "react-hot-toast";

export default function Login({ saveAdminData }) {
  let navigate = useNavigate()



  const [messageErr2, setmessageErr2] = useState('')
  const [loading, setloading] = useState(false)

  // useEffect(() => {
  //   if (localStorage.getItem('AdminToken') != null) {
  //     navigate('/arc-admin')
  //   }
  // }, [])


  async function handleLoginData(values) {
    console.log(values);
    setloading(true)
    let { data } = await axios.post('http://localhost:5000/api/company/login', { email: values.email, password: values.password }).catch((err) => {
      setmessageErr2(`${err.response.message}`)
      setloading(false)
      toast.error(err.response.data.message)
    })
    console.log(data);
    if (data.status == true && data.data.role == 'admin') {
      localStorage.setItem('AdminToken', data.token)
      saveAdminData()
      navigate('/arc-admin')
      setloading(false)
      toast.success(data.message)
    } else {
      toast.success(data.message)
      setloading(false)

    }


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
    onSubmit: handleLoginData

  })


  return <>
    <div className='bg-light start-0 end-0 top-0 bottom-0   fixed-top row justify-content-center align-content-center'>
      <div className="col-xl-4 col-lg-6 col-md-8 col-10 formRes">
        <form onSubmit={formik2.handleSubmit} className=' w-100 bg-light  p-5 rounded-3 shadow-lg  '>
          <h2 className="text-capitalize fw-bolder mainFont  text-center mb-5  " >welcome to calendar admin panel</h2>

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
