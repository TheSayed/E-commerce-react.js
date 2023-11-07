import React, { useState } from 'react'
import style from "./Regisiter.module.css"
import { useFormik } from 'formik'
import * as Yup from 'yup';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';

import { CirclesWithBar } from 'react-loader-spinner'


export default function Regisiter() {

    let phoneRegex = /^01[0125][0-9]{8}$/gm
    let passwordRegex = /^(?=.*[A-Za-z])(?=.*\d)[A-Za-z\d]{8,}$/
    let navigate = useNavigate()
    let [error, setError] = useState(null)
    let [isLoading, setisLoading] = useState(false)



    let validationSchema = Yup.object({
        name: Yup.string().min(3, "Name must be at least 3 characters long").max(15, "Name mustnot be more than 10 characters long").required("Name is required"),
        email: Yup.string().email("Email is Invalid").required("Email is required"),
        phone: Yup.string().matches(phoneRegex, "Phone length is exactly 11 & Phone Prefix is with in allowed ones 010, 011, 012, 015").required("Phone Number is required"),
        password: Yup.string().matches(passwordRegex, "Minimum eight characters, at least one letter and one number").required("Password is required"),
        rePassword: Yup.string().oneOf([Yup.ref('password')], "Passwords must match").required("Repassword is required")
    })

    async function submit(values) {
        setisLoading(true);
        let { data } = await axios.post('https://ecommerce.routemisr.com/api/v1/auth/signup', values)
            .catch((err) => {
                setisLoading(false)
                setError(err.response.data.message)

            })
        if (data.message == 'success') {
            navigate('/login');
            setisLoading(false)
        }
    }

    const formik = useFormik({
        initialValues: {

            name: "",
            email: "",
            password: "",
            rePassword: "",
            phone: "",
        }, validationSchema,
        onSubmit: submit,



    })

    return <>

        <div className='w-75 mx-auto py-2'>
            {error != null ? <div className='alert p-2 mt-2 alert-danger'>{error}</div> : ""}
            <h3 className='py-2'>Register Now</h3>
            <form onSubmit={formik.handleSubmit}>

                <label htmlFor="name">Name :</label>
                <input className='form-control' onBlur={formik.handleBlur} onChange={formik.handleChange} value={formik.values.name} name="name" id="name" />
                {formik.errors.name && formik.touched.name ? (
                    <div className='alert p-2 mt-2 alert-danger'>{formik.errors.name}</div>
                ) : null}

                <label htmlFor="email">Email :</label>
                <input className='form-control' onBlur={formik.handleBlur} onChange={formik.handleChange} value={formik.values.email} name="email" id="email" />
                {formik.errors.email && formik.touched.email ? (
                    <div className='alert p-2 mt-2 alert-danger'>{formik.errors.email}</div>
                ) : null}

                <label htmlFor="password">Password :</label>
                <input type="password" className='form-control' onBlur={formik.handleBlur} onChange={formik.handleChange} value={formik.values.password} name="password" id="password" />
                {formik.errors.password && formik.touched.password ? (
                    <div className='alert p-2 mt-2 alert-danger'>{formik.errors.password}</div>
                ) : null}

                <label htmlFor="rePassword">RePassword :</label>
                <input type="password" className='form-control' onBlur={formik.handleBlur} onChange={formik.handleChange} value={formik.values.rePassword} name="rePassword" id="RePassword" />
                {formik.errors.rePassword && formik.touched.rePassword ? (
                    <div className='alert p-2 mt-2 alert-danger'>{formik.errors.rePassword}</div>
                ) : null}

                <label htmlFor="phone">Phone :</label>
                <input className='form-control' onBlur={formik.handleBlur} onChange={formik.handleChange} value={formik.values.phone} name="phone" id="phone" />
                {formik.errors.phone && formik.touched.phone ? (
                    <div className='alert p-2 mt-2 alert-danger'>{formik.errors.phone}</div>
                ) : null}

                {isLoading ? <CirclesWithBar

                    height="70"
                    width="70"
                    color="#4fa94d"
                    wrapperStyle={{}}
                    wrapperClass=""
                    visible={true}
                    outerCircleColor=""
                    innerCircleColor=""
                    barColor=""
                    ariaLabel='circles-with-bar-loading'
                /> : <button className='btn bg-main my-2' type='submit' disabled={!!Object.keys(formik.errors).length}>Register</button>
                }
                {/* This code will disable the button if there are any validation errors in the form.
                 The !! operator is used to convert the length of the errors object keys array to a boolean. 
                 If the length is 0 (no errors), it will be false and the button will be enabled.
                  If the length is not 0 (there are errors), it will be true and the button will be disable */}
                {!(formik.dirty && formik.isValid) ? (
                    <div className='alert p-2 mt-2 alert-danger'>You must fill all fields</div>
                ) : null}
            </form>

        </div>
    </>


}
