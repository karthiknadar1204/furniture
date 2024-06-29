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
import { toast } from "react-toastify";
import { db } from "@/configs";
import { products } from "@/configs/schema";

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

  const handleSubmit = async (event) => {
    event.preventDefault();
    const category = predefinedCategories.find(cat => 
      predefinedSubcategories[cat.id].some(subcat => subcat.name === selectedSubcategory)
    );

    if (!category) {
      console.error("Category not found for selected subcategory");
      toast('Category not found for selected subcategory');
      return;
    }

    const product = {
      id:category.id,
      category: category.name,
      subcategory: selectedSubcategory,
      name: productName,
      description: productDescription,
      price: parseInt(productPrice, 10),
      stock: parseInt(productStock, 10),
    };

    try {
      // Insert the product into the database excluding the id field
      const result = await db.insert(products).values(product);

      if (result) {
        console.log("Product added successfully");
        toast('Product added successfully');
      } else {
        console.error("Failed to add product");
        toast('Failed to add product');
      }
    } catch (error) {
      console.error("An error occurred:", error);
      toast('An error occurred');
    }
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
                <form onSubmit={handleSubmit}>
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

                  <Button type="submit">Submit</Button>
                </form>
              </DialogDescription>
            </DialogHeader>
          </DialogContent>
        </Dialog>
      ))}
    </div>
  );
};

export default Page;
