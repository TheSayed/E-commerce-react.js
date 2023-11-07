import React, { useContext } from 'react'
import style from "./Payment.module.css"
import { useFormik } from 'formik'
import { cartContext } from '../../Context/cartContext';

export default function Payment() {

    let { onlinePayment } = useContext(cartContext)
    let { getLoggedUserCart, clearCartDetails } = useContext(cartContext)

    async function submit(values) {
        let { data } = await getLoggedUserCart()
        let cartId = data?.data._id
        let port = window.location.port
        let reponse = await onlinePayment(cartId, `http://localhost:${port}/`, values)
        console.log(reponse?.data?.session?.url)
        window.location.href = reponse?.data?.session?.url;
    }

    let formik = useFormik({
        initialValues: {
            details: '',
            phone: '',
            city: ''
        },
        onSubmit: submit
    });

    return (
        <div className="container my-5">
            <form onSubmit={formik.handleSubmit}>
                <label htmlFor="details">Address Details:</label>
                <input
                    value={formik.values.details}
                    className='form-control mb-2'
                    onChange={formik.handleChange}
                    onBlur={formik.handleBlur}
                    type="text"
                    name="details"
                    id="details"
                />

                <label htmlFor="phone">Phone:</label>
                <input
                    value={formik.values.phone}
                    className='form-control mb-2'
                    onChange={formik.handleChange}
                    onBlur={formik.handleBlur}
                    type="tel"
                    name="phone"
                    id="phone"
                />

                <label htmlFor="city">City:</label>
                <input
                    value={formik.values.city}
                    className='form-control mb-2'
                    onChange={formik.handleChange}
                    onBlur={formik.handleBlur}
                    type="text"
                    name="city"
                    id="city"
                />

                <button className='btn btn-outline-success bg-main mx-2' type="submit" onClick={() => clearCartDetails()}>
                    Pay Now
                </button>
            </form>
        </div >
    );
}