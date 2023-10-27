import React from 'react'

import {
  Form,
  FormProps,
  FormSectionFieldProps,
  FormSections,
  FormSectionsProps,
} from '@gravis-os/form'
import { CrudItem, CrudModule } from '@gravis-os/types'
import { Button, Stack } from '@gravis-os/ui'
import SearchOutlinedIcon from '@mui/icons-material/SearchOutlined'
import { InputAdornment } from '@mui/material'

import getFieldsFromFormSections from './getFieldsFromFormSections'
import useSearchForm, { UseSearchFormArgs } from './useSearchForm'

const getDefaultValuesFromFields = (fields) =>
  fields.reduce((acc, field) => {
    const { name } = field
    return { ...acc, [name]: '' }
  }, {})

export interface SearchFormProps {
  children?: FormProps<any>['children']
  formSectionsProps?: FormSectionsProps
  item?: CrudItem
  maxWidthBreakpoints?: { [key: string]: number | string }
  module: CrudModule
  onSubmit?: UseSearchFormArgs['onSubmit']
  sections: FormSectionsProps['sections']
  useSearchFormProps?: Partial<UseSearchFormArgs>
}

const SearchForm: React.FC<SearchFormProps> = (props) => {
  const {
    children,
    formSectionsProps,
    module,
    onSubmit,
    sections,
    useSearchFormProps,
  } = props

  const fields = getFieldsFromFormSections(sections)
  const defaultValues = getDefaultValuesFromFields(fields)

  // useSearchForm
  const { form, handleSubmit } = useSearchForm({
    defaultValues,
    module,
    onSubmit,
    resetOnSubmit: true,
    ...useSearchFormProps,
  })

  return (
    <Form
      formContext={form}
      formJsx={
        <FormSections
          disableCard
          sections={[
            // Merge over first field
            {
              ...sections[0],
              fields: sections[0].fields.map((field) => {
                return {
                  disableLabel: true,
                  InputProps: {
                    startAdornment: (
                      <InputAdornment position="start">
                        <SearchOutlinedIcon fontSize="small" />
                      </InputAdornment>
                    ),
                  },
                  placeholder: 'Search',
                  size: 'small',
                  ...field,
                  sx: {
                    backgroundColor: 'common.white',
                    filter: 'drop-shadow(0px 1px 1px rgba(0, 0, 0, 0.1))',
                    ...(field as FormSectionFieldProps)?.sx,
                  },
                }
              }),
            },
            ...sections.slice(0, -1),
          ]}
          {...formSectionsProps}
        />
      }
      onSubmit={handleSubmit}
    >
      {(renderProps) => (
        <Stack alignItems="center" direction="row" spacing={1}>
          {typeof children === 'function'
            ? children(renderProps)
            : renderProps.formJsx}
          <Button type="submit" variant="contained">
            Search
          </Button>
        </Stack>
      )}
    </Form>
  )
}

export default SearchForm
