import axios from 'axios'
import { AdminUserAttributes } from '@supabase/supabase-js'
import config from '../config/config'

type CreateUserInput = Omit<AdminUserAttributes, 'email'> & { email: string }
type UpdateUserInput = { id: string } & AdminUserAttributes
type DeleteUserInput = { id: string }

const useAuthServerApi = () => {
  const AuthServerMethods = {
    handleCreateUser: async ({
      email,
      password,
      user_metadata,
      email_confirm = true, // Always confirm for now
    }: CreateUserInput) =>
      axios.post(config.apiRoutes.createUser, {
        email,
        password,
        email_confirm,
        user_metadata,
      }),

    handleUpdateUser: async (input: UpdateUserInput) =>
      axios.patch(config.apiRoutes.updateUser, input),

    handleDeleteUser: async ({ id }: DeleteUserInput) =>
      axios.delete(config.apiRoutes.deleteUser, { data: { id } }),

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
