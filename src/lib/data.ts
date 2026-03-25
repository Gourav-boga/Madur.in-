export const categories = [
  { name: "Milk & Dairy", icon: "🥛", id: "milk-dairy", image_url: "/categories/milk-dairy.png" },
  { name: "Vegetables", icon: "🥦", id: "vegetables", image_url: "/categories/vegetables.png" },
  { name: "Groceries / Staples", icon: "🛒", id: "groceries", image_url: "/categories/groceries.png" },
  { name: "Spices & Powders", icon: "🌶️", id: "spices", image_url: "/categories/spices-powders.png" },
  { name: "Cold Pressed Oils", icon: "🏺", id: "oils", image_url: "/categories/cold-pressed-oils.png" },
  { name: "Pickles", icon: "🥒", id: "pickles", image_url: "/categories/pickles.png" },
  { name: "Traditional Snacks", icon: "🥨", id: "snacks", image_url: "/categories/snacks.png" },
  { name: "Eggs", icon: "🥚", id: "eggs", image_url: "/categories/eggs.png" },
  { name: "Honey & Natural Products", icon: "🍯", id: "honey-natural", image_url: "/categories/honey-natural.png" },
  { name: "Dry Fruits", icon: "🥜", id: "dry-fruits", image_url: "/categories/dry-fruits.png" },
];

