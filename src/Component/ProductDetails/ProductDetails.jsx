import React, { useContext } from 'react'
import style from "./ProductDetails.module.css"
import axios from 'axios'
import { useQuery } from 'react-query'
import { useParams } from 'react-router-dom'
import { Circles } from 'react-loader-spinner'
import { Helmet } from 'react-helmet'
import { cartContext } from '../../Context/cartContext'
import toast from 'react-hot-toast'





export default function ProductDetails() {

    const { addToCart } = useContext(cartContext)

    async function addProduct(productId) {
        let response = await addToCart(productId)


        if (response.data?.status == 'success') {
            toast.success('Product added successfully', {
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
    let params = useParams();
    function getProductDetails(id) {
        return axios.get(`https://ecommerce.routemisr.com/api/v1/products/${id}`)
    }
    let { isError, isLoading, data } = useQuery('productDetails', () => getProductDetails(params.id))
    console.log(data?.data.data);
    return <>
        {isLoading ? <div className='w-100 py-5 d-flex justify-content-center'>
            <Circles
                height="800"
                width="500"
                color="#4fa94d"
                ariaLabel="circles-loading"
                wrapperStyle={{}}
                wrapperClass=""
                visible={true}
            />
        </div> :

            data?.data.data ? <div className='row py-2 align-items-center'>

                <Helmet>
                    <meta name={data?.data.data.description} content="" />
                    <title>{data?.data.data.title}</title>
                </Helmet>
                <div className='col-md-4'>
                    <img className='w-100' src={data?.data.data.imageCover} alt={data?.data.data.title} />
                </div>
                <div className="col-md-8">
                    <h2 className='h5'>{data?.data.data.title}</h2>
                    <p>{data?.data.data.description}</p>
                    <h6 className='text-main'>{data?.data.data.category.name}</h6>
                    <h6 className='text-main'>Price : {data?.data.data.price} Egp</h6>

                    <div className="d-flex justify-content-between">
                        <span> Rating Quantity : {data?.data.data.ratingsQuantity}  </span>
                        <span> Rating <i className='fas fa-star rating-color'>{data?.data.data.ratingsAverage}</i> </span>
                    </div>
                    <button onClick={() => addProduct(params.id)} className='btn bg-main text-white w-100 addCart my-2'>Add to cart </button>
                </div>
            </div> : " "}
    </>


}
