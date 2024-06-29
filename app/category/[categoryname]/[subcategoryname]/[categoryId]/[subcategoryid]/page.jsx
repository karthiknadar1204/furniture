"use client";

import { db } from '@/configs';
import { products } from '@/configs/schema';
import { eq } from 'drizzle-orm';
import { useRouter, usePathname } from 'next/navigation';
import React, { useEffect, useState } from 'react';

const CategoryPage = () => {
    const [productsList, setProductsList] = useState([]);
    const pathname = usePathname();
    const router = useRouter();

    useEffect(() => {
        const fetchProducts = async () => {
            try {
                const parts = pathname.split('/');
                const categoryId = parseInt(parts[parts.length - 1], 10); // Parse category ID as an integer
                console.log(categoryId);

                // Fetch products where the product_id matches the categoryId from the URL
                const result = await db.select().from(products).where(eq(products.product_id, categoryId)).execute();
                
                setProductsList(result);
                console.log(result[0]);
            } catch (error) {
                console.error('Error fetching products:', error);
            }
        };

        fetchProducts();
    }, [pathname]);

    return (
        <div>
            <h1>Current pathname: {pathname}</h1>
            <ul>
                {productsList.map(product => (
                    <li key={product.id}>
                        {product.name} - {product.price}
                    </li>
                ))}
            </ul>
        </div>
    );
};

export default CategoryPage;
