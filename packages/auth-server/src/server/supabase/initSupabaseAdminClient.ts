import { createClient } from '@supabase/supabase-js'

/**
 * initSupabaseAdminClient()
 * Factory Function
 * const SupabaseAdminClient = initSupabaseAdminClient(process.env.NEXT_PUBLIC_SUPABASE_URL, process.env.SUPABASE_SERVICE_ROLE_KEY)
 */
const initSupabaseAdminClient = (
  supabaseUrl = '',
  supabaseServiceRoleKey = ''
) => {
  // ==============================
  // Initializer
  // ==============================
  // Note: supabaseAdmin uses the SERVICE_ROLE_KEY which you must only use in a secure server-side context
  // as it has admin privileges and overwrites RLS policies!
  const supabaseAdmin = createClient(supabaseUrl, supabaseServiceRoleKey)

  // ==============================
  // Methods
  // ==============================
  const createUser = async (props) => {
    const result = await supabaseAdmin.auth.api.createUser(props)
    const { error } = result
    if (error) throw error
    return result
  }

  // ==============================
  // Return
  // ==============================
  return {
    createUser,
  }
}

export default initSupabaseAdminClient
