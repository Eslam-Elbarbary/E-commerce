import { useEffect } from 'react';
import React, { useContext } from "react";
import "./Navbar.module.css";
import logo from "../../assets/freshcart-logo.svg";
import { Link, NavLink, useNavigate } from "react-router-dom";
import { TokenContext } from "../../Context/TokenContext";
import { CartContext } from "../../Context/CartContext";
import { WishlistContext } from '../../Context/WishlistContext';

export function Navbar() {
  const { token, setToken } = useContext(TokenContext);
  const { noOfCartItems, getCart } = useContext(CartContext);
  const { noOfWishlisttItems } = useContext(WishlistContext);

  async function getAllCart() {
    const response = await getCart();
  }

  useEffect(() => {
    if (localStorage.getItem("userToken")) {
      getAllCart();
    }
  }, []);

  const navigate = useNavigate();

  function logOut() {
    //clear Local storage
    localStorage.removeItem("userToken");
    //clear context
    setToken(null);
    //navigate
    navigate("/login");
  }

  return (
    <div className="bg-slate-200">
      <div className="navbar w-[90%] mx-auto text-black shadow-sm">
        
        {/* Start */}
        <div className="navbar-start">
          <div className="dropdown">
            <div tabIndex={0} role="button" className="btn btn-ghost lg:hidden">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                className="h-5 w-5"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth="2"
                  d="M4 6h16M4 12h8m-8 6h16"
                />
              </svg>
            </div>
            {token ? (
              <ul
                tabIndex={0}
                className="menu menu-sm dropdown-content bg-slate-200 rounded-box z-1 mt-3 w-52 p-2 shadow"
              >
                <li>
                  <NavLink to="" className="text-lg">Home</NavLink>
                </li>
                <li>
                  <NavLink to="products" className="text-lg">Products</NavLink>
                </li>
                <li>
                  <NavLink to="cat" className="text-lg">Categories</NavLink>
                </li>
                <li>
                  <NavLink to="brands" className="text-lg">Brands</NavLink>
                </li>
              </ul>
            ) : null}
          </div>
          <img src={logo} alt="" />
        </div>

        {/* Center */}
        <div className="navbar-center hidden lg:flex">
          {token ? (
            <ul className="menu menu-horizontal px-1 flex items-center gap-6">
              <li>
                <NavLink to="" className="text-lg">Home</NavLink>
              </li>
              <li>
                <NavLink to="products" className="text-lg">Products</NavLink>
              </li>
              <li>
                <NavLink to="cat" className="text-lg">Categories</NavLink>
              </li>
              <li>
                <NavLink to="brands" className="text-lg">Brands</NavLink>
              </li>
            </ul>
          ) : null}
        </div>

        {/* End */}
        <div className="navbar-end flex items-center gap-6">
          {token ? (
            <>
              {/* Cart */}
              <div className="relative">
                <NavLink to="cart" className="flex items-center gap-1">
                  <i className="fa fa-shopping-cart text-2xl"></i>
                  {noOfCartItems > 0 && (
                    <div className="badge badge-success absolute -top-3 -right-4 px-1">
                      {noOfCartItems}
                    </div>
                  )}
                </NavLink>
              </div>

              {/* Wishlist */}
              <div className="relative">
                <NavLink to="wishlist" className="flex items-center gap-1">
                  <i className="fa fa-heart text-2xl text-red-500"></i>
                  {noOfWishlisttItems > 0 && (
                    <div className="badge badge-success absolute -top-3 -right-4 px-1">
                      {noOfWishlisttItems}
                    </div>
                  )}
                </NavLink>
              </div>

              {/* Logout */}
              <a onClick={() => logOut()} className="text-lg cursor-pointer">
                Logout
              </a>
            </>
          ) : (
            <>
              {/* Login / Register */}
              <NavLink to="login" className="text-lg">Login</NavLink>
              <NavLink to="register" className="text-lg">Register</NavLink>
            </>
          )}
        </div>

      </div>
    </div>
  );
}
