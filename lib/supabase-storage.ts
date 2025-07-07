import { supabase } from './supabase'

const BUCKET_NAME = 'profile-pictures'

// Upload profile picture
export async function uploadProfilePicture(file: File, userId: string): Promise<string | null> {
  try {
    console.log('🚀 Starting profile picture upload...')
    console.log('📁 File details:', { name: file.name, size: file.size, type: file.type })
    console.log('👤 User ID:', userId)
    
    // Generate unique filename
    const fileExt = file.name.split('.').pop()
    const fileName = `${userId}-${Date.now()}.${fileExt}`
    console.log('📝 Generated filename:', fileName)
    
    // Upload file
    console.log('☁️ Starting file upload...')
    const { data, error } = await supabase.storage
      .from(BUCKET_NAME)
      .upload(fileName, file, {
        cacheControl: '3600',
        upsert: false
      })
    
    if (error) {
      console.error('❌ Upload error:', error)
      return null
    }
    
    console.log('✅ File uploaded successfully:', data)
    
    // Get public URL
    console.log('🔗 Getting public URL...')
    const { data: urlData } = supabase.storage
      .from(BUCKET_NAME)
      .getPublicUrl(fileName)
    
    console.log('✅ Public URL obtained:', urlData.publicUrl)
    return urlData.publicUrl
  } catch (error) {
    console.error('❌ Error in uploadProfilePicture:', error)
    return null
  }
}

// Delete profile picture
export async function deleteProfilePicture(imageUrl: string): Promise<boolean> {
  try {
    // Extract filename from URL
    const urlParts = imageUrl.split('/')
    const fileName = urlParts[urlParts.length - 1]
    
    const { error } = await supabase.storage
      .from(BUCKET_NAME)
      .remove([fileName])
    
    if (error) {
      console.error('Error deleting file:', error)
      return false
    }
    
    return true
  } catch (error) {
    console.error('Error in deleteProfilePicture:', error)
    return false
  }
}

// Get profile picture URL
export function getProfilePictureUrl(fileName: string): string {
  const { data } = supabase.storage
    .from(BUCKET_NAME)
    .getPublicUrl(fileName)
  
  return data.publicUrl
} 