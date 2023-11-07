import React, { useContext, useState } from 'react';
import { AiFillHeart } from 'react-icons/ai';
import style from "./HeartIcon.module.css"
import { wishListContext } from '../../Context/wishListContext';



export default function HeartIcon() {

    const [isClicked, setIsClicked] = useState(false);

    const handleClick = () => {
        setIsClicked(!isClicked);
    };


    return (
        <button onClick={handleClick} className='btn btn-lg col-md-3'>
            {isClicked ? (
                <span><i className="fa-solid fa-heart text-danger"></i></span>
            ) : (

                <span><i className="fa-solid fa-heart  heart"></i></span>
            )}
        </button>
    );
}

