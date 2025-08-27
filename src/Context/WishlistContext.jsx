import axios from "axios";
import { createContext, useState } from "react";
import toast from "react-hot-toast";

export const WishlistContext = createContext();

export function WishlistContextProvider(props) {
 const [noOfWishlistItems, setNoOfWishlisttItems] = useState(0);
  const [WishlisttId, setWishlistId] = useState(null);

  const headers = {
    token: localStorage.getItem("userToken"),
  };

  // جلب كل عناصر الوشليست
  async function getWishlist() {
    return await axios
      .get("https://ecommerce.routemisr.com/api/v1/wishlist", {
        headers,
      })
      .then((data) => {
        console.log(data, "get cart data");
        console.log(data?.data?.totalCartPrice);
        setWishlistId(data.data.data._id);
        setNoOfWishlisttItems(data?.data?.numOfCartItems);
        
        console.log(data?.data?.data?.totalCartPrice);
        return data;
      })
      .catch((err) => {
        console.log(err);
        return err;
      });
  }

  // إضافة عنصر للوِشليست
  async function addToWishlist(productId) {
     return await axios
      .post(
        "https://ecommerce.routemisr.com/api/v1/wishlist",
        {
          productId,
        },
        {
          headers,
        }
      )
      .then((data) => {
        toast.success("Add To Wish List Successfully ");
        console.log(data);
        setWishlistId(data.data.data._id);
        setNoOfWishlisttItems(data?.data?.numOfCartItems);
        return data;
      })
      .catch((err) => {
        toast.error("This didn't work.");
        console.log(err);
        return err;
      });
  }

  // إزالة عنصر من الوشليست
  async function removeFromWishlist(productId) {
  try {
    const response = await axios.delete(
      `https://ecommerce.routemisr.com/api/v1/wishlist/${productId}`,
      { headers }
    );

    console.log(response.data, "remove ✅");

    setNoOfWishlisttItems(response.data?.numOfCartItems);

    return response.data;  // رجع الـ data بس
  } catch (err) {
    console.error("❌ Remove error:", err.response?.data || err.message);
    return null;
  }
}

  return (
    <WishlistContext.Provider
      value={{
        noOfWishlistItems,
        getWishlist,
        addToWishlist,
        removeFromWishlist,
      }}
    >
      {props.children}
    </WishlistContext.Provider>
  );
}
