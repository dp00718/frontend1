import React from 'react';
import "react-responsive-carousel/lib/styles/carousel.min.css"; 
import { Carousel } from 'react-responsive-carousel';
import '../Styles/Slider.scss'


const Slider = () => {

        return (
            <Carousel showStatus={false} showThumbs={false} showArrows={false} autoPlay={true} transitionTime={100} infiniteLoop={true}>
                <div className='slider_image'>
                    <img src="https://cdn.britannica.com/94/193794-050-0FB7060D/Adidas-logo.jpg" alt=''/>
                </div>
                <div className='slider_image'>
                    <img src="https://img.freepik.com/free-photo/copy-space-yellow-blue-cupboards_23-2148518390.jpg" alt='' />
                </div>
                <div className='slider_image'>
                    <img src="https://i.pinimg.com/736x/33/e6/3d/33e63d5adb0da6b303a83901c8e8463a.jpg" alt='' />
                </div>
                <div className='slider_image'>
                    <img src="https://etimg.etb2bimg.com/photo/105930083.cms" alt=''/>
                </div>
                <div className='slider_image'>
                    <img src="https://logowik.com/content/uploads/images/asics-new9517.logowik.com.webp" alt=''/>
                </div>
            </Carousel>
        );
    };

export default Slider