-- DATA MIGRATION SCRIPT FOR MADUR.IN
-- Run this in Supabase SQL Editor to import existing Categories and Products

-- 1. Insert Categories and capture IDs
DO $$
DECLARE
    milk_id UUID;
    veg_id UUID;
    grocery_id UUID;
    spice_id UUID;
    oil_id UUID;
    pickle_id UUID;
    snack_id UUID;
    egg_id UUID;
    honey_id UUID;
BEGIN
    -- Insert Categories
    INSERT INTO categories (name, icon, image_url) VALUES ('Milk & Dairy', '🥛', '/categories/milk-dairy.png') RETURNING id INTO milk_id;
    INSERT INTO categories (name, icon, image_url) VALUES ('Vegetables', '🥦', '/categories/vegetables.png') RETURNING id INTO veg_id;
    INSERT INTO categories (name, icon, image_url) VALUES ('Groceries / Staples', '🛒', '/categories/groceries.png') RETURNING id INTO grocery_id;
    INSERT INTO categories (name, icon, image_url) VALUES ('Spices & Powders', '🌶️', '/categories/spices-powders.png') RETURNING id INTO spice_id;
    INSERT INTO categories (name, icon, image_url) VALUES ('Cold Pressed Oils', '🏺', '/categories/cold-pressed-oils.png') RETURNING id INTO oil_id;
    INSERT INTO categories (name, icon, image_url) VALUES ('Pickles', '🥒', '/categories/pickles.png') RETURNING id INTO pickle_id;
    INSERT INTO categories (name, icon, image_url) VALUES ('Traditional Snacks', '🥨', '/categories/snacks.png') RETURNING id INTO snack_id;
    INSERT INTO categories (name, icon, image_url) VALUES ('Eggs', '🥚', '/categories/eggs.png') RETURNING id INTO egg_id;
    INSERT INTO categories (name, icon, image_url) VALUES ('Honey & Natural Products', '🍯', '/categories/honey-natural.png') RETURNING id INTO honey_id;

    -- Insert Products for Milk & Dairy
    INSERT INTO products (category_id, name, unit, price, image_url, description) VALUES 
    (milk_id, 'Cow Milk', '1 L', 60, '/products/cow-milk-v2.png', 'Pure cow milk.'),
    (milk_id, 'Buffalo Milk', '1 L', 70, '/products/buffalo-milk-v2.png', 'Rich buffalo milk.'),
    (milk_id, 'A2 Milk', '1 L', 90, '/products/a2-milk-v2.png', 'Desi A2 milk.'),
    (milk_id, 'Curd', '500 g', 40, '/products/curd-v1.png', 'Fresh curd.'),
    (milk_id, 'Paneer', '200 g', 90, '/products/paneer-v1.png', 'Soft paneer.'),
    (milk_id, 'Ghee', '500 ml', 450, '/products/ghee-v1.png', 'Pure ghee.'),
    (milk_id, 'Butter', '200 g', 110, '/products/butter-v1.png', 'Fresh butter.'),
    (milk_id, 'Buttermilk', '1 L', 40, '/products/buttermilk-v1.png', 'Chilled buttermilk.');

    -- Insert Products for Vegetables
    INSERT INTO products (category_id, name, unit, price, image_url, description) VALUES 
    (veg_id, 'Tomato', '1 kg', 30, 'https://images.unsplash.com/photo-1582284540020-8acbe03f4924?auto=format&fit=crop&q=80&w=400', 'Ripe tomatoes.'),
    (veg_id, 'Onion', '1 kg', 35, 'https://images.unsplash.com/photo-1508747703725-719777637510?auto=format&fit=crop&q=80&w=400', 'Fresh onions.'),
    (veg_id, 'Potato', '1 kg', 30, '/products/potato-v1.png', 'Earthly potatoes.'),
    (veg_id, 'Green Chilli', '250 g', 20, '/products/green-chilli-v1.png', 'Spicy green chillies.'),
    (veg_id, 'Brinjal', '1 kg', 40, '/products/brinjal-v1.png', 'Purple brinjal.'),
    (veg_id, 'Carrot', '1 kg', 50, 'https://images.unsplash.com/photo-1598170845058-32b9d6a5da37?auto=format&fit=crop&q=80&w=400', 'Crunchy carrots.'),
    (veg_id, 'Cabbage', '1 kg', 30, '/products/cabbage-v1.png', 'Green cabbage.'),
    (veg_id, 'Cauliflower', '1 pc', 35, '/products/cauliflower-v1.png', 'Fresh cauliflower.'),
    (veg_id, 'Ladies Finger / Okra', '1 kg', 45, '/products/ladies-finger-v1.png', 'Tender ladies finger.'),
    (veg_id, 'Bottle Gourd', '1 pc', 35, '/products/bottle-gourd-v1.png', 'Fresh bottle gourd.'),
    (veg_id, 'Ridge Gourd', '1 kg', 45, '/products/ridge-gourd-v1.png', 'Fresh ridge gourd.'),
    (veg_id, 'Coriander Leaves', '1 bunch', 10, '/products/coriander-v1.png', 'Aromatic coriander.'),
    (veg_id, 'Curry Leaves', '1 bunch', 10, '/products/curry-leaves-v1.png', 'Fresh curry leaves.'),
    (veg_id, 'Spinach', '1 bunch', 10, '/products/spinach-v1.png', 'Green spinach.');

    -- Insert Products for Groceries
    INSERT INTO products (category_id, name, unit, price, image_url, description) VALUES 
    (grocery_id, 'Sona Masoori Rice', '1 kg', 70, '/products/sona-masoori-rice-v1.png', 'Fine sona masoori rice.'),
    (grocery_id, 'Basmati Rice', '1 kg', 120, '/products/basmati-rice-v1.png', 'Premium basmati rice.'),
    (grocery_id, 'Toor Dal', '1 kg', 160, '/products/toor-dal-v1.png', 'Protein-rich toor dal.'),
    (grocery_id, 'Moong Dal', '1 kg', 150, '/products/moong-dal-v1.png', 'Nutritious moong dal.'),
    (grocery_id, 'Urad Dal', '1 kg', 140, '/products/urad-dal-v1.png', 'High quality urad dal.'),
    (grocery_id, 'Chana Dal', '1 kg', 95, '/products/chana-dal-v1.png', 'Polished chana dal.'),
    (grocery_id, 'Groundnuts', '1 kg', 120, '/products/groundnuts-v1.png', 'Crunchy groundnuts.'),
    (grocery_id, 'Jaggery', '1 kg', 70, '/products/jaggery-v1.png', 'Natural jaggery.'),
    (grocery_id, 'Sugar', '1 kg', 45, '/products/sugar-v1.png', 'Refined sugar.'),
    (grocery_id, 'Rock Salt', '1 kg', 30, '/products/rock-salt-v1.png', 'Pure rock salt.'),
    (grocery_id, 'Tamarind', '1 kg', 180, '/products/tamarind-v1.png', 'Tangy tamarind.');

    -- Insert Products for Spices
    INSERT INTO products (category_id, name, unit, price, image_url, description) VALUES 
    (spice_id, 'Turmeric Powder', '500 g', 120, '/products/turmeric-powder-v1.png', 'Pure turmeric powder.'),
    (spice_id, 'Red Chilli Powder', '500 g', 180, '/products/red-chilli-powder-v1.png', 'Hot red chilli powder.'),
    (spice_id, 'Coriander Powder', '500 g', 110, '/products/coriander-powder-v1.png', 'Fine coriander powder.'),
    (spice_id, 'Garam Masala', '200 g', 140, '/products/garam-masala-v1.png', 'Aromatic garam masala.'),
    (spice_id, 'Cumin Seeds', '250 g', 120, '/products/cumin-seeds-v1.png', 'Fresh cumin seeds.'),
    (spice_id, 'Mustard Seeds', '250 g', 60, '/products/mustard-seeds-v1.png', 'High quality mustard seeds.'),
    (spice_id, 'Black Pepper', '100 g', 90, '/products/black-pepper-v1.png', 'Pungent black pepper.'),
    (spice_id, 'Fenugreek Seeds', '200 g', 40, '/products/fenugreek-seeds-v1.png', 'Bitter-sweet fenugreek seeds.');

    -- Insert Products for Oils
    INSERT INTO products (category_id, name, unit, price, image_url, description) VALUES 
    (oil_id, 'Groundnut Oil Wood Pressed', '1 L', 320, '/products/groundnut-oil-v1.png', 'Traditional wood pressed oil.'),
    (oil_id, 'Sesame Oil Wood Pressed', '1 L', 380, '/products/sesame-oil-v1.png', 'Healthy sesame oil.'),
    (oil_id, 'Coconut Oil Wood Pressed', '1 L', 420, '/products/coconut-oil-v1.png', 'Pure coconut oil.'),
    (oil_id, 'Sunflower Oil', '1 L', 160, '/products/sunflower-oil-v1.png', 'Refined sunflower oil.');

    -- Insert Products for Pickles
    INSERT INTO products (category_id, name, unit, price, image_url, description) VALUES 
    (pickle_id, 'Mango Pickle', '500 g', 180, '/products/mango-pickle-v1.png', 'Traditional mango pickle.'),
    (pickle_id, 'Gongura Pickle', '500 g', 200, '/products/gongura-pickle-v1.png', 'Classic gongura pickle.'),
    (pickle_id, 'Lemon Pickle', '500 g', 160, '/products/lemon-pickle-v1.png', 'Tangy lemon pickle.'),
    (pickle_id, 'Amla Pickle', '500 g', 170, '/products/amla-pickle-v1.png', 'Nutritious amla pickle.'),
    (pickle_id, 'Garlic Pickle', '500 g', 200, '/products/garlic-pickle-v1.png', 'Bold garlic pickle.'),
    (pickle_id, 'Chicken Pickle', '500 g', 420, '/products/chicken-pickle-v1.png', 'Spicy chicken pickle.'),
    (pickle_id, 'Prawn Pickle', '500 g', 520, '/products/prawn-pickle-v1.png', 'Savory prawn pickle.'),
    (pickle_id, 'Fish Pickle', '500 g', 450, '/products/fish-pickle-v1.png', 'Delicious fish pickle.');

    -- Insert Products for Snacks
    INSERT INTO products (category_id, name, unit, price, image_url, description) VALUES 
    (snack_id, 'Janthikalu', '500 g', 160, '/products/janthikalu-v1.png', 'Crunchy janthikalu.'),
    (snack_id, 'Chekkalu', '500 g', 170, '/products/chekkalu-v1.png', 'Authentic chekkalu.'),
    (snack_id, 'Murukulu', '500 g', 160, '/products/murukulu-v1.png', 'Classic murukulu.'),
    (snack_id, 'Boondi Mixture', '500 g', 150, '/products/boondi-mixture-v1.png', 'Savory boondi mixture.'),
    (snack_id, 'Karam Pusa', '500 g', 150, '/products/karam-pusa-v1.png', 'Spicy karam pusa.'),
    (snack_id, 'Putharekulu', '1 pack', 300, '/products/putharekulu-v1.png', 'Traditional sweet.'),
    (snack_id, 'Ariselu', '500 g', 220, '/products/ariselu-v1.png', 'Classic ariselu.'),
    (snack_id, 'Sunnundalu', '500 g', 240, '/products/sunnundalu-v1.png', 'Nutritious sunnundalu.');

    -- Insert Products for Eggs/Honey
    INSERT INTO products (category_id, name, unit, price, image_url, description) VALUES 
    (egg_id, 'Country Eggs Natu Kodi', '1 piece', 20, '/products/natu-kodi-eggs-v1.png', 'Fresh natu kodi eggs.'),
    (honey_id, 'Natural Honey', '500 g', 350, '/products/natural-honey-v1.png', 'Raw natural honey.'),
    (honey_id, 'Palm Jaggery', '500 g', 120, '/products/palm-jaggery-v1.png', 'Healthy palm jaggery.'),
    (honey_id, 'Dry Fruits Mix', '500 g', 450, '/products/dry-fruits-mix-v1.png', 'Energy-rich dry fruits mix.'),
    (honey_id, 'Almonds', '500 g', 450, '/products/almonds-v1.png', 'California almonds.'),
    (honey_id, 'Cashews', '500 g', 420, '/products/cashews-v1.png', 'Crunchy cashews.'),
    (honey_id, 'Black Raisins', '500 g', 220, '/products/black-raisins-v1.png', 'Premium black raisins.'),
    (honey_id, 'Golden Raisins', '500 g', 180, '/products/golden-raisins-v1.png', 'Sweet golden raisins.');

END $$;
