import { withApiAuth } from '@supabase/supabase-auth-helpers/nextjs'
import { NextApiRequest, NextApiResponse } from 'next'
import { initSupabaseAdminClient } from '../../index'

const handleAuthServerCreateUser = async (
  req: NextApiRequest,
  res: NextApiResponse,
  config
) => {
  // Terminate degenerate case
  if (req.method !== 'POST') {
    res.setHeader('Allow', 'POST')
    res.status(405).end('Method Not Allowed')
  }

  // Init
  const SupabaseAdminClient = initSupabaseAdminClient(
    process.env.NEXT_PUBLIC_SUPABASE_URL,
    process.env.SUPABASE_SERVICE_ROLE_KEY
  )

  // Method
  try {
    const { data: user } = await SupabaseAdminClient.createUser(req.body)
    if (!user) throw Error('Could not create user')
    return res.status(200).json({ user })
  } catch (err: any) {
    console.error(err)
    res.status(500).json({ error: { statusCode: 500, message: err.message } })
  }
}

export default async (req, res, config) => {
  return withApiAuth(async (req, res) =>
    handleAuthServerCreateUser(req, res, config)
  )(req, res)
}
