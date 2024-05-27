import React, { useState } from 'react'
import { useFormik } from 'formik';
import * as Yup from 'yup'
export default function Tasks() {
    const [UpdateMood, setUpdateMood] = useState(false)
    let validationSchema = Yup.object({
        task: Yup.string().required('task is required'),
    })
    let formik = useFormik({
        initialValues: {
            newTask: {
                task:""
            }
        }
        ,
        onSubmit: handleUpdate,
        validationSchema
    })
    async function handleUpdate(values) {

        console.log(values);
    }

    



    return <>

        {UpdateMood ?
            <div className='start-0 end-0 top-0 bottom-0   bg-body-secondary bg-opacity-50 fixed-top row justify-content-center align-content-center'>
                <div className='col-xl-4 col-lg-6 col-md-8 col-10 formRes'>
                    <form onSubmit={formik.handleSubmit} className='w-100 my-5  p-5 bg-light rounded-3 shadow mainFont'>
                        <h2 className=' text-center fw-bolder mb-5'>Update Task</h2>

                        <label for="task" className="form-label fw-bold">task</label>
                        <input className='form-control' type="text" name='task' id='task' value={formik.values.task} onChange={formik.handleChange} onBlur={formik.handleBlur} />
                        {formik.errors.task && formik.touched.task ? <div className='form-text text-danger'>{formik.errors.task}</div> : null}


                        <div className='row my-2 g-3'>
                            <button disabled={!(formik.isValid && formik.dirty)} type='submit' className='btn mainBtn  col-12 '>save changes</button>

                            <button onClick={() => { setUpdateMood(false) }} type='reset' className='btn mx-auto btn-outline-danger col-12 '>cancel</button>

                        </div>

                    </form>
                </div>
            </div>
            : null}
            
        <h2 className='text-center mainFont h1'>Task Types</h2>
        <div className=' p-5'>
            <table class="table table-striped  table-hover mx-auto text-center ">
                <thead >
                    <tr >
                        <th scope="col" className='mainFont' >#</th>
                        <th scope="col" className='mainFont'>Task</th>
                        <th scope="col" className='mainFont'>Acthions</th>

                    </tr>
                </thead>
                <tbody>
                    <tr className='align-baseline'>
                        <th scope="row" className='mainFont'>1</th>
                        <td className='mainFont'> cars rent</td>
                        <td>
                            <div class="dropdown">
                                <button class="btn mainIcon  " type="button" data-bs-toggle="dropdown" aria-expanded="false">
                                    <i class="fa-solid fa-list fa-0 mainFont"></i>
                                </button>
                                <ul class="dropdown-menu">
                                    <li className="dropdown-item mainFont mainClick"><i class="fa-regular fa-trash-can me-2"></i>delete</li>
                                    <li onClick={() => { setUpdateMood(true) }} className="dropdown-item mainFont mainClick"><i class="fa-regular fa-pen-to-square me-2"></i>update</li>
                                </ul>
                            </div>
                        </td>
                    </tr>
                    <tr className='align-baseline'>
                        <th scope="row" className='mainFont'>1</th>
                        <td className='mainFont'> cars rent</td>
                        <td>
                            <div class="dropdown">
                                <button class="btn mainIcon  " type="button" data-bs-toggle="dropdown" aria-expanded="false">
                                    <i class="fa-solid fa-list fa-0 mainFont"></i>
                                </button>
                                <ul class="dropdown-menu">
                                    <li className="dropdown-item">delete</li>
                                    <li className="dropdown-item">update</li>
                                </ul>
                            </div>
                        </td>
                    </tr>

                </tbody>
            </table>
        </div>
    </>
}
