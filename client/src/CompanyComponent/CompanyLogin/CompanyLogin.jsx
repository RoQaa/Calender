import { useFormik } from 'formik';
import React, { useState } from 'react'
import { useNavigate } from 'react-router-dom';
import * as Yup from 'yup';
import axios from 'axios'
import { toast } from "react-hot-toast";

export default function CompanyLogin({saveData}) {
    let navigate = useNavigate()
    const [messageErr2, setmessageErr2] = useState('')
    const [loading, setloading] = useState(false)
    const [LoginMode, setLoginMode] = useState(true)
    const [ForgetMode, setForgetMode] = useState(false)
    const [SignUpMode, setSignUpMode] = useState(false)

    async function handleLoginData(values) {
        console.log(values);
        setloading(true)
        let { data } = await axios.post('http://localhost:5000/api/company/login', { email: values.email, password: values.password }).catch((err) => {
            setmessageErr2(`${err.response.message}`)
            setloading(false)
            toast.error(err.response.data.message)
        })
        console.log(data);
        if (data.status == true && data.data.role == 'company') {
            localStorage.setItem('CompanyToken', data.token)
            saveData()
            navigate('/')
            setloading(false)
            toast.success(data.message)
        } else {
            toast.success(data.message)
            setloading(false)

        }


    }

    let validationDataSchema = Yup.object({
        email: Yup.string().required('email is required'),
        password: Yup.string().required('password is required'),

    })

    let formik2 = useFormik({
        initialValues: {
            data: {
                email: "",
                password: "",
            }
        }
        ,
        onSubmit: handleLoginData,
        validationSchema: validationDataSchema
    })

    async function handleForgetPassData(values) {
        console.log(values);
    }

    let validationForgetPassSchema = Yup.object({
        email: Yup.string().email('invalid email').required('email is required')
    })

    let formik3 = useFormik({
        initialValues: {
            data: {
                email: ""
            }
        }
        ,
        onSubmit: handleForgetPassData,
        validationSchema: validationForgetPassSchema
    })

    async function handleSignupData(values) {
        console.log(values);

    }

    let validationSignUpSchema = Yup.object({
        name: Yup.string().required('name is required'),
        email: Yup.string().required('email is required'),
        phone: Yup.string().required('phone is required'),
        about: Yup.string(),
        password: Yup.string().required('password is required'),
        confirmPassword: Yup.string().required('confirmPassword is required').equals([Yup.ref('password')], 'you must be like a new password'),
        profileImage: Yup.mixed()
    })

    let formik = useFormik({
        initialValues: {
            data: {
                name: "",
                email: "",
                password: "",
                confirmPassword: "",
                phone: "",
                about: "",
                profileImage: ""


            }
        }
        ,
        onSubmit: handleSignupData,
        validationSchema: validationSignUpSchema
    })




    return <>
        <div className='bg-light start-0 end-0 top-0 bottom-0   fixed-top row justify-content-center align-content-center'>
            <div className="col-xl-4 col-lg-6 col-md-8 col-10 formRes">
                {LoginMode ?
                    <form onSubmit={formik2.handleSubmit} className=' w-100 bg-light  p-5 rounded-3 shadow-lg  '>
                        <h2 className="navbar-brand  fs-1 text-capitalize fw-bolder mainFont  text-center mb-5  " >welcome to Calendar</h2>

                        <div className="py-1">
                            <label for="email" class="form-label fw-bold">Company Email</label>
                            <input className='form-control' type="email" name='email' id='email' value={formik2.values.email} onChange={formik2.handleChange} onBlur={formik2.handleBlur} />
                            {formik2.errors.email && formik2.touched.email ? <div className='form-text text-danger'>{formik2.errors.email}</div> : null}
                        </div>
                        <div className="py-1">

                            <label for="password" class="form-label fw-bold">Company password</label>
                            <input className='form-control' type="password" name='password' id='password' value={formik2.values.password} onChange={formik2.handleChange} onBlur={formik2.handleBlur} />
                            {formik2.errors.password && formik2.touched.password ? <div className='form-text text-danger'>{formik2.errors.password}</div> : null}
                        </div>


                        <div className='row my-2 g-3 px-1'>

                            {loading ? <button type='button' className='btn  mainBtn col-12  rounded-pill '><i className='fa fa-spinner fa-spin'></i></button> :
                                <button disabled={!(formik2.isValid && formik2.dirty)} type='submit' className='btn mainBtn col-12 rounded-pill'>Sign in</button>}
                            <button onClick={() => {
                                setLoginMode(false)
                                setForgetMode(true)
                            }} type='button' className='btn btn-success mainBtn2 col-12 rounded-pill'>Forget Password</button>

                            <p className='text-center'>If you do not have an account <a className='mainFont text-decoration-none mainClick' onClick={() => {
                                setLoginMode(false)
                                setSignUpMode(true)
                            }}>Create Account</a></p>

                        </div>



                    </form>
                    : null}

                {ForgetMode ?
                    <form onSubmit={formik3.handleSubmit} className=' w-100 bg-light  p-5 rounded-3 shadow-lg  '>
                        <h3>Find your Account</h3>
                        <p>Enter the email associated with your account to change your password.</p>
                        <div className="py-1">
                            <label for="email" class="form-label fw-bold">Company Email</label>
                            <input className='form-control' type="text" name='email' id='email' value={formik3.values.email} onChange={formik3.handleChange} onBlur={formik3.handleBlur} />
                            {formik3.errors.email && formik3.touched.email ? <div className='form-text text-danger'>{formik3.errors.email}</div> : null}
                        </div>
                        <div className='row my-2 g-3 px-1'>
                            {/* <button type='button' className='btn btn-outline-success col-12  '><i className='fa fa-spinner fa-spin'></i></button> */}
                            <button disabled={!(formik3.isValid && formik3.dirty)} type='submit' className='btn btn-outline-success col-12 rounded-pill'>Next</button>
                        </div>



                    </form>
                    : null}

                {SignUpMode ?
                    <form onSubmit={formik.handleSubmit} className='w-100 bg-light  p-5 rounded-3 shadow-lg  '>
                        <div className='py-1'>
                            <label for="name" class="form-label fw-bold">Company Name</label>
                            <input className='form-control' type="text" name='name' id='name' value={formik.values.name} onChange={formik.handleChange} onBlur={formik.handleBlur} />
                            {formik.errors.name && formik.touched.name ? <div className='form-text text-danger'>{formik.errors.name}</div> : null}
                        </div>
                        <div className='py-1'>

                            <label for="email" class="form-label fw-bold">Company email</label>
                            <input className='form-control' type="email" name='email' id='email' value={formik.values.email} onChange={formik.handleChange} onBlur={formik.handleBlur} />
                            {formik.errors.email && formik.touched.email ? <div className='form-text text-danger'>{formik.errors.email}</div> : null}
                        </div>
                        <div className='py-1'>

                            <label for="phone" class="form-label fw-bold">Company phone</label>
                            <input className='form-control' type="tel" name='phone' id='phone' value={formik.values.phone} onChange={formik.handleChange} onBlur={formik.handleBlur} />
                            {formik.errors.phone && formik.touched.phone ? <div className='form-text text-danger'>{formik.errors.phone}</div> : null}
                        </div>

                        <div className='py-1'>

                            <label for="about" class="form-label fw-bold">Company about</label>
                            <input className='form-control' type="text" name='about' id='about' value={formik.values.about} onChange={formik.handleChange} onBlur={formik.handleBlur} />
                            {formik.errors.about && formik.touched.about ? <div className='form-text text-danger'>{formik.errors.about}</div> : null}
                        </div>
                        <div className='py-1'>

                            <label for="password" class="form-label fw-bold">password</label>
                            <input className='form-control' type="password" name='password' id='password' value={formik.values.password} onChange={formik.handleChange} onBlur={formik.handleBlur} />
                            {formik.errors.password && formik.touched.password ? <div className='form-text text-danger'>{formik.errors.password}</div> : null}
                        </div>
                        <div className='py-1'>

                            <label for="confirmPassword" class="form-label fw-bold">confirm Password</label>
                            <input className='form-control' type="password" name='confirmPassword' id='confirmPassword' value={formik.values.confirmPassword} onChange={formik.handleChange} onBlur={formik.handleBlur} />
                            {formik.errors.confirmPassword && formik.touched.confirmPassword ? <div className='form-text text-danger'>{formik.errors.confirmPassword}</div> : null}
                        </div>
                        <div className='py-1'>

                            <label for="profileImage" class="form-label fw-bold">profile Image</label>
                            <input className='form-control' type="file" name='profileImage' id='profileImage' value={formik.values.profileImage} onChange={formik.handleChange} onBlur={formik.handleBlur} />
                            {formik.errors.profileImage && formik.touched.profileImage ? <div className='form-text text-danger'>{formik.errors.profileImage}</div> : null}
                        </div>


                        <div className='row my-2 g-3 px-1'>

                            {/* <button type='button' className='btn btn-outline-success col-12  '><i className='fa fa-spinner fa-spin'></i></button> */}
                            <button disabled={!(formik.isValid && formik.dirty)} type='submit' className='btn btn-outline-success col-12 rounded-pill'>Sign Up</button>

                            <p className='text-center'>Already have an account? <a className='mainFont text-decoration-none mainClick ' onClick={() => {
                                setLoginMode(true)
                                setSignUpMode(false)
                            }}>Sign in</a></p>
                        </div>



                    </form>
                    : null}

            </div>
        </div>
    </>
}
