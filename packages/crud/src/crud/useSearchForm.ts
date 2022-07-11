import { useForm } from 'react-hook-form'
import {
  supabaseClient,
  SupabaseClient,
} from '@supabase/supabase-auth-helpers/nextjs'
import { getSearchFormValues } from '@gravis-os/form'
import { CrudModule } from '@gravis-os/types'

interface UseSearchFormValues {
  values: Record<string, any>
}

export interface UseSearchFormArgs {
  module: CrudModule
  client?: SupabaseClient
  setFormValues?: ({ values }: UseSearchFormValues) => Record<string, any>
  onSubmit?: (values: UseSearchFormValues) => void
  resetOnSubmit?: boolean
  defaultValues?: Record<string, any>
}

const useSearchForm = (args: UseSearchFormArgs) => {
  const {
    defaultValues,
    resetOnSubmit,
    onSubmit,
    setFormValues,
    client = supabaseClient,
    module,
  } = args
  const { sk = 'slug', route, table } = module

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
    } catch (err) {
      console.error('Error caught:', err)
    }
  }

  return { form, handleSubmit }
}

export default useSearchForm
