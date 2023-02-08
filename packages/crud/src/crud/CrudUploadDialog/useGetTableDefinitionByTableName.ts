import useSupabaseSchemaQuery from './useSupabaseSchemaQuery'

export interface TableDefinition {
  properties: Record<
    string,
    { type: string; format: string; description?: string; default?: string }
  >
  required: string[]
  type: string
}

const useGetTableDefinitionByTableName = (
  tableName: string,
  queryOptions = {}
): TableDefinition | undefined => {
  const { data } = useSupabaseSchemaQuery(queryOptions)
  if (!data?.definitions) return
  return data.definitions[tableName]
}

export default useGetTableDefinitionByTableName
