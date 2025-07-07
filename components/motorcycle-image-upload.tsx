"use client"

import { useState, useRef } from "react"
import { Button } from "@/components/ui/button"
import { Camera, Upload, Loader2 } from "lucide-react"
import { uploadMotorcycleImage } from "@/lib/supabase-storage"
import { toast } from "sonner"

interface MotorcycleImageUploadProps {
  motorcycleId: string
  currentImageUrl?: string
  onImageUpdate: (imageUrl: string) => void
}

export default function MotorcycleImageUpload({
  motorcycleId,
  currentImageUrl,
  onImageUpdate
}: MotorcycleImageUploadProps) {
  const [isUploading, setIsUploading] = useState(false)
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
      const imageUrl = await uploadMotorcycleImage(file, motorcycleId)
      
      if (imageUrl) {
        onImageUpdate(imageUrl)
        toast.success('Motorcycle image updated successfully!')
        setPreviewUrl(null)
      } else {
        toast.error('Failed to upload motorcycle image')
      }
    } catch (error) {
      console.error('Upload error:', error)
      toast.error('Error uploading motorcycle image')
    } finally {
      setIsUploading(false)
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
        <div className="aspect-video bg-gray-100 dark:bg-gray-800 rounded-lg flex items-center justify-center overflow-hidden">
          {displayImageUrl ? (
            <img
              src={displayImageUrl}
              alt="Motorcycle"
              className="w-full h-full object-cover"
            />
          ) : (
            <div className="flex flex-col items-center justify-center text-gray-400">
              <Camera className="h-8 w-8 mb-2" />
              <span className="text-sm">Add Image</span>
            </div>
          )}
        </div>

        {/* Upload overlay */}
        <div className="absolute inset-0 flex items-center justify-center bg-black/50 rounded-lg opacity-0 group-hover:opacity-100 transition-opacity duration-200">
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
          className="absolute top-2 right-2 h-8 w-8 rounded-full p-0 bg-background border-2 shadow-md hover:scale-110 transition-transform duration-200"
          onClick={(e) => {
            e.stopPropagation()
            triggerFileInput()
          }}
          disabled={isUploading}
        >
          <Upload className="h-4 w-4" />
        </Button>
      </div>

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
    </div>
  )
} 