"use client"

import { useRouter, usePathname } from "next/navigation";
import { db } from '@/configs';
import { products } from '@/configs/schema';
import { eq } from 'drizzle-orm';
import { useEffect, useState } from 'react';
import Image from 'next/image';

const ProductInfo = () => {
  const router = useRouter();
  const pathname = usePathname();
  const [product, setProduct] = useState(null);

  useEffect(() => {
    const fetchProduct = async () => {
      try {
        // Extract the product id from the URL
        const parts = pathname.split('/');
        const productId = parts[parts.length - 2]; // Assumes id is second to last in the URL
        console.log(productId);

        // Fetch the product details using the product id
        const result = await db
          .select()
          .from(products)
          .where(eq(products.id, productId))
          .execute();

        setProduct(result[0]);
      } catch (error) {
        console.error("Error fetching product details:", error);
      }
    };

    if (pathname) {
      fetchProduct();
    }
  }, [pathname]);

  if (!product) {
    return <div>Loading...</div>;
  }

  return (
    <div className="p-6 flex flex-col items-center">
      <h1 className="text-2xl font-bold mb-4">{product.name}</h1>
      <div className="flex">
        <div className="w-96 h-96 relative mr-6">
          <Image
            src={product.imageUrl || "/Sofa.jpg"}
            alt={product.name}
            width={450}
            height={450}
            className="object-contain rounded-md"
          />
        </div>
        <div className="flex flex-col justify-center">
          <h2 className="text-xl font-semibold mb-2">{product.name}</h2>
          <p className="text-lg mb-2">${product.price}</p>
          {product.stock > 0 ? (
            <span className="bg-green-200 text-green-800 text-sm font-semibold px-4 py-2 rounded-full">
              In Stock
            </span>
          ) : (
            <span className="bg-red-200 text-red-800 text-sm font-semibold px-4 py-2 rounded-full">
              Out of Stock
            </span>
          )}
        </div>
      </div>
      <p className="mt-4 text-lg">{product.description}</p>
    </div>
  );
};

export default ProductInfo;
