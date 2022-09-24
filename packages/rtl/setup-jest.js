import { TextEncoder, TextDecoder } from 'util'

// Polyfill TextEncoder
global.TextEncoder = TextEncoder
global.TextDecoder = TextDecoder

// Set required ENV
process.env.NEXT_PUBLIC_SUPABASE_URL = 'MOCK'
process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY = 'MOCK'
