"use client";

import React, { useState } from 'react';
import { useRouter } from 'next/navigation';
import { Button } from '@/components/ui/button';
import { db } from '@/configs';
import { products } from '@/configs/schema';
import { eq } from 'drizzle-orm';
import Image from 'next/image';
import { PencilOff } from 'lucide-react';
import { Trash2 } from 'lucide-react';

const categories = [
  { id: 1, name: 'Living Room' },
  { id: 2, name: 'Bedroom' },
  { id: 3, name: 'Kitchen' },
  { id: 4, name: 'Bathroom' }
];

const AllProductsInfo = () => {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isEditModalOpen, setIsEditModalOpen] = useState(false);
  const [modalContent, setModalContent] = useState([]);
  const [selectedCategory, setSelectedCategory] = useState(null);
  const [editedProduct, setEditedProduct] = useState(null);
  const [editedName, setEditedName] = useState('');
  const [editedPrice, setEditedPrice] = useState(0);
  const [editedStock, setEditedStock] = useState(0);
  const router = useRouter();

  const handleCategoryClick = async (category) => {
    try {
      const result = await db
        .select()
        .from(products)
        .where(eq(products.category, category.name))
        .execute();

      setModalContent(result);
      setSelectedCategory(category.name);
      setIsModalOpen(true);
    } catch (error) {
      console.error("Error fetching products:", error);
    }
  };

  const deleteProduct = async (productId) => {
    try {
      await db
        .delete(products)
        .where(eq(products.id, productId))
        .execute();

      // Update modalContent state after deletion
      const updatedContent = modalContent.filter((product) => product.id !== productId);
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
    setIsEditModalOpen(true);
  };

  const saveChanges = async () => {
    try {
      await db
        .update(products)
        .set({ name: editedName, price: editedPrice, stock: editedStock })
        .where(eq(products.id, editedProduct.id))
        .execute();

      // Update modalContent state after editing
      const updatedContent = modalContent.map((product) =>
        product.id === editedProduct.id
          ? { ...product, name: editedName, price: editedPrice, stock: editedStock }
          : product
      );
      setModalContent(updatedContent);
      setIsEditModalOpen(false);
    } catch (error) {
      console.error("Error updating product:", error);
    }
  };

  const closeModal = () => {
    setIsModalOpen(false);
    setModalContent([]);
    setSelectedCategory(null);
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

      {/* Custom Modal */}
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

            <h2 className="text-xl font-bold mb-4">{selectedCategory} Products</h2>

            <div className="grid grid-cols-1 gap-4">
              {modalContent.map((product) => (
                <div key={product.id} className="flex items-center border rounded-md p-4 mb-4">
                  <div className="w-24 h-24 mr-4 relative">
                    <Image
                      src={product.imageUrl || "/Sofa.jpg"}
                      alt={product.name}
                      layout="fill"
                      objectFit="cover"
                      className="rounded-md"
                    />
                  </div>
                  <div>
                    <h3 className="text-lg font-bold">{product.name}</h3>
                    <p className="text-base mb-2">Price: ${product.price}</p>
                    <p>
                      Stock:{' '}
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

      {/* Edit Modal */}
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

            <div className="grid grid-cols-1 gap-4">
              <div className="flex items-center border rounded-md p-4 mb-4">
                <div className="w-24 h-24 mr-4 relative">
                  <Image
                    src={editedProduct.imageUrl || "/Sofa.jpg"}
                    alt={editedProduct.name}
                    layout="fill"
                    objectFit="cover"
                    className="rounded-md"
                  />
                </div>
                <div>
                  <h3 className="text-lg font-bold">{editedProduct.name}</h3>
                  <div className="mt-2">
                    <label className="block text-sm font-medium text-gray-700 mb-1">Name</label>
                    <input
                      type="text"
                      value={editedName}
                      onChange={(e) => setEditedName(e.target.value)}
                      className="border border-gray-300 rounded-md p-2 w-full"
                    />
                  </div>
                  <div className="mt-2">
                    <label className="block text-sm font-medium text-gray-700 mb-1">Price</label>
                    <input
                      type="number"
                      value={editedPrice}
                      onChange={(e) => setEditedPrice(e.target.value)}
                      className="border border-gray-300 rounded-md p-2 w-full"
                    />
                  </div>
                  <div className="mt-2">
                    <label className="block text-sm font-medium text-gray-700 mb-1">Stock</label>
                    <input
                      type="number"
                      value={editedStock}
                      onChange={(e) => setEditedStock(e.target.value)}
                      className="border border-gray-300 rounded-md p-2 w-full"
                    />
                  </div>
                  <div className="flex mt-4">
                    <button
                      className="px-4 py-2 bg-gray-200 text-gray-800 rounded-md mr-2 hover:bg-gray-300"
                      onClick={() => setIsEditModalOpen(false)}
                    >
                      Cancel
                    </button>
                    <button
                      className="px-4 py-2 bg-blue-500 text-white rounded-md hover:bg-blue-600"
                      onClick={saveChanges}
                    >
                      Save Changes
                    </button>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default AllProductsInfo;
