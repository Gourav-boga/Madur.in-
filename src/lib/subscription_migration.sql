-- Update Subscriptions table with new fields
ALTER TABLE subscriptions 
ADD COLUMN IF NOT EXISTS location_link TEXT,
ADD COLUMN IF NOT EXISTS street TEXT,
ADD COLUMN IF NOT EXISTS payment_screenshot_url TEXT,
ADD COLUMN IF NOT EXISTS amount_paid NUMERIC;

-- Ensure RLS allows public insertion for registrations
ALTER TABLE subscriptions ENABLE ROW LEVEL SECURITY;
DROP POLICY IF EXISTS "Public Insert Access" ON subscriptions;
CREATE POLICY "Public Insert Access" ON subscriptions FOR INSERT WITH CHECK (true);

-- Ensure admin has all access (for dashboard)
DROP POLICY IF EXISTS "Admin All Access" ON subscriptions;
CREATE POLICY "Admin All Access" ON subscriptions FOR ALL USING (true) WITH CHECK (true);
CREATE TABLE IF NOT EXISTS settings (
  id UUID DEFAULT uuid_generate_v4() PRIMARY KEY,
  key TEXT NOT NULL UNIQUE,
  value TEXT NOT NULL,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT timezone('utc'::text, now()) NOT NULL
);

-- Initialize subscription fee (default ₹599)
INSERT INTO settings (key, value) 
VALUES ('subscription_fee', '599')
ON CONFLICT (key) DO NOTHING;

-- Storage policies for screenshots (if not already handled)
-- Note: Assuming 'madur' bucket exists based on products page logic.
