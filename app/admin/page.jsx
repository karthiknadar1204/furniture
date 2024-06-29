"use client";

import React, { useState } from "react";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Input } from "@/components/ui/Input";

const predefinedCategories = [
  { id: 1, name: 'Bedroom' },
  { id: 2, name: 'Living Room' },
  { id: 3, name: 'Dining' },
  { id: 4, name: 'Office' },
];

const predefinedSubcategories = {
  1: [
    { id: 1, name: 'Wardrobe' },
    { id: 2, name: 'Bed-side Table' },
    { id: 3, name: 'Bed' },
    { id: 4, name: 'Dresser' },
    { id: 5, name: 'Mattress' },
  ],
  2: [
    { id: 6, name: 'Sofa' },
    { id: 7, name: 'Sofa-cum-bed' },
    { id: 8, name: 'Multi-utility Cabinet' },
    { id: 9, name: 'Center Table' },
    { id: 10, name: 'Bookshelf' },
  ],
  3: [
    { id: 11, name: 'Kitchen Cabinet' },
    { id: 12, name: 'Dining Table' },
  ],
  4: [
    { id: 13, name: 'Office Table' },
    { id: 14, name: 'Office Chair' },
    { id: 15, name: 'Study Table' },
    { id: 16, name: 'Bookshelf' },
    { id: 17, name: 'Filing Cabinet' },
  ],
};

const Page = () => {
  const [selectedSubcategory, setSelectedSubcategory] = useState("");
  const [productName, setProductName] = useState("");
  const [productDescription, setProductDescription] = useState("");
  const [productPrice, setProductPrice] = useState("");
  const [productStock, setProductStock] = useState("");

  const handleSubcategorySelect = (subcategory) => {
    setSelectedSubcategory(subcategory);
  };

  const handleNameChange = (e) => {
    setProductName(e.target.value);
  };

  const handleDescriptionChange = (e) => {
    setProductDescription(e.target.value);
  };

  const handlePriceChange = (e) => {
    setProductPrice(e.target.value);
  };

  const handleStockChange = (e) => {
    setProductStock(e.target.value);
  };

  const handleSubmit = () => {
    console.log("Selected Subcategory:", selectedSubcategory);
    console.log("Product Name:", productName);
    console.log("Product Description:", productDescription);
    console.log("Product Price:", productPrice);
    console.log("Product Stock:", productStock);
  };

  return (
    <div className="flex justify-center space-y-4">
      {predefinedCategories.map((category) => (
        <Dialog key={category.id}>
          <DialogTrigger>
            <Button className="block w-full">
              {category.name}
            </Button>
          </DialogTrigger>
          <DialogContent>
            <DialogHeader>
              <DialogTitle>{category.name} Category Details</DialogTitle>
              <DialogDescription>
                <Select
                  value={selectedSubcategory}
                  onValueChange={handleSubcategorySelect}
                  required
                >
                  <SelectTrigger className="w-[180px]">
                    <SelectValue>{selectedSubcategory || "Select a subcategory"}</SelectValue>
                  </SelectTrigger>
                  <SelectContent>
                    {predefinedSubcategories[category.id].map((subcategory) => (
                      <SelectItem key={subcategory.id} value={subcategory.name}>
                        {subcategory.name}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>

                <Input
                  type="text"
                  placeholder="Product Name"
                  value={productName}
                  onChange={handleNameChange}
                />
                <Input
                  type="text"
                  placeholder="Product Description"
                  value={productDescription}
                  onChange={handleDescriptionChange}
                />
                <Input
                  type="number"
                  placeholder="Price"
                  value={productPrice}
                  onChange={handlePriceChange}
                />
                <Input
                  type="number"
                  placeholder="Stock"
                  value={productStock}
                  onChange={handleStockChange}
                />
              </DialogDescription>
            </DialogHeader>
            <Button onClick={handleSubmit}>Submit</Button>
          </DialogContent>
        </Dialog>
      ))}
    </div>
  );
};

export default Page;
