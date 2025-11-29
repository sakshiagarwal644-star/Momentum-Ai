/*
  # Create Profiles Table

  1. New Tables
    - `profiles`
      - `id` (uuid, primary key) - References auth.users.id
      - `first_name` (text) - User's first name
      - `last_name` (text) - User's last name
      - `instagram_handle` (text) - Instagram username
      - `youtube_handle` (text) - YouTube username
      - `coaching_niche` (text) - User's coaching specialty
      - `services_offered` (jsonb) - Array of services offered
      - `content_preferences` (jsonb) - User content preferences
      - `follower_count` (integer) - Total follower count
      - `main_platform` (text) - Primary platform (Instagram/YouTube)
      - `created_at` (timestamptz) - Creation timestamp
      - `updated_at` (timestamptz) - Last update timestamp

  2. Security
    - Enable RLS on `profiles` table
    - Add policy for users to read their own profile
    - Add policy for users to update their own profile
    - Add policy for users to insert their own profile

  3. Important Notes
    - Profile ID matches auth.users.id for direct relationship
    - Cascade delete ensures profile is removed when user is deleted
    - Updated_at timestamp automatically updates on row changes
*/

CREATE TABLE IF NOT EXISTS profiles (
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

CREATE OR REPLACE FUNCTION update_updated_at_column()
RETURNS TRIGGER AS $$
BEGIN
  NEW.updated_at = now();
  RETURN NEW;
END;
$$ LANGUAGE plpgsql;

CREATE TRIGGER update_profiles_updated_at
  BEFORE UPDATE ON profiles
  FOR EACH ROW
  EXECUTE FUNCTION update_updated_at_column();
