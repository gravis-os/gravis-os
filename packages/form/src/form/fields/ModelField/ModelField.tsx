/* eslint-disable fp/no-let, fp/no-loops, fp/no-mutation */

import React, {
  forwardRef,
  useCallback,
  useEffect,
  useMemo,
  useState,
} from 'react'

import { TextField, TextFieldProps } from '@gravis-os/fields'
import { CrudModule } from '@gravis-os/types'
import { CircularProgress } from '@gravis-os/ui'
import {
  Autocomplete,
  AutocompleteProps,
  createFilterOptions,
} from '@mui/material'
import { supabaseClient } from '@supabase/auth-helpers-nextjs'
import {
  PostgrestFilterBuilder,
  PostgrestResponse,
} from '@supabase/postgrest-js'
import debounce from 'lodash/debounce'
import filter from 'lodash/filter'
import get from 'lodash/get'
import has from 'lodash/has'
import identity from 'lodash/identity'
import isEqual from 'lodash/isEqual'
import isNil from 'lodash/isNil'
import negate from 'lodash/negate'
import orderBy from 'lodash/orderBy'
import partition from 'lodash/partition'
import startCase from 'lodash/startCase'
import uniqBy from 'lodash/uniqBy'

import getRelationalObjectKey from '../../utils/getRelationalObjectKey'
import { getIsCreateOption } from './getIsCreateOption'
import { renderOptionFromListDataItem } from './renderModelFieldOption'
import { ModelFieldDataItem } from './types'
import { VirtualizedAutocompleteList } from './VirtualizedAutocompleteList'

export type ModelAutocompleteProps = AutocompleteProps<any, any, any, any>

/**
 * delayFunction
 * Switch between lodash `debounce` and `throttle` for your preferred data fetching frequency
 * @see https://stackoverflow.com/questions/25991367/difference-between-throttling-and-debouncing-a-function
 */
const delayFunction = debounce

const getCreateOption = ({ option, pk }) => {
  if (!get(option, pk)) return
  // e.g. 'Add "New Item"' -> 'New Item'
  return option && pk && get(option, pk).toString().split('"')[1]
}

/**
 * Client-side filter
 * When using server-side filter, this is deactivated
 * @link: https://mui.com/material-ui/react-autocomplete/#custom-filter
 */
const getClientSideFilterOptions = createFilterOptions<ModelFieldDataItem>()

const getWithCreateOptions =
  ({ inputValue, pk }: { inputValue: string; pk: string }) =>
  (options: ModelFieldDataItem[]) => {
    const isExisting = options.some((option) => inputValue === get(option, pk))
    if (inputValue !== '' && !isExisting) {
      return [...options, { [pk]: `Add "${inputValue}"` }]
    }
    return options
  }

export type SetModelFieldQuery = ({
  inputValue,
  select,
}: {
  inputValue: string
  select: string
}) => Promise<PostgrestResponse<ModelFieldDataItem>>

export interface ModelFieldProps {
  // Mui
  disableClearable?: ModelAutocompleteProps['disableClearable']
  disableDefaultPrimaryOrFilter?: boolean
  error?: TextFieldProps['error']
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
    foreignTable?: string // foreignTableName
    op?: string // FilterOperator
    pk: string
    value?: number | string
  }>
  fullWidth?: ModelAutocompleteProps['fullWidth']
  /**
   * getOptionLabel
   * Expose option label to downstream
   */
  getOptionLabel?: ModelAutocompleteProps['getOptionLabel']
  /**
   * Group options by the returned string of the groupBy function
   */
  groupBy?: ModelAutocompleteProps['groupBy']
  helperText?: TextFieldProps['helperText']
  isVirtualized?: boolean
  label?: false | string
  module: CrudModule

  multiple?: boolean
  name: string

  // RHF
  onChange: (value: any) => void

  onCreateClick?: (e, value: any) => void
  /**
   * Option label key which will be used to render the tag component when an option is selected.
   * If not provided, the main primary key will be used.
   */
  optionLabelKey?: string
  /**
   * orderBy
   * Allow ordering of options with the 2nd and 3rd parameters of lodash.orderBy
   */
  orderBy?:
    | [Parameters<typeof orderBy>[1], Parameters<typeof orderBy>[2]]
    | [Parameters<typeof orderBy>[1]]

  pk?: string
  /**
   * renderOption
   * Expose option item rendering to downstream
   */
  renderOption?: ({
    option,
    pk,
  }: {
    option: ModelFieldDataItem
    pk: string
  }) => React.ReactNode

  required?: boolean
  // Selector
  select?: string
  /**
   * setQuery
   * Allow downstream to override the server-side query
   */
  setQuery?: SetModelFieldQuery
  setValue: (name: string, value: any) => void
  sx?: ModelAutocompleteProps['sx']
  textFieldProps?: TextFieldProps

  value: any

  // withCreate
  withCreate?: boolean
}

