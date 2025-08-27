import { useContext, useEffect, useState } from "react";

import "./FeatureProducts.module.css";
import axios from "axios";
import { Loader } from "../Loader/Loader";
import { useQuery } from "@tanstack/react-query";
import { Link } from "react-router-dom";
import { CartContext } from "../../Context/CartContext";
import { WishlistContext } from "../../Context/WishlistContext";
export function FeatureProducts() {
  const { addToCart } = useContext(CartContext);
  const { addToWishlist } = useContext(WishlistContext);

  async function addProductToCart(productId) {
    const response = await addToCart(productId);
    console.log(response);
  }

  function getProducts() {
    return axios.get("https://ecommerce.routemisr.com/api/v1/products");
  }

  const { data, error, isLoading } = useQuery({
    queryKey: ["featureProducts"],
    queryFn: getProducts,
  });

  return (
    <>
      {isLoading ? <Loader /> : null}
      {error ? (
        <p className="text-center font-extrabold text-main-color text-4xl mt-7">
          {error.message}
        </p>
      ) : null}
      <div className="container mx-auto">
        <div className="flex flex-wrap mb-[60px] mt-[20px] ">
          {data?.data?.data.map((product) => (
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
              <div className="flex items-center gap-4 mt-4 w-full">
                {/* Add To Cart */}
                <button
                  onClick={() => addToCart(product._id)}
                  className="btn btn-success flex-1 flex items-center justify-center gap-2"
                >
                  <i className="fa fa-shopping-cart"></i>
                  Add To Cart
                </button>

                {/* Wishlist Icon */}
                <button
                  onClick={() => addToWishlist(product._id)}
                  className=" cursor-pointer"
                >
                  <i className="fa fa-heart text-2xl text-red-500"></i>
                </button>
              </div>
            </div>
          ))}
        </div>
      </div>
    </>
  );
}
