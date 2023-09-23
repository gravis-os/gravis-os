import React from 'react'

import { FormSectionFieldProps, FormSectionsProps } from '@gravis-os/form'

// Gets field definitions from section fields recursively in a dictionary
const getFieldDefsFromFields = (
  fields: FormSectionsProps['sections'][number]['fields']
): Record<string, FormSectionFieldProps> => {
  return fields.reduce((fieldDefs, field) => {
    if (React.isValidElement(field)) return fieldDefs
    if (Array.isArray(field))
      return { ...fieldDefs, ...getFieldDefsFromFields(field) }
    const { name } = field as FormSectionFieldProps
    return {
      ...fieldDefs,
      [name]: field,
    }
  }, {})
}

// Gets field definitions from sections in a dictionary
const getFieldDefsFromSections = (
  sections: FormSectionsProps['sections']
): Record<string, FormSectionFieldProps> => {
  return sections.reduce((fieldDefs, section) => {
    const { fields } = section
    return {
      ...fieldDefs,
      ...getFieldDefsFromFields(fields),
    }
  }, {})
}

export default getFieldDefsFromSections
