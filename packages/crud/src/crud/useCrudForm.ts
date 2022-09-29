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
  createOnSubmit?: boolean // Always create onSubmit only. Never update.
  setFormValues?: ({
    values,
    isNew,
    item,
  }: UseCrudFormValuesInterface) => Record<string, unknown>
  onSubmit?: ({
    values,
    isNew,
    toast,
    afterSubmit,
  }: UseCrudFormValuesInterface & {
    toast: any
    afterSubmit: UseCrudFormArgs['afterSubmit']
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
    const fields = getFieldsFromFormSections(sections)
    const withValuesArgs = { isNew, user, fields }
    const dbFormValues = flowRight([
      withCreatedUpdatedBy(withValuesArgs),
      withoutId(withValuesArgs),
      withDbFormValues(withValuesArgs),
      // Omit fields that have skipOnSubmit: true
      withSkipOnSubmit(withValuesArgs),
    ])(values)

    // Expose values to outer scope
    const exposedValues = setFormValues
      ? setFormValues({ item, isNew, values: dbFormValues })
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
          values: nextValues,
          toast,
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
            await queryClient.invalidateQueries([table.name])

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
                item: createOnSubmit ? null : item, // when creating on submission, the prev item should be null since we don't want any diffing with the next item
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
                item: createOnSubmit ? null : item, // when creating on submission, the prev item should be null since we don't want any diffing with the next item
                values: oneToManyValues,
                data: nextItem,
                client,
                module,
              })
            }

            /**
             * Refetch data to get the latest join info because we're comparing against prev value
             * This is to resolve cases where the user make multiple saveManyToManyValues without refreshing
             * the page/itemQuery, resulting in the comparator function within saveManyToManyValues to be outdated
             * which causes unexpected saves.
             */
            if (refetch) refetch()

            return handleSuccess({ item: nextItem })
          },
          onError: (error) => {
            toast.error('Something went wrong')
            console.error('Error caught:', error)
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
