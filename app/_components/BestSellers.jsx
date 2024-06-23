import React from 'react';
import { BedDouble, Heart } from 'lucide-react';

const BestSellers = () => {
  return (
    <div className="container mx-auto px-4 py-8">
      <div className="text-center mb-8">
        <h2 className="text-2xl font-semibold">Product Range</h2>
      </div>
      <div className="grid grid-cols-1 md:grid-cols-5 gap-20">
        {Array.from({ length: 10 }).map((_, index) => (
          <div key={index} className="relative flex flex-col items-center">
            <BedDouble size={124} />
            <div className="absolute top-2 right-[-10px]"> {/* Adjusted this line */}
              <Heart className="text-red-500" />
            </div>
            <h1 className="text-sm mt-2"><strong>Bed Side Table</strong></h1>
            <h1 className="text-sm mt-1 mr-14">54100</h1>
          </div>
        ))}
      </div>
    </div>
  );
}

export default BestSellers;
