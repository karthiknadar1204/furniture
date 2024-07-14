// "use client";

// import React, { useState } from "react";
// import { useRouter } from "next/navigation";
// import { Button } from "@/components/ui/button";
// import { db } from "@/configs";
// import { products } from "@/configs/schema";
// import { eq } from "drizzle-orm";
// import Image from "next/image";
// import { PencilOff, Trash2 } from "lucide-react";
// import { ref, uploadBytesResumable, getDownloadURL } from "firebase/storage";
// import { Storage } from "@/firebase";

// const categories = [
//   { id: 1, name: "Living Room" },
//   { id: 2, name: "Bedroom" },
//   { id: 3, name: "Kitchen" },
//   { id: 4, name: "Bathroom" },
// ];

// const AllProductsInfo = () => {
//   const [isModalOpen, setIsModalOpen] = useState(false);
//   const [isEditModalOpen, setIsEditModalOpen] = useState(false);
//   const [modalContent, setModalContent] = useState([]);
//   const [selectedCategory, setSelectedCategory] = useState(null);
//   const [editedProduct, setEditedProduct] = useState({
//     id: null,
//     name: "",
//     price: 0,
//     stock: 0,
//     description: "",
//     imageUrl: "",
//     length: 0,
//     breadth: 0,
//     height: 0,
//   });
//   const [editedName, setEditedName] = useState("");
//   const [editedPrice, setEditedPrice] = useState(0);
//   const [editedStock, setEditedStock] = useState(0);
//   const [editedDescription, setEditedDescription] = useState("");
//   const [editedImageFile, setEditedImageFile] = useState(null);
//   const [editedLength, setEditedLength] = useState(0);
//   const [editedBreadth, setEditedBreadth] = useState(0);
//   const [editedHeight, setEditedHeight] = useState(0);
//   const [isLoading, setIsLoading] = useState(false);
//   const router = useRouter();

//   const handleCategoryClick = async (category) => {
//     try {
//       const result = await db
//         .select()
//         .from(products)
//         .where(eq(products.category, category.name))
//         .execute();

//       if (result.length === 0) {
//         setModalContent([{ id: "addProducts", name: "Add Products" }]);
//         setSelectedCategory(category.name);
//         setIsModalOpen(true);
//       } else {
//         setModalContent(result);
//         setSelectedCategory(category.name);
//         setIsModalOpen(true);
//       }
//     } catch (error) {
//       console.error("Error fetching products:", error);
//     }
//   };

//   const deleteProduct = async (productId) => {
//     try {
//       await db.delete(products).where(eq(products.id, productId)).execute();

//       const updatedContent = modalContent.filter(
//         (product) => product.id !== productId
//       );
//       setModalContent(updatedContent);
//     } catch (error) {
//       console.error("Error deleting product:", error);
//     }
//   };

//   const openEditModal = (product) => {
//     setEditedProduct(product);
//     setEditedName(product.name);
//     setEditedPrice(product.price);
//     setEditedStock(product.stock);
//     setEditedDescription(product.description);
//     setEditedLength(product.length || 0);
//     setEditedBreadth(product.breadth || 0);
//     setEditedHeight(product.height || 0);
//     setIsEditModalOpen(true);
//   };

//   const saveChanges = async () => {
//     try {
//       setIsLoading(true);

//       let newImageUrl = editedProduct.imageUrl;

//       if (editedImageFile) {
//         const imageName = editedImageFile.name.split(".")[0];
//         const storageRef = ref(Storage, imageName);

//         const uploadTask = uploadBytesResumable(storageRef, editedImageFile);

//         const snapshot = await new Promise((resolve, reject) => {
//           uploadTask.on(
//             "state_changed",
//             () => {},
//             reject,
//             () => {
//               getDownloadURL(uploadTask.snapshot.ref)
//                 .then(resolve)
//                 .catch(reject);
//             }
//           );
//         });

//         newImageUrl = snapshot;
//       }

//       await db
//         .update(products)
//         .set({
//           name: editedName,
//           price: editedPrice,
//           stock: editedStock,
//           description: editedDescription,
//           imageUrl: newImageUrl,
//           length: editedLength,
//           breadth: editedBreadth,
//           height: editedHeight,
//         })
//         .where(eq(products.id, editedProduct.id))
//         .execute();

