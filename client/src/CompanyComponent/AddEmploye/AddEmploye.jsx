import React, { useState } from 'react'
import { Formik, Form, Field, ErrorMessage, useFormik } from 'formik';
import * as Yup from 'yup';
import axios from 'axios';
import { useNavigate } from 'react-router-dom'
import { toast } from "react-hot-toast";

export default function AddEmploye({ setUserData }) {
  const [Loading, setLoading] = useState(false)
  let navigate = useNavigate()


  let validationSchema = Yup.object({
    name: Yup.string().required('name is required'),
    email: Yup.string().required('email is required'),
    NumberPhone: Yup.string().required('Phone Number is required'),
    password: Yup.string().required('password is required'),
    passwordConfirm: Yup.string().equals([Yup.ref('password')]).required('passwordConfirm is required'),
  })

  let formik = useFormik({
    initialValues: {
      user: {
        name: "",
        email: "",
        password: "",
        passwordConfirm: "",
        NumberPhone: ""

      }
    }
    ,
    onSubmit: handleUpdate,
    validationSchema
  })

  async function handleUpdate(values) {
    console.log(values);
    setLoading(true)
    let token = localStorage.getItem('CompanyToken')
    let headers = {
      Authorization: `Bearer ${token}`
    }
    await axios.post(`http://localhost:5000/api/company/createEmployee`, {
      name: values.name,
      password: values.password,
      passwordConfirm: values.passwordConfirm,
      email: values.email,
      NumberPhone: values.NumberPhone,

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
      navigate('/')
      formik.resetForm()

    })
  }





  return (
    <div className='container pt-5'>
      <h2 className='text-center mainFont h1'>Add Employe</h2>

      <form onSubmit={formik.handleSubmit} className='col-md-6 mx-auto my-5  p-5 rounded-3 shadow '>

        <label for="name" class="form-label mainFont">Name</label>
        <input className='form-control' type="text" name='name' id='name' value={formik.values.name} onChange={formik.handleChange} onBlur={formik.handleBlur} />
        {formik.errors.name && formik.touched.name ? <div className='form-text text-danger'>{formik.errors.name}</div> : null}

        <label for="NumberPhone" class="form-label mainFont mt-2 ">NumberPhone</label>
        <input className='form-control' type="tel" name='NumberPhone' id='NumberPhone' value={formik.values.NumberPhone} onChange={formik.handleChange} onBlur={formik.handleBlur} />
        {formik.errors.NumberPhone && formik.touched.NumberPhone ? <div className='form-text text-danger'>{formik.errors.NumberPhone}</div> : null}

        <label for="email" class="form-label mainFont mt-2 ">Email</label>
        <input className='form-control' type="email" name='email' id='email' value={formik.values.email} onChange={formik.handleChange} onBlur={formik.handleBlur} />
        {formik.errors.email && formik.touched.email ? <div className='form-text text-danger'>{formik.errors.email}</div> : null}

        <label for="password" class="form-label mainFont mt-2 ">password</label>
        <input className='form-control' type="password" name='password' id='password' value={formik.values.password} onChange={formik.handleChange} onBlur={formik.handleBlur} />
        {formik.errors.password && formik.touched.password ? <div className='form-text text-danger'>{formik.errors.password}</div> : null}


        <label for="passwordConfirm" class="form-label mainFont mt-2 ">passwordConfirm</label>
        <input className='form-control' type="password" name='passwordConfirm' id='passwordConfirm' value={formik.values.passwordConfirm} onChange={formik.handleChange} onBlur={formik.handleBlur} />
        {formik.errors.passwordConfirm && formik.touched.passwordConfirm ? <div className='form-text text-danger'>{formik.errors.passwordConfirm}</div> : null}



        <div className='row my-2 g-3'>
          {Loading ? <button type='button' className='btn mainBtn col-12 rounded-pill  '><i className='fa fa-spinner fa-spin'></i></button>
            : <button disabled={!(formik.isValid && formik.dirty)} type='submit' className='btn  mainBtn col-12 '>Add</button>
          }




        </div>

      </form>

    </div>

  )
}
