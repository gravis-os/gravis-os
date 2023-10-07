import {
  MutationFunction,
  UseMutationOptions,
  UseMutationResult,
  useMutation,
  useQueryClient,
} from 'react-query'

import { CrudModule } from '@gravis-os/types'
import { createClientComponentClient } from '@supabase/auth-helpers-nextjs'
import { PostgrestResponse } from '@supabase/postgrest-js'

const supabase = createClientComponentClient()

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
    supabase
      .from(table.name)
      .insert(
        (Array.isArray(nextValues)
          ? nextValues
          : [nextValues]) as Partial<TData>[]
      )
      .select()

  const nextOptions: UseMutationOptions<
    PostgrestResponse<TData>,
    TError,
    TVariables,
    TContext
  > = {
    mutationFn: createMutationFunction,
    ...options,
    onSuccess: async (...args) => {
      queryClient.invalidateQueries([table.name])
      if (options?.onSuccess) options.onSuccess(...args)
    },
  }

  const createMutation = useMutation(nextOptions)

  return { createMutation }
}

export default useCreateMutation
