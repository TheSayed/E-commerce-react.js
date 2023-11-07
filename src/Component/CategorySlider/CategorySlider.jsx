import React from 'react'
import style from "./CategorySlider.module.css"
import { useQuery } from 'react-query'
import axios from 'axios'
import Slider from "react-slick";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";


export default function CategorySlider() {

    var settings = {
        dots: true,
        infinite: true,
        speed: 500,
        slidesToShow: 5,
        slidesToScroll: 7
    };

    function getCategorySlider() {
        return axios.get('https://ecommerce.routemisr.com/api/v1/categories')
    }
    let { isLoading, isError, data } = useQuery('categorySlider', getCategorySlider)



    return <>

        {data?.data.data ?

            <Slider className='py-4' {...settings}>
                {data?.data.data.map((category) => <img height={250} className='w-100' key={category._id} src={category.image} />)}
            </Slider> : " "}




    </>


}
