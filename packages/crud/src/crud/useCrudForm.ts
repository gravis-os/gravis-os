import { useEffect } from 'react'
import { useForm, UseFormProps, UseFormReturn } from 'react-hook-form'
import { supabaseClient, SupabaseClient } from '@supabase/auth-helpers-nextjs'
import { useUser } from '@gravis-os/auth'
import flowRight from 'lodash/flowRight'
import { useMutation, useQueryClient } from 'react-query'
import {
  withDbFormValues,
  getDefaultValues,
  withoutId,
  withSkipOnSubmit,
  withSlugFromTitle,
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
import getFieldsFromFormSections from './getFieldsFromFormSections'
import getDefaultValuesFromFields from './getDefaultValuesFromFields'

type UseCrudFormValues = Record<string, any>

interface UseCrudFormValuesInterface {
  isNew?: boolean
  item?: CrudItem
  values: UseCrudFormValues
}

export interface UseCrudFormArgs extends UseFormProps {
  module: CrudModule
  item?: CrudItem
  refetch?: () => Promise<unknown>
  client?: SupabaseClient
  shouldCreateOnSubmit?: (formContext) => boolean
  createOnSubmit?: boolean // Always create onSubmit only. Never update.
  setFormValues?: ({
    values,
    isNew,
    item,
    rawValues,
  }: UseCrudFormValuesInterface & {
    rawValues: UseCrudFormValues
  }) => Record<string, unknown>
  onSubmit?: ({
    rawValues,
    values,
    item,
    isNew,
    toast,
    afterSubmit,
  }: UseCrudFormValuesInterface & {
    toast: any
    afterSubmit: UseCrudFormArgs['afterSubmit']
    rawValues: UseCrudFormValues
  }) => unknown // Override submit action
  afterSubmit?: ({
    rawValues, // Values before clean
    values, // Values after clean
    isNew,
    item,
    toast,
  }: UseCrudFormValuesInterface & {
    rawValues: UseCrudFormValues
    toast: any
  }) => unknown
  afterDelete?: ({ values, item }: UseCrudFormValuesInterface) => unknown
  defaultValues?:
    | Record<string, unknown>
    | (({ item }: { item?: CrudItem }) => Record<string, unknown>)
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
    onSubmit: injectedOnSubmit,
    afterSubmit,
    afterDelete,
    setFormValues,
    client = supabaseClient,
    createOnSubmit,
    item: injectedItem,
    refetch,
    module,
    sections,
    shouldCreateOnSubmit,
    ...rest
  } = props
  const { sk, table } = module

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
      ? client.from(table.name).insert([nextValues])
      : client.from(table.name).update([nextValues]).match(queryMatcher)
  const deleteMutationFunction = async () =>
    client.from(table.name).delete().match(queryMatcher)
  const handleMutationError = (error) => {
    toast.error('Something went wrong')
    console.error('Error caught:', error)
  }
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
    // Cleaning function for dbFormValues
    const fields = getFieldsFromFormSections(sections)
    const withValuesArgs = { isNew, user, fields, module }
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
      ? setFormValues({ item, isNew, values: dbFormValues, rawValues: values })
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
          rawValues: values, // Original form values before clean
          values: nextValues, // Submitted values
          item: nextItem,
          toast,
        })
      }
    }

    // Fire Action - Allow user to inject custom onSubmit, or use default for Create/Update
    switch (true) {
      // Override default submit action to just get values and manual override outside
      case typeof injectedOnSubmit === 'function':
        const injectedOnSubmitArgs = {
          isNew,
          rawValues: values,
          values: nextValues,
          toast,
          item,
          afterSubmit,
        }
        // Trigger injectedOnSubmit
        const onInjectedOnSubmit = await injectedOnSubmit(injectedOnSubmitArgs)
        if (!onInjectedOnSubmit) return

        // Handle success
        return handleSuccess({ item: onInjectedOnSubmit })
      // Default action: Create or Update
      default:
        createOrUpdateMutation.mutate(nextValues, {
          onSuccess: async (result) => {
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
                item: (createOnSubmit || shouldCreateOnSubmit?.(form)) ? null : item, // when creating on submission, the prev item should be null since we don't want any diffing with the next item
                values: manyToManyValues,
                data: nextItem,
                client,
                module,
                fieldDefs,
              })
            }

            // Manage one to many values by creating records in join tables
            const hasOneToManyValues = Boolean(
              Object.keys(oneToManyValues).length
            )
            if (hasOneToManyValues) {
              await saveOneToManyValues({
                item: (createOnSubmit || shouldCreateOnSubmit?.(form)) ? null : item, // when creating on submission, the prev item should be null since we don't want any diffing with the next item
                values: oneToManyValues,
                data: nextItem,
                client,
                module,
              })
            }

            // Add `afterInsert` or `afterUpdate` trigger
            const { afterInsert, afterUpdate } = module.triggers || {}
            if (afterInsert || afterUpdate) {
              const afterTriggerProps = { item: nextItem, values, user, client }
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

  const onDelete = async (values) => {
    // Delete
    deleteMutation.mutate(values, {
      onSuccess: async (result) => {
        queryClient.invalidateQueries([table.name])

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
