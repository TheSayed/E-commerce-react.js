import React from 'react';
import Slider from "react-slick";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import slide1 from "../../Assets/Images/slide1.jpg"
import slide2 from "../../Assets/Images/slide2.jpg";
import slide3 from "../../Assets/Images/slide3.jpg";
import slide4 from "../../Assets/Images/slide4.PNG";
import slide5 from "../../Assets/Images/slide5.PNG";

export default function MainSlider() {
    return (
        <div>


            <div className="row py-5 g-0">
                <div className="col-md-9  ">
                    <Slider className='my-auto' >
                        <div>
                            <img height={427} className='w-100' src={slide2} alt="Slide 1" />
                        </div>
                        <div>
                            <img height={427} className='w-100' src={slide1} alt="Slide 2" />
                        </div>
                        <div>
                            <img height={427} className='w-100' src={slide3} alt="Slide 3" />
                        </div>
                    </Slider>
                </div>

                <div className="col-md-3">
                    <div>
                        <img src={slide4} alt="Slide 4" />
                    </div>
                    <div>
                        <img src={slide5} alt="Slide 5" />
                    </div>
                </div>
            </div>
        </div>
    );
}