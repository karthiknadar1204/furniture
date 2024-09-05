"use client";

import { db } from "@/configs";
import { products } from "@/configs/schema";
import { eq } from "drizzle-orm";
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
  const sets = pathname.split("/");
  const category = sets[4].toLowerCase();

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
        .where(eq(products.product_id, subcategoryId))
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

  return (
    <div className="min-h-screen flex flex-col items-center p-6 overflow-hidden">
      {loading ? (
        <Loader className="animate-spin text-gray-600 h-12 w-12" />
      ) : (
        <div className="flex flex-col md:flex-row w-full">
          <div className="md:w-3/4 flex flex-col">
            {productsList.length === 0 ? (
              <p className="text-xl font-semibold text-gray-600 mt-8">
                No products added yet.
              </p>
            ) : (
              <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 mt-8 md:ml-8">
                {productsList.map((product) => (
                  <div
                    key={product.id}
                    className="bg-white p-4 rounded-lg flex flex-col items-center relative"
                    style={{ cursor: "default" }}
                  >
                    <Link
                      href={`/category/${product.category}/${product.subcategory}/${product.product_id}/${product.id}/info`}
                      passHref
                      className="w-full mb-4 relative overflow-hidden rounded-md"
                      style={{ paddingBottom: '100%' }} // This creates a square aspect ratio
                    >
                      <div className="absolute inset-0 flex items-center justify-center">
                        <Image
                          src={product.imageUrl[0] || "/Sofa.jpg"}
                          alt={product.name}
                          layout="fill"
                          objectFit="contain"
                          className="rounded-md"
                        />
                      </div>
                    </Link>
                    <h2 className="text-2xl font-bold text-center text-black mt-4">
                      {product.name}
                    </h2>
                  </div>
                ))}
              </div>
            )}
          </div>
          <div className="md:w-1/4 flex flex-col mt-8 md:mt-0 md:ml-8">
            <h2 className="text-xl font-semibold mb-4">Subcategories</h2>
            <div className="overflow-x-auto border border-gray-300 rounded-lg">
              <table className="w-full table-auto border-collapse">
                <thead></thead>
                <tbody>
                  {subcategories.map((subcategory) => (
                    <tr key={subcategory.id}>
                      <td className="border-b px-4 py-2">
                        <Link
                          href={`/category/${categoryName.toLowerCase()}/${subcategory.name
                            .toLowerCase()
                            .replace(/\s+/g, "")}/${category}/${
                            subcategory.id
                          }`}
                        >
                          {subcategory.name}
                        </Link>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default CategoryPage;
