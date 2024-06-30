// "use client";
// import { useOrganizationList } from '@clerk/nextjs';
// import React, { useState,useEffect } from "react";
// import {
//   Dialog,
//   DialogContent,
//   DialogDescription,
//   DialogHeader,
//   DialogTitle,
//   DialogTrigger,
// } from "@/components/ui/dialog";
// import { Button } from "@/components/ui/button";
// import {
//   Select,
//   SelectContent,
//   SelectItem,
//   SelectTrigger,
//   SelectValue,
// } from "@/components/ui/select";
// import { Input } from "@/components/ui/Input";
// import { toast } from "react-toastify";
// import { db } from "@/configs";
// import { products } from "@/configs/schema";
// import { v4 as uuidv4 } from "uuid";

// const predefinedCategories = [
//   { id: 1, name: "Bedroom" },
//   { id: 2, name: "Living Room" },
//   { id: 3, name: "Dining" },
//   { id: 4, name: "Office" },
// ];

// const predefinedSubcategories = {
//   1: [
//     { id: 1, name: "Wardrobe" },
//     { id: 2, name: "Bed-side Table" },
//     { id: 3, name: "Bed" },
//     { id: 4, name: "Dresser" },
//     { id: 5, name: "Mattress" },
//   ],
//   2: [
//     { id: 6, name: "Sofa" },
//     { id: 7, name: "Sofa-cum-bed" },
//     { id: 8, name: "Multi-utility Cabinet" },
//     { id: 9, name: "Center Table" },
//     { id: 10, name: "Bookshelf" },
//   ],
//   3: [
//     { id: 11, name: "Kitchen Cabinet" },
//     { id: 12, name: "Dining Table" },
//   ],
//   4: [
//     { id: 13, name: "Office Table" },
//     { id: 14, name: "Office Chair" },
//     { id: 15, name: "Study Table" },
//     { id: 16, name: "Bookshelf" },
//     { id: 17, name: "Filing Cabinet" },
//   ],
// };

// const Page = () => {
//   const { organizationList, isLoaded, setActive } = useOrganizationList();
//   useEffect(() => {
//     if (isLoaded) {
//       // Find the admin organization from the loaded organization list
//       const adminOrganization = organizationList.find(
//         (org) => org.membership.role === 'org:admin'
//       );
  
//       // If the user is not an admin, redirect to the homepage
//       if (!adminOrganization || adminOrganization.membership.role !== 'admin') {
//         router.push('/'); // Replace '/' with the homepage URL
//       } else {
//         // If the user is an admin, no need to wait for the organization list; render the admin page directly
//         setShowLoader(false);
//       }
//     }
//   }, [isLoaded, organizationList]);

//   const [selectedSubcategory, setSelectedSubcategory] = useState(null);
//   const [productName, setProductName] = useState("");
//   const [productDescription, setProductDescription] = useState("");
//   const [productPrice, setProductPrice] = useState("");
//   const [productStock, setProductStock] = useState("");

//   const handleSubcategorySelect = (subcategoryName) => {
//     const selectedSub = Object.values(predefinedSubcategories)
//       .flat()
//       .find((sub) => sub.name === subcategoryName);
//     setSelectedSubcategory(selectedSub);
//   };

//   const handleNameChange = (e) => {
//     setProductName(e.target.value);
//   };

//   const handleDescriptionChange = (e) => {
//     setProductDescription(e.target.value);
//   };

//   const handlePriceChange = (e) => {
//     setProductPrice(e.target.value);
//   };

//   const handleStockChange = (e) => {
//     setProductStock(e.target.value);
//   };

//   const handleSubmit = async (event) => {
//     event.preventDefault();
//     if (!selectedSubcategory) {
//       console.error("Subcategory not selected");
//       toast("Subcategory not selected");
//       return;
//     }

//     const category = predefinedCategories.find((cat) =>
//       predefinedSubcategories[cat.id].some(
//         (subcat) => subcat.id === selectedSubcategory.id
//       )
//     );

