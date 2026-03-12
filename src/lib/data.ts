export const categories = [
  { name: "Milk & Dairy", icon: "🥛", id: "milk-dairy", image: "/categories/milk-dairy.png" },
  { name: "Vegetables", icon: "🥦", id: "vegetables", image: "/categories/vegetables.png" },
  { name: "Groceries / Staples", icon: "🛒", id: "groceries", image: "/categories/groceries.png" },
  { name: "Spices & Powders", icon: "🌶️", id: "spices", image: "/categories/spices-powders.png" },
  { name: "Cold Pressed Oils", icon: "🏺", id: "oils", image: "/categories/cold-pressed-oils.png" },
  { name: "Pickles", icon: "🥒", id: "pickles", image: "/categories/pickles.png" },
  { name: "Traditional Snacks", icon: "🥨", id: "snacks", image: "/categories/snacks.png" },
  { name: "Eggs", icon: "🥚", id: "eggs" },
  { name: "Honey & Natural Products", icon: "🍯", id: "honey-natural" },
];

export const products = [
  // Milk & Dairy
  { id: "1", category: "Milk & Dairy", name: "Cow Milk", unit: "1 L", price: 60, image: "/products/cow-milk-v2.png", description: "Pure cow milk." },
  { id: "2", category: "Milk & Dairy", name: "Buffalo Milk", unit: "1 L", price: 70, image: "/products/buffalo-milk-v2.png", description: "Rich buffalo milk." },
  { id: "3", category: "Milk & Dairy", name: "A2 Milk", unit: "1 L", price: 90, image: "/products/a2-milk-v2.png", description: "Desi A2 milk." },
  { id: "4", category: "Milk & Dairy", name: "Curd", unit: "500 g", price: 40, image: "/products/curd-v1.png", description: "Fresh curd." },
  { id: "5", category: "Milk & Dairy", name: "Paneer", unit: "200 g", price: 90, image: "/products/paneer-v1.png", description: "Soft paneer." },
  { id: "6", category: "Milk & Dairy", name: "Ghee", unit: "500 ml", price: 450, image: "/products/ghee-v1.png", description: "Pure ghee." },
  { id: "7", category: "Milk & Dairy", name: "Butter", unit: "200 g", price: 110, image: "/products/butter-v1.png", description: "Fresh butter." },
  { id: "8", category: "Milk & Dairy", name: "Buttermilk", unit: "1 L", price: 40, image: "/products/buttermilk-v1.png", description: "Chilled buttermilk." },

  // Vegetables
  { id: "9", category: "Vegetables", name: "Tomato", unit: "1 kg", price: 30, image: "https://images.unsplash.com/photo-1582284540020-8acbe03f4924?auto=format&fit=crop&q=80&w=400", description: "Ripe tomatoes." },
  { id: "10", category: "Vegetables", name: "Onion", unit: "1 kg", price: 35, image: "https://images.unsplash.com/photo-1508747703725-719777637510?auto=format&fit=crop&q=80&w=400", description: "Fresh onions." },
  { id: "11", category: "Vegetables", name: "Potato", unit: "1 kg", price: 30, image: "/products/potato-v1.png", description: "Earthly potatoes." },
  { id: "12", category: "Vegetables", name: "Green Chilli", unit: "250 g", price: 20, image: "/products/green-chilli-v1.png", description: "Spicy green chillies." },
  { id: "13", category: "Vegetables", name: "Brinjal", unit: "1 kg", price: 40, image: "/products/brinjal-v1.png", description: "Purple brinjal." },
  { id: "14", category: "Vegetables", name: "Carrot", unit: "1 kg", price: 50, image: "https://images.unsplash.com/photo-1598170845058-32b9d6a5da37?auto=format&fit=crop&q=80&w=400", description: "Crunchy carrots." },
  { id: "15", category: "Vegetables", name: "Cabbage", unit: "1 kg", price: 30, image: "/products/cabbage-v1.png", description: "Green cabbage." },
  { id: "16", category: "Vegetables", name: "Cauliflower", unit: "1 pc", price: 35, image: "/products/cauliflower-v1.png", description: "Fresh cauliflower." },
  { id: "17", category: "Vegetables", name: "Ladies Finger / Okra", unit: "1 kg", price: 45, image: "/products/ladies-finger-v1.png", description: "Tender ladies finger." },
  { id: "18", category: "Vegetables", name: "Bottle Gourd", unit: "1 pc", price: 35, image: "/products/bottle-gourd-v1.png", description: "Fresh bottle gourd." },
  { id: "19", category: "Vegetables", name: "Ridge Gourd", unit: "1 kg", price: 45, image: "/products/ridge-gourd-v1.png", description: "Fresh ridge gourd." },
  { id: "20", category: "Vegetables", name: "Coriander Leaves", unit: "1 bunch", price: 10, image: "/products/coriander-v1.png", description: "Aromatic coriander." },
  { id: "21", category: "Vegetables", name: "Curry Leaves", unit: "1 bunch", price: 10, image: "/products/curry-leaves-v1.png", description: "Fresh curry leaves." },
  { id: "22", category: "Vegetables", name: "Spinach", unit: "1 bunch", price: 10, image: "/products/spinach-v1.png", description: "Green spinach." },

  // Groceries / Staples
  { id: "23", category: "Groceries / Staples", name: "Sona Masoori Rice", unit: "1 kg", price: 70, image: "/products/sona-masoori-rice-v1.png", description: "Fine sona masoori rice." },
  { id: "24", category: "Groceries / Staples", name: "Basmati Rice", unit: "1 kg", price: 120, image: "/products/basmati-rice-v1.png", description: "Premium basmati rice." },
  { id: "25", category: "Groceries / Staples", name: "Toor Dal", unit: "1 kg", price: 160, image: "/products/toor-dal-v1.png", description: "Protein-rich toor dal." },
  { id: "26", category: "Groceries / Staples", name: "Moong Dal", unit: "1 kg", price: 150, image: "/products/moong-dal-v1.png", description: "Nutritious moong dal." },
  { id: "27", category: "Groceries / Staples", name: "Urad Dal", unit: "1 kg", price: 140, image: "/products/urad-dal-v1.png", description: "High quality urad dal." },
  { id: "28", category: "Groceries / Staples", name: "Chana Dal", unit: "1 kg", price: 95, image: "/products/chana-dal-v1.png", description: "Polished chana dal." },
  { id: "29", category: "Groceries / Staples", name: "Groundnuts", unit: "1 kg", price: 120, image: "/products/groundnuts-v1.png", description: "Crunchy groundnuts." },
  { id: "30", category: "Groceries / Staples", name: "Jaggery", unit: "1 kg", price: 70, image: "/products/jaggery-v1.png", description: "Natural jaggery." },
  { id: "31", category: "Groceries / Staples", name: "Sugar", unit: "1 kg", price: 45, image: "/products/sugar-v1.png", description: "Refined sugar." },
  { id: "32", category: "Groceries / Staples", name: "Rock Salt", unit: "1 kg", price: 30, image: "/products/rock-salt-v1.png", description: "Pure rock salt." },
  { id: "33", category: "Groceries / Staples", name: "Tamarind", unit: "1 kg", price: 180, image: "/products/tamarind-v1.png", description: "Tangy tamarind." },

  // Spices & Powders
  { id: "34", category: "Spices & Powders", name: "Turmeric Powder", unit: "500 g", price: 120, image: "/products/turmeric-powder-v1.png", description: "Pure turmeric powder." },
  { id: "35", category: "Spices & Powders", name: "Red Chilli Powder", unit: "500 g", price: 180, image: "/products/red-chilli-powder-v1.png", description: "Hot red chilli powder." },
  { id: "36", category: "Spices & Powders", name: "Coriander Powder", unit: "500 g", price: 110, image: "/products/coriander-powder-v1.png", description: "Fine coriander powder." },
  { id: "37", category: "Spices & Powders", name: "Garam Masala", unit: "200 g", price: 140, image: "/products/garam-masala-v1.png", description: "Aromatic garam masala." },
  { id: "38", category: "Spices & Powders", name: "Cumin Seeds", unit: "250 g", price: 120, image: "/products/cumin-seeds-v1.png", description: "Fresh cumin seeds." },
  { id: "39", category: "Spices & Powders", name: "Mustard Seeds", unit: "250 g", price: 60, image: "/products/mustard-seeds-v1.png", description: "High quality mustard seeds." },
  { id: "40", category: "Spices & Powders", name: "Black Pepper", unit: "100 g", price: 90, image: "/products/black-pepper-v1.png", description: "Pungent black pepper." },
  { id: "41", category: "Spices & Powders", name: "Fenugreek Seeds", unit: "200 g", price: 40, image: "/products/fenugreek-seeds-v1.png", description: "Bitter-sweet fenugreek seeds." },

  // Cold Pressed Oils
  { id: "42", category: "Cold Pressed Oils", name: "Groundnut Oil Wood Pressed", unit: "1 L", price: 320, image: "/products/groundnut-oil-v1.png", description: "Traditional wood pressed oil." },
  { id: "43", category: "Cold Pressed Oils", name: "Sesame Oil Wood Pressed", unit: "1 L", price: 380, image: "/products/sesame-oil-v1.png", description: "Healthy sesame oil." },
  { id: "44", category: "Cold Pressed Oils", name: "Coconut Oil Wood Pressed", unit: "1 L", price: 420, image: "/products/coconut-oil-v1.png", description: "Pure coconut oil." },
  { id: "45", category: "Cold Pressed Oils", name: "Sunflower Oil", unit: "1 L", price: 160, image: "/products/sunflower-oil-v1.png", description: "Refined sunflower oil." },

  // Pickles
  { id: "46", category: "Pickles", name: "Mango Pickle", unit: "500 g", price: 180, image: "/products/mango-pickle-v1.png", description: "Traditional mango pickle." },
  { id: "47", category: "Pickles", name: "Gongura Pickle", unit: "500 g", price: 200, image: "/products/gongura-pickle-v1.png", description: "Classic gongura pickle." },
  { id: "48", category: "Pickles", name: "Lemon Pickle", unit: "500 g", price: 160, image: "/products/lemon-pickle-v1.png", description: "Tangy lemon pickle." },
  { id: "49", category: "Pickles", name: "Amla Pickle", unit: "500 g", price: 170, image: "/products/amla-pickle-v1.png", description: "Nutritious amla pickle." },
  { id: "50", category: "Pickles", name: "Garlic Pickle", unit: "500 g", price: 200, image: "/products/garlic-pickle-v1.png", description: "Bold garlic pickle." },
  { id: "51", category: "Pickles", name: "Chicken Pickle", unit: "500 g", price: 420, image: "/products/chicken-pickle-v1.png", description: "Spicy chicken pickle." },
  { id: "52", category: "Pickles", name: "Prawn Pickle", unit: "500 g", price: 520, image: "/products/prawn-pickle-v1.png", description: "Savory prawn pickle." },
  { id: "53", category: "Pickles", name: "Fish Pickle", unit: "500 g", price: 450, image: "/products/fish-pickle-v1.png", description: "Delicious fish pickle." },

  // Traditional Snacks
  { id: "54", category: "Traditional Snacks", name: "Janthikalu", unit: "500 g", price: 160, image: "/products/janthikalu-v1.png", description: "Crunchy janthikalu." },
  { id: "55", category: "Traditional Snacks", name: "Chekkalu", unit: "500 g", price: 170, image: "/products/chekkalu-v1.png", description: "Authentic chekkalu." },
  { id: "56", category: "Traditional Snacks", name: "Murukulu", unit: "500 g", price: 160, image: "/products/murukulu-v1.png", description: "Classic murukulu." },
  { id: "57", category: "Traditional Snacks", name: "Boondi Mixture", unit: "500 g", price: 150, image: "/products/boondi-mixture-v1.png", description: "Savory boondi mixture." },
  { id: "58", category: "Traditional Snacks", name: "Karam Pusa", unit: "500 g", price: 150, image: "/products/karam-pusa-v1.png", description: "Spicy karam pusa." },
  { id: "59", category: "Traditional Snacks", name: "Putharekulu", unit: "1 pack", price: 300, image: "/products/putharekulu-v1.png", description: "Traditional sweet." },
  { id: "60", category: "Traditional Snacks", name: "Ariselu", unit: "500 g", price: 220, image: "/products/ariselu-v1.png", description: "Classic ariselu." },
  { id: "61", category: "Traditional Snacks", name: "Sunnundalu", unit: "500 g", price: 240, image: "/products/sunnundalu-v1.png", description: "Nutritious sunnundalu." },

  // Eggs
  { id: "62", category: "Eggs", name: "Country Eggs Natu Kodi", unit: "1 piece", price: 20, image: "/products/natu-kodi-eggs-v1.png", description: "Fresh natu kodi eggs." },

  // Honey & Natural Products
  { id: "63", category: "Honey & Natural Products", name: "Natural Honey", unit: "500 g", price: 350, image: "/products/natural-honey-v1.png", description: "Raw natural honey." },
  { id: "64", category: "Honey & Natural Products", name: "Palm Jaggery", unit: "500 g", price: 120, image: "/products/palm-jaggery-v1.png", description: "Healthy palm jaggery." },
  { id: "65", category: "Honey & Natural Products", name: "Dry Fruits Mix", unit: "500 g", price: 450, image: "/products/dry-fruits-mix-v1.png", description: "Energy-rich dry fruits mix." },
  { id: "66", category: "Honey & Natural Products", name: "Almonds", unit: "500 g", price: 450, image: "/products/almonds-v1.png", description: "California almonds." },
  { id: "67", category: "Honey & Natural Products", name: "Cashews", unit: "500 g", price: 420, image: "/products/cashews-v1.png", description: "Crunchy cashews." },
  { id: "68", category: "Honey & Natural Products", name: "Black Raisins", unit: "500 g", price: 220, image: "/products/black-raisins-v1.png", description: "Premium black raisins." },
  { id: "69", category: "Honey & Natural Products", name: "Golden Raisins", unit: "500 g", price: 180, image: "/products/golden-raisins-v1.png", description: "Sweet golden raisins." },
];
