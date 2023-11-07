import axios from 'axios'
import React from 'react'
import { useQuery } from 'react-query'
import { Circles } from 'react-loader-spinner';
import style from './Brands.module.css'

export default function Brands() {

    async function getBrand() {
        return axios.get("https://ecommerce.routemisr.com/api/v1/brands")
    }
    let { isloading, data } = useQuery('getBrand', getBrand)
    console.log(data?.data?.data)


    return <>
        {isloading ? <div className='w-100 py-5 d-flex justify-content-center'>
            <Circles
                height="800"
                width="500"
                color="#4fa94d"
                ariaLabel="circles-loading"
                wrapperStyle={{}}
                wrapperClass=""
                visible={true}
            />
        </div> : <>{data?.data?.data ? <div className="container py-5">
            <h1 className="text-center text-main fw-bolder">All Brands</h1>
            <div className="row py-5  d-flex justify-content-between" >
                {data?.data?.data.map((brand) =>
                    <div className={`${style.box} col-md-3 g-4 overflow-hidden  border rounded`} style={{ width: '23%' }}>
                        <img className='w-100' src={brand?.image} alt="" />
                        <h2 className="h6 text-center">{brand?.name}</h2>
                    </div>
                )}
            </div>
        </div>






            : ""} </>
        }
    </>
}

