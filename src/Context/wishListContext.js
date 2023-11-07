import axios from 'axios';
import React, { createContext } from 'react';

export const wishListContext = createContext();

let headers = {
    token: localStorage.getItem('userToken')
};

export function getLoggedUserWish() {
    return axios
        .get('https://ecommerce.routemisr.com/api/v1/wishlist', {
            headers
        })
        .then((response) => response)
        .catch((error) => error);
}

export function removeWishItem(id) {
    return axios
        .delete(`https://ecommerce.routemisr.com/api/v1/wishlist/${id}`, {
            headers
        })
        .then((response) => response)
        .catch((error) => error);
}

export function addToWishList(productId) {
    return axios
        .post(
            'https://ecommerce.routemisr.com/api/v1/wishlist',
            {
                productId
            },
            {
                headers
            }
        )
        .then((response) => response)
        .catch((error) => error);
}

export default function WishListContextProvider(props) {
    return (
        <wishListContext.Provider
            value={{ removeWishItem, getLoggedUserWish, addToWishList }}
        >
            {props.children}
        </wishListContext.Provider>
    );
}