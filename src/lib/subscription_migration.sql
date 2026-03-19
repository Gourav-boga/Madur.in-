-- FULL DATABASE SETUP FOR SUBSCRIPTIONS AND INVENTORY --
-- Run this in your Supabase SQL Editor

-- 1. Ensure uuid extension is enabled
CREATE EXTENSION IF NOT EXISTS "uuid-ossp";

-- 2. Create Subscriptions Table (with inventory support)
CREATE TABLE IF NOT EXISTS subscriptions (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    customer_name TEXT NOT NULL,
    customer_phone TEXT,
    location_link TEXT,
    payment_screenshot_url TEXT,
    plan_details TEXT,
    product_id UUID REFERENCES products(id),
    quantity NUMERIC DEFAULT 1,
    status TEXT DEFAULT 'active',
    created_at TIMESTAMP WITH TIME ZONE DEFAULT timezone('utc'::text, now()) NOT NULL
);

-- 3. Create Deliveries Table (to log daily milk)
CREATE TABLE IF NOT EXISTS deliveries (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    subscription_id UUID REFERENCES subscriptions(id) ON DELETE CASCADE,
    delivery_date DATE NOT NULL,
    quantity_delivered NUMERIC DEFAULT 1,
    status TEXT DEFAULT 'delivered',
    created_at TIMESTAMP WITH TIME ZONE DEFAULT timezone('utc'::text, now()) NOT NULL
);

-- 4. Fix existing table if it was missing columns
DO $$ 
BEGIN 
    BEGIN
        ALTER TABLE subscriptions ADD COLUMN product_id UUID REFERENCES products(id);
    EXCEPTION WHEN duplicate_column THEN
    END;
    
    BEGIN
        ALTER TABLE subscriptions ADD COLUMN quantity NUMERIC DEFAULT 1;
    EXCEPTION WHEN duplicate_column THEN
    END;
END $$;

-- 5. Grant permissions if needed
-- GRANT ALL ON TABLE subscriptions TO anon, authenticated, service_role;
-- GRANT ALL ON TABLE deliveries TO anon, authenticated, service_role;
