import React, { useContext, useEffect, useState } from 'react';
import { useQuery } from 'react-query';
import { wishListContext } from '../../Context/wishListContext';
import { Circles } from 'react-loader-spinner';
import { hover } from '@testing-library/user-event/dist/hover';
import style from './WishList.module.css'
import { cartContext } from '../../Context/cartContext';
import toast from 'react-hot-toast';



export default function WishList() {
    const { removeWishItem, getLoggedUserWish, addToWishList } = useContext(wishListContext);

    const { addToCart } = useContext(cartContext)

    const [wishDetails, setWishDetails] = useState(null);

    const { isLoading } = useQuery("getWish", getWish);

    async function addCart(productId) {
        let { data } = await addToCart(productId);
        setWishDetails((prevWishDetails) => ({
            ...prevWishDetails,
            data: prevWishDetails.data.filter((item) => item.id !== productId)
        }));

        if (data?.status == 'success') {
            toast.success('Product added successfully to Cart', {
                style: {
                    border: '1px solid #713200',
                    padding: '16px',
                    color: '#713200',
                }
            }
            )
        } else {
            toast.error('Product dont successfully')
        }

    }

    async function deleteWish(productId) {
        let { data } = await removeWishItem(productId);
        setWishDetails((prevWishDetails) => ({
            ...prevWishDetails,
            data: prevWishDetails.data.filter((item) => item.id !== productId)
        }));
    }

    async function getWish() {
        let { data } = await getLoggedUserWish();
        setWishDetails(data);
    }

    useEffect(() => {
        getWish();
    }, []);

    return <>
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
        ) : (<div className='container bg-main-light p-5 my-5'>
            <div className="row justify-content-between ">
                <div className="col-md-6 ">
                    <h1 className=' h3 fw-bolder'>My Wish List</h1>
                </div>
            </div>
            <div className="row ">
                {wishDetails?.data?.map((product) => (<>
                    <div className="row item ">
                        <div className='col-md-9 py-2' key={product.id}>
                            <div className="row ">
                                <div className="col-md-3">
                                    <img className='w-100' src={product.imageCover} alt={product.title} />
                                </div>
                                <div className="col-md-6 mt-5 ms-0 ">
                                    <h2 className='h4 fw-bolder'>{product.title}</h2>
                                    <h6 className="text-main fw-bolder px-1 pt-2">{product.price} Egp</h6>
                                    <button className='btn text-danger h6 mt-3 fw-bolder' onClick={() => deleteWish(product._id)}>
                                        <i className="fa-solid fa-trash"></i> Remove
                                    </button>
                                </div>
                            </div>
                        </div>
                        <div className="col-md-3 me-0  d-flex align-items-center">
                            <button onClick={() => addCart(product._id)} className='btn btn-outline-success h6  fw-bolder' >
                                Add to Cart
                            </button>
                            <hr />
                        </div>
                    </div>
                </>
                ))}
            </div>
        </div >)
        }
    </>
}