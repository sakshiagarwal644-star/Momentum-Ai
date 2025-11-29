/*
  # Create Content Items Table

  1. New Tables
    - `content_items`
      - `id` (uuid, primary key) - Unique content identifier
      - `user_id` (uuid) - References auth.users.id
      - `title` (text) - Content title
      - `type` (text) - Content type: idea, script, final_edit, reel, carousel
      - `platform` (text) - Target platform: instagram, youtube, tiktok, both
      - `status` (text) - Content status: draft, in_progress, scheduled, done, published
      - `preview_url` (text) - Optional preview/thumbnail URL
      - `scheduled_date` (date) - Optional scheduled publish date
      - `created_at` (timestamptz) - Creation timestamp
      - `updated_at` (timestamptz) - Last update timestamp

  2. Security
    - Enable RLS on `content_items` table
    - Add policy for users to read their own content
    - Add policy for users to insert their own content
    - Add policy for users to update their own content
    - Add policy for users to delete their own content

  3. Important Notes
    - Supports multiple content types and platforms
    - Status field tracks content lifecycle
    - Cascade delete removes content when user is deleted
*/

CREATE TABLE IF NOT EXISTS content_items (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id uuid NOT NULL REFERENCES auth.users(id) ON DELETE CASCADE,
  title text NOT NULL,
  type text NOT NULL,
  platform text,
  status text DEFAULT 'draft',
  preview_url text,
  scheduled_date date,
  created_at timestamptz DEFAULT now(),
  updated_at timestamptz DEFAULT now()
);

CREATE INDEX IF NOT EXISTS content_items_user_id_idx ON content_items(user_id);
CREATE INDEX IF NOT EXISTS content_items_status_idx ON content_items(status);
CREATE INDEX IF NOT EXISTS content_items_type_idx ON content_items(type);

ALTER TABLE content_items ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Users can read own content"
  ON content_items
  FOR SELECT
  TO authenticated
  USING (auth.uid() = user_id);

CREATE POLICY "Users can insert own content"
  ON content_items
  FOR INSERT
  TO authenticated
  WITH CHECK (auth.uid() = user_id);

CREATE POLICY "Users can update own content"
  ON content_items
  FOR UPDATE
  TO authenticated
  USING (auth.uid() = user_id)
  WITH CHECK (auth.uid() = user_id);

CREATE POLICY "Users can delete own content"
  ON content_items
  FOR DELETE
  TO authenticated
  USING (auth.uid() = user_id);

CREATE TRIGGER update_content_items_updated_at
  BEFORE UPDATE ON content_items
  FOR EACH ROW
  EXECUTE FUNCTION update_updated_at_column();
