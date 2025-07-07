import { useState, useEffect } from 'react'
import { supabase, type Motorcycle } from '@/lib/supabase'
import { useAuth } from '@/contexts/auth-context'

export function useMotorcycles() {
  const { user } = useAuth()
  const [motorcycles, setMotorcycles] = useState<Motorcycle[]>([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)

  // Fetch user's motorcycles
  const fetchMotorcycles = async () => {
    if (!user) {
      setMotorcycles([])
      setLoading(false)
      return
    }

    try {
      setLoading(true)
      setError(null)
      
      const { data, error: fetchError } = await supabase
        .from('motorcycles')
        .select('*')
        .eq('user_id', user.id)
        .order('created_at', { ascending: false })

      if (fetchError) {
        throw fetchError
      }

      setMotorcycles(data || [])
    } catch (err) {
      console.error('Error fetching motorcycles:', err)
      setError(err instanceof Error ? err.message : 'Failed to fetch motorcycles')
    } finally {
      setLoading(false)
    }
  }

  // Add a new motorcycle
  const addMotorcycle = async (motorcycleData: Omit<Motorcycle, 'id' | 'user_id' | 'created_at' | 'updated_at'>) => {
    if (!user) {
      throw new Error('User not authenticated')
    }

    try {
      setError(null)
      
      const { data, error: insertError } = await supabase
        .from('motorcycles')
        .insert({
          ...motorcycleData,
          user_id: user.id,
        })
        .select()
        .single()

      if (insertError) {
        throw insertError
      }

      setMotorcycles((prev: Motorcycle[]) => [data, ...prev])
      return data
    } catch (err) {
      console.error('Error adding motorcycle:', err)
      setError(err instanceof Error ? err.message : 'Failed to add motorcycle')
      throw err
    }
  }

  // Update a motorcycle
  const updateMotorcycle = async (id: string, updates: Partial<Omit<Motorcycle, 'id' | 'user_id' | 'created_at' | 'updated_at'>>) => {
    try {
      setError(null)
      
      const { data, error: updateError } = await supabase
        .from('motorcycles')
        .update(updates)
        .eq('id', id)
        .eq('user_id', user?.id)
        .select()
        .single()

      if (updateError) {
        throw updateError
      }

      setMotorcycles((prev: Motorcycle[]) => prev.map((moto: Motorcycle) => moto.id === id ? data : moto))
      return data
    } catch (err) {
      console.error('Error updating motorcycle:', err)
      setError(err instanceof Error ? err.message : 'Failed to update motorcycle')
      throw err
    }
  }

  // Delete a motorcycle
  const deleteMotorcycle = async (id: string) => {
    try {
      setError(null)
      
      const { error: deleteError } = await supabase
        .from('motorcycles')
        .delete()
        .eq('id', id)
        .eq('user_id', user?.id)

      if (deleteError) {
        throw deleteError
      }

      setMotorcycles((prev: Motorcycle[]) => prev.filter((moto: Motorcycle) => moto.id !== id))
    } catch (err) {
      console.error('Error deleting motorcycle:', err)
      setError(err instanceof Error ? err.message : 'Failed to delete motorcycle')
      throw err
    }
  }

  // Fetch motorcycles when user changes
  useEffect(() => {
    fetchMotorcycles()
  }, [user])

  return {
    motorcycles,
    loading,
    error,
    addMotorcycle,
    updateMotorcycle,
    deleteMotorcycle,
    refetch: fetchMotorcycles,
  }
} 