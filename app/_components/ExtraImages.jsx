import React from "react";
import Image from "next/image";
import { ArrowRight } from 'lucide-react'; // Assuming ArrowRight button from Lucide Icons

const ExtraImages = () => {
  return (
    <div className="container mx-auto px-4 py-8">
      {/* First Image */}
      <div className="relative mb-4">
        <Image src={"/sofa.jpg"} width={1050} height={1050} alt="First Image" />
        <div className="absolute top-0 left-0 p-6 text-white text-4xl font-bold m-5">
          The Ideal Choice <br /> for Home & <br/> Office
          <div className="flex items-center mt-4">
            <span className="text-red-500">Shop Now</span>
            <ArrowRight className="text-red-500 ml-2" />
          </div>
        </div>
      </div>

      {/* Second and Third Images */}
      <div className="flex gap-4">
        {/* Second Image */}
        <div className="relative flex-1 transform transition-transform hover:scale-105 cursor-pointer">
          <Image src={"/sofa.jpg"} width={515} height={450} alt="Second Image" />
          <div className="absolute top-0 left-0 p-6 text-white text-3xl font-bold m-5">
            Custom Made <br /> Furniture
            <div className="flex items-center mt-4">
              <span className="text-red-500">Shop Now</span>
              <ArrowRight className="text-red-500 ml-2" />
            </div>
          </div>
        </div>

        {/* Third Image */}
        <div className="relative flex-1 transform transition-transform hover:scale-105 cursor-pointer">
          <Image src={"/sofa.jpg"} width={515} height={450} alt="Third Image" />
          <div className="absolute top-0 left-0 p-6 text-white text-3xl font-bold m-5">
            Customize <br /> Modular Furniture
            <div className="flex items-center mt-4">
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
