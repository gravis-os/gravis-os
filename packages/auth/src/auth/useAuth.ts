import { supabaseClient } from '@supabase/supabase-auth-helpers/nextjs'
import type { ApiError } from '@supabase/gotrue-js'

export interface UseAuthOutput {
  logout: () => Promise<{ error: ApiError }>
}

const useAuth = (): UseAuthOutput => {
  return {
    logout: async () => supabaseClient.auth.signOut(),
  }
}

export default useAuth
