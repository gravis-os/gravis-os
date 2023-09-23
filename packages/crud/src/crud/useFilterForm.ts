import { useEffect } from 'react'
import { useForm } from 'react-hook-form'

import { getFilterFormValues } from '@gravis-os/form'
import { CrudModule } from '@gravis-os/types'
import { SupabaseClient } from '@supabase/auth-helpers-nextjs'

interface UseFilterFormValues {
  rawValues: Record<string, any>
  values: Record<string, any>
}

export interface UseFilterFormArgs {
  client?: SupabaseClient
  item?: Record<string, unknown>
  module: CrudModule
  onSubmit?: (obj: Omit<UseFilterFormValues, 'rawValues'>) => void
  setFormValues?: ({ values }: UseFilterFormValues) => Record<string, any>
}

const useFilterForm = (args: UseFilterFormArgs) => {
  const { item = {}, onSubmit, setFormValues } = args

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
        ? setFormValues({ rawValues: values, values: filterFormValues })
        : filterFormValues
      if (onSubmit) onSubmit({ values: nextValues })
    } catch (error) {
      console.error('Error caught:', error)
    }
  }

  return { form, handleSubmit }
}

export default useFilterForm
