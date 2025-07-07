-- Create motorcycles table
CREATE TABLE IF NOT EXISTS motorcycles (
  id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
  user_id UUID NOT NULL REFERENCES auth.users(id) ON DELETE CASCADE,
  brand TEXT NOT NULL,
  model TEXT NOT NULL,
  year INTEGER NOT NULL,
  mileage INTEGER NOT NULL DEFAULT 0,
  condition TEXT NOT NULL CHECK (condition IN ('excellent', 'good', 'fair', 'poor')),
  description TEXT,
  image_url TEXT,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Create index for faster queries
CREATE INDEX IF NOT EXISTS idx_motorcycles_user_id ON motorcycles(user_id);

-- Enable Row Level Security
ALTER TABLE motorcycles ENABLE ROW LEVEL SECURITY;

-- Create RLS policies
CREATE POLICY "Users can view their own motorcycles" ON motorcycles
  FOR SELECT USING (auth.uid() = user_id);

CREATE POLICY "Users can insert their own motorcycles" ON motorcycles
  FOR INSERT WITH CHECK (auth.uid() = user_id);

CREATE POLICY "Users can update their own motorcycles" ON motorcycles
  FOR UPDATE USING (auth.uid() = user_id);

CREATE POLICY "Users can delete their own motorcycles" ON motorcycles
  FOR DELETE USING (auth.uid() = user_id);

-- Create function to update updated_at timestamp
CREATE OR REPLACE FUNCTION update_updated_at_column()
RETURNS TRIGGER AS $$
BEGIN
  NEW.updated_at = NOW();
  RETURN NEW;
END;
$$ language 'plpgsql';

-- Create trigger to automatically update updated_at
CREATE TRIGGER update_motorcycles_updated_at
  BEFORE UPDATE ON motorcycles
  FOR EACH ROW
  EXECUTE FUNCTION update_updated_at_column();

-- Storage bucket setup (run this in Supabase dashboard > Storage)
-- Note: This will be handled automatically by the application, but you can also create it manually

-- To create the bucket manually in Supabase dashboard:
-- 1. Go to Storage in your Supabase dashboard
-- 2. Click "Create a new bucket"
-- 3. Name: profile-pictures
-- 4. Public bucket: Yes
-- 5. File size limit: 5MB
-- 6. Allowed MIME types: image/jpeg, image/png, image/webp

-- Storage policies (these will be created automatically by the app, but you can also set them manually)
-- Policy for profile pictures bucket:
-- - Users can upload their own profile pictures
-- - Users can view all profile pictures (public bucket)
-- - Users can delete their own profile pictures 