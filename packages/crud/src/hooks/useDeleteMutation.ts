import {
  MutationFunction,
  UseMutationOptions,
  UseMutationResult,
  useMutation,
} from 'react-query'

import { CrudModule } from '@gravis-os/types'
import { supabaseClient } from '@supabase/auth-helpers-nextjs'
import { PostgrestResponse } from '@supabase/postgrest-js'

export interface UseDeleteActionArg<TData, TError, TVariables, TContext> {
  item: unknown
  module: CrudModule
  options?: UseMutationOptions<
    PostgrestResponse<TData>,
    TError,
    TVariables,
    TContext
  >
}

export interface UseDeleteActionReturn<
  TData = unknown,
  TError = unknown,
  TVariables = unknown,
  TContext = unknown
> {
  deleteMutation: UseMutationResult<
    PostgrestResponse<TData>,
    TError,
    TVariables,
    TContext
  >
}

const useDeleteMutation = <
  TData = unknown,
  TError = unknown,
  TVariables = unknown,
  TContext = unknown
>(
  args: UseDeleteActionArg<TData, TError, TVariables, TContext>
): UseDeleteActionReturn<TData, TError, TVariables, TContext> => {
  const { item, module, options } = args
  const { sk, table } = module
  const deleteMutationFunction: MutationFunction<
    PostgrestResponse<TData>,
    TVariables
  > = async () =>
    supabaseClient
      .from<TData>(table.name)
      .delete()
      .match({ [sk]: item[sk] })
  const nextOptions: UseMutationOptions<
    PostgrestResponse<TData>,
    TError,
    TVariables,
    TContext
  > = {
    mutationFn: deleteMutationFunction,
    ...options,
  }
  const deleteMutation = useMutation(nextOptions)
  return { deleteMutation }
}

export default useDeleteMutation
