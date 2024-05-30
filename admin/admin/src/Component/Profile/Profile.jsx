import React, { useEffect, useState } from 'react'
import { Link } from 'react-router-dom'
import * as Yup from 'yup';
import axios from 'axios';
import { Formik, Form, Field, ErrorMessage, useFormik } from 'formik';
import { toast } from "react-hot-toast";


export default function Profile() {

  
  const [UpdatePasssMood, setUpdatePassMood] = useState(false)
  const [UpdateMood, setUpdateMood] = useState(false)
  const [Loading, setLoading] = useState(false)


  let token = localStorage.getItem('userToken')
  let headers = {
      Authorization: `Bearer ${token}`
  }


  useEffect(() => {
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
          password: {
              currentPassword: "",
              newPassword: "",
              newPasswordConfirm: ""
          }
      }
      ,
      onSubmit: handleUpdatePass,
      validationSchema
  })




  async function handleUpdateData(values) {
      console.log(values);

  }

  let validationDataSchema = Yup.object({
      name: Yup.string().required('name is required'),
      profileImage: Yup.mixed().required('profile Image is required'),

  })
  
  let formik2 = useFormik({
      initialValues: {
          data: {
              name: "",
              profileImage: "",
          }
      }
      ,
      onSubmit: handleUpdateData,
      validationDataSchema
  })



  return <>
    {UpdateMood ? <div className='start-0 end-0 top-0 bottom-0 bg-body-secondary bg-opacity-50 fixed-top row justify-content-center align-content-center'>
      <div className="col-xl-4 col-lg-6 col-md-8 col-10 formRes">
        <form onSubmit={formik2.handleSubmit} className='w-100 bg-light  p-5 rounded-3 shadow '>

          <label for="name" class="form-label">name</label>
          <input className='form-control' type="text" name='name' id='name' value={formik2.values.name} onChange={formik2.handleChange} onBlur={formik2.handleBlur} />
          {formik2.errors.name && formik2.touched.name ? <div className='form-text text-danger'>{formik2.errors.name}</div> : null}

          <label for="profileImage" class="form-label">profileImage</label>
          <input
            onChange={(event) => formik2.setFieldValue('profileImage', event.currentTarget.files[0])}
            className='form-control'
            type="file"
            name='profileImage'
            id='profileImage'
            onBlur={formik2.handleBlur} />
          {formik2.errors.profileImage && formik2.touched.profileImage ? <div className='form-text text-danger'>{formik2.errors.profileImage}</div> : null}




          <div className='row my-2 g-3'>
            {Loading ?
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

      <div className='col-12   mx-auto justify-content-evenly  p-5 rounded-5 mt-5 mainFont'>
        <div className="row profileRes">
          <div  data-wow-duration="1s" data-wow-delay="0.5s" className='col-lg-4 profileRes1  mx-auto text-center  p-5 shadow-lg rounded-4 wow fadeIn'>
            <div className='col-9 mx-auto'>

              <img className='img-fluid rounded-circle shadow-lg ' src="https://img.freepik.com/free-photo/portrait-man-laughing_23-2148859448.jpg?size=338&ext=jpg&ga=GA1.1.553209589.1714694400&semt=ais" alt="" />
            </div>
            <h3 className='mt-3 fw-bolder text-capitalize'>Mohamed</h3>
            <p>Admin</p>
            <button onClick={() => { setUpdateMood(true) }}  className='btn mainBtn2 rounded-5 col-8 my-2'>Update Profile</button>

          </div>
          <div className='col-lg-6 profileRes1  align-self-center  text-center mx-auto mt-4 mainFont '>
            <table class="table table-striped table-hover text-center shadow-lg rounded-5 overflow-hidden">
              <tbody>
                <tr className='align-baseline '>
                  <td className='mainFont'>Name</td>
                  <td className='mainFont'>Mohamed ashraf</td>
                </tr>
                <tr className='align-baseline'>
                  <td className='mainFont'>Email</td>
                  <td className='mainFont'>mohamde@gmail.com</td>
                </tr>
                <tr className='align-baseline'>
                  <td className='mainFont'>Role</td>
                  <td className='mainFont'>Admin</td>
                </tr>
              </tbody>
            </table>
            <div className="row justify-content-evenly ">
              <button onClick={() => { setUpdatePassMood(true) }} className='btn mainBtn2 my-3 col-5 rounded-5'>Update Password</button>
            </div>
          </div>
        </div>
      </div>
    </div>
  </>
}
