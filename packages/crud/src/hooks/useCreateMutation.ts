import { supabaseClient } from '@supabase/auth-helpers-nextjs'
import { PostgrestResponse } from '@supabase/postgrest-js'
import {
  MutationFunction,
  useMutation,
  UseMutationOptions,
  UseMutationResult,
  useQueryClient,
} from 'react-query'
import { CrudModule } from '@gravis-os/types'

export interface UseCreateActionArg<
  TData = unknown,
  TError = unknown,
  TVariables = unknown,
  TContext = unknown
> {
  module: CrudModule
  options?: UseMutationOptions<
    PostgrestResponse<TData>,
    TError,
    TVariables,
    TContext
  >
}

export interface UseCreateActionReturn<
  TData = unknown,
  TError = unknown,
  TVariables = unknown,
  TContext = unknown
> {
  createMutation: UseMutationResult<
    PostgrestResponse<TData>,
    TError,
    TVariables,
    TContext
  >
}

const useCreateMutation = <
  TData = unknown,
  TError = unknown,
  TVariables = unknown,
  TContext = unknown
>(
  args: UseCreateActionArg<TData, TError, TVariables, TContext>
): UseCreateActionReturn<TData, TError, TVariables, TContext> => {
  const { module, options } = args
  const { table } = module
  const queryClient = useQueryClient()

  const createMutationFunction: MutationFunction<
    PostgrestResponse<TData>,
    TVariables
  > = async (nextValues: TVariables) =>
    supabaseClient
      .from<TData>(table.name)
      .insert(Array.isArray(nextValues) ? nextValues : [nextValues])

  const nextOptions: UseMutationOptions<
    PostgrestResponse<TData>,
    TError,
    TVariables,
    TContext
  > = {
    mutationFn: createMutationFunction,
    ...options,
    onSuccess: async (...args) => {
      queryClient.invalidateQueries([module.table.name])
      if (options?.onSuccess) options.onSuccess(...args)
    },
  }

  const createMutation = useMutation(nextOptions)

  return { createMutation }
}

export default useCreateMutation
