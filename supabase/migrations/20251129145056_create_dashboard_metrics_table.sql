/*
  # Create Dashboard Metrics Table

  1. New Tables
    - `dashboard_metrics`
      - `id` (bigint, primary key) - Auto-incrementing ID
      - `user_id` (uuid) - References auth.users.id
      - `ideas_generated_week` (integer) - Ideas generated this week
      - `scripts_created_week` (integer) - Scripts created this week
      - `raw_clips_pending` (integer) - Raw clips awaiting edit
      - `scheduled_posts` (integer) - Posts scheduled for next 7 days
      - `weekly_consistency_score` (integer) - Weekly consistency percentage
      - `updated_at` (timestamptz) - Last update timestamp

  2. Security
    - Enable RLS on `dashboard_metrics` table
    - Add policy for users to read their own metrics
    - Add policy for users to insert their own metrics
    - Add policy for users to update their own metrics

  3. Important Notes
    - One row per user for current metrics
    - Default values set to 0 for all counters
    - Cascade delete removes metrics when user is deleted
*/

CREATE TABLE IF NOT EXISTS dashboard_metrics (
  id bigserial PRIMARY KEY,
  user_id uuid NOT NULL REFERENCES auth.users(id) ON DELETE CASCADE,
  ideas_generated_week integer DEFAULT 0,
  scripts_created_week integer DEFAULT 0,
  raw_clips_pending integer DEFAULT 0,
  scheduled_posts integer DEFAULT 0,
  weekly_consistency_score integer DEFAULT 0,
  updated_at timestamptz DEFAULT now(),
  UNIQUE(user_id)
);

ALTER TABLE dashboard_metrics ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Users can read own metrics"
  ON dashboard_metrics
  FOR SELECT
  TO authenticated
  USING (auth.uid() = user_id);

CREATE POLICY "Users can insert own metrics"
  ON dashboard_metrics
  FOR INSERT
  TO authenticated
  WITH CHECK (auth.uid() = user_id);

CREATE POLICY "Users can update own metrics"
  ON dashboard_metrics
  FOR UPDATE
  TO authenticated
  USING (auth.uid() = user_id)
  WITH CHECK (auth.uid() = user_id);

CREATE TRIGGER update_dashboard_metrics_updated_at
  BEFORE UPDATE ON dashboard_metrics
  FOR EACH ROW
  EXECUTE FUNCTION update_updated_at_column();
