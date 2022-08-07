import { getRedirectBaseUrl } from '../utils'

const redirectBaseUrl = getRedirectBaseUrl(process.env.VERCEL_URL)

const config = {
  title: 'Auth Server',
  apiRoutes: {
    createUser: '/api/auth-server/create-user',
    deleteUser: '/api/auth-server/delete-user',
    inviteUserByEmail: '/api/auth-server/invite-user-by-email',
    generateLink: '/api/auth-server/generate-link',
  },
}

export default config
