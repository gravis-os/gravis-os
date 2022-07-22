import axios from 'axios'
import { useMutation } from 'react-query'

const stripeCreatePortalLinkMutationFn = () => {
  return axios.post('/api/stripe-create-portal-link')
}

const useStripeCreatePortalLinkMutation = () => {
  return useMutation(stripeCreatePortalLinkMutationFn, {
    onSuccess: ({ data }) => {
      const { url, error } = data

      // Redirect user out with the checkout url
      return window.location.assign(url)
    },
    onError: (error) => {
      if (error) return window.alert((error as Error).message)
    },
  })
}

export default useStripeCreatePortalLinkMutation
