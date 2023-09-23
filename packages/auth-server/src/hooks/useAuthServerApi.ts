import { AdminUserAttributes } from '@supabase/supabase-js'
import axios from 'axios'

import config from '../config/config'

type CreateUserInput = Omit<AdminUserAttributes, 'email'> & { email: string }
type UpdateUserInput = { id: string } & AdminUserAttributes
type DeleteUserInput = { id: string }

const useAuthServerApi = () => {
  const AuthServerMethods = {
    handleCreateUser: async ({
      email,
      email_confirm = true, // Always confirm for now
      password,
      user_metadata,
    }: CreateUserInput) =>
      axios.post(config.apiRoutes.createUser, {
        email,
        email_confirm,
        password,
        user_metadata,
      }),

    handleDeleteUser: async ({ id }: DeleteUserInput) =>
      axios.delete(config.apiRoutes.deleteUser, { data: { id } }),

    /**
     * Resend invite workaround
     * We are unable to resend invites via Supabase
     * @link https://github.com/supabase/supabase/discussions/3526
     */
    handleResendInvite: async ({ email }: { email: string }) => {
      return axios.post(config.apiRoutes.generateLink, {
        email,
        options: {
          redirectTo: 'http://localhost:3000/auth/reset',
        },
        type: 'recovery',
      })
    },

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

    handleUpdateUser: async (input: UpdateUserInput) =>
      axios.patch(config.apiRoutes.updateUser, input),
  }

  return AuthServerMethods
}

export default useAuthServerApi
