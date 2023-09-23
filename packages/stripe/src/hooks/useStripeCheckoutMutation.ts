import { useMutation } from 'react-query'

import axios from 'axios'

import stripeConfig from '../config/stripeConfig'
import { StripePrice } from '../types'

const stripeCheckoutMutationFn = (stripePrice: StripePrice) => {
  return axios.post(stripeConfig.apiRoutes.createCheckoutSession, stripePrice)
}

const useStripeCheckoutMutation = () => {
  return useMutation(stripeCheckoutMutationFn)
}

export default useStripeCheckoutMutation
