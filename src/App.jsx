import React, { useContext, useEffect } from 'react'
import Home from './Component/Home/Home'
import Layout from './Component/Layout/Layout'
import Contact from './Component/Contact/Contact'
import Login from './Component/Login/Login'
import Categories from './Component/Categories/Categories'
import NotFound from './Component/NotFound/NotFound'
import Cart from './Component/Cart/Cart'
import Product from './Component/Product/Product'
import Regisiter from './Component/Regisiter/Regisiter'
import Brands from './Component/Brands/Brands'
import logo from "./logo.svg"
import { RouterProvider, createBrowserRouter } from 'react-router-dom'
import ForgetPassword from './Component/ForegtPassword/ForegtPassword'
import ResetPassword from './Component/ResetPassword/ResetPassword'
import VerifyCode from './Component/VerifyCode/VerifyCode'
import { UserContext } from './Context/userContext'
import ProtectedRoute from './Component/ProtectedRoute/ProtectedRoute'
import WishList from './Component/WishList/WishList'
import ProductDetails from './Component/ProductDetails/ProductDetails'
import { CartContextProvider } from './Context/cartContext';
import { Toaster } from 'react-hot-toast'
import WishListContextProvider from './Context/wishListContext'
import Profile from './Component/Profile/Profile'
import Payment from './Component/Payment/Payment'
import AllOrders from './Component/AllOrders/AllOrders '
import CashPayments from './Component/CashPayments/CashPayments'















let routers = createBrowserRouter([
  {
    path: "/", element: <Layout />, children: [
      { index: true, element: <ProtectedRoute> <Home /> </ProtectedRoute> },
      {
        path: "contact", element: <ProtectedRoute> <Contact /> </ProtectedRoute>
      },
      { path: "login", element: <Login /> },
      {
        path: "categories", element: <ProtectedRoute> <Categories /> </ProtectedRoute>
      },
      {
        path: "cart", element: <ProtectedRoute> <Cart /> </ProtectedRoute>
      },
      {
        path: "productDetails/:id", element: <ProtectedRoute> <ProductDetails /> </ProtectedRoute>
      }, {
        path: "payment", element: <ProtectedRoute> <Payment /> </ProtectedRoute>
      },
      {
        path: "allorders", element: <ProtectedRoute> <AllOrders /> </ProtectedRoute>
      }, {
        path: "product", element: <ProtectedRoute> <Product /> </ProtectedRoute>
      }, {
        path: "wishlist", element: <ProtectedRoute> <WishList /> </ProtectedRoute>
      }, {
        path: "cashPayments", element: <ProtectedRoute> <CashPayments /> </ProtectedRoute>
      },
      { path: "regisiter", element: <Regisiter /> },
      {
        path: "brands", element: <ProtectedRoute> <Brands /> </ProtectedRoute>
      }, {
        path: "profile", element: <ProtectedRoute> <Profile /> </ProtectedRoute>
      },
      { path: "forgetPassword", element: <ForgetPassword /> },
      { path: "resetPassword", element: <ResetPassword /> },
      { path: "verifyCode", element: <VerifyCode /> },
      { path: "*", element: <NotFound /> },
    ]
  }
])

export default function App() {

  let { setUserToken } = useContext(UserContext);

  useEffect(() => {
    if (localStorage.getItem('userToken') !== null) {
      setUserToken(localStorage.getItem('userToken'));
    }
  }, [])
  return <>

    <WishListContextProvider>
      <CartContextProvider>

        <RouterProvider router={routers}></RouterProvider>
        <Toaster />
      </CartContextProvider >
    </WishListContextProvider>









  </>
}


