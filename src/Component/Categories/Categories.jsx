import axios from 'axios';
import React, { useState } from 'react';
import { useQuery } from 'react-query';
import { Circles } from 'react-loader-spinner';
import style from './Categories.module.css';

export default function Categories() {
    const [modal, setModal] = useState(false); // Added 'const' keyword before 'setModal'
    const [open, setOpen] = useState(null)

    async function getCategories() {
        return axios.get('https://ecommerce.routemisr.com/api/v1/categories');
    }
    let { isloading, data } = useQuery('getCategories', getCategories);

    const handleClick = (categories) => {
        setOpen(!open);
        setModal(categories)
    };

    return (
        <>
            {isloading ? (
                <div className='w-100 py-5 d-flex justify-content-center'>
                    <Circles
                        height='800'
                        width='500'
                        color='#4fa94d'
                        ariaLabel='circles-loading'
                        wrapperStyle={{}}
                        wrapperClass=''
                        visible={true}
                    />
                </div>
            ) : (
                <>
                    {data?.data?.data ? (
                        <div className='container py-5'>
                            <h1 className='text-center text-main fw-bolder'>All Categories</h1>
                            <div className='row py-5 d-flex justify-content-center'>
                                {data?.data?.data.map((categ) => (
                                    <>
                                        {!open ? (
                                            <div
                                                className={`${style.box} col-md-4 mx-2 g-5 overflow-hidden border rounded`}
                                                style={{ width: '31%' }}
                                                onClick={handleClick}
                                            >
                                                <img className='w-100' style={{ height: '350px' }} src={categ?.image} alt='' />
                                                <h2 className='h2 py-2 text-main fw-bolder text-center'>{categ?.name}</h2>
                                            </div>
                                        ) : (
                                            <>
                                                <div
                                                    className={`${style.box} col-md-4 mx-2 g-5 overflow-hidden border rounded`}
                                                    style={{ width: '31%' }}
                                                    onClick={handleClick}
                                                >
                                                    <img className='w-100' style={{ height: '350px' }} src={categ?.image} alt='' />
                                                    <h2 className='h2 py-2 text-main fw-bolder text-center'>{categ?.name}</h2>
                                                </div>

                                            </>

                                        )}

                                    </>
                                ))}
                            </div>
                        </div>
                    ) : (
                        ''
                    )}
                </>
            )}
        </>
    );
}

