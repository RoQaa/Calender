import React, { useEffect, useState } from 'react'
import { Formik, Form, Field, ErrorMessage, useFormik } from 'formik';
import * as Yup from 'yup';
import axios from 'axios';
import { toast } from "react-hot-toast";
import Select from 'react-select';

export default function SendNotifications({ setAdminData }) {

  const [Loading, setLoading] = useState(false)
  const [CompanyOptions, setCompanyOptions] = useState([])
  const [CompanysLoading, setCompanysLoading] = useState(false)


  async function getCompanies() {
    setCompanysLoading(true)
    let token = localStorage.getItem('AdminToken')
    let headers = {
      Authorization: `Bearer ${token}`
    }
    await axios(`${process.env.REACT_APP_API}/company/getCompanies`, { headers }).catch((err) => {
      if (err?.response?.status == 401) {
        localStorage.clear()
        toast.error(err?.response?.data?.message)
        setCompanysLoading(false)
      } else {
        toast.error(err?.response?.data?.message)
        setCompanysLoading(false)
      }
    }).then((res) => {
      console.log(res);
      console.log(res?.data?.data);
      setCompanyOptions(res?.data?.data?.map((company) => ({
        value: company._id,
        label: company.email,
      })))
      setCompanysLoading(false)
    })
  }

  useEffect(() => {
    getCompanies()
  }, [])







  async function handleAdd(values) {
    console.log(values);
    setLoading(true)
    let token = localStorage.getItem('AdminToken')
    let headers = {
      Authorization: `Bearer ${token}`
    }
    await axios.post(`${process.env.REACT_APP_API}/notification/createNotification`, {
      to: values.sendTo,
      description: values.notification
    }, { headers }).catch((err) => {
      if (err?.response?.status == 401) {
        localStorage.clear()
        setAdminData(null)
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
      
      formik.resetForm()
    })

  }

  let validationSchema = Yup.object({
    notification: Yup.string().required('notification is required'),
    sendTo: Yup.string().required('sendTo is required')
  })

  let formik = useFormik({
    initialValues: {
      notification: "",
      sendTo: ""
    }
    ,
    onSubmit: handleAdd,
    validationSchema
  })



  return <>
    <div className='container pt-5'>
      <h2 className='text-center mainFont h1'>Send Notifications</h2>

      <form onSubmit={formik.handleSubmit} className='w-100 my-5  p-5 rounded-3 shadow '>

        <label for="notification" class="form-label mainFont">description</label>
        <input className='form-control' type="text" name='notification' id='notification' value={formik.values.notification} onChange={formik.handleChange} onBlur={formik.handleBlur} />
        {formik.errors.notification && formik.touched.notification ? <div className='form-text text-danger'>{formik.errors.notification}</div> : null}

        <label for="sendTo" class="form-label mainFont mt-2 ">sendTo</label>
        {CompanysLoading ? <div className='col-12 text-center my-5 py-5'>
          <i className='fa fa-spin fa-spinner fa-3x text-success'></i>
        </div> : <>
          <Select
            id="sendTo"
            name="sendTo"
            options={CompanyOptions}
            value={CompanyOptions.find((option) => option.value === formik?.values?.sendTo)}
            onChange={(selectedOption) => {
              formik.setFieldValue('sendTo', selectedOption ? selectedOption.value : '');
            }}
            onBlur={formik.handleBlur}
            className=""
          />
        </>}

        <div className='row my-2 g-3'>
          {Loading ? <button type='button' className='btn mainBtn col-12 rounded-pill  '><i className='fa fa-spinner fa-spin'></i></button>
            : <button disabled={!(formik.isValid && formik.dirty)} type='submit' className='btn mainBtn  col-12 rounded-pill'>Send</button>}
        </div>

      </form>

    </div>
  </>
}
