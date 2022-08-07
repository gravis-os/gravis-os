import { getRedirectBaseUrl } from '../utils'

const redirectBaseUrl = getRedirectBaseUrl(process.env.VERCEL_URL)

const config = {
  title: 'Auth Server',
  apiRoutes: {
    createUser: '/api/auth-server/create-user',
  },
}

export default config
