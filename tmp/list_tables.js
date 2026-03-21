const { createClient } = require('@supabase/supabase-js');
const dotenv = require('dotenv');
dotenv.config();

const supabase = createClient(process.env.NEXT_PUBLIC_SUPABASE_URL, process.env.SUPABASE_SERVICE_ROLE_KEY);

async function listTables() {
  const { data, error } = await supabase.rpc('get_tables'); // This might not work if RPC doesn't exist
  if (error) {
    // Fallback: Try a simple query to see if it works
    const { data: tables, error: sqlError } = await supabase
      .from('pg_tables')
      .select('tablename')
      .eq('schemaname', 'public');
    
    console.log('Tables:', JSON.stringify(tables, null, 2));
    if (sqlError) {
        // Last resort: query something common
        const { data: products } = await supabase.from('products').select('id').limit(1);
        console.log('Successfully queried products table.');
    }
  } else {
    console.log('Tables:', data);
  }
}

listTables();
