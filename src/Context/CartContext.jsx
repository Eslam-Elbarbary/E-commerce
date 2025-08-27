import axios from "axios";
import { createContext, useState } from "react";
import toast from "react-hot-toast";

export const CartContext = createContext();

export function CartContextProvider(props) {
  const [noOfCartItems, setNoOfCartItems] = useState(0);
  const [totalCartPrice, setTotalCartPrice] = useState();
  const [cartId, setCartId] = useState(null);
  const headers = {
    token: localStorage.getItem("userToken"),
  };

  async function addToCart(productId) {
    return await axios
      .post(
        "https://ecommerce.routemisr.com/api/v1/cart",
        {
          productId,
        },
        {
          headers,
        }
      )
      .then((data) => {
        toast.success("Add To Cart Successfully ");
        console.log(data);
        setCartId(data.data.data._id);
        setNoOfCartItems(data?.data?.numOfCartItems);
        setTotalCartPrice(data?.data?.data?.totalCartPrice);
        return data;
      })
      .catch((err) => {
        toast.error("This didn't work.");
        console.log(err);
        return err;
      });
  }

  async function updateCart(productId, count) {
    return await axios
      .put(
        `https://ecommerce.routemisr.com/api/v1/cart/${productId}`,
        {
          count,
        },
        {
          headers,
        }
      )
      .then((data) => {
        console.log(data);
        setCartId(data.data.data._id);
        setNoOfCartItems(data?.data?.numOfCartItems);
        setTotalCartPrice(data?.data?.data?.totalCartPrice);
        return data;
      })
      .catch((err) => {
        console.log(err);
        return err;
      });
  }

  async function removeCartItem(productId) {
    return await axios
      .delete(`https://ecommerce.routemisr.com/api/v1/cart/${productId}`, {
        headers,
      })
      .then((data) => {
        console.log(data, "remove");
        setNoOfCartItems(data?.data?.numOfCartItems);
        setTotalCartPrice(data?.data?.data?.totalCartPrice);
        return data;
      })
      .catch((err) => {
        console.log(err);
        return err;
      });
  }

  async function clearCart() {
    return await axios
      .delete(`https://ecommerce.routemisr.com/api/v1/cart`, {
        headers,
      })
      .then((data) => {
        console.log(data, "clear");
        setNoOfCartItems(0);
        setTotalCartPrice(0);
        return data;
      })
      .catch((err) => {
        console.log(err);
        return err;
      });
  }

  async function getCart() {
    return await axios
      .get("https://ecommerce.routemisr.com/api/v1/cart", {
        headers,
      })
      .then((data) => {
        console.log(data, "get cart data");
        console.log(data?.data?.totalCartPrice);
        setCartId(data.data.data._id);
        setNoOfCartItems(data?.data?.numOfCartItems);
        setTotalCartPrice(data?.data?.data?.totalCartPrice);
        console.log(data?.data?.data?.totalCartPrice);
        return data;
      })
      .catch((err) => {
        console.log(err);
        return err;
      });
  }

  async function onlinePayment(shippingAddress) {
    return await axios
      .post(
        `https://ecommerce.routemisr.com/api/v1/orders/checkout-session/${cartId}?url=http://localhost:5173`,
        {
          shippingAddress,
        },
        {
          headers,
        }
      )
      .then((data) => {
        console.log(data ,"eslam");
        window.location.href = data.data.session.url;
        return data;
      })
      .catch((err) => {
        console.log(err);
        return err;
      });
  }

  async function cashPayment(shippingAddress) {
    return await axios
      .post(
        `https://ecommerce.routemisr.com/api/v1/orders/${cartId}`,
        {
          shippingAddress,
        },
        {
          headers,
        }
      )
      .then((data) => {
        console.log(data, "cash data");
        window.location.href = "http://localhost:5173/";
        return data;
      })
      .catch((err) => {
        console.log(err);
        return err;
      });
  }

  return (
    <CartContext.Provider
      value={{
        cashPayment,
        onlinePayment,
        addToCart,
        getCart,
        removeCartItem,
        updateCart,
        noOfCartItems,
        totalCartPrice,
        clearCart,
      }}
    >
      {props.children}
    </CartContext.Provider>
  );
}
