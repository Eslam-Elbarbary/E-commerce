import { useContext, useEffect, useState } from "react";
import axios from "axios";
import { WishlistContext } from "../../Context/WishlistContext.jsx";
import { CartContext } from "../../Context/CartContext.jsx";
import { Loader } from "../Loader/Loader.jsx";

export function WishList() {
  const [wishlisttItems, setWishlisttems] = useState([]);
  const [isLodding, setIsLodding] = useState(true);

  let { removeFromWishlist } = useContext(WishlistContext);
  let { addToCart } = useContext(CartContext);

  async function removeProduct(productId) {
  console.log("🗑️ productId:", productId);

  const response = await removeFromWishlist(productId);

  if (response?.data) {
    setWishlisttems(response.data);  // هنا الـ wishlist الجديدة
  } else {
    getWishlist();  // fallback
  }

  console.log(response, "remove product ✅");
}
  

  async function getWishlist() {
    try {
      let response = await axios.get(
        `https://ecommerce.routemisr.com/api/v1/wishlist`,
        {
          headers: {
            token: localStorage.getItem("userToken"),
          },
        }
      );

      console.log("Wishlist API response:", response.data.data);

      setWishlisttems(response.data.data);
      setIsLodding(false);
    } catch (error) {
      console.error("Error fetching wishlist:", error);
      setIsLodding(false);
    }
  }

  useEffect(() => {
    getWishlist();
  }, []);

  return (
    <div className="container mx-auto py-6">
      <h2 className="text-2xl font-bold mb-6">My Wishlist</h2>

      {!isLodding ? (
        <div>
          {wishlisttItems?.map((item , index) => (
            <div
              key={item._id || item.id || index}

              className="flex items-center justify-between border-b pb-4 mb-4"
            >
              <div className="flex items-center gap-6">
                <img
                  src={item.imageCover}
                  alt={item.title}
                  className="w-32 h-32 object-contain rounded"
                />
                <div>
                  <h3 className="text-lg font-medium">{item.title}</h3>
                  <p className="text-green-600 font-semibold">
                    {item.price} EGP
                  </p>
                  <button
                    onClick={() => removeProduct(item._id)}
                    className="text-red-500 text-sm flex items-center gap-1 mt-1 hover:underline"
                  >
                    🗑 Remove
                  </button>
                </div>
              </div>

              <button 
                onClick={() => addToCart(item._id)}
                className=" cursor-pointer border border-green-500 text-green-600 px-4 py-2 rounded-lg hover:bg-green-50"
              >
                add To Cart
              </button>
            </div>
          ))}
        </div>
      ) : (
        <Loader/>
      )}
    </div>
  );
}