//       const updatedContent = modalContent.map((product) =>
//         product.id === editedProduct.id
//           ? {
//               ...product,
//               name: editedName,
//               price: editedPrice,
//               stock: editedStock,
//               description: editedDescription,
//               imageUrl: newImageUrl,
//               length: editedLength,
//               breadth: editedBreadth,
//               height: editedHeight,
//             }
//           : product
//       );
//       setModalContent(updatedContent);
//       setIsEditModalOpen(false);
//     } catch (error) {
//       console.error("Error updating product:", error);
//     } finally {
//       setIsLoading(false);
//     }
//   };

//   const closeModal = () => {
//     setIsModalOpen(false);
//     setModalContent([]);
//     setSelectedCategory(null);
//   };

//   const handleImageChange = (e) => {
//     const file = e.target.files[0];
//     setEditedImageFile(file);
//   };

//   return (
//     <div className="flex">
//       <div className="flex flex-col items-start p-6">
//         {categories.map((category) => (
//           <Button
//             key={category.id}
//             onClick={() => handleCategoryClick(category)}
//             className="mb-4 text-white p-2 rounded w-full"
//           >
//             {category.name}
//           </Button>
//         ))}
//       </div>

//       {isModalOpen && (
//         <div className="fixed inset-0 z-50 overflow-y-auto flex items-center justify-center bg-black bg-opacity-50">
//           <div className="relative bg-white p-6 max-w-lg rounded-lg shadow-md">
//             <button
//               className="absolute top-2 right-2 text-gray-500 hover:text-gray-700"
//               onClick={closeModal}
//               aria-label="Close Modal"
//             >
//               <svg
//                 className="w-6 h-6"
//                 fill="none"
//                 stroke="currentColor"
//                 viewBox="0 0 24 24"
//                 xmlns="http://www.w3.org/2000/svg"
//               >
//                 <path
//                   strokeLinecap="round"
//                   strokeLinejoin="round"
//                   strokeWidth="2"
//                   d="M6 18L18 6M6 6l12 12"
//                 />
//               </svg>
//             </button>

//             <h2 className="text-xl font-bold mb-4">
//               {selectedCategory} Products
//             </h2>

//             <div className="grid grid-cols-1 gap-4">
//               {modalContent.map((product) => (
//                 <div
//                   key={product.id}
//                   className="flex items-center border rounded-md p-4 mb-4"
//                 >
//                   <div className="w-24 h-24 mr-4 relative">
//                     <Image
//                       src={product.imageUrl[0] || "/Sofa.jpg"}
//                       alt={product.name}
//                       layout="fill"
//                       objectFit="cover"
//                       className="rounded-md"
//                     />
//                   </div>
//                   <div>
//                     <h3 className="text-lg font-bold">{product.name}</h3>
//                     <p className="text-gray-500 text-sm">
//                       {product.subcategory}
//                     </p>
//                     <p className="text-base mb-2">Price: ${product.price}</p>
//                     <p>
//                       Stock:{" "}
//                       {product.stock > 0 ? (
//                         <span className="text-green-500">In Stock</span>
//                       ) : (
//                         <span className="text-red-500">Out of Stock</span>
//                       )}
//                     </p>
//                     <div className="flex mt-2">
//                       <button
//                         className="mr-2 text-gray-500 hover:text-gray-700"
//                         onClick={() => openEditModal(product)}
//                       >
//                         <PencilOff size={24} /> Edit
//                       </button>
//                       <button
//                         className="text-gray-500 hover:text-gray-700"
//                         onClick={() => deleteProduct(product.id)}
//                       >
//                         <Trash2 size={24} /> Delete
//                       </button>
//                     </div>
//                   </div>
//                 </div>
//               ))}
//             </div>
//           </div>
//         </div>
//       )}

