// "use client";

// import { db } from '@/configs';
// import { products } from '@/configs/schema';
// import { eq } from 'drizzle-orm';
// import Image from 'next/image';
// import { useRouter, usePathname } from 'next/navigation';
// import React, { useEffect, useState } from 'react';

// const CategoryPage = () => {
//     const [productsList, setProductsList] = useState([]);
//     const pathname = usePathname();
//     const router = useRouter();

//     useEffect(() => {
//         const fetchProducts = async () => {
//             try {
//                 const parts = pathname.split('/');
//                 const categoryId = parseInt(parts[parts.length - 1], 10);
//                 console.log(categoryId);

//                 const result = await db.select().from(products).where(eq(products.product_id, categoryId)).execute();
                
//                 setProductsList(result);
//                 console.log(result[0]);
//             } catch (error) {
//                 console.error('Error fetching products:', error);
//             }
//         };

//         fetchProducts();
//     }, [pathname]);

//     return (
//         <div className="min-h-screen flex flex-col items-center p-6">
//             <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5">
//                 {productsList.map(product => (
//                     <div key={product.id} className="bg-white p-4 rounded-lg shadow-md flex flex-col items-center">
//                         <div className="w-full h-48 flex items-center justify-center mb-4 rounded-md bg-gray-100">
//                             <Image
//                                 // src={product.imageUrl} 
//                                 src={'/Sofa.jpg'}
//                                 alt={product.name} 
//                                 width={350}
//                                 height={350}
//                                 className="object-cover"
//                             />
//                         </div>
//                         <h2 className="text-lg font-semibold mb-2 text-center">{product.name}</h2>
//                         <p className="text-gray-700 text-center">${product.price}</p>
//                     </div>
//                 ))}
//             </div>
//         </div>
//     );
// };

// export default CategoryPage;





"use client";
import { db } from '@/configs';
import { products } from '@/configs/schema';
import { eq } from 'drizzle-orm';
import Image from 'next/image';
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
                const categoryId = parseInt(parts[parts.length - 1], 10);
                console.log(categoryId);

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
        <div className="min-h-screen flex flex-col items-center p-6">
            <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5">
                {productsList.map(product => (
                    <div key={product.id} className="bg-white p-4 rounded-lg shadow-md flex flex-col items-center">
                        <div className="w-full h-48 flex items-center justify-center mb-4 rounded-md bg-gray-100">
                            {/* Use conditional rendering or default image src */}
                            <Image
                                src={product.imageUrl || '/Sofa.jpg'}
                                alt={product.name} 
                                width={350}
                                height={350}
                                className="object-cover"
                            />
                        </div>
                        <h2 className="text-lg font-semibold mb-2 text-center">{product.name}</h2>
                        <p className="text-gray-700 text-center">${product.price}</p>
                    </div>
                ))}
            </div>
        </div>
    );
};

export default CategoryPage;


