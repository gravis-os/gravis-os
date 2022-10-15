// Ensure that a href link only contains 1 forward slash at the beginning with regex
const cleanHref = (href: string): string => href?.replace(/\/\/+/g, '/') || ''

export default cleanHref
