import { useFormik } from 'formik'
import React, { useState } from 'react'
import * as Yup from 'yup'

export default function Employees() {
    const [UpdateMood, setUpdateMood] = useState(false)
    const [ResetPassMood, setResetPassMood] = useState(false)




    let validationSchema = Yup.object({
        name: Yup.string().required('name is required'),
        role: Yup.string().required('role is required'),

    })

    let formik = useFormik({
        initialValues: {
            user: {
                _id: "",
                name: "",
                email: "",
                role: "",
            }
        }

        ,
        onSubmit: handleUpdate,
        validationSchema
    })
    async function handleUpdate(values) {

        console.log(values);
    }

    let validationPassSchema = Yup.object({
        password: Yup.string().required('password is required'),
        confirmPassword: Yup.string().required('confirmPassword is required'),


    })

    let formik2 = useFormik({
        initialValues: {
            newTask: {
                password: "",
                confirmPassword: ""
            }
        }

        ,
        onSubmit: handlePassUpdate,
        validationPassSchema
    })
    async function handlePassUpdate(values) {

        console.log(values);
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


                        <label for="role" className="form-label mt-2 fw-bold">Role</label>

                        <select className="form-select mainFont" aria-label="Default select example" name='role' id='role' value={formik.values.role} onChange={formik.handleChange} onBlur={formik.handleBlur}>

                            <option disabled selected>select role</option>

                            <option >Admin</option>
                            <option >Manger</option>
                            <option >User</option>



                        </select>



                        <div className='row my-2 g-3'>
                            <button disabled={!(formik.isValid && formik.dirty)} type='submit' className='btn mainBtn  col-12 '>save changes</button>

                            <button onClick={() => { setUpdateMood(false) }} type='reset' className='btn mx-auto btn-outline-danger col-12 '>cancel</button>

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
                            <button disabled={!(formik2.isValid && formik2.dirty)} type='submit' className='btn mainBtn  col-12 '>save changes</button>

                            <button onClick={() => { setResetPassMood(false) }} type='reset' className='btn mx-auto btn-outline-danger col-12 '>cancel</button>

                        </div>

                    </form>
                </div>
            </div>
            : null}

        <div className="container pt-5">
            <h2 className='text-center mainFont h1'>Company data</h2>
            <div className='w-75 mx-auto row align-items-center justify-content-around '>
                <div className='col-md-4'>
                    <div className=''>
                        <img className='img-fluid rounded-circle shadow-lg p-1 ' src="https://img.freepik.com/free-photo/portrait-man-laughing_23-2148859448.jpg?size=338&ext=jpg&ga=GA1.1.553209589.1714694400&semt=ais" alt="" />
                    </div>
                </div>
                <div className='col-md-7'>
                    <div className=''>
                        <h5 className='fw-bold' >Company Name : </h5>
                        <p className='ps-4 text-muted'>arcodex development company</p>
                        <h5 className='fw-bold'>About : </h5>
                        <p className='ps-4 text-muted'>Lorem ipsum dolor sit amet consectetur adipisicing elit. Earum delectus dolor accusantium animi consectetur. Officia dicta laboriosam dolor accusamus eaque suscipit provident rerum delectus dolorum?</p>

                    </div>
                </div>
            </div>
            <h2 className='text-center mainFont h1'>Employees</h2>

            <div className=' p-5'>
                <table class="table table-striped  table-hover mx-auto text-center ">
                    <thead >
                        <tr >
                            <th scope="col" className='mainFont' >#</th>
                            <th scope="col" className='mainFont'>Name</th>
                            <th scope="col" className='mainFont'>Email</th>
                            <th scope="col" className='mainFont'>Type</th>
                            <th scope="col" className='mainFont'>Acthions</th>

                        </tr>
                    </thead>
                    <tbody>
                        <tr className='align-baseline'>
                            <th scope="row" className='mainFont'>1</th>
                            <td className='mainFont'> Mark</td>
                            <td className='mainFont'> Mark@gmail.com</td>
                            <td className='mainFont '><div className='badge mainRole'>Admin</div> </td>

                            <td>
                                <div class="dropdown ">
                                    <button class="btn mainIcon  " type="button" data-bs-toggle="dropdown" aria-expanded="false">
                                        <i class="fa-solid fa-list fa-0 mainFont"></i>
                                    </button>
                                    <ul class="dropdown-menu ">
                                        <li className="dropdown-item mainFont mainClick"><i class="fa-regular fa-trash-can me-2"></i>delete</li>
                                        <li onClick={() => { setUpdateMood(true) }} className="dropdown-item mainFont mainClick"><i class="fa-regular fa-pen-to-square me-2"></i>update</li>
                                        <li onClick={() => { setResetPassMood(true) }} className="dropdown-item mainFont mainClick"><i class="fa-solid fa-rotate me-2"></i>reset Password</li>
                                    </ul>
                                </div>
                            </td>
                        </tr>
                        <tr className='align-baseline'>
                            <th scope="row" className='mainFont'>1</th>
                            <td className='mainFont'> Mark</td>
                            <td className='mainFont'> Mark@gmail.com</td>
                            <td className='mainFont '><div className='badge mainRole'>Admin</div> </td>

                            <td>
                                <div class="dropdown ">
                                    <button class="btn mainIcon  " type="button" data-bs-toggle="dropdown" aria-expanded="false">
                                        <i class="fa-solid fa-list fa-0 mainFont"></i>
                                    </button>
                                    <ul class="dropdown-menu ">
                                        <li className="dropdown-item mainFont mainClick"><i class="fa-regular fa-trash-can me-2"></i>delete</li>
                                        <li onClick={() => { setUpdateMood(true) }} className="dropdown-item mainFont mainClick"><i class="fa-regular fa-pen-to-square me-2"></i>update</li>
                                        <li onClick={() => { setResetPassMood(true) }} className="dropdown-item mainFont mainClick"><i class="fa-solid fa-rotate me-2"></i>reset Password</li>
                                    </ul>
                                </div>
                            </td>
                        </tr>
                        <tr className='align-baseline'>
                            <th scope="row" className='mainFont'>1</th>
                            <td className='mainFont'> Mark</td>
                            <td className='mainFont'> Mark@gmail.com</td>
                            <td className='mainFont '><div className='badge mainRole'>Admin</div> </td>

                            <td>
                                <div class="dropdown ">
                                    <button class="btn mainIcon  " type="button" data-bs-toggle="dropdown" aria-expanded="false">
                                        <i class="fa-solid fa-list fa-0 mainFont"></i>
                                    </button>
                                    <ul class="dropdown-menu ">
                                        <li className="dropdown-item mainFont mainClick"><i class="fa-regular fa-trash-can me-2"></i>delete</li>
                                        <li onClick={() => { setUpdateMood(true) }} className="dropdown-item mainFont mainClick"><i class="fa-regular fa-pen-to-square me-2"></i>update</li>
                                        <li onClick={() => { setResetPassMood(true) }} className="dropdown-item mainFont mainClick"><i class="fa-solid fa-rotate me-2"></i>reset Password</li>
                                    </ul>
                                </div>
                            </td>
                        </tr>
                    </tbody>
                </table>
            </div>
        </div>
    </>
}
