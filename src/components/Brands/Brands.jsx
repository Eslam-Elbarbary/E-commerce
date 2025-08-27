import { useQuery } from "@tanstack/react-query";
import { useState } from "react";
import axios from "axios";
import { Loader } from "../Loader/Loader"; 

export function Brands() {
  const [selectedBrand, setSelectedBrand] = useState(null);

  // API call
  async function getBrands() {
    return axios.get("https://ecommerce.routemisr.com/api/v1/brands");
  }

  const { data, isLoading, error } = useQuery({
    queryKey: ["brands"],
    queryFn: getBrands,
  });

  if (isLoading) return <Loader />;
  if (error)
    return <p className="text-red-500 text-center">Error fetching brands</p>;

  const brands = data?.data?.data;

  return (
    <div className="container mx-auto py-10">
      
      <h2 className="text-3xl font-bold text-main-color mb-6 text-center">
        Our Brands
      </h2>

      
      <div className="flex flex-wrap">
        {brands.map((brand) => (
          <div
            key={brand._id}
            onClick={() => setSelectedBrand(brand)}
            className="sm:w-1/2 md:w-1/4 lg:w-1/6 px-[20px] py-[10px] 
                       border border-gray-200 rounded-lg 
                       transition-transform duration-300 ease-in-out 
                       hover:scale-105 hover:shadow-lg hover:border-main-color cursor-pointer"
          >
            <img
              className="w-full h-[200px] object-contain"
              src={brand.image}
              alt={brand.name}
            />
            <h3 className="text-main-color text-center mt-2 font-medium">
              {brand.name}
            </h3>
          </div>
        ))}
      </div>

      {selectedBrand && (
        <dialog id="brand_modal" className="modal" open>
          <div className="modal-box max-w-4xl relative flex">
           
            <button
              onClick={() => setSelectedBrand(null)}
              className="absolute top-2 right-2 text-gray-600 hover:text-black text-xl"
            >
              ✖
            </button>

            <div className="w-1/2 pr-6 flex items-center justify-center">
              <img
                src={selectedBrand.image}
                alt={selectedBrand.name}
                className="max-h-80 object-contain"
              />
            </div>

            
            <div className="w-1/2 flex flex-col justify-center">
              <h1 className="text-3xl font-bold text-main-color">
                {selectedBrand.name}
              </h1>
              <p className="mt-4 text-gray-600">
                {selectedBrand.name} is one of our brands. You can add more
                details or description here.
              </p>

             
              <button
                onClick={() => setSelectedBrand(null)}
                className="mt-6 bg-main-color text-white py-2 px-4 rounded-lg hover:bg-main-color/80"
              >
                Close
              </button>
            </div>
          </div>
        </dialog>
      )}
    </div>
  );
}
