import { useEffect } from 'react'
import { UseFormProps, UseFormReturn, useForm } from 'react-hook-form'
import toast from 'react-hot-toast'
import { useMutation, useQueryClient } from 'react-query'

import { useUser } from '@gravis-os/auth'
import {
  FormSectionsProps,
  getDefaultValues,
  withDbFormValues,
  withSkipOnSubmit,
  withSlugFromTitle,
  withoutId,
} from '@gravis-os/form'
import { CrudItem, CrudModule } from '@gravis-os/types'
import {
  SupabaseClient,
  createClientComponentClient,
} from '@supabase/auth-helpers-nextjs'
import flowRight from 'lodash/flowRight'

import getFieldDefsFromSections from '../utils/getFieldDefsFromSections'
import getDefaultValuesFromFields from './getDefaultValuesFromFields'
import getFieldsFromFormSections from './getFieldsFromFormSections'
import getIsNew from './getIsNew'
import partitionManyToManyValues from './partitionManyToManyValues'
import partitionOneToManyValues from './partitionOneToManyValues'
import saveManyToManyValues from './saveManyToManyValues'
import saveOneToManyValues from './saveOneToManyValues'
import withCreatedUpdatedBy from './withCreatedUpdatedBy'

const supabase = createClientComponentClient()

const handleMutationError = (error) => {
  toast.error('Something went wrong')
  console.error('Error caught:', error)
}

export type UseCrudFormValues = Record<string, any>

export interface UseCrudFormValuesInterface {
  isNew?: boolean
  item?: CrudItem
  values: UseCrudFormValues
}

export interface UseCrudFormArgs extends UseFormProps {
  afterDelete?: ({ item, values }: UseCrudFormValuesInterface) => unknown
  afterSubmit?: ({
    isNew,
    item,
    rawValues, // Values before clean
    toast,
    values, // Values after clean
  }: UseCrudFormValuesInterface & {
    rawValues: UseCrudFormValues
    toast: any
  }) => unknown
  client?: SupabaseClient
  createOnSubmit?: boolean // Always create onSubmit only. Never update.
  defaultValues?:
    | (({ item }: { item?: CrudItem }) => Record<string, unknown>)
    | Record<string, unknown>
  item?: CrudItem
  module: CrudModule
  onSubmit?: ({
    afterSubmit,
    isNew,
    item,
    rawValues,
    toast,
    values,
  }: UseCrudFormValuesInterface & {
    afterSubmit: UseCrudFormArgs['afterSubmit']
    rawValues: UseCrudFormValues
    toast: any
  }) => unknown // Override submit action
  refetch?: () => Promise<unknown>
  sections?: FormSectionsProps['sections']
  setFormValues?: ({
    isNew,
    item,
    rawValues,
    values,
  }: UseCrudFormValuesInterface & {
    rawValues: UseCrudFormValues
  }) => Record<string, unknown>
  shouldCreateOnSubmit?: (formContext: UseFormReturn) => boolean
  shouldSkipOnSubmit?: (formContext: UseFormReturn) => boolean
}

export interface UseCrudFormReturn {
  formContext: UseFormReturn
  isNew: boolean
  onDelete: (values: UseCrudFormValues) => Promise<void>
  onSubmit: any // (values: UseCrudFormValues) => Promise<void> // Combination of create and update
}

