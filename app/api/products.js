// // import { db } from '../../configs/db'; // Update the import path as per your project structure
// // import { products, productSubcategory } from '../../configs/schema'; // Update the import path as per your project structure

// import { db } from "@/configs";
// import { products, productSubcategory } from "@/configs/schema";

// export default async function handler(req, res) {
//   if (req.method === 'POST') {
//     const { name, description, price, stock, subcategoryId } = req.body;

//     // Insert product
//     const productId = await db.insert(products).values({
//       name,
//       description,
//       price,
//       stock,
//     }).returning('id');

//     // Insert into productSubcategory table
//     await db.insert(productSubcategory).values({
//       productId,
//       subcategoryId,
//     });

//     res.status(201).end(); // Created
//   } else {
//     res.status(405).end(); // Method Not Allowed
//   }
// }
