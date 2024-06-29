
import React from 'react'


export default function Notifaction({ Nots }) {
    

    return <>
        <div className='container pt-5 '>
            <h2 className='text-center mainFont h1'>Company Notifactions</h2>
            <div className='p-5 shadow-lg my-5 pt-4'>
                {false ? <div className='col-12 text-center my-5 py-5'>
                    <i className='fa fa-spin fa-spinner fa-3x text-success'></i>
                </div> : <>
                    {Nots?.length != 0 ? null : <div className='col-12 text-center my-5 py-5'>
                        <h3 className='mainFont'>Don't have Notifactions</h3>
                    </div>}
                    {Nots?.map((not) => {
                        return <>

                            <div className="my-3">
                                 <div className="row justify-content-between align-items-center ">
                                    <div className='col-3 col-md-1'>
                                        <div className='rounded overflow-hidden '>
                                            <img src="https://img.freepik.com/free-photo/portrait-man-laughing_23-2148859448.jpg?size=338&ext=jpg&ga=GA1.1.553209589.1714694400&semt=ais" className="img-fluid " alt="..." />
                                        </div>
                                    </div>
                                    <div className='col-9 col-md-11'>
                                        <p className=''>{not?.description}</p>
                                        <small>{not?.timeDiffMessage}</small>
                                    </div>
                                </div>
                            </div>
                            <hr className="" />


                        </>
                    })}
                </>}

            </div>
        </div>
    </>
}
