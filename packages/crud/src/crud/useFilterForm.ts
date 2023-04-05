import { useEffect } from 'react'
import { useForm } from 'react-hook-form'
import { SupabaseClient } from '@supabase/auth-helpers-nextjs'
import { getFilterFormValues } from '@gravis-os/form'
import { CrudModule } from '@gravis-os/types'

interface UseFilterFormValues {
  values: Record<string, any>
  rawValues: Record<string, any>
}

export interface UseFilterFormArgs {
  module: CrudModule
  item?: Record<string, unknown>
  client?: SupabaseClient
  setFormValues?: ({ values }: UseFilterFormValues) => Record<string, any>
  onSubmit?: (obj: Omit<UseFilterFormValues, 'rawValues'>) => void
}

const useFilterForm = (args: UseFilterFormArgs) => {
  const { onSubmit, setFormValues, item = {} } = args

  // ==============================
  // Form
  // ==============================
  // Default Values
  const defaultValues = item
  const form = useForm({ defaultValues })
  const { reset } = form
  useEffect(() => {
    reset(defaultValues)
  }, [])

  // Submit
  const handleSubmit = async (values) => {
    try {
      const filterFormValues = getFilterFormValues({ values })
      const nextValues = setFormValues
        ? setFormValues({ values: filterFormValues, rawValues: values })
        : filterFormValues
      if (onSubmit) onSubmit({ values: nextValues })
    } catch (err) {
      console.error('Error caught:', err)
    }
  }

  return { form, handleSubmit }
}

export default useFilterForm
