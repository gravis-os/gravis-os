import { useMutation } from 'react-query'

import axios from 'axios'

import stripeConfig from '../config/stripeConfig'

const stripeCreatePortalLinkMutationFn = () => {
  return axios.post(stripeConfig.apiRoutes.createPortalLink)
}

const useStripeCreatePortalLinkMutation = () => {
  return useMutation(stripeCreatePortalLinkMutationFn, {
    onError: (error) => {
      if (error) return window.alert((error as Error).message)
    },
    onSuccess: ({ data }) => {
      const { error, url } = data

      // Redirect user out with the checkout url
      return window.location.assign(url)
    },
  })
}

export default useStripeCreatePortalLinkMutation
