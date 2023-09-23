import { endpoints } from './constants'

export const postEnquiry = async (values) => {
  const response = await fetch(endpoints.postEnquiry, {
    body: JSON.stringify(values),
    headers: { 'Content-Type': 'application/json' },
    method: 'POST',
  })
  const data = await response.json()
  return data
}
