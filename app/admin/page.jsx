import React, { useState, useRef } from "react";
import { useRouter } from "next/navigation";
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
import { ref, uploadBytesResumable, getDownloadURL } from "firebase/storage";
import { Storage } from "@/firebase";
import Image from "next/image";
import { PlusIcon, TrashIcon } from "@heroicons/react/20/solid";
import { Textarea } from "@/components/ui/textarea";
import { Loader } from "lucide-react";

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
  const [images, setImages] = useState([]);
  const [imagePreviews, setImagePreviews] = useState([]);
  const buttonRef = useRef(null);

  const [selectedSubcategory, setSelectedSubcategory] = useState(null);
  const [productName, setProductName] = useState("");
  const [productDescription, setProductDescription] = useState("");
  const [productPrice, setProductPrice] = useState("");
  const [productStock, setProductStock] = useState("");
  const [productLength, setProductLength] = useState(""); // New state for length
  const [productBreadth, setProductBreadth] = useState(""); // New state for breadth
  const [productHeight, setProductHeight] = useState(""); // New state for height
  const [loading, setLoading] = useState(false);
  const [imagesUploaded, setImagesUploaded] = useState(false);

  const handleViewClick = () => {
    router.push("/all_products_info");
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

  const handleLengthChange = (e) => {
    setProductLength(e.target.value);
  };

  const handleBreadthChange = (e) => {
    setProductBreadth(e.target.value);
  };

  const handleHeightChange = (e) => {
    setProductHeight(e.target.value);
  };

  const handleSubmit = async (event) => {
    event.preventDefault();
    setLoading(true);

    if (!selectedSubcategory) {
      console.error("Subcategory not selected");
      toast("Subcategory not selected");
      setLoading(false);
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
      setLoading(false);
      return;
    }

    const imageUploadPromises = images.map((image) => {
      const imageName = image.name.split(".")[0];
      const storageRef = ref(Storage, imageName);
      return uploadBytesResumable(storageRef, image).then(() =>
        getDownloadURL(storageRef)
      );
    });

    try {
      const imageUrls = await Promise.all(imageUploadPromises);

      const product = {
        id: uuidv4(),
        category: category.name,
        subcategory: selectedSubcategory.name,
        name: productName,
        description: productDescription,
        price: parseInt(productPrice, 10),
        stock: parseInt(productStock, 10),
        product_id: selectedSubcategory.id,
        imageUrl: imageUrls,
        length: parseInt(productLength, 10), // Include length
        breadth: parseInt(productBreadth, 10), // Include breadth
        height: parseInt(productHeight, 10), // Include height
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
    } finally {
      setLoading(false);
    }
  };

  const handleChange = (e) => {
    const files = Array.from(e.target.files).slice(0, 3);
    setImages(files);
    setImagePreviews(files.map((file) => URL.createObjectURL(file)));
    setImagesUploaded(true);
    console.log(files);
  };

  const deleteImage = (index) => {
    setImages(images.filter((_, i) => i !== index));
    setImagePreviews(imagePreviews.filter((_, i) => i !== index));
    if (images.length === 1) {
      setImagesUploaded(false);
    }
  };

  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-4 m-5 p-4">
      {predefinedCategories.map((category) => (
        <Dialog key={category.id}>
          <DialogTrigger className="m-5">
            <Button className="block w-full h-12 px-6 py-3 text-lg m-8">
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
                  <Textarea
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
                  {/* New input fields for length, breadth, and height */}
                  <Input
                    type="number"
                    placeholder="Length (cm)"
                    value={productLength}
                    onChange={handleLengthChange}
                    className="w-full"
                  />
                  <Input
                    type="number"
                    placeholder="Breadth (cm)"
                    value={productBreadth}
                    onChange={handleBreadthChange}
                    className="w-full"
                  />
                  <Input
                    type="number"
                    placeholder="Height (cm)"
                    value={productHeight}
                    onChange={handleHeightChange}
                    className="w-full"
                  />
                  {/* End of new input fields */}
                  <div className="flex flex-col gap-4">
                    <p className="text-xl font-bold">Upload Images (up to 3)</p>
                    <div className="flex gap-2 flex-wrap">
                      {imagePreviews.map((preview, index) => (
                        <div key={index} className="relative">
                          <Image
                            src={preview}
                            alt={`Preview ${index + 1}`}
                            width={100}
                            height={100}
                            className="object-cover"
                          />
                          <button
                            type="button"
                            className="absolute top-0 right-0 p-1 bg-red-500 rounded-full"
                            onClick={() => deleteImage(index)}
                          >
                            <TrashIcon className="h-5 w-5 text-white" />
                          </button>
                        </div>
                      ))}
                      {images.length < 3 && (
                        <label className="cursor-pointer">
                          <div className="w-24 h-24 flex items-center justify-center border-2 border-dashed border-gray-300">
                            <PlusIcon className="h-10 w-10 text-gray-300" />
                          </div>
                          <input
                            type="file"
                            onChange={handleChange}
                            className="hidden"
                            accept="image/*"
                            multiple
                          />
                        </label>
                      )}
                    </div>
                  </div>
                  <Button
                    type="submit"
                    className="w-full"
                    ref={buttonRef}
                    disabled={!imagesUploaded || loading}
                  >
                    {loading ? (
                      <Loader className="animate-spin h-5 w-5" />
                    ) : (
                      "Add Product"
                    )}
                  </Button>
                </form>
              </DialogDescription>
            </DialogHeader>
          </DialogContent>
        </Dialog>
      ))}
      <Button
        onClick={handleViewClick}
        className="block w-full h-12 px-4 py-3 text-lg m-5 mt-12"
      >
        Update/Delete
      </Button>
    </div>
  );
};

export default Page;
