// Ensure that a href link only contains 1 forward slash at the beginning with regex
const cleanHref = (href: string): string => {
  if (!href) return ''
  if (href.startsWith('http')) return href
  return href.replace(/\/\/+/g, '/') || ''
}

export default cleanHref
