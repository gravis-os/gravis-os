import { CrudModule } from '@gravis-os/types'

// Dynamically calculate relation key to access the relation field
const getRelationFieldKey = ({
  field,
  module,
}: {
  field: string
  module: CrudModule
}) => {
  const hasRelation = field?.includes('.')
  switch (true) {
    case hasRelation: {
      // Return 'id' if current module is a join table
      const isModuleJoinTable = module.table.isJoinTable
      if (isModuleJoinTable) return 'id'

      // Dynamically calculate relation key to access the relation field
      return `${field.split('.').slice(0, -1).join('.')}.${module.sk}`
    }
    default: {
      // No relations, so just return the current item's sk
      return module.sk
    }
  }
}

export default getRelationFieldKey
