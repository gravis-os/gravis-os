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
  const createUser = async (props) => supabaseAdmin.auth.api.createUser(props)
  const updateUser = async ({ id, ...attributes }) =>
    supabaseAdmin.auth.api.updateUserById(id, attributes)
  const deleteUser = async ({ id }) => supabaseAdmin.auth.api.deleteUser(id)
  const inviteUserByEmail = async ({ email, options }) =>
    supabaseAdmin.auth.api.inviteUserByEmail(email, options)
  const generateLink = async ({ type, email, options }) =>
    supabaseAdmin.auth.api.generateLink(type, email, options)

  // ==============================
  // Return
  // ==============================
  return {
    createUser,
    updateUser,
    deleteUser,
    inviteUserByEmail,
    generateLink,
  }
}

export default initSupabaseAdminClient
