const { createClient } = require('@supabase/supabase-js');
const dotenv = require('dotenv');
dotenv.config();

const supabase = createClient(process.env.NEXT_PUBLIC_SUPABASE_URL, process.env.SUPABASE_SERVICE_ROLE_KEY);

async function checkOrders() {
  const { data, error } = await supabase.from('orders').select('*').limit(5);
  console.log('Orders data:', JSON.stringify(data, null, 2));
  if (error) console.error('Error:', error);
}

checkOrders();
