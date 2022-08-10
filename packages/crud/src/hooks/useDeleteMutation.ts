import { supabaseClient } from '@supabase/supabase-auth-helpers/nextjs'
import { PostgrestResponse } from '@supabase/postgrest-js'
import {
  MutationFunction,
  useMutation,
  UseMutationOptions,
  UseMutationResult,
} from 'react-query'
import { CrudModule } from '@gravis-os/types'

export interface UseDeleteActionArg<TData, TError, TVariables, TContext> {
  module: CrudModule
  item: unknown
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
  const { module, item, options } = args
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
