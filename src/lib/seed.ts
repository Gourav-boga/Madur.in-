import mysql from './mysql';
import { categories, products } from './data';

/**
 * Migration Seeding Script
 * This script inserts the static data from data.ts into the MySQL database.
 */
async function seed() {
  console.log('--- Starting Database Seed ---');

  try {
    // 1. Seed Categories
    console.log('Seeding Categories...');
    const categoryMap = new Map<string, number>();

    for (const cat of categories) {
      const result = await mysql.insert('categories', {
        name: cat.name,
        icon: cat.icon
      });
      // Get the inserted ID (mysql-specific)
      const insertId = (result as any).insertId;
      categoryMap.set(cat.name, insertId);
      console.log(`  Added Category: ${cat.name} (ID: ${insertId})`);
    }

    // 2. Seed Products
    console.log('\nSeeding Products...');
    for (const prod of products) {
      const categoryId = categoryMap.get(prod.category);
      
      await mysql.insert('products', {
        name: prod.name,
        category_id: categoryId,
        price: prod.price,
        image_url: prod.image,
        description: prod.description,
        unit: prod.unit,
        is_available: true
      });
      console.log(`  Added Product: ${prod.name}`);
    }

    console.log('\n--- Seeding Completed Successfully! ---');
  } catch (error) {
    console.error('Migration Failed:', error);
    process.exit(1);
  } finally {
    process.exit(0);
  }
}

// Check if running directly
seed();
export { seed };
