/*
  # Create AI Suggestions Table

  1. New Tables
    - `ai_suggestions`
      - `id` (bigint, primary key) - Auto-incrementing ID
      - `user_id` (uuid) - References auth.users.id
      - `suggestion_text` (text) - The AI-generated suggestion content
      - `category` (text) - Optional category: trending, audio, niche_insight, engagement
      - `created_at` (timestamptz) - Creation timestamp

  2. Security
    - Enable RLS on `ai_suggestions` table
    - Add policy for users to read their own suggestions
    - Add policy for users to insert their own suggestions
    - Add policy for users to delete their own suggestions

  3. Important Notes
    - Stores AI-generated suggestions personalized for each user
    - Category helps filter suggestions by type
    - Cascade delete removes suggestions when user is deleted
*/

CREATE TABLE IF NOT EXISTS ai_suggestions (
  id bigserial PRIMARY KEY,
  user_id uuid NOT NULL REFERENCES auth.users(id) ON DELETE CASCADE,
  suggestion_text text NOT NULL,
  category text,
  created_at timestamptz DEFAULT now()
);

CREATE INDEX IF NOT EXISTS ai_suggestions_user_id_idx ON ai_suggestions(user_id);
CREATE INDEX IF NOT EXISTS ai_suggestions_category_idx ON ai_suggestions(category);

ALTER TABLE ai_suggestions ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Users can read own suggestions"
  ON ai_suggestions
  FOR SELECT
  TO authenticated
  USING (auth.uid() = user_id);

CREATE POLICY "Users can insert own suggestions"
  ON ai_suggestions
  FOR INSERT
  TO authenticated
  WITH CHECK (auth.uid() = user_id);

CREATE POLICY "Users can delete own suggestions"
  ON ai_suggestions
  FOR DELETE
  TO authenticated
  USING (auth.uid() = user_id);
