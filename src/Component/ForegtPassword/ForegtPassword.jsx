import React, { useState } from 'react';
import style from "./ForegtPassword.module.css";
import { useFormik } from 'formik';
import * as Yup from 'yup';
import axios from 'axios';
import { useNavigate, Link } from 'react-router-dom';
import { CirclesWithBar } from 'react-loader-spinner';

export default function ForgetPassword() {

    let navigate = useNavigate();
    let [error, setError] = useState(null);
    let [isLoading, setisLoading] = useState(false);

    let validationSchema = Yup.object({
        email: Yup.string().email("Email is Invalid").required("Email is required"),
    });

    async function submit(values) {
        setisLoading(true);
        let { data } = await axios.post('https://ecommerce.routemisr.com/api/v1/auth/forgotPasswords', values)
            .catch((err) => {
                setisLoading(false)
                setError(err.response.data.message)

            })
        console.log(data)
        if (data.statusMsg == 'success') {
            navigate('/verifyCode');
            setisLoading(false)
        }
    }

    const formik = useFormik({
        initialValues: {
            email: "",
        },
        validationSchema,
        onSubmit: submit,
    });

    return (
        <>
            <div className='w-75 mx-auto py-2'>
                {error != null ? <div className='alert p-2 mt-2 alert-danger'>{error}</div> : ""}
                <h3 className='py-2'>Forget Password</h3>
                <form onSubmit={formik.handleSubmit}>
                    <label htmlFor="email">Email :</label>
                    <input className='form-control' onBlur={formik.handleBlur} onChange={formik.handleChange} value={formik.values.email} name="email" id="email" />
                    {formik.errors.email && formik.touched.email ? (
                        <div className='alert p-2 mt-2 alert-danger'>{formik.errors.email}</div>
                    ) : null}

                    {isLoading ? (
                        <CirclesWithBar
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
                        />
                    ) : (
                        <>
                            <button className='btn bg-main my-2' type='submit' disabled={!!Object.keys(formik.errors).length}>
                                <Link style={{ textDecoration: "none", color: "white" }} className='link'>Send</Link>

                            </button>

                        </>
                    )}
                </form>
            </div>
        </>
    );
}
