import React from 'react'
import { Stack, Box, Divider, Typography } from '@gravis-os/ui'
import {
  Form,
  FormProps,
  FormSections,
  FormSectionsProps,
} from '@gravis-os/form'
import { CrudModule } from '@gravis-os/types'
import useFilterForm, { UseFilterFormArgs } from './useFilterForm'

export interface FilterFormProps {
  item?: Record<string, unknown>
  formSectionsProps?: FormSectionsProps
  sections: FormSectionsProps['sections']
  module: CrudModule
  useFilterFormProps?: UseFilterFormArgs
  onSubmit?: UseFilterFormArgs['onSubmit']
  children?: FormProps<any>['children']
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
  } = props

  // useFilterForm
  const { form, handleSubmit } = useFilterForm({
    item,
    module,
    onSubmit,
    ...useFilterFormProps,
  })

  return (
    <Form
      form={form}
      onSubmit={handleSubmit}
      formJsx={
        <FormSections disableCard sections={sections} {...formSectionsProps} />
      }
    >
      {(renderProps) => {
        const { submitButtonJsx } = renderProps
        return (
          <>
            <Box sx={{ mt: 2, px: 2 }}>
              <Typography variant="h4">Apply Filters</Typography>
            </Box>

            <Divider sx={{ my: 2 }} />

            <Stack spacing={2} sx={{ px: 2 }}>
              {typeof children === 'function'
                ? children(renderProps)
                : renderProps.formJsx}
              {submitButtonJsx}
            </Stack>
          </>
        )
      }}
    </Form>
  )
}

export default FilterForm
