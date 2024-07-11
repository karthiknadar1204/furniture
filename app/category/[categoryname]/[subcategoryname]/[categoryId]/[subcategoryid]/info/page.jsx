"use client";

import { useRouter, usePathname } from "next/navigation";
import { db } from '@/configs';
import { products } from '@/configs/schema';
import { eq } from 'drizzle-orm';
import { useEffect, useState, useRef } from 'react';
import Image from 'next/image';
import { Loader } from 'lucide-react';
import { Carousel } from 'react-responsive-carousel';
import "react-responsive-carousel/lib/styles/carousel.min.css";

const ProductInfo = () => {
  const router = useRouter();
  const pathname = usePathname();
  const [product, setProduct] = useState(null);
  const carouselRef = useRef(null);

  useEffect(() => {
    const fetchProduct = async () => {
      try {
        const parts = pathname.split('/');
        const productId = parts[parts.length - 2];
        console.log(productId);

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
    return (
      <div className="flex items-center justify-center h-screen">
        <Loader className="animate-spin" />
      </div>
    );
  }

  const images = Array.isArray(product.imageUrl) && product.imageUrl.length > 0
    ? product.imageUrl
    : ["/Sofa.jpg"];

  const handleThumbnailClick = (index) => {
    if (carouselRef.current) {
      carouselRef.current.moveTo(index);
    }
  };

  return (
    <div className="p-6 flex flex-col items-center mt-24">
      <div className="flex flex-col sm:flex-row items-center sm:items-start">
        <div className="order-2 sm:order-1 w-full sm:w-96 h-96 relative sm:mr-6 mb-4 sm:mb-0">
          <Carousel ref={carouselRef}>
            {images.map((image, index) => (
              <div key={index}>
                <Image
                  src={image}
                  alt={product.name}
                  width={450}
                  height={450}
                  className="object-contain rounded-md"
                />
              </div>
            ))}
          </Carousel>
          <div className="flex justify-center mt-4 space-x-2">
            {images.map((image, index) => (
              <div
                key={index}
                className="w-16 h-16 relative cursor-pointer border border-gray-300"
                onClick={() => handleThumbnailClick(index)}
              >
                <Image
                  src={image}
                  alt={`Thumbnail ${index + 1}`}
                  layout="fill"
                  objectFit="cover"
                  className="rounded-md"
                />
              </div>
            ))}
          </div>
        </div>
        <div className="order-1 sm:order-2 flex flex-col items-center sm:items-start sm:ml-16">
          <h2 className="text-5xl font-bold mb-2">{product.name}</h2>
          {product.stock > 0 ? (
            <span className="bg-green-200 text-green-800 text-sm font-semibold px-4 py-2 mb-2 mt-4">
              *In Stock
            </span>
          ) : (
            <span className="bg-red-200 text-red-800 text-sm font-semibold px-4 py-2 mb-2 mt-4">
              Out of Stock
            </span>
          )}
          <hr className="w-60 border-t border-gray-400 opacity-50 mt-4"/>
          <p className="text-2xl text-red-600 font-bold mt-8">${product.price}</p>
          <hr className="w-60 border-t border-gray-400 opacity-50 mt-4"/>
          <p className="text-sm mt-4">SKU: {product.id}</p>
          <p className="text-sm mt-2">Category: {product.category}</p>
          <p className="text-sm mt-2">Subcategory: {product.subcategory}</p>
        </div>
      </div>
      <div className="w-full sm:w-3/4 lg:w-2/3 mt-36"> {/* Adjusted margin-top here */}
        <h1 className="text-left text-2xl font-bold">Description</h1>
        <hr className="w-full border-t border-gray-400 opacity-50 mt-2"/>
        <p className="mt-8 text-lg text-left">{product.description}</p> {/* Increased margin-top here */}
      </div>
    </div>
  );
};

export default ProductInfo;
