"use client"

import { useState } from "react"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { CheckCircle, XCircle, AlertCircle, Loader2, Upload } from "lucide-react"
import { initializeProfilePicturesBucket, uploadProfilePicture } from "@/lib/supabase-storage"
import { toast } from "sonner"

export default function StorageTest() {
  const [bucketStatus, setBucketStatus] = useState<'checking' | 'ready' | 'error' | null>(null)
  const [uploadStatus, setUploadStatus] = useState<'idle' | 'uploading' | 'success' | 'error'>('idle')
  const [testImageUrl, setTestImageUrl] = useState<string | null>(null)

  const testBucketCreation = async () => {
    setBucketStatus('checking')
    try {
      const success = await initializeProfilePicturesBucket()
      setBucketStatus(success ? 'ready' : 'error')
      
      if (success) {
        toast.success('Storage bucket is ready!')
      } else {
        toast.error('Failed to create storage bucket')
      }
    } catch (error) {
      setBucketStatus('error')
      toast.error('Error testing storage bucket')
      console.error(error)
    }
  }

  const testUpload = async () => {
    // Create a simple test image
    const canvas = document.createElement('canvas')
    canvas.width = 100
    canvas.height = 100
    const ctx = canvas.getContext('2d')
    
    if (ctx) {
      // Draw a simple test pattern
      ctx.fillStyle = '#3b82f6'
      ctx.fillRect(0, 0, 100, 100)
      ctx.fillStyle = 'white'
      ctx.font = '16px Arial'
      ctx.fillText('Test', 30, 55)
      
      // Convert to blob
      canvas.toBlob(async (blob) => {
        if (blob) {
          const file = new File([blob], 'test-image.png', { type: 'image/png' })
          
          setUploadStatus('uploading')
          try {
            const imageUrl = await uploadProfilePicture(file, 'test-user')
            
            if (imageUrl) {
              setTestImageUrl(imageUrl)
              setUploadStatus('success')
              toast.success('Test upload successful!')
            } else {
              setUploadStatus('error')
              toast.error('Test upload failed')
            }
          } catch (error) {
            setUploadStatus('error')
            toast.error('Error during test upload')
            console.error(error)
          }
        }
      }, 'image/png')
    }
  }

  return (
    <Card className="w-full max-w-md">
      <CardHeader>
        <CardTitle className="flex items-center gap-2">
          <Upload className="h-5 w-5" />
          Storage Test
        </CardTitle>
      </CardHeader>
      <CardContent className="space-y-4">
        {/* Bucket Status */}
        <div className="space-y-2">
          <div className="flex items-center justify-between">
            <span>Storage Bucket</span>
            <Badge variant={bucketStatus === 'ready' ? "default" : bucketStatus === 'error' ? "destructive" : "secondary"}>
              {bucketStatus === 'checking' && <Loader2 className="h-3 w-3 animate-spin mr-1" />}
              {bucketStatus === 'ready' && <CheckCircle className="h-3 w-3 mr-1" />}
              {bucketStatus === 'error' && <XCircle className="h-3 w-3 mr-1" />}
              {bucketStatus === 'checking' ? 'Checking...' : 
               bucketStatus === 'ready' ? 'Ready' : 
               bucketStatus === 'error' ? 'Error' : 'Not Tested'}
            </Badge>
          </div>
          
          <Button 
            onClick={testBucketCreation} 
            disabled={bucketStatus === 'checking'}
            className="w-full"
          >
            Test Bucket Creation
          </Button>
        </div>

        {/* Upload Test */}
        <div className="space-y-2">
          <div className="flex items-center justify-between">
            <span>Upload Test</span>
            <Badge variant={uploadStatus === 'success' ? "default" : uploadStatus === 'error' ? "destructive" : "secondary"}>
              {uploadStatus === 'uploading' && <Loader2 className="h-3 w-3 animate-spin mr-1" />}
              {uploadStatus === 'success' && <CheckCircle className="h-3 w-3 mr-1" />}
              {uploadStatus === 'error' && <XCircle className="h-3 w-3 mr-1" />}
              {uploadStatus === 'uploading' ? 'Uploading...' : 
               uploadStatus === 'success' ? 'Success' : 
               uploadStatus === 'error' ? 'Failed' : 'Not Tested'}
            </Badge>
          </div>
          
          <Button 
            onClick={testUpload} 
            disabled={uploadStatus === 'uploading' || bucketStatus !== 'ready'}
            className="w-full"
          >
            Test Upload
          </Button>
        </div>

        {/* Test Image Preview */}
        {testImageUrl && (
          <div className="space-y-2">
            <span className="text-sm font-medium">Test Image:</span>
            <img 
              src={testImageUrl} 
              alt="Test upload" 
              className="w-full h-20 object-cover rounded border"
            />
          </div>
        )}

        {/* Instructions */}
        <div className="bg-blue-50 border border-blue-200 rounded-lg p-3 dark:bg-blue-950 dark:border-blue-800">
          <div className="flex items-start gap-2">
            <AlertCircle className="h-4 w-4 text-blue-600 mt-0.5 flex-shrink-0 dark:text-blue-400" />
            <div className="text-sm">
              <p className="font-medium text-blue-800 dark:text-blue-200">Test Instructions</p>
              <p className="text-blue-700 dark:text-blue-300">
                1. Test bucket creation first<br/>
                2. Then test upload functionality<br/>
                3. Check that the test image displays correctly
              </p>
            </div>
          </div>
        </div>
      </CardContent>
    </Card>
  )
} 