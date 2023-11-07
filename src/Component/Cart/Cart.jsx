import React, { useContext, useEffect, useState } from 'react';
import style from "./Cart.module.css";
import { cartContext } from '../../Context/cartContext';
import { useQuery } from 'react-query';
import { Circles } from 'react-loader-spinner';
import '../../index.css';
import { Link } from 'react-router-dom';


export default function Cart() {
    const { getLoggedUserCart, removeCartItem, updateCartQuantity, clearCartDetails } = useContext(cartContext);
    const [cartDetails, setCartDetails] = useState(null);
    const { isLoading } = useQuery("getCart", getCart);
    let totatlPrice = 0

    async function updateQuantity(id, count) {


        let { data } = await updateCartQuantity(id, count)
        setCartDetails(data);

    }

    async function clearCart() {
        let { data } = await clearCartDetails()
        setCartDetails(data);

    }


    async function deleteItem(productId) {
        let { data } = await removeCartItem(productId);
        setCartDetails(data);
    }

    async function getCart() {
        let { data } = await getLoggedUserCart();
        setCartDetails(data);
    }

    useEffect(() => {
        getCart();
    }, []);


    return (
        <>
            {isLoading ? (
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
                cartDetails ? (
                    <div className="container py-5 my-5 bg-main-light">
                        <div className="row">
                            <div className="col-md-6">
                                <h1 className='fw-bolder'>Cart Shop</h1>
                            </div>
                            <div className="col-md-6 ">
                                <button className='btn btn-outline-success bg-main mx-2'>
                                    <Link className='text-white' to={"/payment"}>OnLine Payment</Link>
                                </button>
                                <button className='btn btn-outline-success bg-main'>
                                    <Link className='text-white' to={"/cashPayments"}>Cash on Delivery</Link>
                                </button>

                            </div>
                        </div>

                        <div className="row py-5 ">
                            <h4 className="col-md-6 fw-bolder">
                                total price: <span className="text-main">
                                    {cartDetails.data.totalCartPrice}
                                </span>
                            </h4>                            <h4 className="col-md-6 fw-bolder"> total number of items: <span className="text-main">{cartDetails.numOfCartItems}</span> </h4>
                        </div>
                        {cartDetails.data.products.map((product) => (
                            <div className="row justify-content-between " key={product?.product?._id}>
                                <div className="col-md-4 ">
                                    <div className="row">
                                        <div className="col-md-6">
                                            <img className='w-100' src={product.product.imageCover} alt={product.product.title} />
                                        </div>
                                        <div className="col-md-6 text-center">
                                            <h4 className='mt-5 fw-bolder'>{product.product.title.split(' ').slice(0, 3).join(' ')}</h4>
                                            <h4 className="h6 mt-5 fw-bolder "> <span className='text-main'>Price: {product.price}</span> </h4>
                                            <button className=' btn text-danger h6 mt-3 ' onClick={() => deleteItem(product.product._id)} ><i className="fa-solid fa-trash"></i> Remove</button>
                                        </div>
                                    </div>
                                </div>
                                <div className="col-md-4 my-5 py-5 fw-bolder">
                                    <div>
                                        <button onClick={() => updateQuantity(product.product._id, product.count + 1)} className="btn btn-outline-success rounded"> + </button>
                                        <span className='mx-3'>{product.count}</span>
                                        <button disabled={product.count < 1} onClick={() => updateQuantity(product.product._id, product.count - 1)} className="btn btn-outline-success rounded"> - </button>                                    </div>
                                    <span>{product.count >= 0 && `Sum of product price: ${product.count * product.price}`}</span>
                                </div>
                                <hr className='w-100' />
                            </div>

                        ))}
                        <button onClick={() => clearCart()} className="btn btn-outline-success w-100"> Clear My Cart </button>
                    </div>
                ) : null
            )}
        </>
    );
}