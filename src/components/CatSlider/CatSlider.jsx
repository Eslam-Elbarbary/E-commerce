import React from "react";
import "./CatSlider.module.css";
import { useQuery } from "@tanstack/react-query";
import axios from "axios";
import Slider from "react-slick";
export function CatSlider() {
  var settings = {
    dots: true,
    infinite: true,
    speed: 500,
    slidesToShow: 7,
    slidesToScroll: 1,
    arrows: false,
    autoplay: true,
    autoplaySpeed: 2000,
  };

  function getCatSlider() {
    return axios.get("https://ecommerce.routemisr.com/api/v1/categories");
  }

  const { data } = useQuery({
    queryKey: ["catSlider"],
    queryFn: getCatSlider,
  });

  console.log(data, "catSlider");
  const catSlider = data?.data?.data;

  return (
    <>
      <div className=" container mx-auto my-10 ">
        <h1>Show Popular categores :</h1>
        <Slider {...settings}>
          {catSlider?.map((cat) => (
            <>
              <img src={cat.image} className="h-[200px]" alt="" />
              <p>{cat.name}</p>
            </>
          ))}
        </Slider>
      </div>
    </>
  );
}
