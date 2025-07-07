# Manual Storage Bucket Setup

Due to Row Level Security (RLS) policies, the storage bucket needs to be created manually in the Supabase dashboard.

## Step-by-Step Instructions

### 1. Access Your Supabase Dashboard
1. Go to [supabase.com](https://supabase.com)
2. Sign in to your account
3. Select your project

### 2. Navigate to Storage
1. In the left sidebar, click on **"Storage"**
2. You should see a list of existing buckets (if any)

### 3. Create the Bucket
1. Click **"Create a new bucket"** button
2. Fill in the bucket details:
   - **Name**: `profile-pictures` (exactly as shown)
   - **Public bucket**: ✅ **Yes** (check this box)
   - **File size limit**: `5242880` (5MB in bytes)
   - **Allowed MIME types**: `image/jpeg, image/png, image/webp`

### 4. Configure Storage Policies (Optional)
After creating the bucket, you may want to set up storage policies:

1. Click on the `profile-pictures` bucket
2. Go to the **"Policies"** tab
3. Add the following policies:

#### Policy 1: Allow authenticated users to upload
```sql
CREATE POLICY "Allow authenticated users to upload profile pictures" ON storage.objects
FOR INSERT WITH CHECK (
  bucket_id = 'profile-pictures' AND 
  auth.role() = 'authenticated'
);
```

#### Policy 2: Allow public access to view
```sql
CREATE POLICY "Allow public access to profile pictures" ON storage.objects
FOR SELECT USING (bucket_id = 'profile-pictures');
```

#### Policy 3: Allow users to delete their own files
```sql
CREATE POLICY "Allow users to delete their own profile pictures" ON storage.objects
FOR DELETE USING (
  bucket_id = 'profile-pictures' AND 
  auth.uid()::text = (storage.foldername(name))[1]
);
```

### 5. Test the Setup
1. Go back to your application
2. Navigate to the profile page
3. Try uploading a profile picture
4. The debug component should now show "Bucket exists: true"

## Troubleshooting

### If you still get RLS errors:
1. Make sure you're logged in to your application
2. Check that your Supabase environment variables are correct
3. Verify the bucket name is exactly `profile-pictures` (with hyphen)
4. Ensure the bucket is marked as public

### If uploads still fail:
1. Check the browser console for specific error messages
2. Verify your Supabase project has storage enabled
3. Make sure you have the correct permissions in your Supabase project

## Alternative: Use SQL Editor

If you prefer to create the bucket via SQL:

1. Go to **SQL Editor** in your Supabase dashboard
2. Run this command:
```sql
INSERT INTO storage.buckets (id, name, public, file_size_limit, allowed_mime_types)
VALUES ('profile-pictures', 'profile-pictures', true, 5242880, ARRAY['image/jpeg', 'image/png', 'image/webp']);
```

## Verification

After creating the bucket, you can verify it exists by:

1. Going to Storage in your dashboard
2. Looking for a bucket named `profile-pictures`
3. Checking that it's marked as public
4. Running the debug test in your application

The debug component should now show:
- ✅ "Bucket 'profile-pictures' exists: true"
- ✅ Successful upload process 