//       {isEditModalOpen && (
//         <div className="fixed inset-0 z-50 overflow-y-auto flex items-center justify-center bg-black bg-opacity-50">
//           <div className="relative bg-white p-6 max-w-lg rounded-lg shadow-md">
//             <button
//               className="absolute top-2 right-2 text-gray-500 hover:text-gray-700"
//               onClick={() => setIsEditModalOpen(false)}
//               aria-label="Close Modal"
//             >
//               <svg
//                 className="w-6 h-6"
//                 fill="none"
//                 stroke="currentColor"
//                 viewBox="0 0 24 24"
//                 xmlns="http://www.w3.org/2000/svg"
//               >
//                 <path
//                   strokeLinecap="round"
//                   strokeLinejoin="round"
//                   strokeWidth="2"
//                   d="M6 18L18 6M6 6l12 12"
//                 />
//               </svg>
//             </button>

//             <h2 className="text-xl font-bold mb-4">Edit Product</h2>

//             <div className="grid grid-cols-1 gap-4">
//               <div className="flex items-center border rounded-md p-4 mb-4">
//                 <div className="w-24 h-24 mr-4 relative">
//                   <Image
//                     src={editedProduct.imageUrl[0] || "/Sofa.jpg"}
//                     alt={editedProduct.name}
//                     layout="fill"
//                     objectFit="cover"
//                     className="rounded-md"
//                   />
//                 </div>
//                 <div>
//                   <h3 className="text-lg font-bold">{editedProduct.name}</h3>
//                   <div className="mt-2">
//                     <label className="block text-sm font-medium text-gray-700 mb-1">
//                       Name
//                     </label>
//                     <input
//                       type="text"
//                       value={editedName}
//                       onChange={(e) => setEditedName(e.target.value)}
//                       className="border border-gray-300 rounded-md p-2 w-full"
//                     />
//                   </div>
//                   <div className="mt-2">
//                     <label className="block text-sm font-medium text-gray-700 mb-1">
//                       Price
//                     </label>
//                     <input
//                       type="number"
//                       value={editedPrice}
//                       onChange={(e) => setEditedPrice(e.target.value)}
//                       className="border border-gray-300 rounded-md p-2 w-full"
//                     />
//                   </div>
//                   <div className="mt-2">
//                     <label className="block text-sm font-medium text-gray-700 mb-1">
//                       Stock
//                     </label>
//                     <input
//                       type="number"
//                       value={editedStock}
//                       onChange={(e) => setEditedStock(e.target.value)}
//                       className="border border-gray-300 rounded-md p-2 w-full"
//                     />
//                   </div>
//                   <div className="mt-2">
//                     <label className="block text-sm font-medium text-gray-700 mb-1">
//                       Description
//                     </label>
//                     <textarea
//                       value={editedDescription}
//                       onChange={(e) => setEditedDescription(e.target.value)}
//                       className="border border-gray-300 rounded-md p-2 w-full"
//                     />
//                   </div>
//                   <div className="mt-2">
//                     <label className="block text-sm font-medium text-gray-700 mb-1">
//                       Length
//                     </label>
//                     <input
//                       type="number"
//                       value={editedLength}
//                       onChange={(e) => setEditedLength(e.target.value)}
//                       className="border border-gray-300 rounded-md p-2 w-full"
//                     />
//                   </div>
//                   <div className="mt-2">
//                     <label className="block text-sm font-medium text-gray-700 mb-1">
//                       Breadth
//                     </label>
//                     <input
//                       type="number"
//                       value={editedBreadth}
//                       onChange={(e) => setEditedBreadth(e.target.value)}
//                       className="border border-gray-300 rounded-md p-2 w-full"
//                     />
//                   </div>
//                   <div className="mt-2">
//                     <label className="block text-sm font-medium text-gray-700 mb-1">
//                       Height
//                     </label>
//                     <input
//                       type="number"
//                       value={editedHeight}
//                       onChange={(e) => setEditedHeight(e.target.value)}
//                       className="border border-gray-300 rounded-md p-2 w-full"
//                     />
//                   </div>
//                   <div className="mt-2">
//                     <label className="block text-sm font-medium text-gray-700 mb-1">
//                       Upload New Image
//                     </label>
//                     <input
//                       type="file"
//                       accept="image/*"
//                       onChange={handleImageChange}
//                       className="border border-gray-300 rounded-md p-2 w-full"
//                     />
//                   </div>
//                   <div className="flex mt-4">
//                     <button
//                       className="px-4 py-2 bg-gray-200 text-gray-800 rounded-md mr-2 hover:bg-gray-300"
//                       onClick={() => setIsEditModalOpen(false)}
//                     >
//                       Cancel
//                     </button>
//                     <button
//                       className="px-4 py-2 bg-blue-500 text-white rounded-md hover:bg-blue-600 flex items-center"
//                       onClick={saveChanges}
//                       disabled={isLoading}
//                     >
//                       {isLoading ? (
//                         <svg
//                           className="animate-spin -ml-1 mr-3 h-5 w-5 text-white"
//                           xmlns="http://www.w3.org/2000/svg"
//                           fill="none"
//                           viewBox="0 0 24 24"
//                         >
//                           <circle
//                             className="opacity-25"
//                             cx="12"
//                             cy="12"
//                             r="10"
//                             stroke="currentColor"
//                             strokeWidth="4"
//                           ></circle>
//                           <path
//                             className="opacity-75"
//                             fill="currentColor"
//                             d="M4 12a8 8 0 018-8V2.5a.5.5 0 011 0V4a8 8 0 01-8 8z"
//                           ></path>
//                         </svg>
//                       ) : (
//                         <span>Save Changes</span>
//                       )}
//                     </button>
//                   </div>
//                 </div>
//               </div>
//             </div>
//           </div>
//         </div>
//       )}
//     </div>
//   );
// };

