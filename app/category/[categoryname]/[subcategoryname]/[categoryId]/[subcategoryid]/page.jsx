"use client";
import { db } from "@/configs";
import { products } from "@/configs/schema";
import { eq } from "drizzle-orm";
import Image from "next/image";
import Link from "next/link";
import { useRouter, usePathname } from "next/navigation";
import React, { useEffect, useState } from "react";

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
  const router = useRouter();

  useEffect(() => {
    const fetchProducts = async () => {
      try {
        const parts = pathname.split("/");
        const categoryName = parts[2];
        const category = predefinedCategories.find(cat => cat.name.toLowerCase() === categoryName.toLowerCase());
        const categoryId = category ? category.id : null;
        const subcategoryId = parseInt(parts[5], 10);

        setSubcategories(predefinedSubcategories[categoryId] || []);


        const result = await db
          .select()
          .from(products)
          .where(eq(products.product_id, categoryId))
          .execute();

        setProductsList(result);
      } catch (error) {
        console.error("Error fetching products:", error);
      }
    };

    fetchProducts();
  }, [pathname]);

  return (
    <div className="min-h-screen flex flex-col items-center p-6">
           {/* {subcategories.length > 0 && (
        <div className="flex space-x-4 mb-6">
          {subcategories.map(subcategory => (
            <Link 
              key={subcategory.id} 
              href={'/'}
              passHref
            >
              <p className="m-1 text-black hover:underline">{subcategory.name}</p>
            </Link>
          ))}
        </div>
      )} */}
      <hr className="w-full border-t border-gray-300 opacity-50 mb-6" />
      {productsList.length === 0 ? (
        <p className="text-xl font-semibold text-gray-600 mt-8">
          No products added yet.
        </p>
      ) : (
        <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5">
          {productsList.map((product) => (
            <div
              key={product.id}
              className="bg-white p-4 rounded-lg shadow-md flex flex-col items-center"
            >
              <div className="w-64 h-64 flex items-center justify-center mb-4 rounded-md bg-gray-100 relative overflow-hidden">
                <Link
                  href={`/category/${product.category}/${product.subcategory}/${product.product_id}/${product.id}/info`}
                  passHref
                >
                  <Image
                    src={product.imageUrl || "/Sofa.jpg"}
                    alt={product.name}
                    layout="fill"
                    objectFit="cover"
                    className="rounded-md"
                  />
                </Link>
              </div>
              <h2 className="text-lg font-semibold mb-2 text-center">
                {product.name}
              </h2>
              <p className="text-gray-700 text-center">${product.price}</p>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default CategoryPage;
