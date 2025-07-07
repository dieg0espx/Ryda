# Supabase Setup Guide

This guide will help you set up Supabase to work with the profile page functionality, including profile picture uploads.

## 1. Create a Supabase Project

1. Go to [supabase.com](https://supabase.com) and create a new account or sign in
2. Create a new project
3. Wait for the project to be set up (this may take a few minutes)

## 2. Get Your Project Credentials

1. Go to your project dashboard
2. Navigate to Settings > API
3. Copy your Project URL and anon/public key

## 3. Set Up Environment Variables

Create a `.env.local` file in your project root with the following variables:

```env
NEXT_PUBLIC_SUPABASE_URL=your_project_url_here
NEXT_PUBLIC_SUPABASE_ANON_KEY=your_anon_key_here
```

## 4. Set Up the Database Schema

1. Go to your Supabase dashboard
2. Navigate to SQL Editor
3. Run the SQL commands from `database-schema.sql` to create the motorcycles table

## 5. Set Up Storage for Profile Pictures

### Option A: Automatic Setup (Recommended)
The application will automatically create the storage bucket when you first upload a profile picture. No manual setup required.

### Option B: Manual Setup
If you prefer to set up storage manually:

1. Go to your Supabase dashboard
2. Navigate to Storage
3. Click "Create a new bucket"
4. Configure the bucket:
   - **Name**: `profile-pictures`
   - **Public bucket**: Yes
   - **File size limit**: 5MB
   - **Allowed MIME types**: `image/jpeg`, `image/png`, `image/webp`

## 6. Configure Authentication (Optional)

If you want to use Supabase Auth instead of the current auth system:

1. Go to Authentication > Settings in your Supabase dashboard
2. Configure your authentication providers (Email, Google, etc.)
3. Update the auth context to use Supabase Auth

## 7. Test the Setup

1. Start your development server: `npm run dev`
2. Navigate to the profile page
3. Try uploading a profile picture
4. Try adding a motorcycle to test the functionality

## Features Implemented

The profile page now includes:

- ✅ Real-time profile editing with Supabase
- ✅ Profile picture upload with drag & drop
- ✅ Image preview and validation
- ✅ Motorcycle management (add, view, delete)
- ✅ Form validation and error handling
- ✅ Loading states and user feedback
- ✅ Responsive design
- ✅ TypeScript support

## Troubleshooting

### Common Issues:

1. **"Cannot find module 'react'" error**: This is likely a TypeScript configuration issue. Make sure your `tsconfig.json` includes the proper React types.

2. **Environment variables not loading**: Make sure your `.env.local` file is in the project root and you've restarted your development server.

3. **Database connection errors**: Verify your Supabase URL and anon key are correct.

4. **RLS (Row Level Security) errors**: Make sure you've run the SQL schema and the RLS policies are in place.

5. **Storage upload errors**: 
   - Check that your Supabase project has storage enabled
   - Verify the bucket name is exactly `profile-pictures`
   - Ensure the bucket is public
   - Check file size and type restrictions

6. **Image not displaying**: 
   - Verify the bucket is public
   - Check that the image URL is correct
   - Ensure the file was uploaded successfully

### Database Schema Verification

You can verify the motorcycles table was created correctly by running this query in the Supabase SQL Editor:

```sql
SELECT * FROM motorcycles LIMIT 1;
```

If the table doesn't exist, run the schema from `database-schema.sql` again.

### Storage Verification

You can verify the storage bucket was created correctly by:

1. Going to Storage in your Supabase dashboard
2. Looking for a bucket named `profile-pictures`
3. Checking that it's marked as public

## Profile Picture Features

The profile picture upload includes:

- **Drag & Drop**: Users can drag images directly onto the avatar
- **Click to Upload**: Click the avatar to select a file
- **File Validation**: Only JPEG, PNG, and WebP files up to 5MB
- **Image Preview**: Shows preview before upload
- **Remove Functionality**: Users can remove their profile picture
- **Automatic Cleanup**: Old images are deleted when replaced
- **Loading States**: Visual feedback during upload/removal

## Next Steps

To enhance the profile page further, consider:

1. Adding image cropping functionality
2. Implementing motorcycle image uploads
3. Adding more profile fields (riding experience, preferences)
4. Creating motorcycle maintenance logs
5. Adding social features (sharing motorcycles, following other riders)
6. Implementing image compression for better performance 