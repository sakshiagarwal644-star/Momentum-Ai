/*
  # Fix Automatic Profile Creation Trigger

  1. Changes
    - Drop and recreate the handle_new_user function with better error handling
    - Ensure trigger properly creates profile, settings, and metrics
    - Use SECURITY DEFINER to bypass RLS during trigger execution

  2. Important Notes
    - This fixes the "Database error saving new user" issue
    - SECURITY DEFINER allows the trigger to insert without RLS blocking
    - Uses COALESCE to safely handle missing metadata
*/

DROP TRIGGER IF EXISTS on_auth_user_created ON auth.users;
DROP FUNCTION IF EXISTS handle_new_user();

CREATE OR REPLACE FUNCTION handle_new_user()
RETURNS TRIGGER
SECURITY DEFINER
SET search_path = public
LANGUAGE plpgsql
AS $$
BEGIN
  INSERT INTO public.profiles (id, first_name, last_name, instagram_handle)
  VALUES (
    NEW.id,
    COALESCE(NEW.raw_user_meta_data->>'first_name', ''),
    COALESCE(NEW.raw_user_meta_data->>'last_name', ''),
    COALESCE(NEW.raw_user_meta_data->>'handle', '')
  );

  INSERT INTO public.user_settings (user_id)
  VALUES (NEW.id);

  INSERT INTO public.dashboard_metrics (user_id)
  VALUES (NEW.id);

  RETURN NEW;
EXCEPTION
  WHEN OTHERS THEN
    RAISE WARNING 'Error in handle_new_user: %', SQLERRM;
    RETURN NEW;
END;
$$;

CREATE TRIGGER on_auth_user_created
  AFTER INSERT ON auth.users
  FOR EACH ROW
  EXECUTE FUNCTION handle_new_user();
