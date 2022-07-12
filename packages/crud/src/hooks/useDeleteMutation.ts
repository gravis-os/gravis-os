import { supabaseClient } from '@supabase/supabase-auth-helpers/nextjs'
import { PostgrestResponse } from '@supabase/postgrest-js'
import { MutationFunction, useMutation, UseMutationResult } from 'react-query'
import { CrudModule } from '../types'

export interface UseDeleteActionArg {
  module: CrudModule
  item: unknown
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
  args: UseDeleteActionArg
): UseDeleteActionReturn<TData, TError, TVariables, TContext> => {
  const { module, item } = args
  const { sk, table } = module
  const deleteMutationFunction: MutationFunction<
    PostgrestResponse<TData>,
    TVariables
  > = async () =>
    supabaseClient
      .from(table.name)
      .delete()
      .match({ [sk]: item[sk] })
  const deleteMutation = useMutation<
    PostgrestResponse<TData>,
    TError,
    TVariables,
    TContext
  >(deleteMutationFunction)
  return { deleteMutation }
}

export default useDeleteMutation