const ModelField: React.FC<ModelFieldProps> = forwardRef((props, ref) => {
  const {
    disableDefaultPrimaryOrFilter,
    // Error
    error,

    filters: injectedFilters,
    helperText,
    isVirtualized = false,

    label,
    module,
    // Extensions
    multiple,

    name,
    // RHF
    onChange: injectedOnChange,

    onCreateClick,
    // Tags
    optionLabelKey: injectedOptionLabelKey,
    orderBy: injectedOrderBy,

    // Query
    pk = 'title',
    renderOption,
    // Required
    required,

    select: injectedSelect,
    // Component
    setQuery,

    setValue: setFormValue,

    // TextField
    textFieldProps,

    value: formValue,

    // withCreate
    withCreate,
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
    ModelFieldDataItem | ModelFieldDataItem[] | null
  >(initialValue)
  const [inputValue, setInputValue] = useState('')
  const [options, setOptions] = useState<ModelFieldDataItem[]>([])
  const [open, setOpen] = useState(false)
  const [filters, setFilters] = useState(null)

  // ==============================
  // Variables
  // ==============================
  const loading = open && options.length === 0
  // Reverse lookup object if given a primitive value e.g. id
  const isPrimitiveValue = ['number', 'string'].includes(typeof displayValue)
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
        filters?: Array<{
          foreignTable?: string // foreignTableName
          op?: string // FilterOperator
          pk: string
          value?: number | string
        }>
        formValue?: any
        inputValue?: string
      } = {}
    ) => {
      const { filters, formValue, inputValue } = args

      // Handle degenerate case
      const isValidInputValue = typeof inputValue === 'string'
      if (!isValidInputValue) return

      // Make input fuzzy search
      const fuzzyInputValue = `%${inputValue}%`

      const defaultSelect = `id, ${pk}`

      const select = injectedSelect || defaultSelect

      let query: PostgrestFilterBuilder<ModelFieldDataItem> = supabaseClient
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
            const { op = 'ilike', pk } = filter
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
          for (const filter of foreignTableFilters) {
            const { foreignTable, op = 'ilike', pk, value } = filter

            /**
             * Set QueryFilterBuilder on the foreignTable imperatively
             * @example .or('name.ilike.London,name.eq.Paris', { foreignTable:'cities' })
             * @link https://supabase.com/docs/reference/javascript/or#use-or-on-foreign-tables
             */
            query = query.or(
              `${pk}.${op}.${isNil(value) ? fuzzyInputValue : value}`,
              {
                foreignTable,
              }
            )
          }
        }

        /**
         * Set .or() filters for custom-value filter
         * Note that this will be treated as a AND filter when used
         * with the primaryTableOrFilter because the query will be
         * executed as (1) .orP() && (2) .or()
         */
        if (primaryTableFiltersWithValue) {
          for (const filter of primaryTableFiltersWithValue) {
            const { op = 'ilike', pk, value } = filter

            if (value) {
              /**
               * Set QueryFilterBuilder imperatively
               * @example .or('name.ilike.London,name.eq.Paris')
               */
              query = query.or(`${pk}.${op}.${value}`)
            }
          }
        }

        // Set QueryFilterBuilder imperatively
        if (primaryOrFilterArray.length > 0) {
          query = query.or(primaryOrFilterArray.join(','))
        }
      }

      const onSelect: PostgrestResponse<ModelFieldDataItem> = await (setQuery
        ? setQuery({ inputValue, select })
        : query)

      const { data: dbItems } = onSelect

      if (!dbItems) return

      const newOptions =
        typeof displayValue === 'object'
          ? [displayValue as ModelFieldDataItem]
          : []

      const nextOptions = Reflect.apply(
        injectedOrderBy ? orderBy : identity,
        null,
        [
          filter(
            dbItems ? uniqBy([...dbItems, ...newOptions], pk) : newOptions,
            negate(isNil)
          ),
          ...(injectedOrderBy || []),
        ]
      )

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

        if (nextValue) {
          setDisplayValue(nextValue)
          setFormValue(name, nextValue)
        }
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
    fetchDataWithDelay({ filters, inputValue })
  }, [inputValue])

  // Fetch data onOpen so that some options will be populated
  useEffect(() => {
    if (!loading) return
    // onOpen, fetch all data for client-side filter
    // whereby client-side filtering: e.g. `fetch-all + instant-filter`
    fetchDataWithDelay({ filters, inputValue })
  }, [loading])

  // Fetch data when filters change
  useEffect(() => {
    if (isEqual(filters, injectedFilters)) return
    setFilters(injectedFilters)
    // inputValue has to be empty, else the [pk] filter will cause the query to returns no result
    // Hence, won't reset the field
    fetchDataWithDelay({ filters: injectedFilters, formValue, inputValue: '' })
  }, [injectedFilters])

  // Fetch data when there is a value to populate options. Reverse look-up object from id
  useEffect(() => {
    if (displayValue && isPrimitiveValue)
      fetchDataWithDelay({ filters, inputValue })
  }, [])

  // ==============================
  // withCreate: Ability to create new item from an option
  // ==============================
  const withCreateOptions = withCreate && { freeSolo: true }

  return (
    <>
      <Autocomplete
        {...withCreateOptions}
        autoComplete
        filterOptions={(options: ModelFieldDataItem[], params) => {
          const { inputValue } = params

          // Suggest the creation of a new value
          const withCreateOptions = withCreate
            ? getWithCreateOptions({ inputValue, pk })
            : identity

          /**
           * Disable client-side filter by escaping here when using server-side filters.
           * Always show all options since they would already be filtered
           * in the search query.
           */
          if (filters) return withCreateOptions(options)

          // Client-side filter options
          const clientSideFilteredOptions = withCreateOptions(
            getClientSideFilterOptions(options, params)
          )

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
        getOptionLabel={(option) => {
          if (!option) return ''
          // Fallback primary key value if the injected primary key returns null or undefined
          return typeof option === 'string'
            ? option
            : get(option, optionLabelKey) ?? ''
        }}
        includeInputInList
        inputValue={inputValue}
        multiple={multiple}
        onChange={(
          e,
          newValue: ModelFieldDataItem | ModelFieldDataItem[] | null
        ) => {
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
        onClose={() => setOpen(false)}
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
        onOpen={() => setOpen(true)}
        open={open}
        options={options}
        renderInput={(params) => {
          return (
            <TextField
              inputRef={ref}
              label={
                label === false
                  ? null
                  : label ||
                    `Select ${startCase(
                      name.endsWith('_id') ? name.split('_id')[0] : name
                    )}`
              }
              multiline
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
              {...textFieldProps}
            />
          )
        }}
        value={displayValue}
        {...(isVirtualized && {
          disableListWrap: true,
          ListboxComponent: VirtualizedAutocompleteList,
          renderOption: (props, option: ModelFieldDataItem | null) =>
            [props, option, pk, displayValue, renderOption] as React.ReactNode,
        })}
        {...(!isVirtualized && {
          renderOption: (props, option: ModelFieldDataItem | null) => (
            <li {...props}>
              {renderOptionFromListDataItem([
                props,
                option,
                pk,
                displayValue,
                renderOption,
              ])}
            </li>
          ),
        })}
        {...rest}
      />
    </>
  )
})

export default ModelField
