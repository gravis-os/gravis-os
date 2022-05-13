import React, { useEffect, useState } from 'react'
import { supabaseClient } from '@supabase/supabase-auth-helpers/nextjs'
import { Autocomplete } from '@mui/material'
import throttle from 'lodash/throttle'
import startCase from 'lodash/startCase'
import isEmpty from 'lodash/isEmpty'
import CircularProgress from '../ui/CircularProgress'
import TextField from './TextField'
import getRelationalObjectKey from './getRelationalObjectKey'
import { CrudModule } from '../types'

interface DataItem {
  title: string
}

export interface ModelFieldProps {
  pk?: string
  module: CrudModule
  name: string
  label?: string
  value: any
  multiple?: boolean

  // Selector
  select?: string

  // RHF
  onChange: (value: any) => void
  setValue: (name: string, value: unknown) => void
}

const ModelField: React.FC<ModelFieldProps> = props => {
  const {
    setValue: injectedSetValue,
    select: injectedSelect,
    name,
    label,
    pk = 'title',
    module,
    onChange: injectedOnChange,
    value: injectedValue,
    multiple,
    ...rest
  } = props
  const { table } = module

  // States
  const getInitialValue = injectedValue =>
    injectedValue || (multiple ? [] : null)
  const initialValue = getInitialValue(injectedValue)
  const [value, setValue] = useState<DataItem | DataItem[] | null>(initialValue)
  const [inputValue, setInputValue] = useState('')
  const [options, setOptions] = useState<DataItem[]>([])
  const [open, setOpen] = useState(false)
  const loading = open && options.length === 0

  // Update defaultValue
  useEffect(() => {
    const defaultValue = getInitialValue(injectedValue)
    setValue(defaultValue)
  }, [injectedValue])

  // Reverse lookup object if given a primitive value e.g. id
  const isPrimitiveValue = ['string', 'number'].includes(typeof value)

  const fetchData = React.useMemo(() => {
    const fetchFunction = async () => {
      const defaultSelect = `id, ${pk}`
      const select = injectedSelect
        ? ` ${pk}, ${injectedSelect}`
        : defaultSelect
      const onSelect: any = await supabaseClient.from(table.name).select(select)
      const { data: dbItems } = onSelect

      if (!dbItems) return

      const newOptions = typeof value === 'object' ? [value] : []
      const nextOptions = dbItems ? [...newOptions, ...dbItems] : newOptions

      // Set options
      setOptions(nextOptions)

      /**
       * If defaultValue === '2', we reverse look-up from options and set the full object as the value
       * so as to populate the field
       */
      if (!multiple && isPrimitiveValue) {
        const nextValue = nextOptions.find(
          item => String(item?.id) === String(value)
        )
        if (nextValue) setValue(nextValue)
      }
    }
    return throttle(fetchFunction, 500)
  }, [table.name, pk])

  // Fetch onChange as the user types
  useEffect(() => {
    // Handle if blank
    if (!multiple && inputValue === '') {
      const singleOptions = value ? [value] : []
      const multipleOptions = getInitialValue(value)
      return setOptions(multiple ? multipleOptions : singleOptions)
    }
    // Prevent issue with unnecessary fetch from onSelect
    if (!open) return
    // Fetch data
    fetchData()
  }, [inputValue])

  // Fetch onOpen so that some options will be populated
  useEffect(() => {
    if (!loading) return
    // Fetch data
    fetchData()
  }, [loading])

  // Fetch when there is a value to populate options. Reverse look-up object from id
  useEffect(() => {
    if (value && isPrimitiveValue) fetchData()
  }, [])

  return (
    <Autocomplete
      value={value}
      options={options}
      open={open}
      multiple={multiple}
      onOpen={() => setOpen(true)}
      onClose={() => setOpen(false)}
      autoComplete
      includeInputInList
      filterSelectedOptions
      onChange={(event: any, newValue: DataItem | DataItem[] | null) => {
        setValue(newValue) // Set UI field value only
        injectedOnChange(newValue) // Expose value to outer form state
        if (name.endsWith('_id')) {
          const relationalObjectKey = getRelationalObjectKey(name)
          injectedSetValue(relationalObjectKey, newValue) // Set model value as object
        }
      }}
      onInputChange={(event, newInputValue) => setInputValue(newInputValue)}
      getOptionLabel={option => {
        if (!option) return
        return typeof option === 'string' ? option : option[pk]
      }}
      renderInput={params => (
        <TextField
          label={
            label ||
            `Select ${startCase(
              name.endsWith('_id') ? name.split('_id')[0] : name
            )}`
          }
          {...params}
          InputProps={{
            ...params.InputProps,
            endAdornment: (
              <>
                {loading ? (
                  <CircularProgress color="inherit" size={20} />
                ) : null}
                {params.InputProps.endAdornment}
              </>
            ),
          }}
        />
      )}
      renderOption={(props, option, { inputValue }) => {
        if (
          isEmpty(option) ||
          Array.isArray(option) ||
          typeof option !== 'object'
        )
          return null
        return <li {...props}>{option[pk]}</li>
      }}
      {...rest}
    />
  )
}

export default ModelField
