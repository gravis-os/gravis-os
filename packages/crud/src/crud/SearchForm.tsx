import React from 'react'
import SearchOutlinedIcon from '@mui/icons-material/SearchOutlined'
import { InputAdornment } from '@mui/material'
import { Stack, Button } from '@gravis-os/ui'
import {
  Form,
  FormProps,
  FormSectionFieldProps,
  FormSections,
  FormSectionsProps,
} from '@gravis-os/form'
import { CrudItem, CrudModule } from '@gravis-os/types'
import useSearchForm, { UseSearchFormArgs } from './useSearchForm'
import getFieldsFromFormSections from './getFieldsFromFormSections'

const getDefaultValuesFromFields = (fields) =>
  fields.reduce((acc, field) => {
    const { name } = field
    return { ...acc, [name]: '' }
  }, {})

export interface SearchFormProps {
  item?: CrudItem
  formSectionsProps?: FormSectionsProps
  sections: FormSectionsProps['sections']
  module: CrudModule
  useSearchFormProps?: UseSearchFormArgs
  onSubmit?: UseSearchFormArgs['onSubmit']
  children?: FormProps<any>['children']
}

const SearchForm: React.FC<SearchFormProps> = (props) => {
  const {
    onSubmit,
    useSearchFormProps,
    sections,
    formSectionsProps,
    module,
    children,
  } = props

  const fields = getFieldsFromFormSections(sections)
  const defaultValues = getDefaultValuesFromFields(fields)

  // useSearchForm
  const { form, handleSubmit } = useSearchForm({
    module,
    onSubmit,
    resetOnSubmit: true,
    defaultValues,
    ...useSearchFormProps,
  })

  return (
    <Form
      formContext={form}
      onSubmit={handleSubmit}
      formJsx={
        <FormSections
          disableCard
          sections={[
            // Merge over first field
            {
              ...sections[0],
              fields: sections[0].fields.map((field, i) => {
                if (i !== 0) return field
                return {
                  ...field,
                  disableBorders: true,
                  disableLabel: true,
                  placeholder: 'Search',
                  InputProps: {
                    startAdornment: (
                      <InputAdornment position="start">
                        <SearchOutlinedIcon />
                      </InputAdornment>
                    ),
                  },
                  size: 'small',
                  sx:{
                    backgroundColor: 'common.white',
                    filter: 'drop-shadow(0px 1px 1px rgba(0, 0, 0, 0.1))',
                    ...(field as FormSectionFieldProps).sx
                  },
                }
              }),
            },
            ...sections.slice(0, sections.length - 1),
          ]}
          {...formSectionsProps}
        />
      }
    >
      {(renderProps) => (
        <Stack direction="row" alignItems="center" spacing={1}>
          {typeof children === 'function'
            ? children(renderProps)
            : renderProps.formJsx}
          <Button variant="contained" type="submit">
            Search
          </Button>
        </Stack>
      )}
    </Form>
  )
}

export default SearchForm