export const products = [
  // Milk & Dairy
  { id: "1", category: "Milk & Dairy", name: "Cow Milk", unit: "1 L", price: 60, image_url: "/products/cow-milk-v2.png", is_available: true, description: "Pure cow milk." },
  { id: "2", category: "Milk & Dairy", name: "Buffalo Milk", unit: "1 L", price: 70, image_url: "/products/buffalo-milk-v2.png", is_available: true, description: "Rich buffalo milk." },
  { id: "3", category: "Milk & Dairy", name: "A2 Milk", unit: "1 L", price: 90, image_url: "/products/a2-milk-v2.png", is_available: true, description: "Desi A2 milk." },
  { id: "4", category: "Milk & Dairy", name: "Curd", unit: "500 g", price: 40, image_url: "/products/curd-v1.png", is_available: true, description: "Fresh curd." },
  { id: "5", category: "Milk & Dairy", name: "Paneer", unit: "200 g", price: 90, image_url: "/products/paneer-v1.png", is_available: true, description: "Soft paneer." },
  { id: "6", category: "Milk & Dairy", name: "Ghee", unit: "500 ml", price: 450, image_url: "/products/ghee-v1.png", is_available: true, description: "Pure ghee." },
  { id: "7", category: "Milk & Dairy", name: "Butter", unit: "200 g", price: 110, image_url: "/products/butter-v1.png", is_available: true, description: "Fresh butter." },
  { id: "8", category: "Milk & Dairy", name: "Buttermilk", unit: "1 L", price: 40, image_url: "/products/buttermilk-v1.png", is_available: true, description: "Chilled buttermilk." },

  // Vegetables
  { id: "9", category: "Vegetables", name: "Tomato", unit: "1 kg", price: 30, image_url: "https://images.unsplash.com/photo-1582284540020-8acbe03f4924?auto=format&fit=crop&q=80&w=400", is_available: true, description: "Ripe tomatoes." },
  { id: "10", category: "Vegetables", name: "Onion", unit: "1 kg", price: 35, image_url: "https://images.unsplash.com/photo-1508747703725-719777637510?auto=format&fit=crop&q=80&w=400", is_available: true, description: "Fresh onions." },
  { id: "11", category: "Vegetables", name: "Potato", unit: "1 kg", price: 30, image_url: "/products/potato-v1.png", is_available: true, description: "Earthly potatoes." },
  { id: "12", category: "Vegetables", name: "Green Chilli", unit: "250 g", price: 20, image_url: "/products/green-chilli-v1.png", is_available: true, description: "Spicy green chillies." },
  { id: "13", category: "Vegetables", name: "Brinjal", unit: "1 kg", price: 40, image_url: "/products/brinjal-v1.png", is_available: true, description: "Purple brinjal." },
  { id: "14", category: "Vegetables", name: "Carrot", unit: "1 kg", price: 50, image_url: "https://images.unsplash.com/photo-1598170845058-32b9d6a5da37?auto=format&fit=crop&q=80&w=400", is_available: true, description: "Crunchy carrots." },
  { id: "15", category: "Vegetables", name: "Cabbage", unit: "1 kg", price: 30, image_url: "/products/cabbage-v1.png", is_available: true, description: "Green cabbage." },
  { id: "16", category: "Vegetables", name: "Cauliflower", unit: "1 pc", price: 35, image_url: "/products/cauliflower-v1.png", is_available: true, description: "Fresh cauliflower." },
  { id: "17", category: "Vegetables", name: "Ladies Finger / Okra", unit: "1 kg", price: 45, image_url: "/products/ladies-finger-v1.png", is_available: true, description: "Tender ladies finger." },
  { id: "18", category: "Vegetables", name: "Bottle Gourd", unit: "1 pc", price: 35, image_url: "/products/bottle-gourd-v1.png", is_available: true, description: "Fresh bottle gourd." },
  { id: "19", category: "Vegetables", name: "Ridge Gourd", unit: "1 kg", price: 45, image_url: "/products/ridge-gourd-v1.png", is_available: true, description: "Fresh ridge gourd." },
  { id: "20", category: "Vegetables", name: "Coriander Leaves", unit: "1 bunch", price: 10, image_url: "/products/coriander-v1.png", is_available: true, description: "Aromatic coriander." },
  { id: "21", category: "Vegetables", name: "Curry Leaves", unit: "1 bunch", price: 10, image_url: "/products/curry-leaves-v1.png", is_available: true, description: "Fresh curry leaves." },
  { id: "22", category: "Vegetables", name: "Spinach", unit: "1 bunch", price: 10, image_url: "/products/spinach-v1.png", is_available: true, description: "Green spinach." },

  // Groceries / Staples
  { id: "23", category: "Groceries / Staples", name: "Sona Masoori Rice", unit: "1 kg", price: 70, image_url: "/products/sona-masoori-rice-v1.png", is_available: true, description: "Fine sona masoori rice." },
  { id: "24", category: "Groceries / Staples", name: "Basmati Rice", unit: "1 kg", price: 120, image_url: "/products/basmati-rice-v1.png", is_available: true, description: "Premium basmati rice." },
  { id: "25", category: "Groceries / Staples", name: "Toor Dal", unit: "1 kg", price: 160, image_url: "/products/toor-dal-v1.png", is_available: true, description: "Protein-rich toor dal." },
  { id: "26", category: "Groceries / Staples", name: "Moong Dal", unit: "1 kg", price: 150, image_url: "/products/moong-dal-v1.png", is_available: true, description: "Nutritious moong dal." },
  { id: "27", category: "Groceries / Staples", name: "Urad Dal", unit: "1 kg", price: 140, image_url: "/products/urad-dal-v1.png", is_available: true, description: "High quality urad dal." },
  { id: "28", category: "Groceries / Staples", name: "Chana Dal", unit: "1 kg", price: 95, image_url: "/products/chana-dal-v1.png", is_available: true, description: "Polished chana dal." },
  { id: "29", category: "Groceries / Staples", name: "Groundnuts", unit: "1 kg", price: 120, image_url: "/products/groundnuts-v1.png", is_available: true, description: "Crunchy groundnuts." },
  { id: "30", category: "Groceries / Staples", name: "Jaggery", unit: "1 kg", price: 70, image_url: "/products/jaggery-v1.png", is_available: true, description: "Natural jaggery." },
  { id: "31", category: "Groceries / Staples", name: "Sugar", unit: "1 kg", price: 45, image_url: "/products/sugar-v1.png", is_available: true, description: "Refined sugar." },
  { id: "32", category: "Groceries / Staples", name: "Rock Salt", unit: "1 kg", price: 30, image_url: "/products/rock-salt-v1.png", is_available: true, description: "Pure rock salt." },
  { id: "33", category: "Groceries / Staples", name: "Tamarind", unit: "1 kg", price: 180, image_url: "/products/tamarind-v1.png", is_available: true, description: "Tangy tamarind." },

  // Spices & Powders
  { id: "34", category: "Spices & Powders", name: "Turmeric Powder", unit: "500 g", price: 120, image_url: "/products/turmeric-powder-v1.png", is_available: true, description: "Pure turmeric powder." },
  { id: "35", category: "Spices & Powders", name: "Red Chilli Powder", unit: "500 g", price: 180, image_url: "/products/red-chilli-powder-v1.png", is_available: true, description: "Hot red chilli powder." },
  { id: "36", category: "Spices & Powders", name: "Coriander Powder", unit: "500 g", price: 110, image_url: "/products/coriander-powder-v1.png", is_available: true, description: "Fine coriander powder." },
  { id: "37", category: "Spices & Powders", name: "Garam Masala", unit: "200 g", price: 140, image_url: "/products/garam-masala-v1.png", is_available: true, description: "Aromatic garam masala." },
  { id: "38", category: "Spices & Powders", name: "Cumin Seeds", unit: "250 g", price: 120, image_url: "/products/cumin-seeds-v1.png", is_available: true, description: "Fresh cumin seeds." },
  { id: "39", category: "Spices & Powders", name: "Mustard Seeds", unit: "250 g", price: 60, image_url: "/products/mustard-seeds-v1.png", is_available: true, description: "High quality mustard seeds." },
  { id: "40", category: "Spices & Powders", name: "Black Pepper", unit: "100 g", price: 90, image_url: "/products/black-pepper-v1.png", is_available: true, description: "Pungent black pepper." },
  { id: "41", category: "Spices & Powders", name: "Fenugreek Seeds", unit: "200 g", price: 40, image_url: "/products/fenugreek-seeds-v1.png", is_available: true, description: "Bitter-sweet fenugreek seeds." },

  // Cold Pressed Oils
  { id: "42", category: "Cold Pressed Oils", name: "Groundnut Oil Wood Pressed", unit: "1 L", price: 320, image_url: "/products/groundnut-oil-v1.png", is_available: true, description: "Traditional wood pressed oil." },
  { id: "43", category: "Cold Pressed Oils", name: "Sesame Oil Wood Pressed", unit: "1 L", price: 380, image_url: "/products/sesame-oil-v1.png", is_available: true, description: "Healthy sesame oil." },
  { id: "44", category: "Cold Pressed Oils", name: "Coconut Oil Wood Pressed", unit: "1 L", price: 420, image_url: "/products/coconut-oil-v1.png", is_available: true, description: "Pure coconut oil." },
  { id: "45", category: "Cold Pressed Oils", name: "Sunflower Oil", unit: "1 L", price: 160, image_url: "/products/sunflower-oil-v1.png", is_available: true, description: "Refined sunflower oil." },

  // Pickles
  { id: "46", category: "Pickles", name: "Mango Pickle", unit: "500 g", price: 180, image_url: "/products/mango-pickle-v1.png", is_available: true, description: "Traditional mango pickle." },
  { id: "47", category: "Pickles", name: "Gongura Pickle", unit: "500 g", price: 200, image_url: "/products/gongura-pickle-v1.png", is_available: true, description: "Classic gongura pickle." },
  { id: "48", category: "Pickles", name: "Lemon Pickle", unit: "500 g", price: 160, image_url: "/products/lemon-pickle-v1.png", is_available: true, description: "Tangy lemon pickle." },
  { id: "49", category: "Pickles", name: "Amla Pickle", unit: "500 g", price: 170, image_url: "/products/amla-pickle-v1.png", is_available: true, description: "Nutritious amla pickle." },
  { id: "50", category: "Pickles", name: "Garlic Pickle", unit: "500 g", price: 200, image_url: "/products/garlic-pickle-v1.png", is_available: true, description: "Bold garlic pickle." },
  { id: "51", category: "Pickles", name: "Chicken Pickle", unit: "500 g", price: 420, image_url: "/products/chicken-pickle-v1.png", is_available: true, description: "Spicy chicken pickle." },
  { id: "52", category: "Pickles", name: "Prawn Pickle", unit: "500 g", price: 520, image_url: "/products/prawn-pickle-v1.png", is_available: true, description: "Savory prawn pickle." },
  { id: "53", category: "Pickles", name: "Fish Pickle", unit: "500 g", price: 450, image_url: "/products/fish-pickle-v1.png", is_available: true, description: "Delicious fish pickle." },

  // Traditional Snacks
  { id: "54", category: "Traditional Snacks", name: "Janthikalu", unit: "500 g", price: 160, image_url: "/products/janthikalu-v1.png", is_available: true, description: "Crunchy janthikalu." },
  { id: "55", category: "Traditional Snacks", name: "Chekkalu", unit: "500 g", price: 170, image_url: "/products/chekkalu-v1.png", is_available: true, description: "Authentic chekkalu." },
  { id: "56", category: "Traditional Snacks", name: "Murukulu", unit: "500 g", price: 160, image_url: "/products/murukulu-v1.png", is_available: true, description: "Classic murukulu." },
  { id: "57", category: "Traditional Snacks", name: "Boondi Mixture", unit: "500 g", price: 150, image_url: "/products/boondi-mixture-v1.png", is_available: true, description: "Savory boondi mixture." },
  { id: "58", category: "Traditional Snacks", name: "Karam Pusa", unit: "500 g", price: 150, image_url: "/products/karam-pusa-v1.png", is_available: true, description: "Spicy karam pusa." },
  { id: "59", category: "Traditional Snacks", name: "Putharekulu", unit: "1 pack", price: 300, image_url: "/products/putharekulu-v1.png", is_available: true, description: "Traditional sweet." },
  { id: "60", category: "Traditional Snacks", name: "Ariselu", unit: "500 g", price: 220, image_url: "/products/ariselu-v1.png", is_available: true, description: "Classic ariselu." },
  { id: "61", category: "Traditional Snacks", name: "Sunnundalu", unit: "500 g", price: 240, image_url: "/products/sunnundalu-v1.png", is_available: true, description: "Nutritious sunnundalu." },

  // Eggs
  { id: "62", category: "Eggs", name: "Country Eggs Natu Kodi", unit: "1 piece", price: 20, image_url: "/products/natu-kodi-eggs-v1.png", is_available: true, description: "Fresh natu kodi eggs." },

  // Honey & Natural Products
  { id: "63", category: "Honey & Natural Products", name: "Natural Honey", unit: "500 g", price: 350, image_url: "/products/natural-honey-v1.png", is_available: true, description: "Raw natural honey." },
  { id: "64", category: "Honey & Natural Products", name: "Palm Jaggery", unit: "500 g", price: 120, image_url: "/products/palm-jaggery-v1.png", is_available: true, description: "Healthy palm jaggery." },

  // Dry Fruits
  { id: "65", category: "Dry Fruits", name: "Dry Fruits Mix", unit: "500 g", price: 450, image_url: "/products/dry-fruits-mix-v1.png", is_available: true, description: "Energy-rich dry fruits mix." },
  { id: "66", category: "Dry Fruits", name: "Almonds", unit: "500 g", price: 450, image_url: "/products/almonds-v1.png", is_available: true, description: "California almonds." },
  { id: "67", category: "Dry Fruits", name: "Cashews", unit: "500 g", price: 420, image_url: "/products/cashews-v1.png", is_available: true, description: "Crunchy cashews." },
  { id: "68", category: "Dry Fruits", name: "Black Raisins", unit: "500 g", price: 220, image_url: "/products/black-raisins-v1.png", is_available: true, description: "Premium black raisins." },
  { id: "69", category: "Dry Fruits", name: "Golden Raisins", unit: "500 g", price: 180, image_url: "/products/golden-raisins-v1.png", is_available: true, description: "Sweet golden raisins." },
];
