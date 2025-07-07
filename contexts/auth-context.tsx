"use client"

import type React from "react"
import { createContext, useContext, useState, useEffect } from "react"
import { supabase, type Profile } from "@/lib/supabase"
import type { User as SupabaseUser } from "@supabase/supabase-js"

interface User {
  id: string
  email: string
  name: string
  phone?: string
  country?: string
  profilePicture?: string
  bio?: string
  ridingExperience?: 'beginner' | 'intermediate' | 'advanced'
  preferredBikeType?: string
  totalRidesLed: number
  totalRidesJoined: number
  rating: number
  ratingCount: number
  isVerified: boolean
  createdAt: string
}

interface AuthContextType {
  user: User | null
  profile: Profile | null
  login: (email: string, password: string) => Promise<boolean>
  signup: (userData: {
    email: string
    password: string
    name: string
    phone?: string
    country?: string
  }) => Promise<boolean>
  logout: () => Promise<void>
  updateProfile: (updates: Partial<Profile>) => Promise<boolean>
  isLoading: boolean
}

const AuthContext = createContext<AuthContextType | undefined>(undefined)

export function AuthProvider({ children }: { children: React.ReactNode }) {
  const [user, setUser] = useState<User | null>(null)
  const [profile, setProfile] = useState<Profile | null>(null)
  const [isLoading, setIsLoading] = useState(true)

  useEffect(() => {
    // Get initial session
    const getInitialSession = async () => {
      const { data: { session } } = await supabase.auth.getSession()
      if (session?.user) {
        await fetchUserProfile(session.user)
      }
      setIsLoading(false)
    }

    getInitialSession()

    // Listen for auth changes
    const { data: { subscription } } = supabase.auth.onAuthStateChange(
      async (event, session) => {
        if (session?.user) {
          await fetchUserProfile(session.user)
        } else {
          setUser(null)
          setProfile(null)
        }
        setIsLoading(false)
      }
    )

    return () => subscription.unsubscribe()
  }, [])

  const fetchUserProfile = async (supabaseUser: SupabaseUser) => {
    try {
      const { data: profileData, error } = await supabase
        .from('profiles')
        .select('*')
        .eq('id', supabaseUser.id)
        .single()

      if (error) {
        console.error('Error fetching profile:', error)
        return
      }

      if (profileData) {
        setProfile(profileData)
        // Convert to the format expected by the rest of the app
        setUser({
          id: profileData.id,
          email: profileData.email,
          name: profileData.name,
          phone: profileData.phone,
          country: profileData.country,
          profilePicture: profileData.profile_picture,
          bio: profileData.bio,
          ridingExperience: profileData.riding_experience,
          preferredBikeType: profileData.preferred_bike_type,
          totalRidesLed: profileData.total_rides_led,
          totalRidesJoined: profileData.total_rides_joined,
          rating: profileData.rating,
          ratingCount: profileData.rating_count,
          isVerified: profileData.is_verified,
          createdAt: profileData.created_at,
        })
      }
    } catch (error) {
      console.error('Error in fetchUserProfile:', error)
    }
  }

  const login = async (email: string, password: string): Promise<boolean> => {
    try {
      setIsLoading(true)
      const { data, error } = await supabase.auth.signInWithPassword({
        email,
        password,
      })

      if (error) {
        console.error('Login error:', error.message)
        return false
      }

      if (data.user) {
        await fetchUserProfile(data.user)
        return true
      }

      return false
    } catch (error) {
      console.error('Login error:', error)
      return false
    } finally {
      setIsLoading(false)
    }
  }

  const signup = async (userData: {
    email: string
    password: string
    name: string
    phone?: string
    country?: string
  }): Promise<boolean> => {
    try {
      setIsLoading(true)
      const { data, error } = await supabase.auth.signUp({
        email: userData.email,
        password: userData.password,
        options: {
          data: {
            name: userData.name,
            phone: userData.phone,
            country: userData.country,
          }
        }
      })

      if (error) {
        console.error('Signup error:', error.message)
        return false
      }

      if (data.user) {
        // The profile will be created automatically by the database trigger
        // with all the signup data including phone and country
        await fetchUserProfile(data.user)
        return true
      }

      return false
    } catch (error) {
      console.error('Signup error:', error)
      return false
    } finally {
      setIsLoading(false)
    }
  }

  const logout = async (): Promise<void> => {
    try {
      await supabase.auth.signOut()
      setUser(null)
      setProfile(null)
    } catch (error) {
      console.error('Logout error:', error)
    }
  }

  const updateProfile = async (updates: Partial<Profile>): Promise<boolean> => {
    if (!user) return false

    try {
      const { data, error } = await supabase
        .from('profiles')
        .update(updates)
        .eq('id', user.id)
        .select()
        .single()

      if (error) {
        console.error('Update profile error:', error)
        return false
      }

      if (data) {
        setProfile(data)
        // Update the user state as well
        setUser(prev => prev ? {
          ...prev,
          name: data.name,
          phone: data.phone,
          country: data.country,
          profilePicture: data.profile_picture,
          bio: data.bio,
          ridingExperience: data.riding_experience,
          preferredBikeType: data.preferred_bike_type,
        } : null)
        return true
      }

      return false
    } catch (error) {
      console.error('Update profile error:', error)
      return false
    }
  }

  return (
    <AuthContext.Provider 
      value={{ 
        user, 
        profile, 
        login, 
        signup, 
        logout, 
        updateProfile, 
        isLoading 
      }}
    >
      {children}
    </AuthContext.Provider>
  )
}

export function useAuth() {
  const context = useContext(AuthContext)
  if (context === undefined) {
    throw new Error("useAuth must be used within an AuthProvider")
  }
  return context
}
