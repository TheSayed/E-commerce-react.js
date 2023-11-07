import axios from 'axios';
import React, { createContext, useState } from 'react';
export const cartContext = createContext();

let headers = {
    token: localStorage.getItem('userToken')
}



function addToCart(productId) {
    let headers = {
        token: localStorage.getItem('userToken')
    }

    return axios.post('https://ecommerce.routemisr.com/api/v1/cart', {
        productId
    }, {
        headers
    }).then(response => response)
        .catch(error => error);
}

function getLoggedUserCart() {
    return axios.get('https://ecommerce.routemisr.com/api/v1/cart', {
        headers
    }).then((response) => response)
        .catch((error) => error)

}

function removeCartItem(id) {
    return axios.delete(`https://ecommerce.routemisr.com/api/v1/cart/${id}`, {
        headers
    }).then((response) => response)
        .catch((error) => error)

}

function updateCartQuantity(id, count) {
    return axios.put(`https://ecommerce.routemisr.com/api/v1/cart/${id}`, {
        count
    },
        {
            headers
        }).then((response) => response)
        .catch((error) => error)

}

function clearCartDetails() {
    return axios.put(`https://ecommerce.routemisr.com/api/v1/cart`,
        {
            headers
        }).then((response) => response)
        .catch((error) => error)
}

function onlinePayment(cartId, url, values) {
    return axios.post(`https://ecommerce.routemisr.com/api/v1/orders/checkout-session/${cartId}?url=http://${url}`,
        {
            shippingAddress: values
        },
        {
            headers
        }).then((response) => response)
        .catch((error) => error)
}

function cashPayment(cartId, values) {
    return axios.post(`https://ecommerce.routemisr.com/api/v1/orders${cartId}`,
        {
            shippingAddress: values
        },
        {
            headers
        }).then((response) => response)
        .catch((error) => error)
}

export async function getUserOrders(id) {
    return await axios.get(`https://ecommerce.routemisr.com/api/v1/orders/user/${id}`)
        .then((response) => response)
        .catch((error) => error)
}


export function CartContextProvider(props) {
    return <cartContext.Provider value={
        {
            onlinePayment,
            addToCart,
            getLoggedUserCart,
            removeCartItem,
            updateCartQuantity,
            clearCartDetails,
            cashPayment,
            getUserOrders
        }}>
        {props.children}
    </cartContext.Provider>

}