const useCrudForm = (props: UseCrudFormArgs): UseCrudFormReturn => {
  const {
    afterDelete,
    afterSubmit,
    client = supabase,
    createOnSubmit,
    defaultValues: injectedDefaultValues,
    item: injectedItem,
    module,
    onSubmit: injectedOnSubmit,
    refetch,
    sections,
    setFormValues,
    shouldCreateOnSubmit,
    shouldSkipOnSubmit,
    ...rest
  } = props
  const { sk, table, triggers } = module

  const item = injectedItem || ({} as CrudItem)

  // User
  const { user } = useUser()

  // Fields
  const fieldDefs = sections && getFieldDefsFromSections(sections)
  const fieldDefaultValues = getDefaultValuesFromFields(fieldDefs)

  // ==============================
  // Form
  // ==============================
  // Check if the item is defined. If not, we are creating a new item.
  const hasItem = Object.keys(item).length
  const isNew = getIsNew(item)

  // Allow downstream to calculate defaultValues
  const resolvedDefaultValues =
    typeof injectedDefaultValues === 'function'
      ? injectedDefaultValues({ item })
      : injectedDefaultValues

  // Default Values
  const defaultValues = isNew
    ? { ...fieldDefaultValues, ...resolvedDefaultValues }
    : getDefaultValues({
        isNew,
        item: { ...fieldDefaultValues, ...item, ...resolvedDefaultValues },
      })

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
    createOnSubmit || isNew || shouldCreateOnSubmit?.(form)
      ? client.from(table.name).insert([nextValues]).select()
      : client
          .from(table.name)
          .update([nextValues])
          .match(queryMatcher)
          .select()
  const deleteMutationFunction = async () =>
    client.from(table.name).delete().match(queryMatcher).select()
  const createOrUpdateMutation = useMutation({
    mutationFn: createOrUpdateMutationFunction,
    onError: handleMutationError,
  })
  const deleteMutation = useMutation({
    mutationFn: deleteMutationFunction,
    onError: handleMutationError,
  })

  // onSubmit will manage create and update function
  const onSubmit = async (values) => {
    if (shouldSkipOnSubmit?.(form)) return
    // Cleaning function for dbFormValues
    const fields = getFieldsFromFormSections(sections)
    const withValuesArgs = { fields, isNew, module, user }
    const dbFormValues = flowRight([
      // Add user.id to _by columns
      withCreatedUpdatedBy(withValuesArgs),
      // Remove id if isNew
      withoutId(withValuesArgs),
      // Add timestamps and resolve relational objects
      withDbFormValues(withValuesArgs),
      // Add default value for `slug` column
      withSlugFromTitle(withValuesArgs),
      // Omit fields that have skipOnSubmit: true
      withSkipOnSubmit(withValuesArgs),
    ])(values)

    // Expose values to outer scope
    const exposedValues = setFormValues
      ? setFormValues({ isNew, item, rawValues: values, values: dbFormValues })
      : dbFormValues

    // Split join (one to many / many to many) values
    const [nonManyToManyValues, manyToManyValues] =
      partitionManyToManyValues(exposedValues)
    const [nonOneToManyValues, oneToManyValues] =
      partitionOneToManyValues(nonManyToManyValues)

    // Payload
    const nextValues = nonOneToManyValues

    // HandleSuccess - Gets fired after both actions are completed
    const handleSuccess = async ({ item: nextItem }) => {
      // Toast
      toast.success('Success')

      if (afterSubmit) {
        afterSubmit({
          isNew,
          item: nextItem,
          rawValues: values, // Original form values before clean
          toast,
          values: nextValues, // Submitted values
        })
      }
    }

    // Fire Action - Allow user to inject custom onSubmit, or use default for Create/Update
    switch (true) {
      // Override default submit action to just get values and manual override outside
      case typeof injectedOnSubmit === 'function': {
        const injectedOnSubmitArgs = {
          afterSubmit,
          isNew,
          item,
          rawValues: values,
          toast,
          values: nextValues,
        }
        // Trigger injectedOnSubmit
        const onInjectedOnSubmit = await injectedOnSubmit(injectedOnSubmitArgs)
        if (!onInjectedOnSubmit) return

        // Handle success
        return handleSuccess({ item: onInjectedOnSubmit })
      }
      // Default action: Create or Update
      default: {
        createOrUpdateMutation.mutate(nextValues, {
          onSuccess: async (result) => {
            // Handle errors
            const { data, error } = result
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
            const hasManyToManyValues = Object.keys(manyToManyValues).length > 0
            if (hasManyToManyValues) {
              await saveManyToManyValues({
                client,
                data: nextItem,
                fieldDefs,
                item:
                  createOnSubmit || shouldCreateOnSubmit?.(form) ? null : item, // when creating on submission, the prev item should be null since we don't want any diffing with the next item
                module,
                values: manyToManyValues,
              })
            }

            // Manage one to many values by creating records in join tables
            const hasOneToManyValues = Object.keys(oneToManyValues).length > 0
            if (hasOneToManyValues) {
              await saveOneToManyValues({
                client,
                data: nextItem,
                item:
                  createOnSubmit || shouldCreateOnSubmit?.(form) ? null : item, // when creating on submission, the prev item should be null since we don't want any diffing with the next item
                module,
                values: oneToManyValues,
              })
            }

            // Add `afterInsert` or `afterUpdate` trigger
            const { afterInsert, afterUpdate } = triggers || {}
            if (afterInsert || afterUpdate) {
              const afterTriggerProps = { client, item: nextItem, user, values }
              if (isNew && afterInsert) await afterInsert(afterTriggerProps)
              if (!isNew && afterUpdate) await afterUpdate(afterTriggerProps)
            }

            // Update cache
            await queryClient.invalidateQueries([table.name])

            /**
             * Refetch data to get the latest join info because we're comparing against prev value
             * This is to resolve cases where the user make multiple saveManyToManyValues without refreshing
             * the page/itemQuery, resulting in the comparator function within saveManyToManyValues to be outdated
             * which causes unexpected saves.
             */
            if (refetch) refetch()

            return handleSuccess({ item: nextItem })
          },
        })
      }
    }
  }

  const onDelete = async (values) => {
    // Delete
    deleteMutation.mutate(values, {
      onError: (error) => {
        toast.error('Something went wrong')
        console.error('Error caught:', error)
      },
      onSuccess: async (result) => {
        queryClient.invalidateQueries([table.name])

        // Handle errors
        const { data, error } = result
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
            item: nextItem,
            values,
          })
        }
      },
    })
  }

  return { formContext: form, isNew, onDelete, onSubmit }
}

export default useCrudForm
