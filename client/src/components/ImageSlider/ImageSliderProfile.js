import React, {useState} from 'react';
import { FaArrowAltCircleRight, FaArrowAltCircleLeft } from 'react-icons/fa';

function ImageSliderProfile({ image }) {

    const[current, setCurrent]= useState(0);
    const length = image.length;

    const nextSlide = ()=> {
        setCurrent(current === length -1 ? 0 : current + 1)

    }

    const prevSlide = ()=> {
        setCurrent(current === 0 ? length - 1 : current - 1)
        
    }

    if(!Array.isArray(image) || image.length <= 0){
        return null;
    }

    return (
        <>
        {length <= 1 ? 
            (
                <div className='slider_profile'>
                    <img src={image} alt={image} className="image_profile" id="image_profile"></img>
                </div>
            ) : 
            (
            <section className="slider_profile">
            <FaArrowAltCircleLeft className="left_arrow" onClick={prevSlide}></FaArrowAltCircleLeft>
            <FaArrowAltCircleRight className="right_arrow" onClick={nextSlide}></FaArrowAltCircleRight>
                {image.map((slide, index) => {
                    return(
                    <div className={index === current ? 'slider_profile:active' : 'slider_profile'} key={index}>
                        {index === current && (
                        <img src={slide} alt={slide} id="image_profile"></img>
                        )}
                    </div>
                    )
                })}
            </section>
            )
        }
        </>
    )
}

export default ImageSliderProfile;
