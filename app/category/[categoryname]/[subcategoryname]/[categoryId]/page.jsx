"use client"

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
                const categoryId = parts[parts.length - 1]; 
                console.log(categoryId);

                const result = await db.select().from(products).where(eq('id', categoryId)).execute();
                // const result = await db.select().from(products).where(eq('categoryId', categoryId));
                // const result=await db.select({
                //     id:categoryId
                // }).from(products);
                // setProductsList(result);
                console.log(result);
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