//     if (!category) {
//       console.error("Category not found for selected subcategory");
//       toast("Category not found for selected subcategory");
//       return;
//     }

//     const product = {
//       id: uuidv4(),
//       category: category.name,
//       subcategory: selectedSubcategory.name,
//       name: productName,
//       description: productDescription,
//       price: parseInt(productPrice, 10),
//       stock: parseInt(productStock, 10),
//       product_id: selectedSubcategory.id,
//     };

//     try {
//       const result = await db.insert(products).values(product);

//       if (result) {
//         console.log("Product added successfully");
//         toast("Product added successfully");
//       } else {
//         console.error("Failed to add product");
//         toast("Failed to add product");
//       }
//     } catch (error) {
//       console.error("An error occurred:", error);
//       toast("An error occurred");
//     }
//   };

//   return (
//     <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 m-5 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 p-4">
//       {predefinedCategories.map((category) => (
//         <Dialog key={category.id}>
//           <DialogTrigger className="m-5">
//             <Button className="block w-full h-12 px-6 py-3 text-lg m-10">
//               {category.name}
//             </Button>
//           </DialogTrigger>
//           <DialogContent>
//             <DialogHeader>
//               <DialogTitle className="mb-5 text-2xl">
//                 {category.name} Category Details
//               </DialogTitle>
//               <DialogDescription>
//                 <form onSubmit={handleSubmit} className="space-y-4">
//                   <Select
//                     value={selectedSubcategory ? selectedSubcategory.name : ""}
//                     onValueChange={handleSubcategorySelect}
//                     required
//                   >
//                     <SelectTrigger className="w-full md:w-[180px]">
//                       <SelectValue>
//                         {selectedSubcategory
//                           ? selectedSubcategory.name
//                           : "Select a subcategory"}
//                       </SelectValue>
//                     </SelectTrigger>
//                     <SelectContent>
//                       {predefinedSubcategories[category.id].map(
//                         (subcategory) => (
//                           <SelectItem
//                             key={subcategory.id}
//                             value={subcategory.name}
//                           >
//                             {subcategory.name}
//                           </SelectItem>
//                         )
//                       )}
//                     </SelectContent>
//                   </Select>

//                   <Input
//                     type="text"
//                     placeholder="Product Name"
//                     value={productName}
//                     onChange={handleNameChange}
//                     className="w-full"
//                   />
//                   <Input
//                     type="text"
//                     placeholder="Product Description"
//                     value={productDescription}
//                     onChange={handleDescriptionChange}
//                     className="w-full"
//                   />
//                   <Input
//                     type="number"
//                     placeholder="Price"
//                     value={productPrice}
//                     onChange={handlePriceChange}
//                     className="w-full"
//                   />
//                   <Input
//                     type="number"
//                     placeholder="Stock"
//                     value={productStock}
//                     onChange={handleStockChange}
//                     className="w-full"
//                   />

//                   <Button type="submit" className="w-full">
//                     Submit
//                   </Button>
//                 </form>
//               </DialogDescription>
//             </DialogHeader>
//           </DialogContent>
//         </Dialog>
//       ))}
//     </div>
//   );
// };

// export default Page;




// "use client";
// import { useOrganizationList } from '@clerk/nextjs';
// import { useRouter } from 'next/navigation';
// import React, { useState, useEffect } from "react";
// import {
//   Dialog,
//   DialogContent,
//   DialogDescription,
//   DialogHeader,
//   DialogTitle,
//   DialogTrigger,
// } from "@/components/ui/dialog";
// import { Button } from "@/components/ui/button";
// import {
//   Select,
//   SelectContent,
//   SelectItem,
//   SelectTrigger,
//   SelectValue,
// } from "@/components/ui/select";
// import { Input } from "@/components/ui/Input";
// import { toast } from "react-toastify";
// import { db } from "@/configs";
// import { products } from "@/configs/schema";
// import { v4 as uuidv4 } from "uuid";

