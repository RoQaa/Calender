import React, { useState } from 'react'
import { Formik, Form, Field, ErrorMessage, useFormik } from 'formik';
import * as Yup from 'yup';
import axios from 'axios';
import { useNavigate } from 'react-router-dom'
import { toast } from "react-hot-toast";

export default function CreateAccount() {
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
        name: Yup.string().required('name is required'),
        email: Yup.string().required('email is required'),
        password: Yup.string().required('password is required'),
        passwordConfirm: Yup.string().equals([Yup.ref('password')]).required('passwordConfirm is required'),
        role: Yup.string().required('role is required'),
    })

    let formik = useFormik({
        initialValues: {
            user: {
                name: "",
                email: "",
                password: "",
                passwordConfirm: "",
                role: ""

            }
        }
        ,
        onSubmit: handleUpdate,
        validationSchema
    })



    return (
        <div className='container pt-5'>
            <h2 className='text-center mainFont h1'>Create Account</h2>

            <form onSubmit={formik.handleSubmit} className='w-100 my-5  p-5 rounded-3 shadow '>

                <label for="name" class="form-label mainFont">Name</label>
                <input className='form-control' type="text" name='name' id='name' value={formik.values.name} onChange={formik.handleChange} onBlur={formik.handleBlur} />
                {formik.errors.name && formik.touched.name ? <div className='form-text text-danger'>{formik.errors.name}</div> : null}

                <label for="email" class="form-label mainFont mt-2 ">Email</label>
                <input className='form-control' type="email" name='email' id='email' value={formik.values.email} onChange={formik.handleChange} onBlur={formik.handleBlur} />
                {formik.errors.email && formik.touched.email ? <div className='form-text text-danger'>{formik.errors.email}</div> : null}

                <label for="password" class="form-label mainFont mt-2 ">password</label>
                <input className='form-control' type="password" name='password' id='password' value={formik.values.password} onChange={formik.handleChange} onBlur={formik.handleBlur} />
                {formik.errors.password && formik.touched.password ? <div className='form-text text-danger'>{formik.errors.password}</div> : null}


                <label for="passwordConfirm" class="form-label mainFont mt-2 ">passwordConfirm</label>
                <input className='form-control' type="password" name='passwordConfirm' id='passwordConfirm' value={formik.values.passwordConfirm} onChange={formik.handleChange} onBlur={formik.handleBlur} />
                {formik.errors.passwordConfirm && formik.touched.passwordConfirm ? <div className='form-text text-danger'>{formik.errors.passwordConfirm}</div> : null}


                <label for="role" class="form-label mainFont mt-2 ">role</label>

                <select class="form-select" aria-label="Default select example" name='role' id='role' value={formik.values.role} onChange={formik.handleChange} onBlur={formik.handleBlur}>

                    <option disabled selected>select role</option>
                    {roleList.map((role) => {
                        return <option value={role}>{role}</option>
                    })}

                </select>

                <div className='row my-2 g-3'>
                    
                        <button disabled={!(formik.isValid && formik.dirty)} type='submit' className='btn  mainBtn col-12 '>Add</button>


                    

                </div>

            </form>

        </div>
    )
}
