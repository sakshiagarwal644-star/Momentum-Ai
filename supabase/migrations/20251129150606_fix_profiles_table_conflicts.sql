/*
  # Fix Profiles Table Conflicts

  1. Changes
    - Drop existing profiles table that conflicts with old schema
    - Recreate profiles table with proper structure
    - Ensure no conflicts with previous migrations

  2. Important Notes
    - This migration resolves the "Database error saving new user" issue
    - The old profiles table structure was incompatible
    - New structure matches the trigger expectations
*/

DROP TABLE IF EXISTS profiles CASCADE;

CREATE TABLE profiles (
  id uuid PRIMARY KEY REFERENCES auth.users(id) ON DELETE CASCADE,
  first_name text,
  last_name text,
  instagram_handle text,
  youtube_handle text,
  coaching_niche text,
  services_offered jsonb DEFAULT '[]'::jsonb,
  content_preferences jsonb DEFAULT '{}'::jsonb,
  follower_count integer DEFAULT 0,
  main_platform text,
  created_at timestamptz DEFAULT now(),
  updated_at timestamptz DEFAULT now()
);

ALTER TABLE profiles ENABLE ROW LEVEL SECURITY;

DROP POLICY IF EXISTS "Users can read own profile" ON profiles;
DROP POLICY IF EXISTS "Users can insert own profile" ON profiles;
DROP POLICY IF EXISTS "Users can update own profile" ON profiles;

CREATE POLICY "Users can read own profile"
  ON profiles
  FOR SELECT
  TO authenticated
  USING (auth.uid() = id);

CREATE POLICY "Users can insert own profile"
  ON profiles
  FOR INSERT
  TO authenticated
  WITH CHECK (auth.uid() = id);

CREATE POLICY "Users can update own profile"
  ON profiles
  FOR UPDATE
  TO authenticated
  USING (auth.uid() = id)
  WITH CHECK (auth.uid() = id);

DROP TRIGGER IF EXISTS update_profiles_updated_at ON profiles;

CREATE TRIGGER update_profiles_updated_at
  BEFORE UPDATE ON profiles
  FOR EACH ROW
  EXECUTE FUNCTION update_updated_at_column();
