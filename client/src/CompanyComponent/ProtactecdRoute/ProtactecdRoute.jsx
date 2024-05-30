import React from 'react'
import { Navigate } from 'react-router-dom'

export default function ProtactecdRoute(props) {
  
  if(localStorage.getItem('CompanyToken') == null ){
    return <Navigate to={'/companyLogin'}/>
  }else{
    return props.children
  }
}
