/* eslint-disable unicorn/consistent-function-scoping */

const withResolvedIdValue = () => (values) => {
  return Object.entries(values).reduce(
    (acc, [key, value]: [key: string, value: any]) => {
      const isIdField = key.endsWith('_id') && value.id
      return { ...acc, [key]: isIdField ? value.id : value }
    },
    {} as Record<string, unknown>
  )
}
export default withResolvedIdValue
