import { useQuery } from 'react-query'

import axios from 'axios'

const supabaseAnonKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY
const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL

export const fetchSupabaseSchema = async () => {
  const res = await axios.get(
    `${supabaseUrl}/rest/v1/?apikey=${supabaseAnonKey}`
  )
  return res?.data
}

const useSupabaseSchemaQuery = (queryOptions = {}) => {
  return useQuery(
    [`use-supabase-schema-query`],
    fetchSupabaseSchema,
    queryOptions
  )
}

export default useSupabaseSchemaQuery
