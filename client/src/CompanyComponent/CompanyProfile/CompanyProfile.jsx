import React, { useEffect, useState } from 'react'
import { Link } from 'react-router-dom'
import * as Yup from 'yup';
import axios from 'axios';
import { Formik, Form, Field, ErrorMessage, useFormik } from 'formik';
import { toast } from "react-hot-toast";


export default function CompanyProfile({ setUserData }) {

  const [UpdatePasssMood, setUpdatePassMood] = useState(false)
  const [UpdateMood, setUpdateMood] = useState(false)

  const [CompanyData, setCompanyData] = useState({})
  const [Loading, setLoading] = useState(false)
  const [UpdateLoading, setUpdateLoading] = useState(false)

  async function getUserInfo() {
    setLoading(true)
    let token = localStorage.getItem('CompanyToken')
    let headers = {
      Authorization: `Bearer ${token}`
    }
    await axios(`http://localhost:5000/api/company/myProfile`, { headers }).catch((err) => {
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
      console.log(res?.data?.data);
      setCompanyData(res?.data?.data)
      setLoading(false)
    })
  }

  useEffect(() => {
    getUserInfo()
  }, [])

  async function handleUpdatePass(values) {
    console.log(values);
  }

  let validationSchema = Yup.object({
    currentPassword: Yup.string().required('currentPassword is required'),
    newPassword: Yup.string().required('newPassword is required'),
    newPasswordConfirm: Yup.string().required('newPasswordConfirm is required').equals([Yup.ref('newPassword')], 'you must be like a new password'),
  })
  let formik = useFormik({
    initialValues: {
      currentPassword: "",
      newPassword: "",
      newPasswordConfirm: ""
    }
    ,
    onSubmit: handleUpdatePass,
    validationSchema
  })




  async function handleUpdateData(values) {

    console.log(values);
    setUpdateLoading(true)
    let token = localStorage.getItem('CompanyToken')
    let headers = {
      Authorization: `Bearer ${token}`
    }
    let formData = new FormData()
    if (values?.profileImage != "") {
      formData.append('profileImage', values?.profileImage)

    }
    formData.append('name', values.name)
    formData.append('about', values.about)
    console.log(formData);
    // await axios.patch(`http://localhost:5000/api/company/updateMe`, formData,{ headers }).catch((err) => {
    //   if (err?.response?.status == 401) {
    //     localStorage.clear()
    //     setUserData(null)
    //     toast.error(err?.response?.data?.message)
    //     setUpdateLoading(false)
    //   } else {
    //     toast.error(err?.response?.data?.message)
    //     setUpdateLoading(false)
    //   }
    // }).then((res) => {
    //   console.log(res);
    //   console.log(res?.data);
    //   setUpdateLoading(false)
    // })
  }

  let validationDataSchema = Yup.object({
    name: Yup.string().required('name is required'),
    about: Yup.string().required('about is required'),
    profileImage: Yup.mixed().required('profile Image is required'),
  })

  let formik2 = useFormik({
    initialValues: {
      name: "",
      profileImage: "",
      about: ""
    }
    ,
    onSubmit: handleUpdateData,
    validationSchema: validationDataSchema
  })

  return <>
    {UpdateMood ? <div className='start-0 end-0 top-0 bottom-0 bg-body-secondary bg-opacity-50 fixed-top row justify-content-center align-content-center'>
      <div className="col-xl-4 col-lg-6 col-md-8 col-10 formRes">
        <form onSubmit={formik2.handleSubmit} className='w-100 bg-light  p-5 rounded-3 shadow '>

          <label for="name" className="form-label">name</label>
          <input className='form-control' type="text" name='name' id='name' value={formik2.values.name} onChange={formik2.handleChange} onBlur={formik2.handleBlur} />
          {formik2.errors.name && formik2.touched.name ? <div className='form-text text-danger'>{formik2.errors.name}</div> : null}

          <label for="about" className="form-label">about</label>
          <input className='form-control' type="text" name='about' id='about' value={formik2.values.about} onChange={formik2.handleChange} onBlur={formik2.handleBlur} />
          {formik2.errors.about && formik2.touched.about ? <div className='form-text text-danger'>{formik2.errors.about}</div> : null}

          <label for="profileImage" className="form-label">profileImage</label>
          <input
            onChange={(event) => formik2.setFieldValue('profileImage', event.currentTarget.files[0])}
            className='form-control'
            type="file"
            name='profileImage'
            id='profileImage'
            onBlur={formik2.handleBlur} />
          {formik2.errors.profileImage && formik2.touched.profileImage ? <div className='form-text text-danger'>{formik2.errors.profileImage}</div> : null}




          <div className='row my-2 g-3'>
            {UpdateLoading ?
              <button type='button' className='btn btn-outline-success col-12  '><i className='fa fa-spinner fa-spin'></i></button>
              : <button disabled={!(formik2.isValid && formik2.dirty)} type='submit' className='btn btn-outline-success col-12 '>save changes</button>
            }
            <button onClick={() => { setUpdateMood(false) }} type='reset' className='btn mx-auto btn-outline-danger col-12 '>cancel</button>

          </div>

        </form>
      </div>
    </div> : null}
    {UpdatePasssMood ? <div className='start-0 end-0 top-0 bottom-0  bg-body-secondary bg-opacity-50 fixed-top row justify-content-center align-content-center'>
      <div className="ol-xl-4 col-lg-6 col-md-8 col-10 formRes">
        <form onSubmit={formik.handleSubmit} className='w-100 my-5 bg-light  p-5 rounded-3 shadow '>

          <label for="currentPassword" class="form-label">currentPassword</label>
          <input className='form-control' type="password" name='currentPassword' id='currentPassword' value={formik.values.currentPassword} onChange={formik.handleChange} onBlur={formik.handleBlur} />
          {formik.errors.currentPassword && formik.touched.currentPassword ? <div className='form-text text-danger'>{formik.errors.currentPassword}</div> : null}

          <label for="newPassword" class="form-label">newPassword</label>
          <input className='form-control' type="password" name='newPassword' id='newPassword' value={formik.values.newPassword} onChange={formik.handleChange} onBlur={formik.handleBlur} />
          {formik.errors.newPassword && formik.touched.newPassword ? <div className='form-text text-danger'>{formik.errors.newPassword}</div> : null}

          <label for="newPasswordConfirm" class="form-label">newPasswordConfirm</label>
          <input className='form-control' type="password" name='newPasswordConfirm' id='newPasswordConfirm' value={formik.values.newPasswordConfirm} onChange={formik.handleChange} onBlur={formik.handleBlur} />
          {formik.errors.newPasswordConfirm && formik.touched.newPasswordConfirm ? <div className='form-text text-danger'>{formik.errors.newPasswordConfirm}</div> : null}



          <div className='row my-2 g-3'>
            {Loading ?
              <button type='button' className='btn btn-outline-success col-12  '><i className='fa fa-spinner fa-spin'></i></button>
              : <button disabled={!(formik.isValid && formik.dirty)} type='submit' className='btn btn-outline-success col-12 '>save changes</button>
            }
            <button onClick={() => { setUpdatePassMood(false) }} type='reset' className='btn mx-auto btn-outline-danger col-12 '>cancel</button>

          </div>

        </form>
      </div>
    </div> : null}


    <div className='container pt-5'>
      <h2 className='text-center mainFont h1'>Profile</h2>

      <div className='col-12   mx-auto justify-content-evenly  p-5 rounded-5  mainFont'>
        <div className="row profileRes">
          <div className='col-lg-8 profileRes1  mx-auto text-center  p-5 shadow-lg rounded-4 wow fadeIn'>
            <div className='col-9 mx-auto'>
              <img className='img-fluid rounded-circle shadow-lg mainColor p-1' src={CompanyData.profileImage} alt="" />
            </div>
            <h3 className='fw-bolder text-capitalize mt-2'>{CompanyData.name}</h3>
            <p>{CompanyData.about}</p>
            <div className="row justify-content-evenly">
              <button onClick={() => { setUpdateMood(true) }} className='btn mainBtn2 rounded-5 col-md-3 my-2'>Update Profile</button>
              <button onClick={() => { setUpdatePassMood(true) }} className='btn mainBtn2 rounded-5 col-md-3 my-2'>Update  Password</button>

            </div>
          </div>

        </div>
      </div>
    </div>
  </>
}
