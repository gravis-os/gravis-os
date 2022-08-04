import React, { useEffect } from 'react'
import { useForm, UseFormProps, UseFormReturn } from 'react-hook-form'
import {
  supabaseClient,
  SupabaseClient,
} from '@supabase/supabase-auth-helpers/nextjs'
import { useUser } from '@supabase/supabase-auth-helpers/react/components/UserProvider'
import flowRight from 'lodash/flowRight'
import { useMutation, useQueryClient } from 'react-query'
import {
  withDbFormValues,
  getDefaultValues,
  withoutId,
  FormSectionsProps,
} from '@gravis-os/form'
import toast from 'react-hot-toast'
import { CrudItem, CrudModule } from '@gravis-os/types'
import getIsNew from './getIsNew'
import withCreatedUpdatedBy from './withCreatedUpdatedBy'
import partitionManyToManyValues from './partitionManyToManyValues'
import partitionOneToManyValues from './partitionOneToManyValues'
import saveManyToManyValues from './saveManyToManyValues'
import saveOneToManyValues from './saveOneToManyValues'
import getFieldDefsFromSections from '../utils/getFieldDefsFromSections'

type UseCrudFormValues = Record<string, any>

interface UseCrudFormValuesInterface {
  isNew?: boolean
  item?: CrudItem
  values: UseCrudFormValues
}

export interface UseCrudFormArgs extends UseFormProps {
  module: CrudModule
  item?: CrudItem
  refetch?: () => Promise<CrudItem>
  client?: SupabaseClient
  createOnSubmit?: boolean
  setFormValues?: ({
    values,
    isNew,
    item,
  }: UseCrudFormValuesInterface) => Record<string, unknown>
  afterSubmit?: ({ values, isNew, item }: UseCrudFormValuesInterface) => unknown
  afterDelete?: ({ values, item }: UseCrudFormValuesInterface) => unknown
  defaultValues?: Record<string, unknown>
  sections?: FormSectionsProps['sections']
}

export interface UseCrudFormReturn {
  formContext: UseFormReturn
  isNew: boolean
  onSubmit: any // (values: UseCrudFormValues) => Promise<void> // Combination of create and update
  onDelete: (values: UseCrudFormValues) => Promise<void>
}

const useCrudForm = (props: UseCrudFormArgs): UseCrudFormReturn => {
  const {
    defaultValues: injectedDefaultValues,
    afterSubmit,
    afterDelete,
    setFormValues,
    client = supabaseClient,
    createOnSubmit,
    item: injectedItem,
    refetch,
    module,
    sections,
    ...rest
  } = props
  const { sk, table } = module

  const item = injectedItem || ({} as CrudItem)
  // User
  const { user } = useUser()

  // ==============================
  // Form
  // ==============================
  // Check if the item is defined. If not, we are creating a new item.
  const hasItem = Object.keys(item).length
  const isNew = getIsNew(item)

  // Default Values
  const defaultValues = isNew
    ? injectedDefaultValues
    : getDefaultValues({ isNew, item: { ...injectedDefaultValues, ...item } })

  // Form
  const form = useForm({ defaultValues, ...rest })
  const { reset } = form

  // Reset form when dbItem is returned
  useEffect(() => {
    if (hasItem) reset(defaultValues)
  }, [item])

  // ==============================
  // Submit
  // ==============================
  const queryClient = useQueryClient()
  const queryMatcher = { [sk]: item[sk] } // e.g. { id: 1 }
  const createOrUpdateMutationFunction = async (nextValues) =>
    createOnSubmit || isNew
      ? client.from(table.name).insert([nextValues])
      : client.from(table.name).update([nextValues]).match(queryMatcher)
  const deleteMutationFunction = async () =>
    client.from(table.name).delete().match(queryMatcher)
  const createOrUpdateMutation = useMutation(createOrUpdateMutationFunction)
  const deleteMutation = useMutation(deleteMutationFunction)

  // onSubmit will manage create and update function
  const onSubmit = async (values) => {
    const fieldDefs = sections && getFieldDefsFromSections(sections)

    // Cleaning function for dbFormValues
    const withValuesArgs = { isNew, user }
    const dbFormValues = flowRight([
      withCreatedUpdatedBy(withValuesArgs),
      withoutId(withValuesArgs),
      withDbFormValues(withValuesArgs),
    ])(values)

    // Expose values to outer scope
    const exposedValues = setFormValues
      ? setFormValues({ item, isNew, values: dbFormValues })
      : dbFormValues

    // Split join (many to many) values
    const [nonManyToManyValues, manyToManyValues] =
      partitionManyToManyValues(exposedValues)
    const [nonOneToManyValues, oneToManyValues] =
      partitionOneToManyValues(nonManyToManyValues)

    // Payload
    const nextValues = nonOneToManyValues

    // Create or Update
    createOrUpdateMutation.mutate(nextValues, {
      onSuccess: async (result) => {
        queryClient.invalidateQueries(table.name)

        // Handle errors
        const { error, data } = result
        if (error || !data) {
          console.error(
            'error at useCrudForm.createOrUpdateMutation()',
            error.message
          )
          toast.error('Something went wrong')
          return
        }

        // Saved item, we can get the product.id from here
        // nextItem does not contain the relations.
        // use item to get the relations.
        const nextItem = data[0]

        // Manage many to many values by creating records in join tables
        const hasManyToManyValues = Boolean(
          Object.keys(manyToManyValues).length
        )
        if (hasManyToManyValues) {
          await saveManyToManyValues({
            item,
            values: manyToManyValues,
            client,
            module,
            fieldDefs,
          })

          /**
           * Refetch data to get the latest join info because we're comparing against prev value
           * This is to resolve cases where the user make multiple saveManyToManyValues without refreshing
           * the page/itemQuery, resulting in the comparator function within saveManyToManyValues to be outdated
           * which causes unexpected saves.
           */
          if (refetch) refetch()
        }

        // Manage one to many values by creating records in join tables
        const hasOneToManyValues = Boolean(Object.keys(oneToManyValues).length)
        if (hasOneToManyValues) {
          await saveOneToManyValues({
            item,
            values: oneToManyValues,
            client,
            module,
          })

          /**
           * Refetch data to get the latest join info because we're comparing against prev value
           * This is to resolve cases where the user make multiple saveManyToManyValues without refreshing
           * the page/itemQuery, resulting in the comparator function within saveManyToManyValues to be outdated
           * which causes unexpected saves.
           */
          if (refetch) refetch()
        }

        // Toast
        toast.success('Success')

        if (afterSubmit) {
          afterSubmit({
            isNew,
            values: nextValues,
            item: nextItem,
          })
        }
      },
      onError: (error) => {
        toast.error('Something went wrong')
        console.error('Error caught:', error)
      },
    })
  }

  const onDelete = async (values) => {
    // Delete
    deleteMutation.mutate(values, {
      onSuccess: async (result) => {
        queryClient.invalidateQueries(table.name)

        // Handle errors
        const { error, data } = result
        if (error || !data) {
          console.error('error at useCrudForm.deleteMutation()', error.message)
          toast.error('Something went wrong')
          return
        }

        // Saved item, we can get the product.id from here
        // nextItem does not contain the relations.
        // use item to get the relations.
        const nextItem = data[0]

        // Toast
        toast.success('Success')

        if (afterDelete) {
          afterDelete({
            values,
            item: nextItem,
          })
        }
      },
      onError: (error) => {
        toast.error('Something went wrong')
        console.error('Error caught:', error)
      },
    })
  }

  return { formContext: form, isNew, onSubmit, onDelete }
}

export default useCrudForm
