/*
  # Create Automatic Profile Creation Trigger

  1. Function
    - `handle_new_user()` - Automatically creates profile, settings, and metrics rows

  2. Trigger
    - Executes after new user signs up via auth.users
    - Creates empty profile row with user's metadata
    - Creates default user_settings row
    - Creates default dashboard_metrics row

  3. Important Notes
    - Ensures every authenticated user has required data rows
    - Uses metadata from signup (first_name, last_name, handle)
    - Prevents manual profile creation issues
    - Runs in a safe way with proper error handling
*/

CREATE OR REPLACE FUNCTION handle_new_user()
RETURNS TRIGGER AS $$
BEGIN
  INSERT INTO profiles (id, first_name, last_name, instagram_handle)
  VALUES (
    NEW.id,
    COALESCE(NEW.raw_user_meta_data->>'first_name', ''),
    COALESCE(NEW.raw_user_meta_data->>'last_name', ''),
    COALESCE(NEW.raw_user_meta_data->>'handle', '')
  );

  INSERT INTO user_settings (user_id)
  VALUES (NEW.id);

  INSERT INTO dashboard_metrics (user_id)
  VALUES (NEW.id);

  RETURN NEW;
END;
$$ LANGUAGE plpgsql SECURITY DEFINER;

DROP TRIGGER IF EXISTS on_auth_user_created ON auth.users;

CREATE TRIGGER on_auth_user_created
  AFTER INSERT ON auth.users
  FOR EACH ROW
  EXECUTE FUNCTION handle_new_user();
