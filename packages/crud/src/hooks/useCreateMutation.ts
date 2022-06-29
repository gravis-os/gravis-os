import { supabaseClient } from '@supabase/supabase-auth-helpers/nextjs'
import { MutationFunction, useMutation, UseMutationResult } from 'react-query'
import { CrudModule } from '../types'

export interface UseCreateActionArg {
  module: CrudModule
}

export interface UseCreateActionReturn<
  TData = unknown,
  TError = unknown,
  TVariables = unknown,
  TContext = unknown
> {
  createMutation: UseMutationResult<TData, TError, TVariables, TContext>
}

const useCreateMutation = <
  TData = unknown,
  TError = unknown,
  TVariables = unknown,
  TContext = unknown
>(
  args: UseCreateActionArg
): UseCreateActionReturn<TData, TError, TVariables, TContext> => {
  const { module } = args
  const { table } = module
  const createMutationFunction: MutationFunction<TData, TVariables> = async (
    nextValues
  ) => supabaseClient.from(table.name).insert([nextValues]) as unknown as TData
  const createMutation = useMutation<TData, TError, TVariables, TContext>(
    createMutationFunction
  )
  return { createMutation }
}

export default useCreateMutation
