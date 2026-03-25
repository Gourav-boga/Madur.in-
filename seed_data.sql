-- Add all remaining products to the database
-- Run this in Hostinger phpMyAdmin AFTER the initial 4 products are already inserted

INSERT INTO products (name, category_id, price, unit, image_url, description, is_available) VALUES 

-- Milk & Dairy (remaining)
('Paneer', 'milk-dairy', 90, '200 g', '/products/paneer-v1.png', 'Soft paneer.', 1),
('Ghee', 'milk-dairy', 450, '500 ml', '/products/ghee-v1.png', 'Pure ghee.', 1),
('Butter', 'milk-dairy', 110, '200 g', '/products/butter-v1.png', 'Fresh butter.', 1),
('Buttermilk', 'milk-dairy', 40, '1 L', '/products/buttermilk-v1.png', 'Chilled buttermilk.', 1),

-- Vegetables
('Tomato', 'vegetables', 30, '1 kg', 'https://images.unsplash.com/photo-1582284540020-8acbe03f4924?auto=format&fit=crop&q=80&w=400', 'Ripe tomatoes.', 1),
('Onion', 'vegetables', 35, '1 kg', 'https://images.unsplash.com/photo-1508747703725-719777637510?auto=format&fit=crop&q=80&w=400', 'Fresh onions.', 1),
('Potato', 'vegetables', 30, '1 kg', '/products/potato-v1.png', 'Earthly potatoes.', 1),
('Green Chilli', 'vegetables', 20, '250 g', '/products/green-chilli-v1.png', 'Spicy green chillies.', 1),
('Brinjal', 'vegetables', 40, '1 kg', '/products/brinjal-v1.png', 'Purple brinjal.', 1),
('Carrot', 'vegetables', 50, '1 kg', 'https://images.unsplash.com/photo-1598170845058-32b9d6a5da37?auto=format&fit=crop&q=80&w=400', 'Crunchy carrots.', 1),
('Cabbage', 'vegetables', 30, '1 kg', '/products/cabbage-v1.png', 'Green cabbage.', 1),
('Cauliflower', 'vegetables', 35, '1 pc', '/products/cauliflower-v1.png', 'Fresh cauliflower.', 1),
('Ladies Finger / Okra', 'vegetables', 45, '1 kg', '/products/ladies-finger-v1.png', 'Tender ladies finger.', 1),
('Bottle Gourd', 'vegetables', 35, '1 pc', '/products/bottle-gourd-v1.png', 'Fresh bottle gourd.', 1),
('Ridge Gourd', 'vegetables', 45, '1 kg', '/products/ridge-gourd-v1.png', 'Fresh ridge gourd.', 1),
('Coriander Leaves', 'vegetables', 10, '1 bunch', '/products/coriander-v1.png', 'Aromatic coriander.', 1),
('Curry Leaves', 'vegetables', 10, '1 bunch', '/products/curry-leaves-v1.png', 'Fresh curry leaves.', 1),
('Spinach', 'vegetables', 10, '1 bunch', '/products/spinach-v1.png', 'Green spinach.', 1),

-- Groceries / Staples
('Sona Masoori Rice', 'groceries', 70, '1 kg', '/products/sona-masoori-rice-v1.png', 'Fine sona masoori rice.', 1),
('Basmati Rice', 'groceries', 120, '1 kg', '/products/basmati-rice-v1.png', 'Premium basmati rice.', 1),
('Toor Dal', 'groceries', 160, '1 kg', '/products/toor-dal-v1.png', 'Protein-rich toor dal.', 1),
('Moong Dal', 'groceries', 150, '1 kg', '/products/moong-dal-v1.png', 'Nutritious moong dal.', 1),
('Urad Dal', 'groceries', 140, '1 kg', '/products/urad-dal-v1.png', 'High quality urad dal.', 1),
('Chana Dal', 'groceries', 95, '1 kg', '/products/chana-dal-v1.png', 'Polished chana dal.', 1),
('Groundnuts', 'groceries', 120, '1 kg', '/products/groundnuts-v1.png', 'Crunchy groundnuts.', 1),
('Jaggery', 'groceries', 70, '1 kg', '/products/jaggery-v1.png', 'Natural jaggery.', 1),
('Sugar', 'groceries', 45, '1 kg', '/products/sugar-v1.png', 'Refined sugar.', 1),
('Rock Salt', 'groceries', 30, '1 kg', '/products/rock-salt-v1.png', 'Pure rock salt.', 1),
('Tamarind', 'groceries', 180, '1 kg', '/products/tamarind-v1.png', 'Tangy tamarind.', 1),

