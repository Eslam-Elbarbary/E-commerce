import React, { useState } from "react";
import "./Categories.module.css";
import axios from "axios";
import { useQuery } from "@tanstack/react-query";
import { Loader } from "../Loader/Loader";

export function Categories() {
  const [selectedCat, setSelectedCat] = useState(null);
  const [subCategories, setSubCategories] = useState([]);
  const [subLoading, setSubLoading] = useState(false);
  const [subError, setSubError] = useState(null);

  // Get all categories
  function getCategories() {
    return axios.get("https://ecommerce.routemisr.com/api/v1/categories");
  }

  const { data, error, isLoading } = useQuery({
    queryKey: ["categories"],
    queryFn: getCategories,
  });

  const categories = data?.data?.data || [];

  // Fetch subcategories by category id
  async function fetchSubCategories(cat) {
    try {
      setSubLoading(true);
      setSubError(null);
      const res = await axios.get(
        `https://ecommerce.routemisr.com/api/v1/subcategories?category=${cat._id}`
      );
      setSelectedCat(cat);
      setSubCategories(res.data.data || []);
      setSubLoading(false);
    } catch (err) {
      console.error("Error fetching subcategories:", err);
      setSubError("Failed to load subcategories.");
      setSubLoading(false);
    }
  }

  return (
    <>
      {/* Loader for categories */}
      {isLoading && <Loader />}

      {/* Error for categories */}
      {error && (
        <p className="text-center font-extrabold text-main-color text-4xl mt-7">
          {error.message}
        </p>
      )}

      {/* Categories */}
      <div className="container mx-auto">
        <div className="flex flex-wrap mb-[60px] mt-[20px] ">
          {categories.map((category) => (
            <div
              key={category._id}
              onClick={() => fetchSubCategories(category)}
              className="sm:w-1/2 md:w-1/4 lg:w-1/6 px-[20px] py-[10px] cursor-pointer
                         border border-gray-200 rounded-lg transition-transform duration-300
                         hover:scale-105 hover:shadow-lg hover:border-main-color"
            >
              <img
                className="w-full h-[200px] object-contain"
                src={category.image}
                alt={category.name}
              />
              <h3 className=" text-main-color text-center mt-2">
                {category.name}
              </h3>
            </div>
          ))}
        </div>

        {/* Subcategories Section */}
        {selectedCat && (
          <div className="mt-10 mb-20">
            <h2 className="text-2xl font-bold text-main-color text-center mb-6">
              {selectedCat.name} Subcategories
            </h2>

            {subLoading && <Loader />}
            {subError && (
              <p className="text-center font-bold text-red-600">{subError}</p>
            )}

            <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
              {subCategories.map((sub) => (
                <div
                  key={sub._id}
                  className="p-4 border rounded-lg text-center font-medium
                             hover:bg-main-color hover:text-white cursor-pointer transition"
                >
                  {sub.name}
                </div>
              ))}
            </div>

            {subCategories.length === 0 && !subLoading && !subError && (
              <p className="text-center text-gray-500 mt-4">
                No subcategories found for this category.
              </p>
            )}
          </div>
        )}
      </div>
    </>
  );
}
