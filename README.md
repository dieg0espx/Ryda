# Motorcycle community app

*Automatically synced with your [v0.dev](https://v0.dev) deployments*

[![Deployed on Vercel](https://img.shields.io/badge/Deployed%20on-Vercel-black?style=for-the-badge&logo=vercel)](https://vercel.com/diego-espinosas-projects-8627ac2f/v0-motorcycle-community-app)
[![Built with v0](https://img.shields.io/badge/Built%20with-v0.dev-black?style=for-the-badge)](https://v0.dev/chat/projects/fEeT2NSvbz6)

## Overview

This repository will stay in sync with your deployed chats on [v0.dev](https://v0.dev).
Any changes you make to your deployed app will be automatically pushed to this repository from [v0.dev](https://v0.dev).

## Features

- **Profile Management**: Edit profile information and manage motorcycles
- **Profile Picture Upload**: Drag & drop image upload with Supabase Storage
- **Motorcycle Database**: Add, view, and delete motorcycles with Supabase integration
- **Real-time Updates**: Profile changes sync with the database
- **Responsive Design**: Works on desktop and mobile devices
- **Authentication**: User authentication with profile management

## Supabase Integration

The profile page now includes full Supabase integration for:
- User profile management
- Profile picture storage and management
- Motorcycle database operations
- Real-time data synchronization

### Setup Instructions

1. **Create a Supabase Project**:
   - Go to [supabase.com](https://supabase.com) and create a new project
   - Get your Project URL and anon key from Settings > API

2. **Environment Variables**:
   Create a `.env.local` file in your project root:
   ```env
   NEXT_PUBLIC_SUPABASE_URL=your_project_url_here
   NEXT_PUBLIC_SUPABASE_ANON_KEY=your_anon_key_here
   ```

3. **Database Schema**:
   - Go to your Supabase dashboard > SQL Editor
   - Run the SQL commands from `database-schema.sql`

4. **Storage Setup**:
   - Create a storage bucket named `profile-pictures` in your Supabase dashboard
   - Set it as public with 5MB file size limit
   - Add storage policies for authenticated uploads and public access

5. **Test the Setup**:
   - Start your development server: `npm run dev`
   - Navigate to the profile page
   - Try uploading a profile picture
   - Try adding a motorcycle to test the functionality

For detailed setup instructions, see [SUPABASE_SETUP.md](./SUPABASE_SETUP.md).

## Profile Picture Features

The profile picture upload system includes:

- **Drag & Drop**: Users can drag images directly onto the avatar
- **Click to Upload**: Click the avatar to select a file
- **File Validation**: Only JPEG, PNG, and WebP files up to 5MB
- **Image Preview**: Shows preview before upload
- **Remove Functionality**: Users can remove their profile picture
- **Automatic Cleanup**: Old images are deleted when replaced
- **Loading States**: Visual feedback during upload/removal

## Deployment

Your project is live at:

**[https://vercel.com/diego-espinosas-projects-8627ac2f/v0-motorcycle-community-app](https://vercel.com/diego-espinosas-projects-8627ac2f/v0-motorcycle-community-app)**

## Build your app

Continue building your app on:

**[https://v0.dev/chat/projects/fEeT2NSvbz6](https://v0.dev/chat/projects/fEeT2NSvbz6)**

## How It Works

1. Create and modify your project using [v0.dev](https://v0.dev)
2. Deploy your chats from the v0 interface
3. Changes are automatically pushed to this repository
4. Vercel deploys the latest version from this repository

## Development

### Prerequisites
- Node.js 18+ 
- npm or yarn
- Supabase account (for database functionality)

### Getting Started
1. Clone this repository
2. Install dependencies: `npm install`
3. Set up environment variables (see Supabase Integration above)
4. Run the development server: `npm run dev`
5. Open [http://localhost:3000](http://localhost:3000) in your browser

### Available Scripts
- `npm run dev` - Start development server
- `npm run build` - Build for production
- `npm run start` - Start production server
- `npm run lint` - Run ESLint

### Testing Storage
To test the storage functionality, you can use the `StorageTest` component:
```tsx
import StorageTest from '@/components/storage-test'

// Add this to any page to test storage setup
<StorageTest />
```
