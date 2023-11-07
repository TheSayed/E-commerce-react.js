import React from 'react'
import NavBar from '../NavBar/NavBar'
import style from "./Layout.module.css"
import Footer from '../Footer/Footer'
import { Outlet } from 'react-router-dom';
import { Offline, Online } from "react-detect-offline";




export default function Layout() {



    return <>


        <Online>
            <NavBar />
            <div className="container">
                <Outlet />
            </div>

            <Footer />
        </Online>
        <Offline>
            <div className="network">
                <h1 className="network-h1">OFFLINE</h1>
                <h4 className="network-h4">Please check your internet connection</h4>
            </div>
        </Offline>







    </>
}
