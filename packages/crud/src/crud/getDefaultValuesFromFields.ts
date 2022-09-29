import { FormSectionFieldProps } from '@gravis-os/form'

// Get the defaultValue keys from a field for spread in a useForm.defaultValue
const getDefaultValuesFromFields = (
  fields: Record<string, FormSectionFieldProps>
): Record<string, unknown> => {
  if (!fields) return {}

  return Object.entries(fields).reduce((acc, [key, value]) => {
    // Look for the `defaultValue` key
    const hasDefaultValue = Object.keys(value).includes('defaultValue')

    // Skip if no defaultValue defined by user
    if (!hasDefaultValue) return acc

    /**
     * For now, we'll skip handling functions for defaultValue.
     * Note that in renderField, there is another defaultValue resolver
     * because certain fields e.g. `ModelField` is able to set formValue upstream
     * via useEffect (eewl). This is a temporary solution until we can refactor
     * to bring the contexts into this function to resolve the functions at
     * the form level instead of the field level.
     */
    const isFunctionDefaultValue = typeof value.defaultValue === 'function'
    if (isFunctionDefaultValue) return acc

    // Spread defaultValue
    return { ...acc, [key]: value.defaultValue }
  }, {})
}

export default getDefaultValuesFromFields
