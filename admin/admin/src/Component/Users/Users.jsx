import React, { useEffect, useState } from 'react'
import { useFormik } from 'formik';
import * as Yup from 'yup'
import { Link, useNavigate } from 'react-router-dom';
import axios from 'axios';
import toast from 'react-hot-toast';

export default function Users() {
    const [UpdateMood, setUpdateMood] = useState(false)
    const [ResetPassMood, setResetPassMood] = useState(false)
    const [CreateMood, setCreateMood] = useState(false)
    const [Loading, setLoading] = useState(false)
    const [Companies, setCompanies] = useState([])
    const [resetLoading, setresetLoading] = useState(false)
    const [UpdateLoading, setUpdateLoading] = useState(false)
    const [CreateLoading, setCreateLoading] = useState(false)

    const navigate = useNavigate()

    async function getCompanies() {
        setLoading(true)
        let token = localStorage.getItem('AdminToken')
        let headers = {
            Authorization: `Bearer ${token}`
        }
        await axios(`${process.env.REACT_APP_API}/company/getCompanies`, { headers }).catch((err) => {
            if (err?.response?.status == 401) {
                localStorage.clear()
                toast.error(err?.response?.data?.message)
                setLoading(false)
            } else {
                toast.error(err?.response?.data?.message)
                setLoading(false)
            }
        }).then((res) => {
            console.log(res);
            console.log(res?.data?.data);
            setCompanies(res?.data?.data)
            setLoading(false)
        })
    }

    useEffect(() => {
        getCompanies()
    }, [])

    let validationCreateSchema = Yup.object({
        name: Yup.string().required('name is required'),
        about: Yup.string().required('about is required'),
        email: Yup.string().required('email is required'),
        NumberPhone: Yup.string().required('NumberPhone is required'),
        password: Yup.string().required('password is required'),
        passwordConfirm: Yup.string().required('password Confirm is required').equals([Yup.ref('password')], 'you must be like a new password'),
    })

    let formik3 = useFormik({
        initialValues: {
            name: "",
            about: "",
            email: "",
            NumberPhone: "",
            password: "",
            passwordConfirm: ""
        }
        ,
        onSubmit: handleCreateCompany,
        validationSchema: validationCreateSchema
    })

    async function handleCreateCompany(values) {
        console.log(values);
        setCreateLoading(true)
        let token = localStorage.getItem('AdminToken')
        let headers = {
            Authorization: `Bearer ${token}`
        }
        await axios.post(`${process.env.REACT_APP_API}/company/createCompany`, values, { headers }).catch((err) => {
            if (err?.response?.status == 401) {
                localStorage.clear()
                toast.error(err?.response?.data?.message)
                setCreateLoading(false)
            } else {
                toast.error(err?.response?.data?.message)
                setCreateLoading(false)
            }
        }).then((res) => {
            console.log(res);
            toast.success(res?.data?.message)
            formik3.resetForm()
            getCompanies()
            setCreateLoading(false)
            setCreateMood(false)
        })
    }

    let validationSchema = Yup.object({
        name: Yup.string().required('name is required'),
        about: Yup.string().required('about is required'),
        email: Yup.string().required('email is required'),
        NumberPhone: Yup.string().required('NumberPhone is required'),


    })

    let formik = useFormik({
        initialValues: {
            _id: "",
            name: "",
            about: "",
            email: "",
            NumberPhone: ""
        }
        ,
        onSubmit: handleUpdate,
        validationSchema
    })

    async function handleUpdate(values) {
        console.log(values);
        setUpdateLoading(true)
        let token = localStorage.getItem('AdminToken')
        let headers = {
            Authorization: `Bearer ${token}`
        }
        await axios.patch(`${process.env.REACT_APP_API}/company/updateByAdmin/${values._id}`, {
            name: values.name,
            about: values.about
        }, { headers }).catch((err) => {
            if (err?.response?.status == 401) {
                localStorage.clear()
                toast.error(err?.response?.data?.message)
                setUpdateLoading(false)
            } else {
                toast.error(err?.response?.data?.message)
                setUpdateLoading(false)
            }
        }).then((res) => {
            console.log(res);
            toast.success(res?.data?.message)
            formik.resetForm()
            getCompanies()
            setUpdateLoading(false)
            setUpdateMood(false)
        })
    }

    function getUpdateData(index) {
        const selectedCompany = Companies[index]
        formik.setValues({
            _id: selectedCompany._id,
            name: selectedCompany.name,
            email: selectedCompany.email,
            about: selectedCompany.about,
            NumberPhone: selectedCompany.NumberPhone,
        })
        setUpdateMood(true)
    }

    let validationPassSchema = Yup.object({
        password: Yup.string().required('password is required'),
        confirmPassword: Yup.string().required('confirmPassword is required').equals([Yup.ref('password')], 'you must be like a new password'),


    })

    let formik2 = useFormik({
        initialValues: {
            _id: "",
            password: "",
            confirmPassword: ""
        }
        ,
        onSubmit: handlePassUpdate,
        validationSchema: validationPassSchema
    })

    async function handlePassUpdate(values) {
        console.log(values);
        setresetLoading(true)
        let token = localStorage.getItem('AdminToken')
        let headers = {
            Authorization: `Bearer ${token}`
        }
        await axios.patch(`${process.env.REACT_APP_API}/company/resetCompanyPassword/${values._id}`, {
            password: values.password,
            passwordConfirm: values.confirmPassword
        }, { headers }).catch((err) => {
            if (err?.response?.status == 401) {
                console.log(err);

                localStorage.clear()
                toast.error(err?.response?.data?.message)
                setresetLoading(false)
            } else {
                console.log(err);
                toast.error(err?.response?.data?.message)
                setresetLoading(false)
            }
        }).then((res) => {
            console.log(res);
            toast.success(res?.data?.message)
            formik2.resetForm()
            getCompanies()
            setresetLoading(false)
            setResetPassMood(false)

        })
    }

    function getResetData(index) {
        const selectedCompany = Companies[index]
        formik2.setValues({
            _id: selectedCompany._id,
        })
        setResetPassMood(true)
    }

    async function deleteEmploye(_id) {
        let token = localStorage.getItem('AdminToken')
        let headers = {
            Authorization: `Bearer ${token}`
        }
        await axios.delete(`${process.env.REACT_APP_API}/company/deleteByAdmin/${_id}`, { headers }).catch((err) => {
            if (err?.response?.status == 401) {
                console.log(err);
                localStorage.clear()
                toast.error(err?.response?.data?.message)
            } else {
                console.log(err);
                toast.error(err?.response?.data?.message)
            }
        }).then((res) => {
            console.log(res);
            console.log(Companies);
            toast.success(res?.data?.message)
            getCompanies()
        })
    }

    return <>
        {UpdateMood ?
            <div className='start-0 end-0 top-0 bottom-0   bg-body-secondary bg-opacity-50 fixed-top row justify-content-center align-content-center'>
                <div className='col-xl-4 col-lg-6 col-md-8 col-10 formRes'>
                    <form onSubmit={formik.handleSubmit} className='w-100 my-5  p-5 bg-light rounded-3 shadow mainFont'>
                        <h2 className=' text-center fw-bolder mb-5'>Update User Data</h2>

                        <label for="name" className="form-label fw-bold">Name</label>
                        <input className='form-control' type="text" name='name' id='name' value={formik.values.name} onChange={formik.handleChange} onBlur={formik.handleBlur} />
                        {formik.errors.name && formik.touched.name ? <div className='form-text text-danger'>{formik.errors.name}</div> : null}

                        <label for="email" className="form-label fw-bold">email</label>
                        <input disabled className='form-control' type="text" name='email' id='email' value={formik.values.email} onChange={formik.handleChange} onBlur={formik.handleBlur} />
                        {formik.errors.email && formik.touched.email ? <div className='form-text text-danger'>{formik.errors.email}</div> : null}

                        <label for="NumberPhone" className="form-label fw-bold">NumberPhone</label>
                        <input disabled className='form-control' type="text" name='NumberPhone' id='NumberPhone' value={formik.values.NumberPhone} onChange={formik.handleChange} onBlur={formik.handleBlur} />
                        {formik.errors.NumberPhone && formik.touched.NumberPhone ? <div className='form-text text-danger'>{formik.errors.NumberPhone}</div> : null}


                        <label for="about" className="form-label fw-bold">about</label>
                        <input className='form-control' type="text" name='about' id='about' value={formik.values.about} onChange={formik.handleChange} onBlur={formik.handleBlur} />
                        {formik.errors.about && formik.touched.about ? <div className='form-text text-danger'>{formik.errors.about}</div> : null}




                        <div className='row my-2 g-3'>
                            {UpdateLoading ? <button type='button' className='btn mainBtn col-12 rounded-pill  '><i className='fa fa-spinner fa-spin'></i></button>
                                : <button disabled={!(formik.isValid && formik.dirty)} type='submit' className='btn mainBtn  col-12 rounded-pill'>save changes</button>}
                            <button onClick={() => { setUpdateMood(false) }} type='reset' className='btn mx-auto rounded-pill btn-outline-danger col-12 '>cancel</button>

                        </div>

                    </form>
                </div>
            </div>
            : null}
        {ResetPassMood ?
            <div className='start-0 end-0 top-0 bottom-0   bg-body-secondary bg-opacity-50 fixed-top row justify-content-center align-content-center'>
                <div className='col-xl-4 col-lg-6 col-md-8 col-10 formRes'>
                    <form onSubmit={formik2.handleSubmit} className='w-100 my-5  p-5 bg-light rounded-3 shadow mainFont'>
                        <h2 className=' text-center fw-bolder mb-5'>Update User Data</h2>

                        <label for="password" className="form-label fw-bold">password</label>
                        <input className='form-control' type="text" name='password' id='password' value={formik2.values.password} onChange={formik2.handleChange} onBlur={formik2.handleBlur} />
                        {formik2.errors.password && formik2.touched.password ? <div className='form-text text-danger'>{formik2.errors.password}</div> : null}

                        <label for="confirmPassword" className="form-label fw-bold">confirmPassword</label>
                        <input className='form-control' type="text" name='confirmPassword' id='confirmPassword' value={formik2.values.confirmPassword} onChange={formik2.handleChange} onBlur={formik2.handleBlur} />
                        {formik2.errors.confirmPassword && formik2.touched.confirmPassword ? <div className='form-text text-danger'>{formik2.errors.confirmPassword}</div> : null}


                        <div className='row my-2 g-3'>
                            {resetLoading ? <button type='button' className='btn mainBtn col-12 rounded-pill  '><i className='fa fa-spinner fa-spin'></i></button>
                                : <button disabled={!(formik2.isValid && formik2.dirty)} type='submit' className='btn mainBtn  col-12 rounded-pill'>save changes</button>}
                            <button onClick={() => { setResetPassMood(false) }} type='reset' className='btn mx-auto rounded-pill btn-outline-danger col-12 '>cancel</button>

                        </div>

                    </form>
                </div>
            </div>
            : null}
        {CreateMood ?
            <div className='start-0 end-0 top-0 bottom-0   bg-body-secondary bg-opacity-50 fixed-top row justify-content-center align-content-center'>
                <div className='col-xl-4 col-lg-6 col-md-8 col-10 formRes'>
                    <form onSubmit={formik3.handleSubmit} className='w-100 my-5  p-5 bg-light rounded-3 shadow mainFont'>
                        <h2 className=' text-center fw-bolder mb-5'>Add New Company</h2>

                        <label for="name" className="form-label fw-bold">name</label>
                        <input className='form-control' type="text" name='name' id='name' value={formik3.values.name} onChange={formik3.handleChange} onBlur={formik3.handleBlur} />
                        {formik3.errors.name && formik3.touched.name ? <div className='form-text text-danger'>{formik3.errors.name}</div> : null}

                        <label for="about" className="form-label fw-bold">about</label>
                        <input className='form-control' type="text" name='about' id='about' value={formik3.values.about} onChange={formik3.handleChange} onBlur={formik3.handleBlur} />
                        {formik3.errors.about && formik3.touched.about ? <div className='form-text text-danger'>{formik3.errors.about}</div> : null}

                        <label for="email" className="form-label fw-bold">email</label>
                        <input className='form-control' type="email" name='email' id='email' value={formik3.values.email} onChange={formik3.handleChange} onBlur={formik3.handleBlur} />
                        {formik3.errors.email && formik3.touched.email ? <div className='form-text text-danger'>{formik3.errors.email}</div> : null}

                        <label for="NumberPhone" className="form-label fw-bold">NumberPhone</label>
                        <input className='form-control' type="text" name='NumberPhone' id='NumberPhone' value={formik3.values.NumberPhone} onChange={formik3.handleChange} onBlur={formik3.handleBlur} />
                        {formik3.errors.NumberPhone && formik3.touched.NumberPhone ? <div className='form-text text-danger'>{formik3.errors.NumberPhone}</div> : null}


                        <label for="password" className="form-label fw-bold">password</label>
                        <input className='form-control' type="password" name='password' id='password' value={formik3.values.password} onChange={formik3.handleChange} onBlur={formik3.handleBlur} />
                        {formik3.errors.password && formik3.touched.password ? <div className='form-text text-danger'>{formik3.errors.password}</div> : null}

                        <label for="passwordConfirm" className="form-label fw-bold">passwordConfirm</label>
                        <input className='form-control' type="password" name='passwordConfirm' id='passwordConfirm' value={formik3.values.passwordConfirm} onChange={formik3.handleChange} onBlur={formik3.handleBlur} />
                        {formik3.errors.passwordConfirm && formik3.touched.passwordConfirm ? <div className='form-text text-danger'>{formik3.errors.passwordConfirm}</div> : null}


                        <div className='row my-2 g-3 px-2'>
                            {CreateLoading ? <button type='button' className='btn mainBtn col-12 rounded-pill  '><i className='fa fa-spinner fa-spin'></i></button>
                                : <button disabled={!(formik3.isValid && formik3.dirty)} type='submit' className='btn mainBtn  col-12 rounded-pill'>save changes</button>}
                            <button onClick={() => { setCreateMood(false) }} type='reset' className='btn mx-auto btn-outline-danger rounded-pill col-12 '>cancel</button>

                        </div>

                    </form>
                </div>
            </div>
            : null}
        <div className="container pt-5">
            <h2 className='text-center mainFont h1'>Company</h2>
            <div className=' p-5'>
                <button onClick={() => { setCreateMood(true) }} className='btn mainBtn w-100 mb-2'>Add New Company</button>

                {Loading ? <div className='col-12 text-center my-5 py-5'>
                    <i className='fa fa-spin fa-spinner fa-3x text-success'></i>
                </div> : <>
                <div className='table-responsive '>
                <table class="table table-striped  table-hover mx-auto text-center ">
                    <thead >
                        <tr>
                            <th scope="col" className='mainFont' >#</th>
                            <th scope="col" className='mainFont'>Name</th>
                            <th scope="col" className='mainFont'>about</th>
                            <th scope="col" className='mainFont'>Email</th>
                            <th scope="col" className='mainFont'>Phone</th>
                            <th scope="col" className='mainFont'>isActive</th>
                            <th scope="col" className='mainFont'>Acthions</th>
                        </tr>
                    </thead>
                    <tbody>
                        {Companies.map((company, index) => {
                            return <tr className='align-baseline' key={company._id}>
                                <th scope="row" className='mainFont'>{index + 1}</th>
                                <td className='mainFont'> {company.name}</td>
                                <td className='mainFont'>{company.about}</td>
                                <td className='mainFont'>{company.email}</td>
                                <td className='mainFont'>{company.NumberPhone}</td>
                                {company.isActive ? <td className='mainFont '><div className='badge bg-success'>Active</div></td> : <td className='mainFont '><div className='badge bg-danger'>Not Active</div></td>}

                                <td>
                                    <div class="dropdown ">
                                        <button class="btn mainIcon  " type="button" data-bs-toggle="dropdown" aria-expanded="false">
                                            <i class="fa-solid fa-list fa-0 mainFont"></i>
                                        </button>
                                        <ul class="dropdown-menu ">
                                            <li onClick={() => { deleteEmploye(company._id) }} className="dropdown-item mainFont mainClick"><i class="fa-regular fa-trash-can me-2"></i>delete</li>
                                            <li onClick={() => { getUpdateData(index) }} className="dropdown-item mainFont mainClick"><i class="fa-regular fa-pen-to-square me-2"></i>update</li>
                                            <li onClick={() => { getResetData(index) }} className="dropdown-item mainFont mainClick"><i class="fa-solid fa-rotate me-2"></i>reset Password</li>
                                            <Link to={'employees/' + company._id} className="dropdown-item mainFont mainClick"><i class="fa-solid fa-users me-2"></i>View employees</Link>

                                        </ul>
                                    </div>
                                </td>
                            </tr>
                        })}




                    </tbody>
                </table>
                </div>
                </>}


            </div>
        </div>
    </>
}
