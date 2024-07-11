// "use client";
// import { db } from "@/configs";
// import { products } from "@/configs/schema";
// import { eq } from "drizzle-orm";
// import Image from "next/image";
// import Link from "next/link";
// import { useRouter, usePathname } from "next/navigation";
// import React, { useEffect, useState } from "react";
// import { Loader } from "lucide-react";

// const predefinedCategories = [
//   { id: 1, name: "Bedroom" },
//   { id: 2, name: "Living Room" },
//   { id: 3, name: "Dining" },
//   { id: 4, name: "Office" },
// ];

// const predefinedSubcategories = {
//   1: [
//     { id: 1, name: "Wardrobe" },
//     { id: 2, name: "Bed-side Table" },
//     { id: 3, name: "Bed" },
//     { id: 4, name: "Dresser" },
//     { id: 5, name: "Mattress" },
//   ],
//   2: [
//     { id: 6, name: "Sofa" },
//     { id: 7, name: "Sofa-cum-bed" },
//     { id: 8, name: "Multi-utility Cabinet" },
//     { id: 9, name: "Center Table" },
//     { id: 10, name: "Bookshelf" },
//   ],
//   3: [
//     { id: 11, name: "Kitchen Cabinet" },
//     { id: 12, name: "Dining Table" },
//   ],
//   4: [
//     { id: 13, name: "Office Table" },
//     { id: 14, name: "Office Chair" },
//     { id: 15, name: "Study Table" },
//     { id: 16, name: "Bookshelf" },
//     { id: 17, name: "Filing Cabinet" },
//   ],
// };

// const CategoryPage = () => {
//   const [productsList, setProductsList] = useState([]);
//   const [subcategories, setSubcategories] = useState([]);
//   const pathname = usePathname();
//   const router = useRouter();
//   const [loading, setLoading] = useState(false);
//   const [categoryName, setCategoryName] = useState("");
//   const [subcategoryName, setSubcategoryName] = useState("");

//   useEffect(() => {
//     const fetchProducts = async () => {
//       try {
//         setLoading(true);
//         const parts = pathname.split("/");
//         const categoryName = parts[2].toLowerCase();
//         const subcategoryName = parts[3].toLowerCase();
//         const category = predefinedCategories.find(cat => cat.name.toLowerCase().replace(/\s+/g, '') === categoryName);
//         const categoryId = category ? category.id : null;
//         const subcategoryId = parseInt(parts[5], 10);
//         console.log("The Category Name is :",categoryName);
//         console.log("The subcategory Name is :",subcategoryName);

//         setCategoryName(category ? category.name : "");
//         setSubcategoryName(predefinedSubcategories[categoryId]?.find(subcat => subcat.name.toLowerCase().replace(/\s+/g, '') === subcategoryName)?.name || "");

//         setSubcategories(predefinedSubcategories[categoryId] || []);

//         const result = await db
//           .select()
//           .from(products)
//           .where(eq(products.product_id, subcategoryId))
//           .execute();

//         setProductsList(result);
//       } catch (error) {
//         console.error("Error fetching products:", error);
//       } finally {
//         setLoading(false);
//       }
//     };

//     fetchProducts();
//   }, [pathname]);

//   return (
//     <div className="min-h-screen flex flex-col items-center p-6">
//       {loading ? (
//         <Loader className="animate-spin text-gray-600 h-12 w-12" />
//       ) : (
//         <>
//           <div className="w-full text-left mb-4 mt-8">
//             <h2 className="text-gray-500 text-sm">{categoryName} / {subcategoryName}</h2>
//             <h1 className="text-2xl font-bold mt-2">{categoryName}</h1>
//           </div>
//           {productsList.length === 0 ? (
//             <p className="text-xl font-semibold text-gray-600 mt-8">
//               No products added yet.
//             </p>
//           ) : (
//             <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 mt-8 ml-8">
//               {productsList.map((product) => (
//                 <div
//                   key={product.id}
//                   className="bg-white p-4 rounded-lg shadow-md flex flex-col items-center"
//                 >
//                   <div className="w-64 h-64 flex items-center justify-center mb-4 rounded-md bg-gray-100 relative overflow-hidden">
//                     <Link
//                       href={`/category/${product.category}/${product.subcategory}/${product.product_id}/${product.id}/info`}
//                       passHref
//                     >
//                       <Image
//                         src={product.imageUrl[0] || "/Sofa.jpg"}
//                         alt={product.name}
//                         layout="fill"
//                         objectFit="cover"
//                         className="rounded-md"
//                       />
//                     </Link>
//                   </div>
//                   <h2 className="text-lg font-semibold mb-2 text-center">
//                     {product.name}
//                   </h2>
//                   <p className="text-gray-700 text-center">${product.price}</p>
//                 </div>
//               ))}
//             </div>
//           )}
//         </>
//       )}
//     </div>
//   );
// };

// export default CategoryPage;









"use client";
import { db } from "@/configs";
import { products } from "@/configs/schema";
import { eq } from "drizzle-orm";
import Image from "next/image";
import Link from "next/link";
import { useRouter, usePathname } from "next/navigation";
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
  const router = useRouter();
  const [loading, setLoading] = useState(false);
  const [categoryName, setCategoryName] = useState("");
  const [subcategoryName, setSubcategoryName] = useState("");

  useEffect(() => {
    const fetchProducts = async () => {
      try {
        setLoading(true);
        const parts = pathname.split("/");
        const categoryName = parts[2].toLowerCase();
        const subcategoryName = parts[3].toLowerCase();
        const category = predefinedCategories.find(cat => cat.name.toLowerCase().replace(/\s+/g, '') === categoryName);
        const categoryId = category ? category.id : null;
        const subcategoryId = parseInt(parts[5], 10);
        console.log("The Category Name is :",categoryName);
        console.log("The subcategory Name is :",subcategoryName);

        setCategoryName(category ? category.name : "");
        setSubcategoryName(predefinedSubcategories[categoryId]?.find(subcat => subcat.name.toLowerCase().replace(/\s+/g, '') === subcategoryName)?.name || "");

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

    fetchProducts();
  }, [pathname]);

  return (
    <div className="min-h-screen flex flex-col items-center p-6">
      {loading ? (
        <Loader className="animate-spin text-gray-600 h-12 w-12" />
      ) : (
        <>
          <div className="w-full text-left mb-4 mt-8 lg:ml-[38rem] sm:ml-[8rem]">
            <h2 className="text-gray-500 text-sm">{categoryName} / {subcategoryName}</h2>
            <h1 className="text-2xl font-bold mt-2">{categoryName}</h1>
          </div>
          {productsList.length === 0 ? (
            <p className="text-xl font-semibold text-gray-600 mt-8">
              No products added yet.
            </p>
          ) : (
            <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 mt-8 ml-8">
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
                        src={product.imageUrl[0] || "/Sofa.jpg"}
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
        </>
      )}
    </div>
  );
};

export default CategoryPage;
