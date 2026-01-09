-- Supabase Database Setup Script
-- Run this in Supabase SQL Editor to set up your database tables and policies
-- Project: exgmhzrcswwzprslmkph

-- =============================================================================
-- STEP 1: Create profiles table (links to auth.users)
-- =============================================================================
CREATE TABLE IF NOT EXISTS profiles (
  id UUID PRIMARY KEY REFERENCES auth.users(id) ON DELETE CASCADE,
  username TEXT UNIQUE,
  full_name TEXT,
  avatar_url TEXT,
  bio TEXT,
  phone TEXT,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- =============================================================================
-- STEP 2: Enable Row Level Security (RLS)
-- =============================================================================
ALTER TABLE profiles ENABLE ROW LEVEL SECURITY;

-- =============================================================================
-- STEP 3: Create policies for profiles table
-- =============================================================================

-- Policy: Allow users to view their OWN profile only
CREATE POLICY "Users can view own profile" ON profiles
  FOR SELECT USING (auth.uid() = id);

-- Policy: Allow users to insert their OWN profile
CREATE POLICY "Users can insert own profile" ON profiles
  FOR INSERT WITH CHECK (auth.uid() = id);

-- Policy: Allow users to update their OWN profile
CREATE POLICY "Users can update own profile" ON profiles
  FOR UPDATE USING (auth.uid() = id);

-- Policy: Allow users to delete their OWN profile
CREATE POLICY "Users can delete own profile" ON profiles
  FOR DELETE USING (auth.uid() = id);

-- =============================================================================
-- STEP 4: Create a function to automatically create profile on signup
-- =============================================================================
CREATE OR REPLACE FUNCTION public.handle_new_user()
RETURNS TRIGGER AS $$
BEGIN
  INSERT INTO public.profiles (id, full_name, avatar_url)
  VALUES (
    NEW.id,
    COALESCE(NEW.raw_user_meta_data->>'full_name', NEW.email),
    NEW.raw_user_meta_data->>'avatar_url'
  );
  RETURN NEW;
END;
$$ LANGUAGE plpgsql SECURITY DEFINER;

-- =============================================================================
-- STEP 5: Create trigger to call function on new user signup
-- =============================================================================
DROP TRIGGER IF EXISTS on_auth_user_created ON auth.users;
CREATE TRIGGER on_auth_user_created
  AFTER INSERT ON auth.users
  FOR EACH ROW EXECUTE FUNCTION public.handle_new_user();

-- =============================================================================
-- VERIFICATION: Check that everything was created correctly
-- =============================================================================
SELECT 
  'profiles' as table_name,
  (SELECT COUNT(*) FROM information_schema.table_constraints 
   WHERE table_name = 'profiles' AND constraint_type = 'PRIMARY KEY') as has_primary_key,
  (SELECT COUNT(*) FROM pg_policies WHERE tablename = 'profiles') as policy_count;

-- List all policies created
SELECT policyname, tablename, cmd, qual 
FROM pg_policies 
WHERE tablename = 'profiles';

-- =============================================================================
-- TESTING: How to test after running this script
-- =============================================================================
-- 1. Go to your app: http://localhost:3000/auth/signup
-- 2. Create a new user account
-- 3. Check Supabase Dashboard → Table Editor → profiles
-- 4. You should see the new user's profile automatically created!

