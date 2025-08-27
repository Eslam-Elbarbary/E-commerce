import React from "react"
import "./MainSlider.module.css"
import slider1 from "../../assets/slider-image-1.jpeg"
import slider2 from "../../assets/slider-image-2.jpeg"
import slider3 from "../../assets/slider-image-3.jpeg"
import slider4 from "../../assets/slider-2.jpeg"
import slider5 from "../../assets/grocery-banner.png"
import slider6 from "../../assets/grocery-banner-2.jpeg"
import Slider from "react-slick"
export function MainSlider() {
     var settings = {
    dots: true,
    infinite: true,
    speed: 500,
    slidesToShow: 1,
    slidesToScroll: 1,
    arrows:false,
    autoplay:true,
    autoplaySpeed:2000,
  };
    return (
    <>
    <div className="container mx-auto">
        <div className="flex">
            <div className="w-3/4">
            <Slider {...settings}>
                <img src={slider1} className="h-[400px]" alt="" />
                <img src={slider4} className="h-[400px]" alt="" />
                <img src={slider6} className="h-[400px]" alt="" />
            </Slider>
            </div>
            <div className="w-1/4">
            <img src={slider2} className="h-[200px]" alt="" />
                <img src={slider3} className="h-[200px]" alt="" />
            </div>
        </div>
    </div>
    </>       
    )
}