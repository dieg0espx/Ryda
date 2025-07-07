import { supabase } from './supabase'

export async function testSupabaseConnection() {
  try {
    // Test basic connection
    const { data, error } = await supabase
      .from('profiles')
      .select('count')
      .limit(1)
    
    if (error) {
      console.error('❌ Supabase connection failed:', error.message)
      return false
    }
    
    console.log('✅ Supabase connection successful')
    
    // Test motorcycles table
    const { data: motorcycles, error: motorcyclesError } = await supabase
      .from('motorcycles')
      .select('count')
      .limit(1)
    
    if (motorcyclesError) {
      console.error('❌ Motorcycles table not found. Please run the database schema.')
      return false
    }
    
    console.log('✅ Motorcycles table exists')
    return true
    
  } catch (error) {
    console.error('❌ Supabase test failed:', error)
    return false
  }
}

export async function testMotorcycleOperations() {
  try {
    // Test insert (will be rolled back)
    const testMotorcycle = {
      user_id: '00000000-0000-0000-0000-000000000000', // Test user ID
      brand: 'Test Brand',
      model: 'Test Model',
      year: 2024,
      mileage: 1000,
      condition: 'good' as const,
      description: 'Test motorcycle for connection testing'
    }
    
    const { data, error } = await supabase
      .from('motorcycles')
      .insert(testMotorcycle)
      .select()
    
    if (error) {
      console.error('❌ Motorcycle insert test failed:', error.message)
      return false
    }
    
    console.log('✅ Motorcycle operations test successful')
    
    // Clean up test data
    if (data && data[0]) {
      await supabase
        .from('motorcycles')
        .delete()
        .eq('id', data[0].id)
    }
    
    return true
    
  } catch (error) {
    console.error('❌ Motorcycle operations test failed:', error)
    return false
  }
}

// Run tests if this file is executed directly
if (typeof window === 'undefined') {
  // Only run in Node.js environment
  testSupabaseConnection().then((connectionOk) => {
    if (connectionOk) {
      testMotorcycleOperations()
    }
  })
} 