-- Spices & Powders
('Turmeric Powder', 'spices', 120, '500 g', '/products/turmeric-powder-v1.png', 'Pure turmeric powder.', 1),
('Red Chilli Powder', 'spices', 180, '500 g', '/products/red-chilli-powder-v1.png', 'Hot red chilli powder.', 1),
('Coriander Powder', 'spices', 110, '500 g', '/products/coriander-powder-v1.png', 'Fine coriander powder.', 1),
('Garam Masala', 'spices', 140, '200 g', '/products/garam-masala-v1.png', 'Aromatic garam masala.', 1),
('Cumin Seeds', 'spices', 120, '250 g', '/products/cumin-seeds-v1.png', 'Fresh cumin seeds.', 1),
('Mustard Seeds', 'spices', 60, '250 g', '/products/mustard-seeds-v1.png', 'High quality mustard seeds.', 1),
('Black Pepper', 'spices', 90, '100 g', '/products/black-pepper-v1.png', 'Pungent black pepper.', 1),
('Fenugreek Seeds', 'spices', 40, '200 g', '/products/fenugreek-seeds-v1.png', 'Bitter-sweet fenugreek seeds.', 1),

-- Cold Pressed Oils
('Groundnut Oil Wood Pressed', 'oils', 320, '1 L', '/products/groundnut-oil-v1.png', 'Traditional wood pressed oil.', 1),
('Sesame Oil Wood Pressed', 'oils', 380, '1 L', '/products/sesame-oil-v1.png', 'Healthy sesame oil.', 1),
('Coconut Oil Wood Pressed', 'oils', 420, '1 L', '/products/coconut-oil-v1.png', 'Pure coconut oil.', 1),
('Sunflower Oil', 'oils', 160, '1 L', '/products/sunflower-oil-v1.png', 'Refined sunflower oil.', 1),

-- Pickles
('Mango Pickle', 'pickles', 180, '500 g', '/products/mango-pickle-v1.png', 'Traditional mango pickle.', 1),
('Gongura Pickle', 'pickles', 200, '500 g', '/products/gongura-pickle-v1.png', 'Classic gongura pickle.', 1),
('Lemon Pickle', 'pickles', 160, '500 g', '/products/lemon-pickle-v1.png', 'Tangy lemon pickle.', 1),
('Amla Pickle', 'pickles', 170, '500 g', '/products/amla-pickle-v1.png', 'Nutritious amla pickle.', 1),
('Garlic Pickle', 'pickles', 200, '500 g', '/products/garlic-pickle-v1.png', 'Bold garlic pickle.', 1),
('Chicken Pickle', 'pickles', 420, '500 g', '/products/chicken-pickle-v1.png', 'Spicy chicken pickle.', 1),
('Prawn Pickle', 'pickles', 520, '500 g', '/products/prawn-pickle-v1.png', 'Savory prawn pickle.', 1),
('Fish Pickle', 'pickles', 450, '500 g', '/products/fish-pickle-v1.png', 'Delicious fish pickle.', 1),

-- Traditional Snacks
('Janthikalu', 'snacks', 160, '500 g', '/products/janthikalu-v1.png', 'Crunchy janthikalu.', 1),
('Chekkalu', 'snacks', 170, '500 g', '/products/chekkalu-v1.png', 'Authentic chekkalu.', 1),
('Murukulu', 'snacks', 160, '500 g', '/products/murukulu-v1.png', 'Classic murukulu.', 1),
('Boondi Mixture', 'snacks', 150, '500 g', '/products/boondi-mixture-v1.png', 'Savory boondi mixture.', 1),
('Karam Pusa', 'snacks', 150, '500 g', '/products/karam-pusa-v1.png', 'Spicy karam pusa.', 1),
('Putharekulu', 'snacks', 300, '1 pack', '/products/putharekulu-v1.png', 'Traditional sweet.', 1),
('Ariselu', 'snacks', 220, '500 g', '/products/ariselu-v1.png', 'Classic ariselu.', 1),
('Sunnundalu', 'snacks', 240, '500 g', '/products/sunnundalu-v1.png', 'Nutritious sunnundalu.', 1),

-- Eggs
('Country Eggs Natu Kodi', 'eggs', 20, '1 piece', '/products/natu-kodi-eggs-v1.png', 'Fresh natu kodi eggs.', 1),

-- Honey & Natural Products
('Natural Honey', 'honey-natural', 350, '500 g', '/products/natural-honey-v1.png', 'Raw natural honey.', 1),
('Palm Jaggery', 'honey-natural', 120, '500 g', '/products/palm-jaggery-v1.png', 'Healthy palm jaggery.', 1),

-- Dry Fruits
('Dry Fruits Mix', 'dry-fruits', 450, '500 g', '/products/dry-fruits-mix-v1.png', 'Energy-rich dry fruits mix.', 1),
('Almonds', 'dry-fruits', 450, '500 g', '/products/almonds-v1.png', 'California almonds.', 1),
('Cashews', 'dry-fruits', 420, '500 g', '/products/cashews-v1.png', 'Crunchy cashews.', 1),
('Black Raisins', 'dry-fruits', 220, '500 g', '/products/black-raisins-v1.png', 'Premium black raisins.', 1),
('Golden Raisins', 'dry-fruits', 180, '500 g', '/products/golden-raisins-v1.png', 'Sweet golden raisins.', 1);
