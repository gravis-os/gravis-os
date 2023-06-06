import {
  Form,
  FormProps,
  FormSectionFieldProps,
  FormSections,
  FormSectionsProps,
} from '@gravis-os/form'
import { CrudModule } from '@gravis-os/types'
import { Box, Divider, Typography } from '@gravis-os/ui'
import isEmpty from 'lodash/isEmpty'
import React from 'react'
import getValueWithoutOp from './getValueWithoutOp'
import useFilterForm, { UseFilterFormArgs } from './useFilterForm'

export interface FilterFormProps {
  item?: Record<string, unknown>
  formSectionsProps?: FormSectionsProps
  sections: FormSectionsProps['sections']
  module: CrudModule
  useFilterFormProps?: Partial<UseFilterFormArgs>
  onSubmit?: UseFilterFormArgs['onSubmit']
  children?: FormProps<any>['children']
  fieldDefs?: Record<string, FormSectionFieldProps>
}

const getItemWithOpRemovedFromValue = ({
  item,
  fieldDefs,
}: {
  item: Record<string, unknown>
  fieldDefs: Record<string, FormSectionFieldProps>
}) => {
  if (isEmpty(item)) {
    return item
  }

  const [[key, value]] = Object.entries(item)
  const nextValue = getValueWithoutOp({ key, value, fieldDefs })
  const nextItem = { [key]: nextValue }

  return nextItem
}

const FilterForm: React.FC<FilterFormProps> = (props) => {
  const {
    onSubmit,
    useFilterFormProps,
    sections,
    formSectionsProps,
    item,
    module,
    children,
    fieldDefs,
  } = props

  const nextItem = getItemWithOpRemovedFromValue({ item, fieldDefs })

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
      onSubmit={handleSubmit}
      submitButtonProps={{
        variant: 'outlined',
        title: 'Apply',
        fullWidth: true,
        sx: { mt: 1 },
      }}
      sx={{ px: 2 }}
      formJsx={
        <FormSections disableCard sections={sections} {...formSectionsProps} />
      }
    >
      {(renderProps) => {
        return (
          <>
            <Box sx={{ mt: 2 }}>
              <Typography variant="h4">Apply Filters</Typography>
            </Box>

            <Divider sx={{ my: 2 }} />

            <Box>
              {typeof children === 'function'
                ? children(renderProps)
                : renderProps.formJsx}
            </Box>
          </>
        )
      }}
    </Form>
  )
}

export default FilterForm
