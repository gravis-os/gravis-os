import React from 'react'

import {
  Form,
  FormProps,
  FormSectionFieldProps,
  FormSections,
  FormSectionsProps,
} from '@gravis-os/form'
import { CrudModule } from '@gravis-os/types'
import { Box, Divider, Stack, Typography } from '@gravis-os/ui'
import isEmpty from 'lodash/isEmpty'

import getValueWithoutOp from './getValueWithoutOp'
import useFilterForm, { UseFilterFormArgs } from './useFilterForm'

export interface FilterFormProps {
  children?: FormProps<any>['children']
  fieldDefs?: Record<string, FormSectionFieldProps>
  formSectionsProps?: FormSectionsProps
  item?: Record<string, unknown>
  module: CrudModule
  onSubmit?: UseFilterFormArgs['onSubmit']
  sections: FormSectionsProps['sections']
  useFilterFormProps?: Partial<UseFilterFormArgs>
}

const getItemWithOpRemovedFromValue = ({
  fieldDefs,
  item,
}: {
  fieldDefs: Record<string, FormSectionFieldProps>
  item: Record<string, unknown>
}) => {
  if (isEmpty(item)) {
    return item
  }

  // process all the filters to keep FilterForm's state consistent
  return Object.entries(item).reduce((nextItem, [key, value]) => {
    const nextValue = getValueWithoutOp({ fieldDefs, key, value })

    return {
      ...nextItem,
      [key]: nextValue,
    }
  }, {})
}

const FilterForm: React.FC<FilterFormProps> = (props) => {
  const {
    children,
    fieldDefs,
    formSectionsProps,
    item,
    module,
    onSubmit,
    sections,
    useFilterFormProps,
  } = props

  const nextItem = getItemWithOpRemovedFromValue({ fieldDefs, item })

  // useFilterForm
  const { form, handleSubmit } = useFilterForm({
    item: nextItem,
    module,
    onSubmit,
    ...useFilterFormProps,
  })

  return (
    <Form
      formContext={form}
      formJsx={
        <FormSections disableCard sections={sections} {...formSectionsProps} />
      }
      onSubmit={handleSubmit}
    >
      {(renderProps) => {
        const { formJsx, submitButtonJsx } = renderProps
        return (
          <>
            <Box sx={{ mt: 2, px: 2 }}>
              <Typography variant="h4">Apply Filters</Typography>
            </Box>

            <Divider sx={{ my: 2 }} />

            <Stack spacing={2} sx={{ px: 2 }}>
              {typeof children === 'function' ? children(renderProps) : formJsx}
              {submitButtonJsx}
            </Stack>
          </>
        )
      }}
    </Form>
  )
}

export default FilterForm
