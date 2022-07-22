import axios from 'axios'
import { useMutation } from 'react-query'
import { StripePrice } from '../types'

const stripeCheckoutMutationFn = (stripePrice: StripePrice) => {
  return axios.post('/api/stripe-create-checkout-session', stripePrice)
}

const useStripeCheckoutMutation = () => {
  return useMutation(stripeCheckoutMutationFn)
}

export default useStripeCheckoutMutation
