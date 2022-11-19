import React, {useState} from 'react';
import { FaArrowAltCircleRight, FaArrowAltCircleLeft } from 'react-icons/fa';

function ImageSliderRanking({ image }) {

    const[current, setCurrent]= useState(0);
    const length = image && image.length;

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
                <div className='slider_ranking'>
                    <img src={image} alt={image} className="image" id="image"></img>
                </div>
            ) : 
            (
            <section className="slider_ranking">
            <FaArrowAltCircleLeft className="left_arrow" onClick={prevSlide}></FaArrowAltCircleLeft>
            <FaArrowAltCircleRight className="right_arrow" onClick={nextSlide}></FaArrowAltCircleRight>
                {image.map((slide, index) => {
                    return(
                    <div className={index === current ? 'slider:active' : 'slider'} key={index}>
                        {index === current && (
                        <img src={slide} alt={slide} className="image" id="image"></img>
                        )}
                    </div>
                    )
                })}
            </section>
            )
        }
        </>
    )
};

export default ImageSliderRanking;
