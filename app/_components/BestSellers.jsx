"use client"

import React, { useEffect, useState } from 'react';
import { BedDouble, Heart } from 'lucide-react';

import { db } from '@/configs';
import { products } from '@/configs/schema';
import { eq } from 'drizzle-orm';
import Image from 'next/image';
import { useRouter, usePathname } from 'next/navigation';

const BestSellers = () => {
  const [productsList, setProductsList] = useState([]);
  const pathname = usePathname();
  const router = useRouter();

  useEffect(() => {
    const fetchProducts = async () => {
      try {
        const result = await db.select().from(products).where(eq(products.product_id, 1)).execute();

        // Limiting to 4 products
        const limitedProducts = result.slice(0, 5);
        setProductsList(limitedProducts);
        console.log(limitedProducts);
      } catch (error) {
        console.error('Error fetching products:', error);
      }
    };

    fetchProducts();
  }, [pathname]);

  return (
    <div className="container mx-auto px-4 py-8">
      <div className="text-center mb-8">
        <h2 className="text-2xl font-semibold">Best Sellers</h2>
      </div>
      <div className="grid grid-cols-1 md:grid-cols-5 gap-20">
        {productsList.map((product, index) => (
          <div key={index} className="relative flex flex-col items-center">
            <div className="w-48 h-48 relative">
              <Image
                src={'/sofa.jpg'}
                alt={product.name}
                layout="fill"
                objectFit="cover"
                className="rounded-lg"
              />
            </div>
            <div className="absolute top-2 right-[-10px]">
              <Heart className="text-red-500" />
            </div>
            <h1 className="text-sm mt-2"><strong>{product.name}</strong></h1>
            <h1 className="text-sm mt-1">{product.price}</h1>
          </div>
        ))}
      </div>
    </div>
  );
}

export default BestSellers;
