const { pgTable, varchar, integer } = require("drizzle-orm/pg-core");

export const products = pgTable('products', {
  id: varchar('id').primaryKey(),
  category: varchar('category', 255).notNull(),
  subcategory: varchar('subcategory', 255).notNull(),
  name: varchar('name', 255).notNull(),
  description: varchar('description', 255),
  price: integer('price').notNull(),
  stock: integer('stock').notNull(),
  product_id: integer('product_id').notNull(),
  imageUrl: varchar('imageUrl', 255)
});
