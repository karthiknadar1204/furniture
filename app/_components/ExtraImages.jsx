import React from "react";
import Image from "next/image";
import { ArrowRight } from 'lucide-react';

const ExtraImages = () => {
  return (
    <div className="container mx-auto px-4 py-8">
      {/* First Image */}
      <div className="relative mb-4">
        <Image src={"/sofa.jpg"} width={1050} height={1050} alt="First Image" className="w-full h-auto" />
        <div className="absolute top-0 left-0 p-2 sm:p-4 text-white font-bold m-2 sm:m-4 max-w-xs sm:max-w-sm">
          <div className="text-base sm:text-lg md:text-xl lg:text-2xl">
            The Ideal Choice <br /> for Home & <br /> Office
          </div>
          <div className="flex items-center mt-2 sm:mt-4 text-xs sm:text-sm lg:text-base">
            <span className="text-red-500">Shop Now</span>
            <ArrowRight className="text-red-500 ml-2" />
          </div>
        </div>
      </div>

      {/* Second and Third Images */}
      <div className="flex flex-col md:flex-row gap-6">
        {/* Second Image */}
        <div className="relative flex-1 transform transition-transform hover:scale-105 cursor-pointer">
          <Image src={"/sofa.jpg"} width={480} height={450} alt="Second Image" className="w-full h-auto" />
          <div className="absolute top-0 left-0 p-2 sm:p-4 text-white font-bold m-2 sm:m-4">
            <div className="text-base sm:text-lg md:text-xl lg:text-2xl">
              Custom Made <br /> Furniture
            </div>
            <div className="flex items-center mt-2 sm:mt-4 text-xs sm:text-sm lg:text-base">
              <span className="text-red-500">Shop Now</span>
              <ArrowRight className="text-red-500 ml-2" />
            </div>
          </div>
        </div>

        {/* Third Image */}
        <div className="relative flex-1 transform transition-transform hover:scale-105 cursor-pointer">
          <Image src={"/sofa.jpg"} width={480} height={450} alt="Third Image" className="w-full h-auto" />
          <div className="absolute top-0 left-0 p-2 sm:p-4 text-white font-bold m-2 sm:m-4 max-w-xs sm:max-w-sm">
            <div className="text-base sm:text-lg md:text-xl lg:text-2xl">
              Customize <br /> Modular Furniture
            </div>
            <div className="flex items-center mt-2 sm:mt-4 text-xs sm:text-sm lg:text-base">
              <span className="text-red-500">Shop Now</span>
              <ArrowRight className="text-red-500 ml-2" />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ExtraImages;
