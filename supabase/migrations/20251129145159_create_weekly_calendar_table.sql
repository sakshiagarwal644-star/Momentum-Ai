/*
  # Create Weekly Calendar Table

  1. New Tables
    - `weekly_calendar`
      - `id` (bigint, primary key) - Auto-incrementing ID
      - `user_id` (uuid) - References auth.users.id
      - `date` (date) - Calendar date
      - `content_type` (text) - Type: reel, carousel, script, post, reminder
      - `content_id` (uuid) - Optional reference to content_items.id
      - `created_at` (timestamptz) - Creation timestamp

  2. Security
    - Enable RLS on `weekly_calendar` table
    - Add policy for users to read their own calendar entries
    - Add policy for users to insert their own calendar entries
    - Add policy for users to update their own calendar entries
    - Add policy for users to delete their own calendar entries

  3. Important Notes
    - Stores scheduled content for 7-day calendar view
    - Content_id links to content_items when available
    - Cascade delete removes calendar entries when user is deleted
    - Foreign key to content_items with SET NULL on delete
*/

CREATE TABLE IF NOT EXISTS weekly_calendar (
  id bigserial PRIMARY KEY,
  user_id uuid NOT NULL REFERENCES auth.users(id) ON DELETE CASCADE,
  date date NOT NULL,
  content_type text NOT NULL,
  content_id uuid REFERENCES content_items(id) ON DELETE SET NULL,
  created_at timestamptz DEFAULT now()
);

CREATE INDEX IF NOT EXISTS weekly_calendar_user_id_idx ON weekly_calendar(user_id);
CREATE INDEX IF NOT EXISTS weekly_calendar_date_idx ON weekly_calendar(date);

ALTER TABLE weekly_calendar ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Users can read own calendar"
  ON weekly_calendar
  FOR SELECT
  TO authenticated
  USING (auth.uid() = user_id);

CREATE POLICY "Users can insert own calendar"
  ON weekly_calendar
  FOR INSERT
  TO authenticated
  WITH CHECK (auth.uid() = user_id);

CREATE POLICY "Users can update own calendar"
  ON weekly_calendar
  FOR UPDATE
  TO authenticated
  USING (auth.uid() = user_id)
  WITH CHECK (auth.uid() = user_id);

CREATE POLICY "Users can delete own calendar"
  ON weekly_calendar
  FOR DELETE
  TO authenticated
  USING (auth.uid() = user_id);
