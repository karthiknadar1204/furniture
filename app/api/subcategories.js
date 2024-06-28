// // import { db } from '../../configs/db'; // Update the import path as per your project structure
// // import { subcategories } from '../../configs/schema'; // Update the import path as per your project structure

// import { db } from "@/configs";
// import { subcategories } from "@/configs/schema";

// export default async function handler(req, res) {
//   if (req.method === 'GET') {
//     const { categoryId } = req.query;
//     const data = await db.select().from(subcategories).where({ categoryId });
//     res.status(200).json(data);
//   } else {
//     res.status(405).end(); // Method Not Allowed
//   }
// }
