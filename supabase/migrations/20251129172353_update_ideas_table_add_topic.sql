/*
  # Update Ideas Table - Add Topic Field

  1. Changes
    - Rename keyword column to topic for clarity
    - Ensure all existing data is preserved

  2. Important Notes
    - This migration makes the schema match the new requirements
    - Topic field is used instead of keyword for better clarity
*/

DO $$
BEGIN
  IF EXISTS (
    SELECT 1 FROM information_schema.columns
    WHERE table_name = 'ideas' AND column_name = 'keyword'
  ) THEN
    ALTER TABLE ideas RENAME COLUMN keyword TO topic;
  END IF;
END $$;
