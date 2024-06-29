import axios from 'axios'
import { useFormik } from 'formik'
import React, { useEffect, useState } from 'react'
import toast from 'react-hot-toast'
import { useParams } from 'react-router-dom'
import * as Yup from 'yup'

export default function Employees() {
    const { id } = useParams()
    const [UpdateMood, setUpdateMood] = useState(false)
    const [ResetPassMood, setResetPassMood] = useState(false)
    const [Loading, setLoading] = useState(false)
    const [CompanyLoading, setCompanyLoading] = useState(false)
    const [resetLoading, setresetLoading] = useState(false)
    const [UpdateLoading, setUpdateLoading] = useState(false)


    const [Employes, setEmployes] = useState([])
    const [Companie, setCompanie] = useState({})




    async function getCompanieEmployes() {
        setLoading(true)
        let token = localStorage.getItem('AdminToken')
        let headers = {
            Authorization: `Bearer ${token}`
        }
        await axios(`${process.env.REACT_APP_API}/company/getEmployeesByAdmin/${id}`, { headers }).catch((err) => {
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
            setEmployes(res?.data?.data)
            setLoading(false)
        })
    }

    async function getCompanie() {
        setCompanyLoading(true)
        let token = localStorage.getItem('AdminToken')
        let headers = {
            Authorization: `Bearer ${token}`
        }
        await axios(`${process.env.REACT_APP_API}/company/getOneCompany/${id}`, { headers }).catch((err) => {
            if (err?.response?.status == 401) {
                localStorage.clear()
                toast.error(err?.response?.data?.message)
                setCompanyLoading(false)
            } else {
                toast.error(err?.response?.data?.message)
                setCompanyLoading(false)
            }
        }).then((res) => {
            console.log(res);
            console.log(res?.data?.data);
            setCompanie(res?.data?.data)
            setCompanyLoading(false)
        })
    }



    useEffect(() => {
        console.log(id);
        getCompanie()
        getCompanieEmployes()
    }, [])






    let validationSchema = Yup.object({
        name: Yup.string().required('name is required'),
        NumberPhone: Yup.string().required('NumberPhone is required'),
        email: Yup.string().required('email is required'),
    })

    let formik = useFormik({
        initialValues: {
            _id: "",
            name: "",
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
        await axios.patch(`${process.env.REACT_APP_API}/company/updateEmployeeByAdmin/${values._id}`, {
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
            getCompanieEmployes()
            setUpdateLoading(false)
            setUpdateMood(false)
        })
    }


    function getUpdateData(index) {
        const selectedEmploye = Employes[index]
        formik.setValues({
            _id: selectedEmploye._id,
            name: selectedEmploye.name,
            email: selectedEmploye.email,
            NumberPhone: selectedEmploye.NumberPhone,
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
        await axios.patch(`${process.env.REACT_APP_API}/company/resetEmployeePasswordByAdmin/${values._id}`, {
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
            getCompanieEmployes()
            setresetLoading(false)
            setResetPassMood(false)

        })
    }

    function getResetData(index) {
        const selectedEmploye = Employes[index]
        console.log(selectedEmploye);
        formik2.setValues({
            _id: selectedEmploye._id,
        })
        setResetPassMood(true)
    }

    async function deleteEmploye(_id) {
        let token = localStorage.getItem('AdminToken')
        let headers = {
            Authorization: `Bearer ${token}`
        }
        await axios.delete(`${process.env.REACT_APP_API}/company/deleteEmployeeByAdmin/${_id}`, { headers }).catch((err) => {
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
            toast.success(res?.data?.message)
            getCompanieEmployes()
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

                        <label for="email" className="form-label fw-bold">Email</label>
                        <input disabled className='form-control' type="text" name='email' id='email' value={formik.values.email} onChange={formik.handleChange} onBlur={formik.handleBlur} />
                        {formik.errors.email && formik.touched.email ? <div className='form-text text-danger'>{formik.errors.email}</div> : null}

                        <label for="NumberPhone" className="form-label fw-bold">Phone Number</label>
                        <input disabled className='form-control' type="text" name='tel' id='NumberPhone' value={formik.values.NumberPhone} onChange={formik.handleChange} onBlur={formik.handleBlur} />
                        {formik.errors.NumberPhone && formik.touched.NumberPhone ? <div className='form-text text-danger'>{formik.errors.NumberPhone}</div> : null}



                        <div className='row my-2 g-3'>
                            {UpdateLoading ? <button type='button' className='btn mainBtn col-12 rounded-pill  '><i className='fa fa-spinner fa-spin'></i></button>
                                : <button disabled={!(formik.isValid && formik.dirty)} type='submit' className='btn mainBtn rounded-pill  col-12 '>save changes</button>
                            }
                            <button onClick={() => { setUpdateMood(false) }} type='reset' className='btn mx-auto btn-outline-danger rounded-pill col-12 '>cancel</button>

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
                                : <button disabled={!(formik2.isValid && formik2.dirty)} type='submit' className='btn mainBtn rounded-pill  col-12 '>save changes</button>
                            }
                            <button onClick={() => { setResetPassMood(false) }} type='reset' className='btn mx-auto btn-outline-danger rounded-pill col-12 '>cancel</button>

                        </div>

                    </form>
                </div>
            </div>
            : null}

        <div className="container pt-5">
            <h2 className='text-center mainFont h1'>Company data</h2>
            <div className='w-75 mx-auto row align-items-center justify-content-around '>
                {CompanyLoading ? <div className='col-12 text-center my-5 py-5'>
                    <i className='fa fa-spin fa-spinner fa-3x text-success'></i>
                </div> : <>
                    <div className='col-md-4'>
                        <div className=''>
                            <img className='img-fluid rounded-circle shadow-lg p-1 ' src="https://img.freepik.com/free-photo/portrait-man-laughing_23-2148859448.jpg?size=338&ext=jpg&ga=GA1.1.553209589.1714694400&semt=ais" alt="" />
                        </div>
                    </div>
                    <div className='col-md-7'>
                        <div className=''>
                            <h5 className='fw-bold' >Company Name : <span className='text-muted'>{Companie?.name}</span> </h5>

                            <h5 className='fw-bold'>About : <span className='text-muted'>{Companie?.about}</span></h5>
                        </div>
                    </div>
                </>}
            </div>
            <h2 className='text-center mainFont h1'>Employees</h2>

            <div className=' p-5'>
                {Loading ? <div className='col-12 text-center my-5 py-5'>
                    <i className='fa fa-spin fa-spinner fa-3x text-success'></i>
                </div> : <>
                    {Employes?.length == 0 ? <h3 className='text-center'>Don't have Employes</h3> : <>
                        <div className='table-responsive ' >
                            <table class="table table-striped  table-hover mx-auto text-center ">
                                <thead >
                                    <tr >
                                        <th scope="col" className='mainFont' >#</th>
                                        <th scope="col" className='mainFont'>Name</th>
                                        <th scope="col" className='mainFont'>Email</th>
                                        <th scope="col" className='mainFont'>Phone</th>
                                        <th scope="col" className='mainFont'>Acthions</th>

                                    </tr>
                                </thead>
                                <tbody>
                                    {Employes.map((employe, index) => {
                                        return <tr className='align-baseline' key={employe._id}>
                                            <th scope="row" className='mainFont'>{index + 1}</th>
                                            <td className='mainFont'> {employe.name}</td>
                                            <td className='mainFont'> {employe.email}</td>
                                            <td className='mainFont '>{employe.NumberPhone}</td>

                                            <td>
                                                <div class="dropdown ">
                                                    <button class="btn mainIcon  " type="button" data-bs-toggle="dropdown" aria-expanded="false">
                                                        <i class="fa-solid fa-list fa-0 mainFont"></i>
                                                    </button>
                                                    <ul class="dropdown-menu ">
                                                        <li onClick={() => { deleteEmploye(employe._id) }} className="dropdown-item mainFont mainClick"><i class="fa-regular fa-trash-can me-2"></i>delete</li>
                                                        <li onClick={() => { getUpdateData(index) }} className="dropdown-item mainFont mainClick"><i class="fa-regular fa-pen-to-square me-2"></i>update</li>
                                                        <li onClick={() => { getResetData(index) }} className="dropdown-item mainFont mainClick"><i class="fa-solid fa-rotate me-2"></i>reset Password</li>

                                                    </ul>
                                                </div>
                                            </td>
                                        </tr>
                                    })}


                                </tbody>
                            </table>
                        </div>

                    </>
                    }

                </>}
            </div>
        </div>
    </>
}
