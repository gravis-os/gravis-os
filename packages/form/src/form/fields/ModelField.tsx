import React, {
  forwardRef,
  useCallback,
  useEffect,
  useMemo,
  useState,
} from 'react'
import { CrudModule } from '@gravis-os/types'
import { CircularProgress, Stack, Typography } from '@gravis-os/ui'
import AddOutlinedIcon from '@mui/icons-material/AddOutlined'
import {
  Autocomplete,
  AutocompleteProps,
  createFilterOptions,
  TextFieldProps,
} from '@mui/material'
import { supabaseClient } from '@supabase/auth-helpers-nextjs'
import {
  PostgrestFilterBuilder,
  PostgrestResponse,
} from '@supabase/postgrest-js'
import debounce from 'lodash/debounce'
import has from 'lodash/has'
import isEmpty from 'lodash/isEmpty'
import partition from 'lodash/partition'
import startCase from 'lodash/startCase'
import uniqBy from 'lodash/uniqBy'
import isEqual from 'lodash/isEqual'
import isNil from 'lodash/isNil'
import get from 'lodash/get'
import TextField from './TextField'
import getRelationalObjectKey from '../utils/getRelationalObjectKey'

interface DataItem {
  [key: string]: unknown
  id?: string | number
}
type ModelAutocompleteProps = AutocompleteProps<any, any, any, any>

/**
 * delayFunction
 * Switch between lodash `debounce` and `throttle` for your preferred data fetching frequency
 * @see https://stackoverflow.com/questions/25991367/difference-between-throttling-and-debouncing-a-function
 */
const delayFunction = debounce

/**
 * Client-side filter
 * When using server-side filter, this is deactivated
 * @link: https://mui.com/material-ui/react-autocomplete/#custom-filter
 */
const getClientSideFilterOptions = createFilterOptions<DataItem>()

export type SetModelFieldQuery = ({
  inputValue,
  select,
}: {
  inputValue: string
  select: string
}) => Promise<PostgrestResponse<DataItem>>

export interface ModelFieldProps {
  pk?: string
  module: CrudModule
  name: string
  label?: string | false
  multiple?: boolean
  error?: TextFieldProps['error']
  required?: boolean
  helperText?: TextFieldProps['helperText']

  // Mui
  disableClearable?: ModelAutocompleteProps['disableClearable']
  fullWidth?: ModelAutocompleteProps['fullWidth']

  // Selector
  select?: string

  // RHF
  onChange: (value: any) => void
  setValue: (name: string, value: any) => void
  value: any

  // withCreate
  withCreate?: boolean
  onCreateClick?: (e, value: any) => void

  disableDefaultPrimaryOrFilter?: boolean
  /**
   * `filters`
   * Setting this filter will switch the component to use
   * a server-side filtering mechanism instead of client-side.
   *
   * @example
   * [
   *   { pk: 'model_code', op: 'ilike' },
   *   { pk: 'code', op: 'ilike', foreignTable: 'brand' },
   * ]
   */
  filters?: Array<{
    pk: string
    op?: string // FilterOperator
    value?: string | number
    foreignTable?: string // foreignTableName
  }>
  /**
   * setQuery
   * Allow downstream to override the server-side query
   */
  setQuery?: SetModelFieldQuery

  /**
   * renderOption
   * Expose option item rendering to downstream
   */
  renderOption?: ({
    option,
    pk,
  }: {
    option: DataItem
    pk: string
  }) => React.ReactNode

  /**
   * Option label key which will be used to render the tag component when an option is selected.
   * If not provided, the main primary key will be used.
   */
  optionLabelKey?: string

  /**
   * Group options by the returned string of the groupBy function
   */
  groupBy?: ModelAutocompleteProps['groupBy']
}

