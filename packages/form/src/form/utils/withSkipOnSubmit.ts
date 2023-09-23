interface Options {
  fields?: Record<string, unknown>[]
  isNew?: boolean
  user?: Record<string, unknown> | any
}

type Values = Record<string, unknown>

/**
 * Omit fields that have skipOnSubmit === true
 * @param options
 */
const withSkipOnSubmit =
  (options: Options) =>
  (values: Values): Values => {
    const { fields } = options

    // Omit fields that have skipOnSubmit === true
    return Object.entries(values).reduce((acc, [key, value]) => {
      const field = fields.find((field) => field.name === key)
      if (field && field.skipOnSubmit) return acc
      return { ...acc, [key]: value }
    }, {})
  }

export default withSkipOnSubmit
