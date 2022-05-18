import React, { useEffect } from 'react'
import { useForm } from 'react-hook-form'
import {
  supabaseClient,
  SupabaseClient,
} from '@supabase/supabase-auth-helpers/nextjs'
import { useUser } from '@supabase/supabase-auth-helpers/react/components/UserProvider'
import flowRight from 'lodash/flowRight'
import { useMutation, useQueryClient } from 'react-query'
import { withDbFormValues, getDefaultValues, withoutId } from '@gravis-os/form'
import toast from 'react-hot-toast'
import { CrudItem, CrudModule } from './typings'
import getIsNew from './getIsNew'
import withCreatedUpdatedBy from './withCreatedUpdatedBy'
import partitionJoinValues from './partitionJoinValues'
import saveJoins from './saveJoins'

type UseCrudFormValues = Record<string, any>

interface UseCrudFormValuesInterface {
  values: UseCrudFormValues
  isNew: boolean
}

export interface UseCrudFormArgs {
  module: CrudModule
  item?: CrudItem
  refetch?: () => Promise<CrudItem>
  client?: SupabaseClient
  setFormValues?: ({
    values,
    isNew,
  }: UseCrudFormValuesInterface) => Record<string, unknown>
  afterSubmit?: ({
    values,
    isNew,
    item,
  }: UseCrudFormValuesInterface & { item: CrudItem }) => void
  defaultValues?: Record<string, unknown>
}

const useCrudForm = (args: UseCrudFormArgs) => {
  const {
    defaultValues: injectedDefaultValues,
    afterSubmit,
    setFormValues,
    client = supabaseClient,
    item: injectedItem,
    refetch,
    module,
  } = args
  const { sk, table } = module

  const item = injectedItem || {}

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
  const form = useForm({ defaultValues })
  const { reset } = form

  // Reset form when dbItem is returned
  useEffect(() => {
    if (hasItem) reset(defaultValues)
  }, [item])

  // ==============================
  // Submit
  // ==============================
  const queryClient = useQueryClient()
  const mutationFunction = async (nextValues) =>
    isNew
      ? client.from(table.name).insert([nextValues])
      : client
          .from(table.name)
          .update([nextValues])
          .match({ [sk]: item[sk] })
  const mutation = useMutation(mutationFunction)

  const handleSubmit = async (values) => {
    // Cleaning function for dbFormValues
    const withValuesArgs = { isNew, user }
    const dbFormValues = flowRight([
      withCreatedUpdatedBy(withValuesArgs),
      withoutId(withValuesArgs),
      withDbFormValues(withValuesArgs),
    ])(values)

    // Expose values to outer scope
    const exposedValues = setFormValues
      ? setFormValues({ isNew, values: dbFormValues })
      : dbFormValues

    // Split join values
    const [nonJoinValues, joinValues] = partitionJoinValues(exposedValues)

    // Payload
    const nextValues = nonJoinValues

    // Create or Update
    mutation.mutate(nextValues, {
      onSuccess: async (data) => {
        queryClient.invalidateQueries(table.name)

        // Handle error
        const { error } = data
        if (error) {
          console.error('error at useCrudForm.mutation()', error.message)
          toast.error('Something went wrong')
          return
        }

        // Toast
        toast.success('Success')

        // Manage join values by creating records in join tables
        const hasJoinValues = Boolean(Object.keys(joinValues).length)
        if (hasJoinValues) {
          await saveJoins({ item, values: joinValues, client, module })

          /**
           * Refetch data to get the latest join info because we're comparing against prev value
           * This is to resolve cases where the user make multiple saveJoins without refreshing
           * the page/itemQuery, resulting in the comparator function within saveJoins to be outdated
           * which causes unexpected saves.
           */
          if (refetch) refetch()
        }

        if (afterSubmit) {
          const nextItem = data.body?.[0]
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

  return { form, isNew, handleSubmit }
}

export default useCrudForm
