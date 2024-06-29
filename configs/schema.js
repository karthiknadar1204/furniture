const { pgTable, serial, varchar, text, integer } = require("drizzle-orm/pg-core");

// Products Table
export const products = pgTable('products', {
  id: integer('id').notNull(),
  category: varchar('category', 255).notNull(),
  subcategory: varchar('subcategory', 255).notNull(),
  name: varchar('name', 255).notNull(),
  description: varchar('description', 255),
  price: integer('price').notNull(),
  stock: integer('stock').notNull(),
});

