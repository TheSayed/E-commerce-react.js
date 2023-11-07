import React, { useContext, useState } from 'react'
import style from "./FeaturedProduct.module.css"
import axios from 'axios'
import { useQuery } from 'react-query'
import { Circles } from 'react-loader-spinner'
import { Link } from 'react-router-dom'
import { cartContext } from '../../Context/cartContext'
import toast from 'react-hot-toast'
import HeartIcon from '../HeartIcon/HeartIcon'
import { wishListContext } from '../../Context/wishListContext'

export default function FeaturedProduct() {
    let { addToCart } = useContext(cartContext)

    let { addToWishList } = useContext(wishListContext)

    const [clickedProducts, setClickedProducts] = useState([]);

    const [searchResults, setSearchResults] = useState([]);

    const [searchTerm, setSearchTerm] = useState('');

    // Function to handle search
    const handleSearch = (event) => {
        const value = event.target.value;
        setSearchTerm(value);

        // Filter the products based on the search term
        const filteredResults = data?.data.data.filter((product) =>
            product.title.toLowerCase().includes(value.toLowerCase())
        );
        setSearchResults(filteredResults);
    };


    const handleClick = (productId) => {
        setClickedProducts((prevClickedProducts) => {
            if (prevClickedProducts.includes(productId)) {
                return prevClickedProducts.filter((id) => id !== productId);
            } else {
                return [...prevClickedProducts, productId];
            }
        });
    };

    async function addToWish(productId) {
        let response = await addToWishList(productId)
        console.log(response)
        if (response.data?.status == 'success') {
            toast.success('Product added successfully to wishlist', {
                style: {
                    border: '1px solid #713200',
                    padding: '16px',
                    color: '#713200',
                    textAlign: 'center'
                }
            }
            )
        } else {
            toast.error('Product dont successfully')
        }

    }

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



    function getFeaturedProduct() {
        return axios.get('https://ecommerce.routemisr.com/api/v1/products')
    }

    let { isLoading, isError, isFetching, data } = useQuery('featuredProduct', getFeaturedProduct)


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
        </div> : <div className='container py-2'>'
            <div className='d-flex justify-content-center  '>
                <input
                    type="search"
                    name="search"
                    id="search"
                    value={searchTerm}
                    onChange={handleSearch}
                    placeholder="Search for products..."
                    className='text-center w-75 rounded my-5'
                />
            </div>
            <div className="row">

                {(searchTerm === '' ? data?.data.data : searchResults).map((product) => <div key={product.id} className='col-md-3' >

                    <Link to={`/productDetails/${product.id}`} >
                        <div className='product cursor-pointer py-3 px-2'>
                            <img className='w-100' src={product.imageCover} alt={product.title} />
                            <span className='text-main font-sm fw-bolder'>{product.category.name}</span>
                            <h3 className='h6'>{product.title.split("").slice(0, 2).join(' ')}</h3>

                            <div className='d-flex justify-content-between mt-3'>
                                <span>{product.price} EGP</span>
                                <div>
                                    <span><i class="fa-regular fa-star"></i> {product.ratingsAverage}</span>
                                </div>

                            </div>
                        </div>
                    </Link>
                    <div className="row d-flex flex-row g-1 mb-5 ">


                        <button onClick={() => handleClick(product.id)} className='btn btn-lg col-md-3'>
                            {clickedProducts.includes(product.id) ? (
                                <span><i style={{ color: 'red', fontSize: '25px' }} className="fa-solid fa-heart "></i></span>
                            ) : (
                                <span onClick={() => addToWish(product.id)}>
                                    <i style={{ fontSize: '25px' }} className="fa-solid fa-heart heart"></i>
                                </span>)}
                        </button>
                        <button onClick={() => addProduct(product.id)} className='btn bg-main text-white btn-sm col-md-9'>add to cart</button>

                    </div>



                </div>)}
            </div>
        </div >}


    </>


}