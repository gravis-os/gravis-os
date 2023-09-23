import useSupabaseSchemaQuery from './useSupabaseSchemaQuery'

export interface TableDefinition {
  properties: Record<
    string,
    { default?: string; description?: string; format: string; type: string }
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
