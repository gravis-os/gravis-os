import { endpoints } from './constants'

export const postEnquiry = async (values) => {
  const response = await fetch(endpoints.postEnquiry, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(values),
  })
  const data = await response.json()
  return data
}