// export default AllProductsInfo;














"use client";

import React, { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import { Button } from "@/components/ui/button";
import { db } from "@/configs";
import { products } from "@/configs/schema";
import { eq } from "drizzle-orm";
import Image from "next/image";
import { PencilOff, Trash2 } from "lucide-react";
import { ref, uploadBytesResumable, getDownloadURL } from "firebase/storage";
import { Storage } from "@/firebase";

const categories = [
  { id: 1, name: "Living Room" },
  { id: 2, name: "Bedroom" },
  { id: 3, name: "Kitchen" },
  { id: 4, name: "Bathroom" },
];

const AllProductsInfo = () => {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isEditModalOpen, setIsEditModalOpen] = useState(false);
  const [modalContent, setModalContent] = useState([]);
  const [selectedCategory, setSelectedCategory] = useState(null);
  const [editedProduct, setEditedProduct] = useState({
    id: null,
    name: "",
    price: 0,
    stock: 0,
    description: "",
    imageUrl: "",
    length: 0,
    breadth: 0,
    height: 0,
  });
  const [editedName, setEditedName] = useState("");
  const [editedPrice, setEditedPrice] = useState(0);
  const [editedStock, setEditedStock] = useState(0);
  const [editedDescription, setEditedDescription] = useState("");
  const [editedImageFile, setEditedImageFile] = useState(null);
  const [editedLength, setEditedLength] = useState(0);
  const [editedBreadth, setEditedBreadth] = useState(0);
  const [editedHeight, setEditedHeight] = useState(0);
  const [isLoading, setIsLoading] = useState(false);
  const router = useRouter();

  const handleCategoryClick = async (category) => {
    try {
      const result = await db
        .select()
        .from(products)
        .where(eq(products.category, category.name))
        .execute();

      if (result.length === 0) {
        setModalContent([{ id: "addProducts", name: "Add Products" }]);
        setSelectedCategory(category.name);
        setIsModalOpen(true);
      } else {
        setModalContent(result);
        setSelectedCategory(category.name);
        setIsModalOpen(true);
      }
    } catch (error) {
      console.error("Error fetching products:", error);
    }
  };

  const deleteProduct = async (productId) => {
    try {
      await db.delete(products).where(eq(products.id, productId)).execute();

      const updatedContent = modalContent.filter(
        (product) => product.id !== productId
      );
      setModalContent(updatedContent);
    } catch (error) {
      console.error("Error deleting product:", error);
    }
  };

  const openEditModal = (product) => {
    setEditedProduct(product);
    setEditedName(product.name);
    setEditedPrice(product.price);
    setEditedStock(product.stock);
    setEditedDescription(product.description);
    setEditedLength(product.length || 0);
    setEditedBreadth(product.breadth || 0);
    setEditedHeight(product.height || 0);
    setIsEditModalOpen(true);
  };

  const saveChanges = async () => {
    try {
      setIsLoading(true);

      let newImageUrl = editedProduct.imageUrl;

      if (editedImageFile) {
        const imageName = editedImageFile.name.split(".")[0];
        const storageRef = ref(Storage, imageName);

        const uploadTask = uploadBytesResumable(storageRef, editedImageFile);

        const snapshot = await new Promise((resolve, reject) => {
          uploadTask.on(
            "state_changed",
            () => {},
            reject,
            () => {
              getDownloadURL(uploadTask.snapshot.ref)
                .then(resolve)
                .catch(reject);
            }
          );
        });

        newImageUrl = snapshot;
      }

      await db
        .update(products)
        .set({
          name: editedName,
          price: editedPrice,
          stock: editedStock,
          description: editedDescription,
          imageUrl: newImageUrl,
          length: editedLength,
          breadth: editedBreadth,
          height: editedHeight,
        })
        .where(eq(products.id, editedProduct.id))
        .execute();

      const updatedContent = modalContent.map((product) =>
        product.id === editedProduct.id
          ? {
              ...product,
              name: editedName,
              price: editedPrice,
              stock: editedStock,
              description: editedDescription,
              imageUrl: newImageUrl,
              length: editedLength,
              breadth: editedBreadth,
              height: editedHeight,
            }
          : product
      );
      setModalContent(updatedContent);
      setIsEditModalOpen(false);
    } catch (error) {
      console.error("Error updating product:", error);
    } finally {
      setIsLoading(false);
    }
  };

  const closeModal = () => {
    setIsModalOpen(false);
    setModalContent([]);
    setSelectedCategory(null);
  };

  const handleImageChange = (e) => {
    const file = e.target.files[0];
    setEditedImageFile(file);
  };

  return (
    <div className="flex">
      <div className="flex flex-col items-start p-6">
        {categories.map((category) => (
          <Button
            key={category.id}
            onClick={() => handleCategoryClick(category)}
            className="mb-4 text-white p-2 rounded w-full"
          >
            {category.name}
          </Button>
        ))}
      </div>

      {isModalOpen && (
        <div className="fixed inset-0 z-50 overflow-y-auto flex items-center justify-center bg-black bg-opacity-50">
          <div className="relative bg-white p-6 max-w-lg rounded-lg shadow-md">
            <button
              className="absolute top-2 right-2 text-gray-500 hover:text-gray-700"
              onClick={closeModal}
              aria-label="Close Modal"
            >
              <svg
                className="w-6 h-6"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth="2"
                  d="M6 18L18 6M6 6l12 12"
                />
              </svg>
            </button>

            <h2 className="text-xl font-bold mb-4">
              {selectedCategory} Products
            </h2>

            <div className="grid grid-cols-1 gap-4">
              {modalContent.map((product) => (
                <div
                  key={product.id}
                  className="flex items-center border rounded-md p-4 mb-4"
                >
                  <div className="w-24 h-24 mr-4 relative">
                    <Image
                      src={product.imageUrl[0] || "/Sofa.jpg"}
                      alt={product.name}
                      layout="fill"
                      objectFit="cover"
                      className="rounded-md"
                    />
                  </div>
                  <div>
                    <h3 className="text-lg font-bold">{product.name}</h3>
                    <p className="text-gray-500 text-sm">
                      {product.subcategory}
                    </p>
                    <p className="text-base mb-2">Price: ${product.price}</p>
                    <p>
                      Stock:{" "}
                      {product.stock > 0 ? (
                        <span className="text-green-500">In Stock</span>
                      ) : (
                        <span className="text-red-500">Out of Stock</span>
                      )}
                    </p>
                    <div className="flex mt-2">
                      <button
                        className="mr-2 text-gray-500 hover:text-gray-700"
                        onClick={() => openEditModal(product)}
                      >
                        <PencilOff size={24} /> Edit
                      </button>
                      <button
                        className="text-gray-500 hover:text-gray-700"
                        onClick={() => deleteProduct(product.id)}
                      >
                        <Trash2 size={24} /> Delete
                      </button>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      )}

      {isEditModalOpen && (
        <div className="fixed inset-0 z-50 overflow-y-auto flex items-center justify-center bg-black bg-opacity-50">
          <div className="relative bg-white p-6 max-w-lg rounded-lg shadow-md">
            <button
              className="absolute top-2 right-2 text-gray-500 hover:text-gray-700"
              onClick={() => setIsEditModalOpen(false)}
              aria-label="Close Modal"
            >
              <svg
                className="w-6 h-6"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth="2"
                  d="M6 18L18 6M6 6l12 12"
                />
              </svg>
            </button>

            <h2 className="text-xl font-bold mb-4">Edit Product</h2>

            <form>
              <div className="mb-4">
                <label
                  htmlFor="name"
                  className="block text-sm font-medium text-gray-700"
                >
                  Name
                </label>
                <input
                  type="text"
                  id="name"
                  className="mt-1 p-2 border border-gray-300 rounded w-full"
                  value={editedName}
                  onChange={(e) => setEditedName(e.target.value)}
                />
              </div>

              <div className="mb-4">
                <label
                  htmlFor="price"
                  className="block text-sm font-medium text-gray-700"
                >
                  Price
                </label>
                <input
                  type="number"
                  id="price"
                  className="mt-1 p-2 border border-gray-300 rounded w-full"
                  value={editedPrice}
                  onChange={(e) => setEditedPrice(e.target.value)}
                />
              </div>

              <div className="mb-4">
                <label
                  htmlFor="stock"
                  className="block text-sm font-medium text-gray-700"
                >
                  Stock
                </label>
                <input
                  type="number"
                  id="stock"
                  className="mt-1 p-2 border border-gray-300 rounded w-full"
                  value={editedStock}
                  onChange={(e) => setEditedStock(e.target.value)}
                />
              </div>

              <div className="mb-4">
                <label
                  htmlFor="description"
                  className="block text-sm font-medium text-gray-700"
                >
                  Description
                </label>
                <textarea
                  id="description"
                  className="mt-1 p-2 border border-gray-300 rounded w-full"
                  value={editedDescription}
                  onChange={(e) => setEditedDescription(e.target.value)}
                />
              </div>

              <div className="mb-4">
                <label
                  htmlFor="image"
                  className="block text-sm font-medium text-gray-700"
                >
                  Image
                </label>
                <input
                  type="file"
                  id="image"
                  className="mt-1 p-2 border border-gray-300 rounded w-full"
                  onChange={handleImageChange}
                />
              </div>

              <div className="mb-4">
                <label
                  htmlFor="length"
                  className="block text-sm font-medium text-gray-700"
                >
                  Length
                </label>
                <input
                  type="number"
                  id="length"
                  className="mt-1 p-2 border border-gray-300 rounded w-full"
                  value={editedLength}
                  onChange={(e) => setEditedLength(e.target.value)}
                />
              </div>

              <div className="mb-4">
                <label
                  htmlFor="breadth"
                  className="block text-sm font-medium text-gray-700"
                >
                  Breadth
                </label>
                <input
                  type="number"
                  id="breadth"
                  className="mt-1 p-2 border border-gray-300 rounded w-full"
                  value={editedBreadth}
                  onChange={(e) => setEditedBreadth(e.target.value)}
                />
              </div>

              <div className="mb-4">
                <label
                  htmlFor="height"
                  className="block text-sm font-medium text-gray-700"
                >
                  Height
                </label>
                <input
                  type="number"
                  id="height"
                  className="mt-1 p-2 border border-gray-300 rounded w-full"
                  value={editedHeight}
                  onChange={(e) => setEditedHeight(e.target.value)}
                />
              </div>

              <div className="flex justify-end">
                <button
                  type="button"
                  className="mr-2 px-4 py-2 bg-gray-200 text-gray-700 rounded"
                  onClick={() => setIsEditModalOpen(false)}
                >
                  Cancel
                </button>
                <button
                  type="button"
                  className="px-4 py-2 bg-blue-600 text-white rounded"
                  onClick={saveChanges}
                  disabled={isLoading}
                >
                  {isLoading ? "Saving..." : "Save"}
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
};

export default AllProductsInfo;
