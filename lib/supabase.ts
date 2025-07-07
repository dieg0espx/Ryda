import { createClient } from '@supabase/supabase-js'

const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL!
const supabaseAnonKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!

export const supabase = createClient(supabaseUrl, supabaseAnonKey)

// Types for our database
export interface Profile {
  id: string
  email: string
  name: string
  phone?: string
  country?: string
  profile_picture?: string
  bio?: string
  riding_experience?: 'beginner' | 'intermediate' | 'advanced'
  preferred_bike_type?: string
  total_rides_led: number
  total_rides_joined: number
  rating: number
  rating_count: number
  is_verified: boolean
  created_at: string
  updated_at: string
}

export interface Motorcycle {
  id: string
  user_id: string
  brand: string
  model: string
  year: number
  mileage: number
  condition: 'excellent' | 'good' | 'fair' | 'poor'
  description?: string
  image_url?: string
  created_at: string
  updated_at: string
}

export interface Database {
  public: {
    Tables: {
      profiles: {
        Row: Profile
        Insert: Omit<Profile, 'id' | 'created_at' | 'updated_at'>
        Update: Partial<Omit<Profile, 'id' | 'created_at' | 'updated_at'>>
      }
      motorcycles: {
        Row: Motorcycle
        Insert: Omit<Motorcycle, 'id' | 'created_at' | 'updated_at'>
        Update: Partial<Omit<Motorcycle, 'id' | 'created_at' | 'updated_at'>>
      }
    }
  }
} 