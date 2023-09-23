import { useForm } from 'react-hook-form'
import toast from 'react-hot-toast'

import { getSearchFormValues } from '@gravis-os/form'
import { CrudModule } from '@gravis-os/types'
import { SupabaseClient, supabaseClient } from '@supabase/auth-helpers-nextjs'

interface UseSearchFormValues {
  values: Record<string, any>
}

export interface UseSearchFormArgs {
  client?: SupabaseClient
  defaultValues?: Record<string, any>
  module: CrudModule
  onSubmit?: (values: UseSearchFormValues) => void
  resetOnSubmit?: boolean
  setFormValues?: ({ values }: UseSearchFormValues) => Record<string, any>
}

const useSearchForm = (args: UseSearchFormArgs) => {
  const {
    client = supabaseClient,
    defaultValues,
    module,
    onSubmit,
    resetOnSubmit,
    setFormValues,
  } = args
  const { route, sk = 'slug', table } = module

  // ==============================
  // Form
  // ==============================
  // Default Values
  const form = useForm({ defaultValues })
  const { reset } = form

  // Submit
  const handleSubmit = async (values) => {
    try {
      const searchFormValues = getSearchFormValues({ values })
      const nextValues = setFormValues
        ? setFormValues({ values: searchFormValues })
        : searchFormValues
      if (onSubmit) onSubmit({ values: nextValues })
      if (resetOnSubmit) reset(defaultValues)
    } catch (error) {
      console.error('Error caught:', error)
      toast.error('Something went wrong')
    }
  }

  return { form, handleSubmit }
}

export default useSearchForm
