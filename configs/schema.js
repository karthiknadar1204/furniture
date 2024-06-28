const { pgTable, integer, varchar, primaryKey, foreignKey } = require("drizzle-orm/pg-core");

// Categories Table
// export const categories = pgTable('categories', {
//   id: integer('id').primaryKey(),
//   name: varchar('name', 255).notNull(),
// });

// Subcategories Table
// export const subcategories = pgTable('subcategories', {
//   id: integer('id').primaryKey(),
//   name: varchar('name', 255).notNull(),
//   categoryId: integer('category_id').notNull(),
//   categoryFk: integer("categoryFk").references(() => categories.id),
// });

// Products Table
export const products = pgTable('products', {
  id: integer('id').primaryKey(),
  category: varchar('category', 255).notNull(),
  subcategory: varchar('subcategory', 255).notNull(),
  name: varchar('name', 255).notNull(),
  description: varchar('description', 255),
  price: integer('price').notNull(),
  stock: integer('stock').notNull(),
});

// ProductSubcategory Table (many-to-many relationship)
// export const productSubcategory = pgTable('product_subcategory', {
//   productId: integer('product_id').notNull(),
//   subcategoryId: integer('subcategory_id').notNull(),
// });
