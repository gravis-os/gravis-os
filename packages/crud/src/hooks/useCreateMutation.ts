import { supabaseClient } from '@supabase/supabase-auth-helpers/nextjs'
import { useMutation, UseMutationResult } from 'react-query'
import { CrudModule } from '../types'

export interface UseCreateActionArg {
  module: CrudModule
}

export interface UseCreateActionReturn {
  createMutation: UseMutationResult
}

const useCreateMutation = (args: UseCreateActionArg): UseCreateActionReturn => {
  const { module } = args
  const { table } = module
  const createMutationFunction = async (nextValues) =>
    supabaseClient.from(table.name).insert([nextValues])
  const createMutation = useMutation(createMutationFunction)
  return { createMutation }
}

export default useCreateMutation
