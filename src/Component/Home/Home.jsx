import React from 'react'
import style from "./Home.module.css"
import axios from 'axios'
import FeaturedProduct from '../FeaturedProduct/FeaturedProduct'
import CategorySlider from '../CategorySlider/CategorySlider'
import MainSlider from '../MainSlider/MainSlider'
import { Helmet } from 'react-helmet'
import Profile from '../Profile/Profile'






export default function Home() {

    return <>


        <Helmet>

            <title>Fresh Cart</title>


        </Helmet>
        <Profile />
        <MainSlider />
        <CategorySlider />
        <FeaturedProduct />







    </>







}
