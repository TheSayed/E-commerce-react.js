import React, { useContext, useState } from 'react'
import style from "./Login.module.css"
import { useFormik } from 'formik'
import * as Yup from 'yup';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import { CirclesWithBar } from 'react-loader-spinner'
import { Link } from 'react-router-dom';
import UserContextProvider, { UserContext } from '../../Context/userContext';
import { useQuery } from 'react-query';







export default function Login() {

    let { setUserToken } = useContext(UserContext)


    let passwordRegex = /^(?=.*[A-Za-z])(?=.*\d)[A-Za-z\d]{8,}$/
    let navigate = useNavigate()
    let [error, setError] = useState(null)
    let [isLoading, setisLoading] = useState(false)



    let validationSchema = Yup.object({
        email: Yup.string().email("Email is Invalid").required("Email is required"),
        password: Yup.string().matches(passwordRegex, "Minimum eight characters, at least one letter and one number").required("Password is required"),
    })

    async function submit(values) {
        setisLoading(true);
        let { data } = await axios.post('https://ecommerce.routemisr.com/api/v1/auth/signin', values)
            .catch((err) => {
                setisLoading(false)
                setError(err.response.data.message)

            })
        if (data.message == 'success') {
            navigate('/');
            setisLoading(false)
            localStorage.setItem('userToken', data.token)
            setUserToken(data.token)
            console.log(data.token)
        }
    }

    const formik = useFormik({
        initialValues: {

            email: "",
            password: "",

        }, validationSchema,
        onSubmit: submit,



    })

    return <>

        <div className='w-75 mx-auto py-2'>
            {error != null ? <div className='alert p-2 mt-2 alert-danger'>{error}</div> : ""}
            <h3 className='py-2'>Login Now</h3>
            <form onSubmit={formik.handleSubmit}>


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
                    <button className='btn bg-main my-2' type='submit' disabled={!!Object.keys(formik.errors).length}>Login</button> <Link className='btn bg-info my-2' to={"/regisiter"}>Register Now</Link>

                </>
                }
                <Link to={"/ForgetPassword"}>Forget Paswword?</Link>
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
