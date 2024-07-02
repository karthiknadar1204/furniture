"use client";
import { useRouter } from "next/navigation";
import React, { useState, useEffect, useRef } from "react";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Input } from "@/components/ui/Input";
import { toast } from "react-toastify";
import { db } from "@/configs";
import { products } from "@/configs/schema";
import { v4 as uuidv4 } from "uuid";
import { ref, uploadBytesResumable,getDownloadURL } from "firebase/storage";
import { Storage } from "@/firebase";
import Image from "next/image";
import { PlusIcon, TrashIcon } from "@heroicons/react/20/solid";

const predefinedCategories = [
  { id: 1, name: "Bedroom" },
  { id: 2, name: "Living Room" },
  { id: 3, name: "Dining" },
  { id: 4, name: "Office" },
];

const predefinedSubcategories = {
  1: [
    { id: 1, name: "Wardrobe" },
    { id: 2, name: "Bed-side Table" },
    { id: 3, name: "Bed" },
    { id: 4, name: "Dresser" },
    { id: 5, name: "Mattress" },
  ],
  2: [
    { id: 6, name: "Sofa" },
    { id: 7, name: "Sofa-cum-bed" },
    { id: 8, name: "Multi-utility Cabinet" },
    { id: 9, name: "Center Table" },
    { id: 10, name: "Bookshelf" },
  ],
  3: [
    { id: 11, name: "Kitchen Cabinet" },
    { id: 12, name: "Dining Table" },
  ],
  4: [
    { id: 13, name: "Office Table" },
    { id: 14, name: "Office Chair" },
    { id: 15, name: "Study Table" },
    { id: 16, name: "Bookshelf" },
    { id: 17, name: "Filing Cabinet" },
  ],
};

const Page = () => {
  const router = useRouter();

  const [image, setImage] = useState(null);
  const [imagePreview, setImagePreview] = useState(null);
  const buttonRef = useRef(null);

  // const [showLoader, setShowLoader] = useState(true);
  const [selectedSubcategory, setSelectedSubcategory] = useState(null);
  const [productName, setProductName] = useState("");
  const [productDescription, setProductDescription] = useState("");
  const [productPrice, setProductPrice] = useState("");
  const [productStock, setProductStock] = useState("");

  const handleViewClick = () => {
    router.push('/all_products_info');
  };

  const handleSubcategorySelect = (subcategoryName) => {
    const selectedSub = Object.values(predefinedSubcategories)
      .flat()
      .find((sub) => sub.name === subcategoryName);
    setSelectedSubcategory(selectedSub);
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
    if (!selectedSubcategory) {
        console.error("Subcategory not selected");
        toast("Subcategory not selected");
        return;
    }

    const category = predefinedCategories.find((cat) =>
        predefinedSubcategories[cat.id].some(
            (subcat) => subcat.id === selectedSubcategory.id
        )
    );

    if (!category) {
        console.error("Category not found for selected subcategory");
        toast("Category not found for selected subcategory");
        return;
    }

    const imageName = image.name.split(".")[0];
    const storageRef = ref(Storage, imageName);

    try {
        await uploadBytesResumable(storageRef, image);
        const downloadURL = await getDownloadURL(storageRef);

        const product = {
            id: uuidv4(),
            category: category.name,
            subcategory: selectedSubcategory.name,
            name: productName,
            description: productDescription,
            price: parseInt(productPrice, 10),
            stock: parseInt(productStock, 10),
            product_id: selectedSubcategory.id,
            imageUrl: downloadURL // Assign the downloadURL to imageUrl field
        };

        const result = await db.insert(products).values(product);

        if (result) {
            console.log("Product added successfully");
            toast("Product added successfully");
        } else {
            console.error("Failed to add product");
            toast("Failed to add product");
        }
    } catch (error) {
        console.error("An error occurred:", error);
        toast("An error occurred");
    }
};

  

  const handleChange = (e) => {
    const file = e.target.files[0];
    setImage(file);
    setImagePreview(URL.createObjectURL(file));
  };

  const deleteImage = () => {
    setImage(null);
    setImagePreview(null);
  };

  return (
    <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 m-5 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 p-4">
      {predefinedCategories.map((category) => (
        <Dialog key={category.id}>
          <DialogTrigger className="m-5">
            <Button className="block w-full h-12 px-6 py-3 text-lg m-10">
              {category.name}
            </Button>
          </DialogTrigger>
          <DialogContent>
            <DialogHeader>
              <DialogTitle className="mb-5 text-2xl">
                {category.name} Category Details
              </DialogTitle>
              <DialogDescription>
                <form onSubmit={handleSubmit} className="space-y-4">
                  <Select
                    value={selectedSubcategory ? selectedSubcategory.name : ""}
                    onValueChange={handleSubcategorySelect}
                    required
                  >
                    <SelectTrigger className="w-full md:w-[180px]">
                      <SelectValue>
                        {selectedSubcategory
                          ? selectedSubcategory.name
                          : "Select a subcategory"}
                      </SelectValue>
                    </SelectTrigger>
                    <SelectContent>
                      {predefinedSubcategories[category.id].map(
                        (subcategory) => (
                          <SelectItem
                            key={subcategory.id}
                            value={subcategory.name}
                          >
                            {subcategory.name}
                          </SelectItem>
                        )
                      )}
                    </SelectContent>
                  </Select>

                  <Input
                    type="text"
                    placeholder="Product Name"
                    value={productName}
                    onChange={handleNameChange}
                    className="w-full"
                  />
                  <Input
                    type="text"
                    placeholder="Product Description"
                    value={productDescription}
                    onChange={handleDescriptionChange}
                    className="w-full"
                  />
                  <Input
                    type="number"
                    placeholder="Price"
                    value={productPrice}
                    onChange={handlePriceChange}
                    className="w-full"
                  />
                  <Input
                    type="number"
                    placeholder="Stock"
                    value={productStock}
                    onChange={handleStockChange}
                    className="w-full"
                  />

                  {/* Image upload section */}
                  <div className="flex flex-col gap-4">
                    <p className="text-xl font-bold">Upload Image</p>
                    <div className="flex gap-2">
                      {imagePreview ? (
                        <div className="flex flex-col gap-2">
                          <div className="relative">
                            <Image
                              alt="image preview"
                              width={280}
                              height={200}
                              className="rounded-xl w-[200px] h-[200px] object-cover"
                              src={imagePreview}
                            />
                            <button
                              className="absolute top-2 right-2 bg-red-200/10 p-2 rounded-lg text-red-400"
                              onClick={deleteImage}
                            >
                              <TrashIcon className="w-6 h-6" />
                            </button>
                          </div>
                        </div>
                      ) : (
                        <>
                          <label htmlFor="upload-image">
                            <button
                              type="button"
                              className="border-dashed border-2 border-slate-400 p-20 text-slate-400 rounded-2xl"
                              onClick={() => {
                                buttonRef.current?.click();
                              }}
                            >
                              <PlusIcon className="w-10 h-10" />
                            </button>
                          </label>
                          <input
                            id="upload-image"
                            type="file"
                            accept="image/png, image/gif, image/jpeg"
                            className="hidden"
                            ref={buttonRef}
                            onChange={handleChange}
                          />
                        </>
                      )}
                    </div>
                  </div>

                  <Button type="submit" className="w-full">
                    Submit
                  </Button>
                </form>
              </DialogDescription>
            </DialogHeader>
          </DialogContent>
        </Dialog>
      ))}
        <Button onClick={handleViewClick}>View</Button>
    </div>
  );
};

export default Page;
