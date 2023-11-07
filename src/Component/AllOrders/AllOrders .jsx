import React, { useContext, useEffect, useState } from 'react'
import style from "./AllOrders .module.css"
import axios from 'axios'
import { Circles } from 'react-loader-spinner';
import jwtDecode from 'jwt-decode'
import { cartContext } from '../../Context/cartContext'



export default function AllOrders() {


    const { getUserOrders } = useContext(cartContext)

    const [userOrders, setUserOrders] = useState(null)

    async function getOrders() {

        const encodedToken = localStorage.getItem("userToken");
        const decodedToken = jwtDecode(encodedToken)
        const id = decodedToken.id
        let { data } = await getUserOrders(id)
        console.log(data)
        setUserOrders(data)
    }

    useEffect(() => {
        getOrders()
    }, []);



    return (<>
        {userOrders === null ? (
            <div className='w-100 py-5 d-flex justify-content-center'>
                <Circles
                    height="800"
                    width="500"
                    color="#4fa94d"
                    ariaLabel="circles-loading"
                    wrapperStyle={{}}
                    wrapperClass=""
                    visible={true}
                />
            </div>
        ) : (

            <div className="container">
                <div className="row">

                    {userOrders.map((order, index) => {
                        return <div className="col-md-12 rounded-4 bg-warning-subtle py-3 my-5" key={index}>
                            <p className='h3'>Order city : {order.shippingAddress.city} </p>
                            <p className='h3'>Order details : {order.shippingAddress.details} </p>
                            <p className='h3'>Order phone : {order.shippingAddress.phone} </p>
                            <p className='h3'>Order price : {order.totalOrderPrice} </p>


                        </div>
                    })}

                </div>
            </div>)}

    </>


    )
}
