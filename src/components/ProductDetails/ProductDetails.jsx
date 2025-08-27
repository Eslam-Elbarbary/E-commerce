import { useContext, useEffect } from "react";

import React from "react";
import "./ProductDetails.module.css";
import { data, Link, useParams } from "react-router-dom";
import { useQuery } from "@tanstack/react-query";
import axios from "axios";
import { Loader } from "../Loader/Loader";
import Slider from "react-slick";
import { CartContext } from "../../Context/CartContext";
import { WishlistContext } from "../../Context/WishlistContext";

export function ProductDetails() {
    const {addToCart}=useContext(CartContext);
    const { addToWishlist } = useContext(WishlistContext);
  
    async function addProductToCart(productId) {
      const response = await addToCart(productId)
      console.log(response);
      
    }

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

  const { id, category } = useParams();
  // console.log(id);
 
  // جلب المنتجات المرتبطة
  function getProductDetails() {
    return axios
      .get("https://ecommerce.routemisr.com/api/v1/products")
      .then((data) => {
        console.log(data.data.data, "related");

        return data?.data?.data.filter(
          (product) => product.category.name === category
        );
      });
  }

  const { data: relatedProduct, isLoading: isLoadingRelated } = useQuery({
    queryKey: ["relatedProduct"],
    queryFn: getProductDetails,
  });

  // جلب تفاصيل المنتج
  function getDetails() {
    return axios.get(`https://ecommerce.routemisr.com/api/v1/products/${id}`);
  }

  const {
    data: productData,
    error,
    isLoading: isLoadingDetails,
    isError,
    isFetching,
  } = useQuery({
    queryKey: ["productData", id],
    queryFn: getDetails,
    gcTime: 0,
  });

  const productDetails = productData?.data?.data;

  console.log(productDetails ,'details');
 
  console.log(relatedProduct);

  return (
    <>
      {isLoadingDetails ? <Loader /> : null}
      <div className="container mx-auto">
        <div className="flex gap-10">
          <div className="w-1/4">
          <Slider {...settings}>
            {productDetails?.images.map((src)=><img src={src} alt="" />)}
          </Slider>
            {/* <img src={productData?.data?.data.imageCover} alt="" /> */}
          </div>
          <div className="w-3/4">
            <h2 className=" text-black text-2xl my-5 text-center">
              {productData?.data?.data.title}
            </h2>
            <p className="text-slate-700 my-5">
              {productData?.data?.data.description}
            </p>
            <p className="my-5">{productData?.data?.data.category.name}</p>
            <div className="flex justify-between items-center">
              <p>{productData?.data?.data.price} EGP</p>
              <p>
                <i className=" text-rating-color fa fa-star"></i>
                {productData?.data?.data.ratingsAverage}
              </p>
            </div>
            <div className="flex items-center gap-4 mt-4 w-full">
                {/* Add To Cart */}
                <button
                  onClick={() => addToCart(productDetails.id)}
                  className="btn btn-success flex-1 flex items-center justify-center gap-2"
                >
                  <i className="fa fa-shopping-cart"></i>
                  Add To Cart
                </button>

                {/* Wishlist Icon */}
                <button
                  onClick={() => addToWishlist(productDetails.id)}
                  className=" cursor-pointer"
                >
                  <i className="fa fa-heart text-2xl text-red-500"></i>
                </button>
              </div>
          </div>
        </div>
      </div>

      <div className="container mx-auto">
        <h2 className="mx-5 my-6  text-2xl">Related Product</h2>
        <div className="flex flex-wrap mb-[60px] mt-[20px] ">
          {relatedProduct?.map((product) => (
            <div
              key={product.id}
              className="sm:w-1/2 md:w-1/4 lg:w-1/6 px-[20px] py-[10px]"
            >
              <Link
                to={`/productDetails/${product.id}/${product.category.name}`}
              >
                <img
                  className="w-full h-[200px]"
                  src={product.imageCover}
                  alt=""
                />
                <h3 className=" text-main-color">{product.category.name}</h3>
                <p>{product.title.split(" ").slice(0, 2).join(" ")}</p>
                <div className="flex justify-between items-center">
                  <p>{product.price} EGP</p>
                  <p>
                    <i className=" text-rating-color fa fa-star"></i>
                    {product.ratingsAverage}
                  </p>
                </div>
              </Link>
              <button onClick={()=>addProductToCart(product._id)}  className="btn btn-success py-2 px-4 rounded-lg w-full my-4 cursor-pointer">
                Add To Cart
              </button>
            </div>
          ))}
        </div>
      </div>
    </>
  );
}
