import axios from 'axios'
import { useMutation } from 'react-query'
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
      axios.post('/api/auth-server/create-user', {
        email,
        password,
        email_confirm,
      }),

    handleDeleteUser: async ({ id }: { id: string }) =>
      axios.post('/api/auth-server/delete-user', { id }),

    handleSendInvite: async ({ email }: { email: string }) => {
      return axios.post('/api/auth-server/invite-user-by-email', {
        email,
      })
    },

    /**
     * Resend invite workaround
     * We are unable to resend invites via Supabase
     * @link https://github.com/supabase/supabase/discussions/3526
     */
    handleResendInvite: async ({ email }: { email: string }) => {
      return axios.post('/api/auth-server/generate-link', {
        type: 'recovery',
        email,
        options: {
          redirectTo: 'http://localhost:3000/auth/reset',
        },
      })
    },
  }

  return AuthServerMethods

  // return useMutation(mutationFn, {
  //   onSuccess: ({ data }) => {
  //     const { url, error } = data
  //
  //     // Redirect user out with the checkout url
  //     return window.location.assign(url)
  //   },
  //   onError: (error) => {
  //     if (error) return window.alert((error as Error).message)
  //   },
  // })
}

export default useAuthServerApi
