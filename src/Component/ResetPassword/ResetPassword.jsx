import React, { useState } from 'react'
import style from "./ResetPassword.module.css"
import { useFormik } from 'formik'
import * as Yup from 'yup';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import { CirclesWithBar } from 'react-loader-spinner'
import { Link } from 'react-router-dom';

export default function ResetPassword() {


    let passwordRegex = /^(?=.*[A-Za-z])(?=.*\d)[A-Za-z\d]{8,}$/
    let navigate = useNavigate()
    let [error, setError] = useState(null)
    let [isLoading, setisLoading] = useState(false)



    let validationSchema = Yup.object({
        email: Yup.string().email("Email is Invalid").required("Email is required"),
        newPassword: Yup.string().matches(passwordRegex, "Minimum eight characters, at least one letter and one number").required("Password is required"),
    })

    async function submit(values) {
        setisLoading(true);
        let { data } = await axios.put('https://ecommerce.routemisr.com/api/v1/auth/resetPassword', values)
            .catch((err) => {
                setisLoading(false)
                setError(err.response.data.message)

            })
        console.log(data)
        if (data.statusMsg !== 'fail') {
            navigate('/login');
            setisLoading(false)
        }
    }

    const formik = useFormik({
        initialValues: {

            email: "",
            newPassword: "",

        }, validationSchema,
        onSubmit: submit,



    })

    return <>

        <div className='w-75 mx-auto py-2'>
            {error != null ? <div className='alert p-2 mt-2 alert-danger'>{error}</div> : ""}
            <h3 className='py-2'>Reset Password</h3>
            <form onSubmit={formik.handleSubmit}>


                <label htmlFor="email">Email :</label>
                <input className='form-control' onBlur={formik.handleBlur} onChange={formik.handleChange} value={formik.values.email} name="email" id="email" />
                {formik.errors.email && formik.touched.email ? (
                    <div className='alert p-2 mt-2 alert-danger'>{formik.errors.email}</div>
                ) : null}

                <label htmlFor="newPassword">newPassword :</label>
                <input type="newPassword" className='form-control' onBlur={formik.handleBlur} onChange={formik.handleChange} value={formik.values.newPassword} name="newPassword" id="newPassword" />
                {formik.errors.newPassword && formik.touched.newPassword ? (
                    <div className='alert p-2 mt-2 alert-danger'>{formik.errors.newPassword}</div>
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
                /> : <>
                    <button className='btn bg-main my-2' type='submit' disabled={!!Object.keys(formik.errors).length}>Login</button>

                </>
                }

                {/* This code will disable the button if there are any validation errors in the form.
                 The !! operator is used to convert the length of the errors object keys array to a boolean. 
                 If the length is 0 (no errors), it will be false and the button will be enabled.
                  If the length is not 0 (there are errors), it will be true and the button will be disbuable */}


                {!(formik.dirty && formik.isValid) ? (
                    <div className='alert p-2 mt-2 alert-danger'>You must fill all fields</div>
                ) : null}
            </form>

        </div>
    </>


}
