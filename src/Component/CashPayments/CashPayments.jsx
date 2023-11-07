import React, { useContext } from 'react'
import style from "./CashPayments.module.css"
import { useFormik } from 'formik'
import { cartContext } from '../../Context/cartContext'
import toast from 'react-hot-toast'
import { Link } from 'react-router-dom'


export default function CashPayments() {
    let { cashPayment, getLoggedUserCart, clearCartDetails } = useContext(cartContext)


    async function submit(values) {
        let { data } = await getLoggedUserCart()
        let cartId = data?.data._id
        let reponse = await cashPayment(cartId, values)
        if (data.status === "success") {
            toast.success("Orders is Initialized")

        } else {
            toast.error("Error in Intilaizing")
        }
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

                <button type="submit" onClick={() => clearCartDetails()} className='btn btn-outline-success bg-main mx-2'>
                    <Link to="/allorders">Pay Now</Link>
                </button>
            </form>
        </div>
    );


}
