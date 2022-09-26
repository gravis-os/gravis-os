import axios from 'axios'
import { useMutation } from '@tanstack/react-query'
import { StripePrice } from '../types'
import stripeConfig from '../config/stripeConfig'

const stripeCheckoutMutationFn = (stripePrice: StripePrice) => {
  return axios.post(stripeConfig.apiRoutes.createCheckoutSession, stripePrice)
}

const useStripeCheckoutMutation = () => {
  return useMutation(stripeCheckoutMutationFn)
}

export default useStripeCheckoutMutation