// const predefinedCategories = [
//   { id: 1, name: "Bedroom" },
//   { id: 2, name: "Living Room" },
//   { id: 3, name: "Dining" },
//   { id: 4, name: "Office" },
// ];

// const predefinedSubcategories = {
//   1: [
//     { id: 1, name: "Wardrobe" },
//     { id: 2, name: "Bed-side Table" },
//     { id: 3, name: "Bed" },
//     { id: 4, name: "Dresser" },
//     { id: 5, name: "Mattress" },
//   ],
//   2: [
//     { id: 6, name: "Sofa" },
//     { id: 7, name: "Sofa-cum-bed" },
//     { id: 8, name: "Multi-utility Cabinet" },
//     { id: 9, name: "Center Table" },
//     { id: 10, name: "Bookshelf" },
//   ],
//   3: [
//     { id: 11, name: "Kitchen Cabinet" },
//     { id: 12, name: "Dining Table" },
//   ],
//   4: [
//     { id: 13, name: "Office Table" },
//     { id: 14, name: "Office Chair" },
//     { id: 15, name: "Study Table" },
//     { id: 16, name: "Bookshelf" },
//     { id: 17, name: "Filing Cabinet" },
//   ],
// };

// const Page = () => {
//   const router = useRouter();
//   const { organizationList, isLoaded } = useOrganizationList();
//   const [showLoader, setShowLoader] = useState(true);
//   const [selectedSubcategory, setSelectedSubcategory] = useState(null);
//   const [productName, setProductName] = useState("");
//   const [productDescription, setProductDescription] = useState("");
//   const [productPrice, setProductPrice] = useState("");
//   const [productStock, setProductStock] = useState("");

//   useEffect(() => {
//     if (isLoaded) {
//       const adminOrganization = organizationList.find(
//         (org) => org.membership.role === 'org:admin'
//       );

//       if (!adminOrganization || adminOrganization.membership.role !== 'admin') {
//         router.push('/');
//       } else {
//         setShowLoader(false);
//       }
//     }
//   }, [isLoaded, organizationList, router]);

//   const handleSubcategorySelect = (subcategoryName) => {
//     const selectedSub = Object.values(predefinedSubcategories)
//       .flat()
//       .find((sub) => sub.name === subcategoryName);
//     setSelectedSubcategory(selectedSub);
//   };

//   const handleNameChange = (e) => {
//     setProductName(e.target.value);
//   };

//   const handleDescriptionChange = (e) => {
//     setProductDescription(e.target.value);
//   };

//   const handlePriceChange = (e) => {
//     setProductPrice(e.target.value);
//   };

//   const handleStockChange = (e) => {
//     setProductStock(e.target.value);
//   };

//   const handleSubmit = async (event) => {
//     event.preventDefault();
//     if (!selectedSubcategory) {
//       console.error("Subcategory not selected");
//       toast("Subcategory not selected");
//       return;
//     }

//     const category = predefinedCategories.find((cat) =>
//       predefinedSubcategories[cat.id].some(
//         (subcat) => subcat.id === selectedSubcategory.id
//       )
//     );

//     if (!category) {
//       console.error("Category not found for selected subcategory");
//       toast("Category not found for selected subcategory");
//       return;
//     }

//     const product = {
//       id: uuidv4(),
//       category: category.name,
//       subcategory: selectedSubcategory.name,
//       name: productName,
//       description: productDescription,
//       price: parseInt(productPrice, 10),
//       stock: parseInt(productStock, 10),
//       product_id: selectedSubcategory.id,
//     };

//     try {
//       const result = await db.insert(products).values(product);

//       if (result) {
//         console.log("Product added successfully");
//         toast("Product added successfully");
//       } else {
//         console.error("Failed to add product");
//         toast("Failed to add product");
//       }
//     } catch (error) {
//       console.error("An error occurred:", error);
//       toast("An error occurred");
//     }
//   };

//   if (showLoader) {
//     return <div>Loading...</div>;
//   }

