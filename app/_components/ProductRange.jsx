import React from 'react';
import { BedDouble } from 'lucide-react';
import { Sofa } from 'lucide-react';
import Image from 'next/image';

const ProductRange = () => {
  return (
    <div className="container mx-auto px-4 py-8">
      <div className="text-center mb-8">
        <h2 className="text-2xl font-semibold">Product Range</h2>
      </div>
      <div className="grid grid-cols-1 md:grid-cols-5 gap-20">
        <div className="flex flex-col items-center">
        <Image src='/BedSideTable.png' width={94} height={94} />
          <h1 className="text-sm mt-2"> <strong>Bed Side Table</strong></h1>
          <h1 className="text-sm">21 items</h1>
        </div>
        <div className="flex flex-col items-center">
          <Image src='/WardRobe.png' width={94} height={94} />
          <h1 className="text-sm mt-2"><strong>Wardrobe</strong></h1>
          <h1 className="text-sm">21 items</h1>
        </div>
        <div className="flex flex-col items-center">
          <BedDouble size={64} />
          <h1 className="text-sm mt-2"><strong>Dresser</strong></h1>
          <h1 className="text-sm">21 items</h1>
        </div>
        <div className="flex flex-col items-center">
          <Sofa size={64} />
          <h1 className="text-sm mt-2"><strong>Sofa</strong></h1>
          <h1 className="text-sm">21 items</h1>
        </div>
        <div className="flex flex-col items-center">
        <Image src='/CenterTable.png' width={144} height={124} />
          <h1 className="text-sm mt-2"><strong>Center Table</strong></h1>
          <h1 className="text-sm">21 items</h1>
        </div>
        <div className="flex flex-col items-center">
        <Image src='/SofaCumBed.png' width={94} height={94} />
          <h1 className="text-sm mt-2"><strong>Sofa-cum bed</strong></h1>
          <h1 className="text-sm">21 items</h1>
        </div>
        <div className="flex flex-col items-center">
        <Image src='/DiningTable.png' width={94} height={94} />
          <h1 className="text-sm mt-2"><strong>Dining Table</strong></h1>
          <h1 className="text-sm">21 items</h1>
        </div>
        <div className="flex flex-col items-center">
        <Image src='/OfficeTable.png' width={94} height={94} />
          <h1 className="text-sm mt-2"><strong>OfficeTable</strong></h1>
          <h1 className="text-sm">21 items</h1>
        </div>
        <div className="flex flex-col items-center">
          <BedDouble size={64} />
          <h1 className="text-sm mt-2"><strong>Office Chair</strong></h1>
          <h1 className="text-sm">21 items</h1>
        </div>
        <div className="flex flex-col items-center">
          <BedDouble size={64} />
          <h1 className="text-sm mt-2"><strong>Mattress</strong></h1>
          <h1 className="text-sm">21 items</h1>
        </div>
      </div>
    </div>
  );
}

export default ProductRange;
