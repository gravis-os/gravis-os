import axios from 'axios'
import config from '../config/config'

const useAuthServerApi = () => {
  const AuthServerMethods = {
    handleCreateUser: async ({
      email,
      password,
      email_confirm = true, // Always confirm for now
    }: {
      email: string
      password: string
      email_confirm?: boolean
    }) =>
      axios.post(config.apiRoutes.createUser, {
        email,
        password,
        email_confirm,
      }),

    handleDeleteUser: async ({ id }: { id: string }) =>
      axios.post(config.apiRoutes.deleteUser, { id }),

    handleSendInvite: async ({
      email,
      options,
    }: {
      email: string
      options?: { redirectTo?: string }
    }) => {
      return axios.post(config.apiRoutes.inviteUserByEmail, {
        email,
        options,
      })
    },

    /**
     * Resend invite workaround
     * We are unable to resend invites via Supabase
     * @link https://github.com/supabase/supabase/discussions/3526
     */
    handleResendInvite: async ({ email }: { email: string }) => {
      return axios.post(config.apiRoutes.generateLink, {
        type: 'recovery',
        email,
        options: {
          redirectTo: 'http://localhost:3000/auth/reset',
        },
      })
    },
  }

  return AuthServerMethods
}

export default useAuthServerApi
