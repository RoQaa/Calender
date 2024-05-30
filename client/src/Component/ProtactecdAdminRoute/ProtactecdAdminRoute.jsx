import React from 'react'
import { Navigate } from 'react-router-dom'

export default function ProtactecdAdminRoute(props) {
    if (localStorage.getItem('AdminToken') == null) {
        return <Navigate to={'/login'} />
    } else {
        return props.children
    }
}
