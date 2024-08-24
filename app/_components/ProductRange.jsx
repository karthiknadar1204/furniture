"use client"

import React from 'react';
import { BedDouble, Sofa } from 'lucide-react';
import Image from 'next/image';
import Link from 'next/link';

const predefinedCategories = [
  {
    id: 1,
    name: 'Bedroom',
    subcategories: [
      { id: 1, name: 'Wardrobe' },
      { id: 2, name: 'BedsideTable' },
      { id: 3, name: 'Bed' },
      { id: 4, name: 'Dresser' },
      { id: 5, name: 'Mattress' }
    ]
  },
  {
    id: 2,
    name: 'LivingRoom',
    subcategories: [
      { id: 6, name: 'Sofa' },
      { id: 7, name: 'Sofacumbed' },
      { id: 8, name: 'Multi-utility Cabinet' },
      { id: 9, name: 'Center Table' },
      { id: 10, name: 'Bookshelf' }
    ]
  },
  {
    id: 3,
    name: 'Dining',
    subcategories: [
      { id: 11, name: 'Kitchen Cabinet' },
      { id: 12, name: 'Dining Table' }
    ]
  },
  {
    id: 4,
    name: 'Office',
    subcategories: [
      { id: 13, name: 'Office Table' },
      { id: 14, name: 'Office Chair' },
      { id: 15, name: 'Study Table' },
      { id: 16, name: 'Bookshelf' },
      { id: 17, name: 'Filing Cabinet' }
    ]
  },
];

const ProductItem = ({ image, icon: Icon, name, category, subcategory }) => {
  const href = `/category/${category.name}/${subcategory.name}/${category.id}/${subcategory.id}`;

  return (
    <Link href={href} className="flex flex-col items-center">
      {image ? (
        <div className="w-24 h-24 md:w-32 md:h-32 flex items-center justify-center">
        <Image
          src={image}
          width={128}
          height={128}
          alt={name}
          className="object-contain"
        />
      </div>
      ) : Icon ? (
        <Icon size={64} />
      ) : null}
      <h1 className="text-sm mt-2"><strong>{name}</strong></h1>
    </Link>
  );
};

const ProductRange = () => {
  const findCategoryAndSubcategory = (name) => {
    for (const category of predefinedCategories) {
      const subcategory = category.subcategories.find(sub => sub.name.toLowerCase() === name.toLowerCase());
      if (subcategory) {
        return { category, subcategory };
      }
    }
    return { category: null, subcategory: null };
  };

  return (
    <div className="container mx-auto px-4 py-8">
      <div className="text-center mb-8">
        <h2 className="text-2xl font-semibold">Product Range</h2>
      </div>
      <div className="grid grid-cols-1 md:grid-cols-5 gap-20">
        <ProductItem image="/BedSideTable.png" name="Bed Side Table" {...findCategoryAndSubcategory("BedsideTable")} />
        <ProductItem image="/WardRobe.png" name="Wardrobe" {...findCategoryAndSubcategory("Wardrobe")} />
        <ProductItem image="/WardRobe.png" name="Dresser" {...findCategoryAndSubcategory("Dresser")} />
        <ProductItem image="/WardRobe.png" name="Sofa" {...findCategoryAndSubcategory("Sofa")} />
        <ProductItem image="/CenterTable.png" name="Center Table" {...findCategoryAndSubcategory("Center Table")} />
        <ProductItem image="/SofaCumBed.png" name="Sofa-cum bed" {...findCategoryAndSubcategory("Sofacumbed")} />
        <ProductItem image="/DiningTable.png" name="Dining Table" {...findCategoryAndSubcategory("Dining Table")} />
        <ProductItem image="/OfficeTable.png" name="Office Table" {...findCategoryAndSubcategory("Office Table")} />
        <ProductItem image="/WardRobe.png" name="Office Chair" {...findCategoryAndSubcategory("Office Chair")} />
        <ProductItem image="/WardRobe.png" name="Mattress" {...findCategoryAndSubcategory("Mattress")} />
      </div>
    </div>
  );
};

export default ProductRange;