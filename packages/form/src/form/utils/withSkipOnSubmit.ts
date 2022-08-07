interface Options {
  isNew?: boolean
  user?: Record<string, unknown> | any
  fields?: Record<string, unknown>[]
}

type Values = Record<string, unknown>

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
