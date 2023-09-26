// Ensure that a href link only contains 1 forward slash at the beginning with regex
const cleanHref = (href: string): string => {
  if (typeof href !== 'string') return ''
  if (href.startsWith('http')) return href
  return href.replaceAll(/\/\/+/g, '/') || ''
}

export default cleanHref
