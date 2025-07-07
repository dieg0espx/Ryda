"use client"

import { useState, useRef } from "react"
import { Button } from "@/components/ui/button"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Camera, Upload, X, Loader2 } from "lucide-react"
import { uploadProfilePicture, deleteProfilePicture } from "@/lib/supabase-storage"
import { toast } from "sonner"

interface ProfilePictureUploadProps {
  currentImageUrl?: string
  userId: string
  userName: string
  onImageUpdate: (imageUrl: string) => void
  onImageRemove: () => void
}

export default function ProfilePictureUpload({
  currentImageUrl,
  userId,
  userName,
  onImageUpdate,
  onImageRemove
}: ProfilePictureUploadProps) {
  const [isUploading, setIsUploading] = useState(false)
  const [isRemoving, setIsRemoving] = useState(false)
  const [previewUrl, setPreviewUrl] = useState<string | null>(null)
  const fileInputRef = useRef<HTMLInputElement>(null)

  const handleFileSelect = (file: File) => {
    // Validate file type
    const validTypes = ['image/jpeg', 'image/png', 'image/webp']
    if (!validTypes.includes(file.type)) {
      toast.error('Please select a valid image file (JPEG, PNG, or WebP)')
      return
    }

    // Validate file size (5MB limit)
    if (file.size > 5 * 1024 * 1024) {
      toast.error('File size must be less than 5MB')
      return
    }

    // Create preview
    const reader = new FileReader()
    reader.onload = (e) => {
      setPreviewUrl(e.target?.result as string)
    }
    reader.readAsDataURL(file)

    // Upload file
    handleUpload(file)
  }

  const handleUpload = async (file: File) => {
    setIsUploading(true)
    try {
      const imageUrl = await uploadProfilePicture(file, userId)
      
      if (imageUrl) {
        onImageUpdate(imageUrl)
        toast.success('Profile picture updated successfully!')
        setPreviewUrl(null)
      } else {
        toast.error('Failed to upload profile picture')
      }
    } catch (error) {
      console.error('Upload error:', error)
      toast.error('Error uploading profile picture')
    } finally {
      setIsUploading(false)
    }
  }

  const handleRemove = async () => {
    if (!currentImageUrl) return

    setIsRemoving(true)
    try {
      const success = await deleteProfilePicture(currentImageUrl)
      
      if (success) {
        onImageRemove()
        toast.success('Profile picture removed successfully!')
      } else {
        toast.error('Failed to remove profile picture')
      }
    } catch (error) {
      console.error('Remove error:', error)
      toast.error('Error removing profile picture')
    } finally {
      setIsRemoving(false)
    }
  }

  const handleDragOver = (e: React.DragEvent) => {
    e.preventDefault()
    e.currentTarget.classList.add('ring-2', 'ring-primary', 'ring-opacity-50')
  }

  const handleDragLeave = (e: React.DragEvent) => {
    e.preventDefault()
    e.currentTarget.classList.remove('ring-2', 'ring-primary', 'ring-opacity-50')
  }

  const handleDrop = (e: React.DragEvent) => {
    e.preventDefault()
    e.currentTarget.classList.remove('ring-2', 'ring-primary', 'ring-opacity-50')
    
    const files = e.dataTransfer.files
    if (files.length > 0) {
      handleFileSelect(files[0])
    }
  }

  const triggerFileInput = () => {
    fileInputRef.current?.click()
  }

  const displayImageUrl = previewUrl || currentImageUrl

  return (
    <div className="relative group">
      <div
        className="relative cursor-pointer transition-all duration-200 hover:scale-105"
        onDragOver={handleDragOver}
        onDragLeave={handleDragLeave}
        onDrop={handleDrop}
        onClick={triggerFileInput}
      >
        <Avatar className="h-24 w-24 border-4 border-background shadow-lg">
          <AvatarImage 
            src={displayImageUrl || "/placeholder.svg"} 
            alt={`${userName}'s profile picture`}
          />
          <AvatarFallback className="text-lg font-semibold">
            {userName.slice(0, 2).toUpperCase()}
          </AvatarFallback>
        </Avatar>

        {/* Upload overlay */}
        <div className="absolute inset-0 flex items-center justify-center bg-black/50 rounded-full opacity-0 group-hover:opacity-100 transition-opacity duration-200">
          {isUploading ? (
            <Loader2 className="h-6 w-6 text-white animate-spin" />
          ) : (
            <Camera className="h-6 w-6 text-white" />
          )}
        </div>

        {/* Upload button */}
        <Button
          size="sm"
          variant="outline"
          className="absolute -bottom-2 -right-2 h-8 w-8 rounded-full p-0 bg-background border-2 shadow-md hover:scale-110 transition-transform duration-200"
          onClick={(e) => {
            e.stopPropagation()
            triggerFileInput()
          }}
          disabled={isUploading || isRemoving}
        >
          <Upload className="h-4 w-4" />
        </Button>
      </div>

      {/* Remove button */}
      {currentImageUrl && (
        <Button
          size="sm"
          variant="destructive"
          className="absolute -top-2 -right-2 h-6 w-6 rounded-full p-0 shadow-md hover:scale-110 transition-transform duration-200"
          onClick={(e) => {
            e.stopPropagation()
            handleRemove()
          }}
          disabled={isUploading || isRemoving}
        >
          {isRemoving ? (
            <Loader2 className="h-3 w-3 animate-spin" />
          ) : (
            <X className="h-3 w-3" />
          )}
        </Button>
      )}

      {/* Hidden file input */}
      <input
        ref={fileInputRef}
        type="file"
        accept="image/jpeg,image/png,image/webp"
        className="hidden"
        onChange={(e) => {
          const file = e.target.files?.[0]
          if (file) {
            handleFileSelect(file)
          }
        }}
      />

      {/* Upload instructions */}
      <div className="mt-2 text-center">
        <p className="text-xs text-muted-foreground">
          Click to upload or drag & drop
        </p>
        <p className="text-xs text-muted-foreground">
          JPEG, PNG, WebP up to 5MB
        </p>
      </div>
    </div>
  )
} 