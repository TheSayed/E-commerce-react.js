import React from 'react'
import style from "./Profile.module.css"
import jwtDecode from 'jwt-decode'

export default function Profile() {

    const encodedToken = localStorage.getItem('userToken')
    const decodeToken = jwtDecode(encodedToken)
    return <>
        <div> <span className='fw-bolder mt-2'>Hello</span>  <i className='text-main'>,{decodeToken.name}</i> </div>
    </>
}
