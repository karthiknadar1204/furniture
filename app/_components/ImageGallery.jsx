import React from 'react';
import Image from 'next/image';
import { MoveRight } from 'lucide-react';
import Link from 'next/link';

const ImageGallery = () => {
  const imageTexts = [
    "Bedroom Furniture",
    "Living Room Furniture",
    "Dining Room Furniture",
    "Office Furniture",
    "Outdoor Furniture",
    "Kitchen Furniture"
  ];

  const links = [
    "/category/bedroom/wardrobe/1/1",
    "/category/livingroom/sofa/2/6",
    "/category/dining/kitchencabinet/3/11",
    "/category/office/officetable/4/13",
    "/category/bedroom/wardrobe/1/1",
    "/category/bedroom/wardrobe/1/1"
  ];

  return (
    <div className="flex items-center justify-center min-h-screen">
      <div className="container mx-auto px-0 sm:px-4 py-8">
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-6 md:gap-8">
          {Array.from({ length: 6 }).map((_, index) => (
            <Link href={links[index]} key={index}>
              <div className="relative overflow-hidden group h-[300px] sm:h-[250px] md:h-[350px] lg:h-[400px] w-[98vw] sm:w-[48vw] md:w-full mx-auto sm:mx-0 -ml-[5.9rem] sm:ml-0">
                <Image
                  src={`/bedroom_${index + 1}.jpeg`}
                  alt={imageTexts[index]}
                  layout="fill"
                  objectFit="cover"
                  className="transform group-hover:scale-110 transition-transform duration-300 cursor-pointer"
                />
                <div className="absolute top-0 left-0 p-4 sm:p-6 text-white text-xl sm:text-2xl font-bold">
                  <div>{imageTexts[index]}</div>
                  <div className="flex items-center mt-2 text-red-700 text-base sm:text-xl">
                    Shop Now
                    <MoveRight className="text-red-700 ml-2 w-4 h-4 sm:w-5 sm:h-5" />
                  </div>
                </div>
              </div>
            </Link>
          ))}
        </div>
      </div>
    </div>
  );
};

export default ImageGallery;