const ModelField: React.FC<ModelFieldProps> = forwardRef((props, ref) => {
  const {
    name,
    label,

    // Query
    pk = 'title',
    select: injectedSelect,
    module,

    // Extensions
    multiple,
    filters: injectedFilters,
    disableDefaultPrimaryOrFilter,

    // withCreate
    withCreate,
    onCreateClick,

    // Component
    setQuery,
    renderOption,

    // RHF
    onChange: injectedOnChange,
    setValue: setFormValue,
    value: formValue,

    // Error
    error,
    helperText,

    // Required
    required,

    // Tags
    optionLabelKey: injectedOptionLabelKey,

    ...rest
  } = props
  const { table } = module

  // ==============================
  // States
  // ==============================
  const getInitialValue = (formValue) => formValue || (multiple ? [] : null)
  const initialValue = getInitialValue(formValue)
  // displayValue here is not necessarily the same as the form value
  const [displayValue, setDisplayValue] = useState<
    DataItem | DataItem[] | null
  >(initialValue)
  const [inputValue, setInputValue] = useState('')
  const [options, setOptions] = useState<DataItem[]>([])
  const [open, setOpen] = useState(false)
  const [filters, setFilters] = useState(null)

  // ==============================
  // Variables
  // ==============================
  const loading = open && options.length === 0
  // Reverse lookup object if given a primitive value e.g. id
  const isPrimitiveValue = ['string', 'number'].includes(typeof displayValue)
  const optionLabelKey = injectedOptionLabelKey || pk

  // ==============================
  // Effects
  // ==============================
  // Update the display value when the formValue from upstream changes
  useEffect(() => {
    const defaultValue = getInitialValue(formValue)
    setDisplayValue(defaultValue)
  }, [formValue])

  const handleResetField = () => {
    if (name.endsWith('_id')) {
      const relationalObjectKey = getRelationalObjectKey(name)
      setFormValue(relationalObjectKey, null)
    }
    setInputValue('')
    injectedOnChange(null)
  }

  // The data fetching function
  const fetchData = useCallback(
    async (
      args: {
        inputValue?: string
        formValue?: any
        filters?: Array<{
          pk: string
          op?: string // FilterOperator
          value?: string | number
          foreignTable?: string // foreignTableName
        }>
      } = {}
    ) => {
      const { inputValue, filters, formValue } = args

      // Handle degenerate case
      const isValidInputValue = typeof inputValue === 'string'
      if (!isValidInputValue) return

      // Make input fuzzy search
      const fuzzyInputValue = `%${inputValue}%`

      const defaultSelect = `id, ${pk}`

      const select = injectedSelect || defaultSelect

      let query: PostgrestFilterBuilder<DataItem> = supabaseClient
        .from(table.name)
        .select(select)

      /**
       * Query is filtered on the server-side
       * if filters are available
       */
      if (filters) {
        // By default, set server-side filter with the pk e.g. 'title.ilike.helloworld'
        const defaultPrimaryOrFilterArray = [`${pk}.ilike.${fuzzyInputValue}`]

        const [foreignTableFilters, primaryTableFilters] = partition(
          filters,
          'foreignTable'
        )

        // Add any server-side filters using custom value instead of the inputValue, e.g. company_id = 28
        const [primaryTableFiltersWithValue, primaryTableFiltersWithoutValue] =
          partition(primaryTableFilters, (filter) => has(filter, 'value'))

        // Add any additional server-side filters in the or query
        const injectedPrimaryOrFiltersArray =
          primaryTableFiltersWithoutValue.map((filter) => {
            const { pk, op = 'ilike' } = filter
            return `${pk}.${op}.${fuzzyInputValue}`
          })

        // Append the additional filters
        const primaryOrFilterArray = [
          ...(disableDefaultPrimaryOrFilter ? [] : defaultPrimaryOrFilterArray),
          ...injectedPrimaryOrFiltersArray,
        ]

        /**
         * Set .or() filters on foreignTables
         * Note that this will be treated as a AND filter when used
         * with the primaryTableOrFilter because the query will be
         * executed as (1) .orP() && (2) .or()
         */
        if (foreignTableFilters) {
          foreignTableFilters.forEach((filter) => {
            const { pk, op = 'ilike', foreignTable } = filter

            /**
             * Set QueryFilterBuilder on the foreignTable imperatively
             * @example .or('name.ilike.London,name.eq.Paris', { foreignTable:'cities' })
             * @link https://supabase.com/docs/reference/javascript/or#use-or-on-foreign-tables
             */
            query = query.or(`${pk}.${op}.${fuzzyInputValue}`, { foreignTable })
          })
        }

        /**
         * Set .or() filters for custom-value filter
         * Note that this will be treated as a AND filter when used
         * with the primaryTableOrFilter because the query will be
         * executed as (1) .orP() && (2) .or()
         */
        if (primaryTableFiltersWithValue) {
          primaryTableFiltersWithValue.forEach((filter) => {
            const { pk, op = 'ilike', value } = filter

            if (value) {
              /**
               * Set QueryFilterBuilder imperatively
               * @example .or('name.ilike.London,name.eq.Paris')
               */
              query = query.or(`${pk}.${op}.${value}`)
            }
          })
        }

        // Set QueryFilterBuilder imperatively
        if (primaryOrFilterArray.length) {
          query = query.or(primaryOrFilterArray.join(','))
        }
      }

      const onSelect: PostgrestResponse<DataItem> = await (setQuery
        ? setQuery({ inputValue, select })
        : query)

      const { data: dbItems } = onSelect

      if (!dbItems) return

      const newOptions =
        typeof displayValue === 'object' ? [displayValue as DataItem] : []

      const nextOptions = (
        dbItems ? [...newOptions, ...dbItems] : newOptions
      ).filter((nextOption) => !isNil(nextOption))

      // Set options
      setOptions(nextOptions)

      /**
       * If defaultValue === '2', we reverse look-up from options and set the
       * full object as the value to populate the field.
       */
      if (!multiple && isPrimitiveValue) {
        const nextValue = nextOptions.find(
          (item) => String(item?.id) === String(displayValue)
        )

        if (nextValue) setDisplayValue(nextValue)
      }

      // Reset the field if the current value doesn't exist in the new options
      if (!multiple && !isPrimitiveValue && nextOptions?.length && formValue) {
        const nextValue = dbItems.find(
          (item) => String(item?.id) === String(formValue.id)
        )

        if (!nextValue) handleResetField()
      }
    },
    [table.name, pk, isPrimitiveValue]
  )

  // Fetch function with delay via debounce/throttle. Memoized for better perf
  const fetchDataWithDelay = useMemo(
    () => delayFunction(fetchData, 200),
    [fetchData]
  )

  // Fetch data onChange as the user types
  useEffect(() => {
    // Fetch data
    fetchDataWithDelay({ inputValue, filters })
  }, [inputValue])

  // Fetch data onOpen so that some options will be populated
  useEffect(() => {
    if (!loading) return
    // onOpen, fetch all data for client-side filter
    // whereby client-side filtering: e.g. `fetch-all + instant-filter`
    fetchDataWithDelay({ inputValue, filters })
  }, [loading])

  // Fetch data when filters change
  useEffect(() => {
    if (isEqual(filters, injectedFilters)) return
    setFilters(injectedFilters)
    // inputValue has to be empty, else the [pk] filter will cause the query to returns no result
    // Hence, won't reset the field
    fetchDataWithDelay({ inputValue: '', filters: injectedFilters, formValue })
  }, [injectedFilters])

  // Fetch data when there is a value to populate options. Reverse look-up object from id
  useEffect(() => {
    if (displayValue && isPrimitiveValue)
      fetchDataWithDelay({ inputValue, filters })
  }, [])

  // ==============================
  // withCreate: Ability to create new item from an option
  // ==============================
  const withCreateOptions = withCreate && { freeSolo: true }
  const getIsCreateOption = ({ option, pk }) => {
    if (!get(option, pk)) return
    return option && pk && get(option, pk, '').startsWith('Add "')
  }
  const getCreateOption = ({ option, pk }) => {
    if (!get(option, pk)) return
    // e.g. 'Add "New Item"' -> 'New Item'
    return option && pk && get(option, pk).split('"')[1]
  }

  return (
    <>
      <Autocomplete
        {...withCreateOptions}
        multiple={multiple}
        open={open}
        options={options}
        value={displayValue}
        inputValue={inputValue}
        onOpen={() => setOpen(true)}
        onClose={() => setOpen(false)}
        autoComplete
        includeInputInList
        filterOptions={(options: DataItem[], params) => {
          const { inputValue } = params

          /**
           * Disable client-side filter by escaping here when using server-side filters.
           * Always show all options since they would already be filtered
           * in the search query.
           */
          if (filters) return options

          // Client-side filter options
          const clientSideFilteredOptions = getClientSideFilterOptions(
            options,
            params
          )

          // Suggest the creation of a new value
          if (withCreate) {
            const isExisting = options.some(
              (option) => inputValue === get(option, pk)
            )
            if (inputValue !== '' && !isExisting) {
              clientSideFilteredOptions.push({ [pk]: `Add "${inputValue}"` })
            }
          }

          // filterSelectedOptions: Remove selected options from the options list
          const nextClientSideFilteredOptions = uniqBy(
            clientSideFilteredOptions,
            pk
          ).filter((option) => {
            const nextFormValue = multiple ? formValue : [formValue]
            return !nextFormValue?.some(
              (value) => get(value, pk) === get(option, pk)
            )
          })

          return nextClientSideFilteredOptions
        }}
        onChange={(e, newValue: DataItem | DataItem[] | null) => {
          // Set UI field display value only
          const isCreateOption = getIsCreateOption({ option: newValue, pk })

          const nextValue = isCreateOption
            ? getCreateOption({ option: newValue, pk })
            : newValue

          setDisplayValue(nextValue)
          injectedOnChange(nextValue)

          if (onCreateClick && withCreate && newValue && isCreateOption) {
            onCreateClick(e, nextValue)
            // TODO@Joel: Trigger setCreateValue here to trigger modal in useEffect. Reset `createValue` once we've created the item
          }

          // Set model value as object e.g. Item.product = { ... }
          if (name.endsWith('_id')) {
            const relationalObjectKey = getRelationalObjectKey(name)
            const nextFormValue = isCreateOption
              ? {
                  [pk]: nextValue,
                }
              : newValue
            setFormValue(relationalObjectKey, nextFormValue)
          }
        }}
        onInputChange={(event, newInputValue) => {
          if (newInputValue === '') {
            setDisplayValue(multiple ? [] : null)

            if (name.endsWith('_id')) {
              const relationalObjectKey = getRelationalObjectKey(name)
              setFormValue(relationalObjectKey, null)
            }
          }

          setInputValue(newInputValue)
        }}
        getOptionLabel={(option) => {
          if (!option) return ''
          // Fallback primary key value if the injected primary key returns null or undefined
          return typeof option === 'string'
            ? option
            : get(option, optionLabelKey) ?? ''
        }}
        renderInput={(params) => {
          return (
            <TextField
              inputRef={ref}
              multiline
              label={
                label === false
                  ? null
                  : label ||
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
              error={error}
              helperText={helperText}
              // eslint-disable-next-line react/jsx-no-duplicate-props
              inputProps={
                {
                  ...params?.inputProps,
                  ...(required && { required: true }),
                } as TextFieldProps['inputProps']
              }
              {...(required && { required: true })}
            />
          )
        }}
        renderOption={(props, option: DataItem | null, { inputValue }) => {
          const shouldSkipOption =
            isEmpty(option) ||
            Array.isArray(option) ||
            typeof option !== 'object'
          const isCreateOption = getIsCreateOption({ option, pk })

          // Handle degenerate case where option is an empty object
          if (shouldSkipOption) return null

          // Careful, option might be null
          const primitiveOptionValue: React.ReactNode = renderOption
            ? renderOption({ option, pk })
            : (get(option, pk) as string)

          switch (true) {
            case isCreateOption:
              return (
                <li {...props}>
                  <Stack
                    direction="row"
                    alignItems="center"
                    spacing={0.5}
                    sx={{ color: 'primary.main' }}
                  >
                    <AddOutlinedIcon fontSize="small" />
                    <Typography color="inherit">
                      {primitiveOptionValue}
                    </Typography>
                  </Stack>
                </li>
              )
            default:
              return <li {...props}>{primitiveOptionValue}</li>
          }
        }}
        {...rest}
      />
    </>
  )
})

export default ModelField
