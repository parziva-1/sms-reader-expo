import 'react-native-url-polyfill/auto'
import AsyncStorage from '@react-native-async-storage/async-storage'
import { createClient } from '@supabase/supabase-js'

/**
 * this is just an example, you should not store your keys in the app
 *
 * use an orchestrator to store sensitive information in the cloud
 * https://reactnative.dev/docs/security#storing-sensitive-info
 */
import { supabaseUrl, supabaseAnonKey } from './supabase-keys'

export const supabase = createClient(supabaseUrl, supabaseAnonKey, {
  auth: {
    storage: AsyncStorage,
    autoRefreshToken: true,
    persistSession: true,
    detectSessionInUrl: false
  }
})
