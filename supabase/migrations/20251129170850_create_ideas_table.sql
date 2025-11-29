/*
  # Create Ideas Table

  1. New Tables
    - `ideas`
      - `id` (uuid, primary key) - Unique idea identifier
      - `user_id` (uuid) - References auth.users.id
      - `keyword` (text) - Topic/niche/keyword user entered
      - `idea_text` (text) - AI-generated content idea
      - `created_at` (timestamptz) - Creation timestamp

  2. Security
    - Enable RLS on `ideas` table
    - Add policy for users to insert their own ideas
    - Add policy for users to read their own ideas
    - Add policy for users to delete their own ideas

  3. Important Notes
    - Stores AI-generated content ideas for each user
    - Keyword helps categorize and filter ideas
    - Cascade delete removes ideas when user is deleted
*/

CREATE TABLE IF NOT EXISTS ideas (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id uuid NOT NULL REFERENCES auth.users(id) ON DELETE CASCADE,
  keyword text NOT NULL,
  idea_text text NOT NULL,
  created_at timestamptz DEFAULT now()
);

CREATE INDEX IF NOT EXISTS ideas_user_id_idx ON ideas(user_id);
CREATE INDEX IF NOT EXISTS ideas_created_at_idx ON ideas(created_at DESC);

ALTER TABLE ideas ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Users can insert own ideas"
  ON ideas
  FOR INSERT
  TO authenticated
  WITH CHECK (auth.uid() = user_id);

CREATE POLICY "Users can read own ideas"
  ON ideas
  FOR SELECT
  TO authenticated
  USING (auth.uid() = user_id);

CREATE POLICY "Users can delete own ideas"
  ON ideas
  FOR DELETE
  TO authenticated
  USING (auth.uid() = user_id);
