import { useEffect, useState } from "react";

import React, { useContext } from "react";
import "./Cart.module.css";
import { CartContext } from "../../Context/CartContext";
import { Loader } from "../Loader/Loader";
import { Link } from "react-router-dom";
import { CheckOut } from "../CheckOut/CheckOut";
export function Cart() {
  const { getCart, removeCartItem, updateCart, totalCartPrice, clearCart } =
    useContext(CartContext);
  const [cartItems, setCartItems] = useState([]);
  const [isLodding, setIsLodding] = useState(true);

  async function getAllCart() {
    const response = await getCart();
    console.log(response.data.data.products, "get response from cart");
    setCartItems(response.data.data.products);
    setIsLodding(false);
  }
  async function removeProduct(productId) {
    console.log(productId);
    const response = await removeCartItem(productId);
    setCartItems(response.data.data.products);
    console.log(response, "remove product ");
  }
  async function clearProducts() {
    const response = await clearCart();
    setCartItems([]);
    console.log(response, "clear product ");
  }

  async function updateProduct(productId, count) {
    console.log(productId);
    const response = await updateCart(productId, count);
    setCartItems(response.data.data.products);
    console.log(response, "update product ");
  }

  useEffect(() => {
    getAllCart();
  }, []);
  console.log(totalCartPrice);

  return (
    <>
      {cartItems.length === 0 ? (
        <p className="text-center text-4xl text-main-color my-10">Empty Cart</p>
      ) : (
        <div>
          {isLodding ? (
            <Loader />
          ) : (
            <div className="container mx-auto">
              <div className="text-end">
                <button
                  onClick={() => clearProducts()}
                  className=" bg-red-600 text-white px-3 py-2 my-10 cursor-pointer rounded-lg"
                >
                  Clear Cart
                </button>
              </div>
              <div className="overflow-x-auto">
                <h2 className="text-main-color my-10 text-3xl">Cart Data : </h2>
                <table className="table mb-20">
                  {/* head */}
                  <thead className=" text-black text-center">
                    <tr>
                      <th>Product Image</th>
                      <th>Product Name</th>
                      <th>QTY</th>
                      <th>Unit Price</th>
                      <th>Total Price</th>
                      <th>Method</th>
                    </tr>
                  </thead>
                  <tbody>
                    {/* row 1 */}
                    {cartItems.map((item, index) => (
                      <tr
                        key={`${item.product.id}-${index}`}
                        className=" text-center"
                      >
                        <td className="flex justify-center">
                          <div className="flex items-center gap-3">
                            <div className="w-[100px] h-[100px] ">
                              <img
                                src={item.product.imageCover}
                                className="w-full"
                                alt="Avatar Tailwind CSS Component"
                              />
                            </div>
                          </div>
                        </td>
                        <td>{item.product.title}</td>
                        <td>
                          <button
                            onClick={() =>
                              updateProduct(item?.product?.id, item.count + 1)
                            }
                            className=" border-2 border-main-color rounded-full p-2 cursor-pointer"
                          >
                            +
                          </button>
                          <span className="mx-4">{item.count}</span>
                          <button
                            onClick={() =>
                              updateProduct(item?.product?.id, item.count - 1)
                            }
                            className=" border-2 border-main-color rounded-full p-2 cursor-pointer"
                          >
                            -
                          </button>
                        </td>
                        <td>{item.price} EGP</td>
                        <td>{item.price * item.count} EGP</td>
                        <td>
                          <button
                            onClick={() => removeProduct(item?.product?.id)}
                            className="py-2 px-3 cursor-pointer text-white bg-main-color rounded-xl font-medium "
                          >
                            Remove
                          </button>
                        </td>
                      </tr>
                    ))}
                    <tr className="text-center text-3xl ">
                      <td className="py-10">Total Price : </td>
                      <td colSpan="4">{totalCartPrice} EGP</td>
                      <td>
                        <Link to="/CheckOut">
                          <button className="py-2 px-3 cursor-pointer text-white bg-main-color rounded-xl font-light">
                            Checkout
                          </button>
                        </Link>
                      </td>
                    </tr>
                  </tbody>
                </table>
              </div>
            </div>
          )}
        </div>
      )}
    </>
  );
}