//   return (
//     <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 m-5 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 p-4">
//       {predefinedCategories.map((category) => (
//         <Dialog key={category.id}>
//           <DialogTrigger className="m-5">
//             <Button className="block w-full h-12 px-6 py-3 text-lg m-10">
//               {category.name}
//             </Button>
//           </DialogTrigger>
//           <DialogContent>
//             <DialogHeader>
//               <DialogTitle className="mb-5 text-2xl">
//                 {category.name} Category Details
//               </DialogTitle>
//               <DialogDescription>
//                 <form onSubmit={handleSubmit} className="space-y-4">
//                   <Select
//                     value={selectedSubcategory ? selectedSubcategory.name : ""}
//                     onValueChange={handleSubcategorySelect}
//                     required
//                   >
//                     <SelectTrigger className="w-full md:w-[180px]">
//                       <SelectValue>
//                         {selectedSubcategory
//                           ? selectedSubcategory.name
//                           : "Select a subcategory"}
//                       </SelectValue>
//                     </SelectTrigger>
//                     <SelectContent>
//                       {predefinedSubcategories[category.id].map(
//                         (subcategory) => (
//                           <SelectItem
//                             key={subcategory.id}
//                             value={subcategory.name}
//                           >
//                             {subcategory.name}
//                           </SelectItem>
//                         )
//                       )}
//                     </SelectContent>
//                   </Select>

//                   <Input
//                     type="text"
//                     placeholder="Product Name"
//                     value={productName}
//                     onChange={handleNameChange}
//                     className="w-full"
//                   />
//                   <Input
//                     type="text"
//                     placeholder="Product Description"
//                     value={productDescription}
//                     onChange={handleDescriptionChange}
//                     className="w-full"
//                   />
//                   <Input
//                     type="number"
//                     placeholder="Price"
//                     value={productPrice}
//                     onChange={handlePriceChange}
//                     className="w-full"
//                   />
//                   <Input
//                     type="number"
//                     placeholder="Stock"
//                     value={productStock}
//                     onChange={handleStockChange}
//                     className="w-full"
//                   />

//                   <Button type="submit" className="w-full">
//                     Submit
//                   </Button>
//                 </form>
//               </DialogDescription>
//             </DialogHeader>
//           </DialogContent>
//         </Dialog>
//       ))}
//     </div>
//   );
// };

// export default Page;











"use client";
import { useOrganizationList } from '@clerk/nextjs';
import { useRouter } from 'next/navigation';
import React, { useState, useEffect } from "react";
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
  const { organizationList, isLoaded } = useOrganizationList();
  
  // const [showLoader, setShowLoader] = useState(true);
  const [selectedSubcategory, setSelectedSubcategory] = useState(null);
  const [productName, setProductName] = useState("");
  const [productDescription, setProductDescription] = useState("");
  const [productPrice, setProductPrice] = useState("");
  const [productStock, setProductStock] = useState("");

  // useEffect(() => {
  //   if (isLoaded) {
  //     // Check if organizationList is defined and not empty
  //     if (!organizationList || organizationList.length === 0) {
  //       console.error("Organization list is empty or undefined");
  //       toast("Organization list is empty or undefined");
  //       return;
  //     }

  //     const adminOrganization = organizationList.find(
  //       (org) => org.membership.role === 'org:admin'
  //     );

  //     if (!adminOrganization || adminOrganization.membership.role !== 'org:admin') {
  //       router.push('/');
  //     } else {
  //       setShowLoader(false);
  //     }
  //   }
  // }, [isLoaded, organizationList, router]);

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

    const product = {
      id: uuidv4(),
      category: category.name,
      subcategory: selectedSubcategory.name,
      name: productName,
      description: productDescription,
      price: parseInt(productPrice, 10),
      stock: parseInt(productStock, 10),
      product_id: selectedSubcategory.id,
    };

    try {
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

  // if (showLoader) {
  //   return <div>Loading...</div>;
  // }

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

                  <Button type="submit" className="w-full">
                    Submit
                  </Button>
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
