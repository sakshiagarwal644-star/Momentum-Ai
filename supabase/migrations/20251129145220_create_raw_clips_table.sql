/*
  # Create Raw Clips Table

  1. New Tables
    - `raw_clips`
      - `id` (uuid, primary key) - Unique clip identifier
      - `user_id` (uuid) - References auth.users.id
      - `file_url` (text) - URL to the uploaded file
      - `file_name` (text) - Original filename
      - `status` (text) - Status: processing, ready_to_edit, done
      - `created_at` (timestamptz) - Creation timestamp

  2. Security
    - Enable RLS on `raw_clips` table
    - Add policy for users to read their own clips
    - Add policy for users to insert their own clips
    - Add policy for users to update their own clips
    - Add policy for users to delete their own clips

  3. Important Notes
    - Stores uploaded video clips awaiting editing
    - File_url points to storage location
    - Status tracks processing workflow
    - Cascade delete removes clips when user is deleted
*/

CREATE TABLE IF NOT EXISTS raw_clips (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id uuid NOT NULL REFERENCES auth.users(id) ON DELETE CASCADE,
  file_url text NOT NULL,
  file_name text NOT NULL,
  status text DEFAULT 'processing',
  created_at timestamptz DEFAULT now()
);

CREATE INDEX IF NOT EXISTS raw_clips_user_id_idx ON raw_clips(user_id);
CREATE INDEX IF NOT EXISTS raw_clips_status_idx ON raw_clips(status);

ALTER TABLE raw_clips ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Users can read own clips"
  ON raw_clips
  FOR SELECT
  TO authenticated
  USING (auth.uid() = user_id);

CREATE POLICY "Users can insert own clips"
  ON raw_clips
  FOR INSERT
  TO authenticated
  WITH CHECK (auth.uid() = user_id);

CREATE POLICY "Users can update own clips"
  ON raw_clips
  FOR UPDATE
  TO authenticated
  USING (auth.uid() = user_id)
  WITH CHECK (auth.uid() = user_id);

CREATE POLICY "Users can delete own clips"
  ON raw_clips
  FOR DELETE
  TO authenticated
  USING (auth.uid() = user_id);
