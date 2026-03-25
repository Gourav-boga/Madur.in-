-- SEED DATA FOR MADUR.IN (MySQL/MariaDB Compatible)
-- Run this in phpMyAdmin AFTER running mysql_setup.sql

-- Clear existing data (Optional, handle with care)
SET FOREIGN_KEY_CHECKS = 0;
DELETE FROM order_items;
DELETE FROM orders;
DELETE FROM products;
DELETE FROM categories;
SET FOREIGN_KEY_CHECKS = 1;

-- 1. Insert Categories
INSERT INTO categories (id, name, image_url) VALUES 
('milk-dairy', 'Milk & Dairy', '/categories/milk-dairy.png'),
('vegetables', 'Vegetables', '/categories/vegetables.png'),
('groceries', 'Groceries / Staples', '/categories/groceries.png'),
('spices', 'Spices & Powders', '/categories/spices-powders.png'),
('oils', 'Cold Pressed Oils', '/categories/cold-pressed-oils.png'),
('pickles', 'Pickles', '/categories/pickles.png'),
('snacks', 'Traditional Snacks', '/categories/snacks.png'),
('eggs', 'Eggs', '/categories/eggs.png'),
('honey-natural', 'Honey & Natural Products', '/categories/honey-natural.png'),
('dry-fruits', 'Dry Fruits', '/categories/dry-fruits.png');

-- 2. Insert Products
INSERT INTO products (name, category_id, price, unit, image_url, description, is_available) VALUES 
-- Milk & Dairy
('Cow Milk', 'milk-dairy', 60, '1 L', '/products/cow-milk-v2.png', 'Pure cow milk.', 1),
('Buffalo Milk', 'milk-dairy', 70, '1 L', '/products/buffalo-milk-v2.png', 'Rich buffalo milk.', 1),
('A2 Milk', 'milk-dairy', 90, '1 L', '/products/a2-milk-v2.png', 'Desi A2 milk.', 1),
('Curd', 'milk-dairy', 40, '500 g', '/products/curd-v1.png', 'Fresh curd.', 1),
('Paneer', 'milk-dairy', 90, '200 g', '/products/paneer-v1.png', 'Soft paneer.', 1),
('Ghee', 'milk-dairy', 450, '500 ml', '/products/ghee-v1.png', 'Pure ghee.', 1),

-- Vegetables
('Tomato', 'vegetables', 30, '1 kg', 'https://images.unsplash.com/photo-1582284540020-8acbe03f4924?auto=format&fit=crop&q=80&w=400', 'Ripe tomatoes.', 1),
('Onion', 'vegetables', 35, '1 kg', 'https://images.unsplash.com/photo-1508747703725-719777637510?auto=format&fit=crop&q=80&w=400', 'Fresh onions.', 1),
('Potato', 'vegetables', 30, '1 kg', '/products/potato-v1.png', 'Earthly potatoes.', 1),

-- Groceries
('Sona Masoori Rice', 'groceries', 70, '1 kg', '/products/sona-masoori-rice-v1.png', 'Fine sona masoori rice.', 1),
('Basmati Rice', 'groceries', 120, '1 kg', '/products/basmati-rice-v1.png', 'Premium basmati rice.', 1),
('Toor Dal', 'groceries', 160, '1 kg', '/products/toor-dal-v1.png', 'Protein-rich toor dal.', 1),

-- Dry Fruits
('Dry Fruits Mix', 'dry-fruits', 450, '500 g', '/products/dry-fruits-mix-v1.png', 'Energy-rich dry fruits mix.', 1),
('Almonds', 'dry-fruits', 450, '500 g', '/products/almonds-v1.png', 'California almonds.', 1),
('Cashews', 'dry-fruits', 420, '500 g', '/products/cashews-v1.png', 'Crunchy cashews.', 1);

-- 3. Insert a Test User (admin)
-- Use a simple MD5 or plaintext for now if your system allows, 
-- or leave it for the signup flow.
INSERT INTO users (email, password, full_name, role) VALUES 
('admin@madur.in', 'admin123', 'Admin User', 'admin');
