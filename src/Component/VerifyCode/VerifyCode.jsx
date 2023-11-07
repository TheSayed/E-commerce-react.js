
import React, { useState } from 'react';
import style from "./VerifyCode.module.css";
import { useFormik } from 'formik';
import * as Yup from 'yup';
import axios from 'axios';
import { useNavigate, Link } from 'react-router-dom';
import { CirclesWithBar } from 'react-loader-spinner';

export default function VerifyCode() {

    let navigate = useNavigate();
    let [error, setError] = useState(null);
    let [isLoading, setisLoading] = useState(false);

    let validationSchema = Yup.object({
        resetCode: Yup.string().min(6).max(6).required("Verification Code is required"),
    });

    async function submit(values) {
        setisLoading(true);
        let { data } = await axios.post('https://ecommerce.routemisr.com/api/v1/auth/verifyResetCode', values)
            .catch((err) => {
                setisLoading(false)
                setError(err.response.data.message)

            })
        console.log(data)
        if (data.status == 'Success') {
            navigate('/resetPassword');
            setisLoading(false)
        }
    }

    const formik = useFormik({
        initialValues: {
            resetCode: "",
        },
        validationSchema,
        onSubmit: submit,
    });

    return (
        <>
            <div className='w-75 mx-auto py-2'>
                {error != null ? <div className='alert p-2 mt-2 alert-danger'>{error}</div> : ""}
                <h3 className='py-2'>Veriy Code</h3>
                <form onSubmit={formik.handleSubmit}>
                    <label htmlFor="resetCode">Write Your Verification Code :</label>
                    <input className='form-control' onBlur={formik.handleBlur} onChange={formik.handleChange} value={formik.values.resetCode} name="resetCode" id="resetCode" />
                    {formik.errors.resetCode && formik.touched.resetCode ? (
                        <div className='alert p-2 mt-2 alert-danger'>{formik.errors.resetCode}</div>
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
                                Verify Code

                            </button>

                        </>
                    )}

                </form>
            </div>
        </>
    );
}