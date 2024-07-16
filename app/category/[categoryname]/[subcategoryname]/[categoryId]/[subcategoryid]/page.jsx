"use client"

// Updated CategoryPage component with discount display on product cards
import { db } from "@/configs";
import { products } from "@/configs/schema";
import { eq, and, gte, lte } from "drizzle-orm";
import Image from "next/image";
import Link from "next/link";
import { usePathname } from "next/navigation";
import React, { useEffect, useState } from "react";
import { Loader } from "lucide-react";

const predefinedCategories = [
  { id: 1, name: "Bedroom" },
  { id: 2, name: "Living Room" },
  { id: 3, name: "Dining" },
  { id: 4, name: "Office" },
];

const predefinedSubcategories = {
  1: [
    { id: 1, name: "Wardrobe" },
    { id: 2, name: "Bed-side Table" },
    { id: 3, name: "Bed" },
    { id: 4, name: "Dresser" },
    { id: 5, name: "Mattress" },
  ],
  2: [
    { id: 6, name: "Sofa" },
    { id: 7, name: "Sofa-cum-bed" },
    { id: 8, name: "Multi-utility Cabinet" },
    { id: 9, name: "Center Table" },
    { id: 10, name: "Bookshelf" },
  ],
  3: [
    { id: 11, name: "Kitchen Cabinet" },
    { id: 12, name: "Dining Table" },
  ],
  4: [
    { id: 13, name: "Office Table" },
    { id: 14, name: "Office Chair" },
    { id: 15, name: "Study Table" },
    { id: 16, name: "Bookshelf" },
    { id: 17, name: "Filing Cabinet" },
  ],
};

const CategoryPage = () => {
  const [productsList, setProductsList] = useState([]);
  const [subcategories, setSubcategories] = useState([]);
  const pathname = usePathname();
  const [loading, setLoading] = useState(false);
  const [categoryName, setCategoryName] = useState("");
  const [subcategoryName, setSubcategoryName] = useState("");
  const [priceRange, setPriceRange] = useState([0, 1000000]);

  const fetchProducts = async () => {
    try {
      setLoading(true);
      const parts = pathname.split("/");
      const categoryName = parts[2].toLowerCase();
      const subcategoryName = parts[3].toLowerCase();
      const category = predefinedCategories.find(
        (cat) => cat.name.toLowerCase().replace(/\s+/g, "") === categoryName
      );
      const categoryId = category ? category.id : null;
      const subcategoryId = parseInt(parts[5], 10);

      setCategoryName(category ? category.name : "");
      setSubcategoryName(
        predefinedSubcategories[categoryId]?.find(
          (subcat) =>
            subcat.name.toLowerCase().replace(/\s+/g, "") === subcategoryName
        )?.name || ""
      );
      setSubcategories(predefinedSubcategories[categoryId] || []);

      const result = await db
        .select()
        .from(products)
        .where(
          and(
            eq(products.product_id, subcategoryId),
            gte(products.price, priceRange[0]),
            lte(products.price, priceRange[1])
          )
        )
        .execute();

      setProductsList(result);
    } catch (error) {
      console.error("Error fetching products:", error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchProducts();
  }, [pathname]);

  const handlePriceChange = (event, index) => {
    const value = Number(event.target.value);
    setPriceRange((prevRange) => {
      const newRange = [...prevRange];
      newRange[index] = value;
      return newRange;
    });
  };

  const handleFilterClick = () => {
    fetchProducts();
  };

  return (
    <div className="min-h-screen flex flex-col items-center p-6 overflow-hidden">
      {loading ? (
        <Loader className="animate-spin text-gray-600 h-12 w-12" />
      ) : (
        <div className="flex flex-col md:flex-row w-full">
          <div className="md:w-1/4 p-4">
            <h2 className="text-lg font-semibold mb-4">Filter by Price</h2>
            <div className="flex items-center mb-4">
              <span className="mr-2">₹0</span>
              <input
                type="range"
                min="0"
                max="100000"
                step="10"
                value={priceRange[0]}
                onChange={(e) => handlePriceChange(e, 0)}
                className="flex-grow appearance-none bg-black h-0.5 rounded-md"
              />
              <span className="ml-2">₹1000000</span>
            </div>
            <div className="flex items-center mb-4">
              <span className="mr-2">₹0</span>
              <input
                type="range"
                min="0"
                max="100000"
                step="10"
                value={priceRange[1]}
                onChange={(e) => handlePriceChange(e, 1)}
                className="flex-grow appearance-none bg-black h-0.5 rounded-md"
              />
              <span className="ml-2">₹100000</span>
            </div>
            <p className="text-gray-700 mb-4">
              Selected Range: ₹{priceRange[0]} - ₹{priceRange[1]}
            </p>
            <button
              onClick={handleFilterClick}
              className="bg-black text-white px-4 py-2 rounded"
            >
              Apply Filter
            </button>
          </div>
          <div className="md:w-3/4 flex flex-col">
            <div className="w-full text-left mb-4 md:ml-8">
              <h2 className="text-gray-500 text-sm">
                {categoryName} / {subcategoryName}
              </h2>
              <h1 className="text-2xl font-bold mt-2">{categoryName}</h1>
            </div>
            {productsList.length === 0 ? (
              <p className="text-xl font-semibold text-gray-600 mt-8">
                No products added yet.
              </p>
            ) : (
              <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 mt-8 md:ml-8">
                {productsList.map((product) => (
                  <div
                    key={product.id}
                    className="bg-white p-4 rounded-lg flex flex-col relative"
                    style={{ cursor: "default" }} // Ensure no hover effect
                  >
                    <Link
                      href={`/category/${product.category}/${product.subcategory}/${product.product_id}/${product.id}/info`}
                      passHref
                      className="w-full h-64 mb-4 relative overflow-hidden rounded-md"
                    >
                      <Image
                        src={product.imageUrl[0] || "/Sofa.jpg"}
                        alt={product.name}
                        layout="fill"
                        objectFit="contain"
                        className="rounded-md"
                      />
                    </Link>
                    <div className="absolute top-2 left-2 bg-green-300 text-black px-2 py-1 rounded">
                      <span className="font-bold">-{product.discount}%</span>
                    </div>
                    <div className="text-left mt-[-3.25rem]">
                      <h2 className="text-lg font-light mb-1 ml-2">
                        {product.name}
                      </h2>
                      <div className="flex items-center">
                        <p className="text-black ml-2 font-bold text-xl">
                          ₹{Math.round(product.price - (product.price * product.discount) / 100)}
                        </p>
                        <p className="text-gray-500 line-through ml-2">
                          ₹{product.price}
                        </p>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            )}
          </div>
        </div>
      )}
    </div>
  );
};

export default CategoryPage;
